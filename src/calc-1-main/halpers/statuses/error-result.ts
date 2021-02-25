import { Response} from 'express';

export const errorStatus400 = (res: Response, error: string, statusCodeError: number, input_data?: any) => {
    res.send({
        error: error,
        statusCode: statusCodeError,
        input_data: input_data
    }).sendStatus(statusCodeError)
}

export const errorStatus500 = (res: Response, error: any, inPlace:string) => {
    const errorObj = {
        error: 'some error: ' + error.message,
        statusCode: 500,
        inPlace:inPlace
    }
    console.log('Error Server/DB',errorObj)
    res.send(errorObj).sendStatus(500)
}