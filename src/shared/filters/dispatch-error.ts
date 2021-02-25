import _ from 'lodash';
import { QueryFailedError } from 'typeorm';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { MessageCodeError } from '../errors/message-code-error';

@Catch(MessageCodeError, HttpException, QueryFailedError, EntityNotFoundError, Error)
export class DispatchError implements ExceptionFilter {
  public catch(err: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    if (err instanceof MessageCodeError) {
      /** MessageCodeError, Set all header variable to
             * have a context for the client in case of MessageCodeError. */
      return res.status(err.httpStatus).send(err);
    }
    if (err instanceof EntityNotFoundError || err instanceof QueryFailedError) {
      /** Typeorm validation error. */
      return res.status(HttpStatus.BAD_REQUEST).send(err);
    }

    return res
      .status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: _.get(err, 'message', 'Something went wrong') });
  }
}
