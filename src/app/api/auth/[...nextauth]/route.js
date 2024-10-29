// import clientPromise from "@/libs/mongoConnect";
import {UserInfo} from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '@/models/User';
import NextAuth, {getServerSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import jwt from "jsonwebtoken"; // Import JWT for manual token handling if needed

export const authOptions = {
  secret: process.env.SECRET,
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        console.log("credentials: " + credentials);
        console.log("email: " + email);
        console.log("user:" + user);
        console.log("password: " + password);
        console.log("password2: " + user.password);
        console.log("password ok" + passwordOk);
        if (passwordOk) {
          //return user;
          return user;
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // If the user just signed in, add the user ID and JWT to the token
      if (account?.provider === "google") {
        token.id = user.id; // assuming user has `id` field
        token.jwt = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the JWT to the client session
      session.user.id = token.id;
      session.jwt = token.jwt;
      return session;
    },
  },
  pages: {
    signIn: "/login", // or any path you define for the login page
  },
};

/*
export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}
*/

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }