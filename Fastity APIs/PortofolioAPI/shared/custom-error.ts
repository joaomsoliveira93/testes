export class CustomError extends Error
{
    public code: number;

    public status: number;

    public message: string;

    public constructor(error: {code: number; status: number; message: string})
    {
        super();

        this.code = error.code;
        this.status = error.status;
        this.message = error.message;
    }
}
