import { checkSchema } from 'express-validator';

const bookSchema = checkSchema({
    id: {
      in: ['query']
    }
  });
