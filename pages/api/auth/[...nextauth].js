import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import dbConnect from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user._id = token._id;
        session.user.address = token.address;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token._id = user._id;
        token.address = user.address;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        dbConnect().catch((error) => {
          return error;
        });
        const result = await User.findOne({ email: credentials.email });
        if (!result) {
          return result.status(401).send();
        }
        // Check password
        const checkPassword = await bcrypt.compareSync(
          credentials.password,
          result.password
        );
        if (!checkPassword || result.email !== credentials.email) {
          result.status(401).send();
        }
        if (result) {
          return {
            _id: result._id,
            name: result.fullname,
            email: result.email,
            address: result.address,
          };
        }
      },
    }),
  ],
  secret: 'B9/vlarLOmrKMxcjK66ZhMmqqvoOxkhP2je7uk0HPZE=',
});
