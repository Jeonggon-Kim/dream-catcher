import connectDB from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

console.log('hi')

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID,
      clientSecret: process.env.GITHUB_CLIENTSECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(connectDB()),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };