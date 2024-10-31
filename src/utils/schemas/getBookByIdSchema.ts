import { checkSchema } from 'express-validator';

const bookSchema = checkSchema({
    title: {
      in: ['query'],
      isString: true,
      errorMessage: 'Title should be a string',
      notEmpty: true,
    },
    author: {
      in: ['query'],
      isString: true,
      errorMessage: 'Author should be a string',
      notEmpty: true,
    },
  });
