import { checkSchema } from 'express-validator';

export const bookByIdSchema = checkSchema({
    id: {
      in: ['params'],
      exists: {
        errorMessage: "Parameter 'id' is missing"
      }
    }
  });
