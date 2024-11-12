import { checkSchema } from 'express-validator';

export const bookByIdSchema = checkSchema({
    id: {
      in: ['params'],
      isInt: {
        errorMessage: "Parameter 'id' must be integer"
      }
    }
  });
