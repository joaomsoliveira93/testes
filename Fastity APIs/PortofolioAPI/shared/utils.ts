import {FastifyReply} from 'fastify';
import {generalError} from 'shared/responses';

function returnError(error: any, response: FastifyReply): any
{
    if (typeof error.status === 'undefined' || error.status === null)
    {
        response.status(generalError[1000].status).send(
            {
                ...generalError[1000]
            }
        );
    }
    else
    {
        response.status(error.status).send(
            {
                ...error
            }
        );
    }
}

function returnSuccess(successMessage: any, response: FastifyReply, data?: any, total?: number): any
{
    response.status(200).send(
        {
            code: successMessage.code,
            message: successMessage.message,
            total: total,
            data: data
        }
    );
}

function formatDate(date: Date | string | number): string
{
    const currentDate = new Date(date);
    let month = `${currentDate.getMonth() + 1}`;
    let day = `${currentDate.getDate()}`;

    let hours = `${currentDate.getHours()}`;
    let minutes = `${currentDate.getMinutes()}`;
    let seconds = `${currentDate.getSeconds()}`;

    if (month.length < 2)
    {
        month = `0${month}`;
    }
    if (day.length < 2)
    {
        day = `0${day}`;
    }

    if (hours.length < 2)
    {
        hours = `0${hours}`;
    }

    if (minutes.length < 2)
    {
        minutes = `0${minutes}`;
    }

    if (seconds.length < 2)
    {
        seconds = `0${seconds}`;
    }

    return `[${[hours, minutes, seconds].join(':')}]`;
}


export {returnError, returnSuccess, formatDate};
