import { ForbiddenException, Injectable } from '@nestjs/common';
import * as https from 'https'
import axios, { AxiosError } from 'axios'

import { ResPayload } from './interface/payload.integrator';


@Injectable()
export class ApiService {
    constructor(){}

    async getFinacleResponse(payload: string) {          
        const config = {
            headers: {
              'Content-Type': 'text/xml',
              'Content-Length': Buffer.byteLength(payload),
              'SOAPAction': ''
        },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }

        console.log("Inside api/integrator service")
        
        const url = process.env.FI_URL
        const response = await axios.post(
            url,
            payload,
            config
        ).catch((error: AxiosError) => {
            console.log(error.stack)
            throw new ForbiddenException(error.message);
        })
        
        const resPayload : ResPayload = {data: response.data}
        return resPayload;
    }
}
