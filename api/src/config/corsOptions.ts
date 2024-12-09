import { allowedOrigins } from './allowedOrigin';

export const corsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // this condition checks if the origin is in the allowedOrigins array by using the indexOf method and the !== operator to compare the result to -1 or if the origin is falsy (null, undefined, or an empty string) and if either condition is true, the callback function is called with null and true as arguments to allow the request to proceed with the specified origin or with an error and false to block the request
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
