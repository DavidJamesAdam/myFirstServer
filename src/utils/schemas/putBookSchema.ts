import { checkSchema } from 'express-validator';

export const putBookSchema = checkSchema({
    title: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'Title should be a string',
      },
      notEmpty: {
        errorMessage: 'Title should not be empty',
      },
    },
    author: {
      in: ['body'],
      optional: true,
      isString: {
        errorMessage: 'Author should be a string',
      },
      notEmpty: {
        errorMessage: 'Author should not be empty',
      },
    },
  });
