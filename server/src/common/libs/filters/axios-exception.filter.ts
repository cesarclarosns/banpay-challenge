import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;

    const status = exception.response?.status as HttpStatus;

    switch (status) {
      case HttpStatus.NOT_FOUND:
        response.status(HttpStatus.NOT_FOUND).send();
        break;
      default:
        response.status(HttpStatus.BAD_REQUEST).send();
        break;
    }
  }
}
