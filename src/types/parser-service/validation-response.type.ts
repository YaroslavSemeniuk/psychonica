import { ValidationError } from 'class-validator';

export type validationResponseType = {
    seoId: string,
    reason: string | ValidationError[]
}
