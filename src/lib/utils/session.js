import { cache } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';


export const getUserSessionServer = cache(async () => {
  const session = await getServerSession(authOptions);
  return session;
});
