import { cache } from 'react';
import { authOptions } from './auth';


export const getUserSessionServer = cache(async () => {
  const session = await authOptions();
  return session;
});
