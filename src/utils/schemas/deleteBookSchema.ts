import { checkSchema } from 'express-validator';

export const deleteBookSchema = checkSchema({
    id: {
      in: ['params'],
      isInt: {
        errorMessage: "Parameter 'id' must be integer"
      }
    }
  });
