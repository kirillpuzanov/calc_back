import {Response} from 'express';

export const successResult = (res: Response, message: string, statusCode: number, input_data: any) => {
    return res.send({
        message: message,
        statusCode: statusCode,
        input_data: input_data
    }).sendStatus(statusCode)
}