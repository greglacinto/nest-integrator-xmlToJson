import { IsNotEmpty, IsString } from 'class-validator'

export class ReqXmlDto {
    @IsNotEmpty()
    @IsString()
    readonly serviceName: string
    @IsNotEmpty()
    @IsString()
    readonly xml: string
}


