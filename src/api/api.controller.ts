import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { ReqXmlDto } from './dto/integrator.dto';
import { ResPayload } from './interface/payload.integrator';
import FIRequest from './data/fi-request';
import { FIPayload } from './interface/fi-request.integrator';
import xmlParser from './middleware/xml-parser';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService){}

    @Get('test')
    test(){
        return 'Service is up'
    }

    @Post('integrator')
    async getFinacleRes(@Body() reqDto: ReqXmlDto) {
        console.log(reqDto)
        const reqPayload: FIPayload = {
            serviceName: reqDto.serviceName,
            body: reqDto.xml
        }

        const fiRequest = new FIRequest(reqPayload)
        const payload = fiRequest.soapRequest()

        const dataRes = await this.apiService.getFinacleResponse(payload)
        const result: any = await xmlParser(dataRes.data)

        const responseXML: string = result['soapenv:Envelope']['soapenv:Body']

        const res: ResPayload = {
            statusCode: 200,
            data: responseXML
        }
        console.log(res)
        return res
    }

}
