import User from "@/models/user";
import { connectDB } from "@/mongodb/mongodb";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOpts = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //console.log(credentials);
        connectDB();
        const userFound = await User.find({ email: credentials?.email }).select('+password');

        console.log('nextauth user: ', userFound);
        if (userFound.length === 0) throw new Error('User not found.')
        if (!credentials?.password) throw new Error('Incorrect credentials.')

        const isValidPassword = await bcrypt.compare(credentials?.password, userFound[0].password);
        if (!isValidPassword) throw new Error('Incorrect credentials.')
        return userFound[0];
      }
    }
    )],
  pages: {
    signIn: '/auth/login', // ? Default is '/api/auth/signin'
    signOut: '/auth/logout', // ? This function closes the session and redirects to the homepage
  }
}

const handler = NextAuth(authOpts)

export { handler as GET, handler as POST }
