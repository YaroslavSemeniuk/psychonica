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

  /** -----------------------USER ERRORS-----------------------*/
  'user:notFound': {
    type: 'NotFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'user not found',
    userMessage: 'user not found',
  },
  'user:exist': {
    type: 'Conflict',
    httpStatus: HttpStatus.CONFLICT,
    errorMessage: 'Cant create user, user with same email already exist',
    userMessage: 'Cant create user, user with same email already exist',
  },
  /** -----------------------ARTICLE ERRORS-----------------------*/
  'article:notFound': {
    type: 'NotFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'article not found',
    userMessage: 'article not found',
  },
  'article:exist': {
    type: 'Conflict',
    httpStatus: HttpStatus.CONFLICT,
    errorMessage: 'Cant create article, category with same title already exist',
    userMessage: 'Cant create article, category with same title already exist',
  },
  /** -----------------------CATEGORY ERRORS-----------------------*/
  'category:notFound': {
    type: 'NotFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'category not found',
    userMessage: 'category not found',
  },
  'category:exist': {
    type: 'Conflict',
    httpStatus: HttpStatus.CONFLICT,
    errorMessage: 'Cant create category, category with same name already exist',
    userMessage: 'Cant create category, category with same name already exist',
  },
  /** -----------------------QUESTION ERRORS-----------------------*/
  'question:notFound': {
    type: 'NotFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'question not found',
    userMessage: 'question not found',
  },
  'question:exist': {
    type: 'Conflict',
    httpStatus: HttpStatus.CONFLICT,
    errorMessage: 'Cant create question, question with same title and description already exist',
    userMessage: 'Cant create question, question with same title and description already exist',
  },
  /** -----------------------ANSWER ERRORS-----------------------*/
  'answer:notFound': {
    type: 'NotFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'answer not found',
    userMessage: 'answer not found',
  },
  'answer:exist': {
    type: 'Conflict',
    httpStatus: HttpStatus.CONFLICT,
    errorMessage: 'Cant create answer, answer with same title and description already exist',
    userMessage: 'Cant create answer, answer with same title and description already exist',
  },
};
