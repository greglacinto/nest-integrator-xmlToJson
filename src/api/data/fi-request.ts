import * as crypto from 'crypto';
import { FIPayload } from '../interface/fi-request.integrator';

const requestTime = new Date().toISOString()

class FIRequest {
    requestBody: FIPayload = {
        serviceName: '',
        body: ''
    }
    constructor(fiPayload: FIPayload){
        this.requestBody = fiPayload
    }

    soapRequest(){
        let xmlFi = `<FIXML xmlns="http://www.finacle.com/fixml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.finacle.com/fixml ${this.requestBody.serviceName}.xsd">`
        xmlFi = xmlFi + `<Header><RequestHeader><MessageKey><RequestUUID>${crypto.randomUUID()}</RequestUUID><ServiceRequestId>${this.requestBody.serviceName}</ServiceRequestId>`
        xmlFi = xmlFi + `<ServiceRequestVersion>${process.env.FI_VERSION}</ServiceRequestVersion><ChannelId>COR</ChannelId><AccessToken>null</AccessToken><ClientIP>null</ClientIP><OriginatorInstanceId/>`
        xmlFi = xmlFi + `<OriginatorVersion/><LanguageId/></MessageKey><RequestMessageInfo><BankId/><TimeZone/><EntityId/><EntityType/><ArmCorrelationId/><MessageDateTime>${requestTime}</MessageDateTime>`
        xmlFi = xmlFi + `<ExceptionOverrideFlag/><SrvInvocmodeOverrideFlag/></RequestMessageInfo><Security><Token><PasswordToken><UserId/><Password/></PasswordToken></Token><FICertToken/><RealUserLoginSessionId/>`
        xmlFi = xmlFi + `<RealUser/><RealUserPwd/><SSOTransferToken/></Security></RequestHeader></Header><Body>${this.requestBody.body}</Body></FIXML>`   
        
        const xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint.fip.infosys.com">
                <soapenv:Header/>
                <soapenv:Body>
                    <end:executeService>
                    <arg_0_0><![CDATA[
                        ${xmlFi}
                    ]]></arg_0_0>
                    </end:executeService>
                </soapenv:Body>
            </soapenv:Envelope>`;

        
                    
        
        return xml;
    }
}

export default FIRequest

