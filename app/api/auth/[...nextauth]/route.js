import NextAuth from "next-auth/next";
import prisma from "@/app/libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import {PrismaAdapter} from "@auth/prisma-adapter";


export const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                const {username, password, ...rest} = credentials;
                const user = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                });

                // Validation Logic for login
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!user || !isPasswordValid) {
                    throw new Error("Invalid email or password.")
                }
                if (isPasswordValid) {
                    const {password, ...userInfo} = user;
                    userInfo.email = userInfo.username;
                    return userInfo;
                }
                throw new Error("Invalid email or password.")
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
        encryption: true,
    },
    callbacks: {
        async jwt({token, user}) {
            return token;
        },
        async session({session, token, user}) {
            const dbUser = await prisma.user.findUnique({
                where: {
                    id: token.sub
                }
            })
            if (dbUser) {
                const {password, ...userInfo} = dbUser;
                session.user = userInfo;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signIn",
    },
});

export {handler as GET, handler as POST};
