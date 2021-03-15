import { slugify } from 'transliteration';

export const ToTranslit = (data: string) => slugify(data);
