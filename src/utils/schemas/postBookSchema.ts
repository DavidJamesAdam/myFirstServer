import { checkSchema } from 'express-validator';

export const bookSchema = checkSchema({
    title: {
      in: ['body'],
      exists: {
        bail: true,
        errorMessage: "Body must include 'title' field"
      },
      isString: {
        errorMessage: 'Title should be a string',
      },
      notEmpty: {
        errorMessage: 'Title should not be empty',
      },
    },
    author: {
      in: ['body'],
      exists: {
        bail: true,
        errorMessage: "Body must include 'author' field"
      },
      isString: {
        errorMessage: 'Author should be a string',
      },
      notEmpty: {
        errorMessage: 'Author should not be empty',
      },
    },
  });
