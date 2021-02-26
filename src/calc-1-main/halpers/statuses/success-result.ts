import {Response} from 'express';

export const successResult = (res: Response, message: string, statusCode: number, input_data: any) => {
    res.status(statusCode).json({
        message: message,
        statusCode: statusCode,
        input_data: input_data
    })
}