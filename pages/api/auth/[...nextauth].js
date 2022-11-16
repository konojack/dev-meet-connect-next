import GitHubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'models/client';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma)
};

export default NextAuth(authOptions);
