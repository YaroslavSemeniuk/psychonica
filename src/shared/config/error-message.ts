import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/error-message.interface';

export const errorMessagesConfig: {
  [messageCode: string]: IErrorMessages;
} = {
  'request:unauthorized': {
    type: 'unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Access unauthorized.',
    userMessage: 'Token missing or not valid',
  },
  /** -----------------------VALIDATION ERRORS-----------------------*/
  'validation:error': {
    type: 'ValidationError',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Validation error',
    userMessage: 'Validation error: ',
  },

  /** -----------------------PROJECT ERRORS-----------------------*/
  'project:notFound': {
    type: 'NotFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'Project not found',
    userMessage: 'Project not found',
  },
  'project:exist': {
    type: 'Conflict',
    httpStatus: HttpStatus.CONFLICT,
    errorMessage: 'Cant create project, project with same name already exist',
    userMessage: 'Cant create project, project with same name already exist',
  },
};
