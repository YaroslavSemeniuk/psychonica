import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { MessageCodeError } from '../errors/message-code-error';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (value instanceof Object && ValidationPipe.isEmpty(value)) {
      throw new MessageCodeError(
        'validation:error',
        'Validation failed: No Body provided',
      );
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errorsList = await validate(object);
    if (errorsList.length > 0) {
      const errors = [];
      for (const error of errorsList) {
        errors.push(error.constraints);
      }
      if (errors.length > 0) {
        throw new MessageCodeError('validation:error', '', errors);
      }
    }
    return object;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
  private static isEmpty(value: any) {
    return Object.keys(value).length <= 0;
  }
}
