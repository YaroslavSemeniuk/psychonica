import { ValidationError } from 'class-validator';

export type ValidationResponse = {
    seoId: string,
    reason: string | ValidationError[]
}
