import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // 1 hari
    },
    secret: environment.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<UserExtended | null> {
                if (!credentials) return null;

                const { email, password } = credentials;
                const result = await authServices.login({ email, password });

                if (!result || result.status !== 200 || !result.data?.content?.token) {
                    return null;
                }

                const { token: accessToken, user } = result.data.content;

                if (!user || !accessToken) {
                    return null;
                }

                const userWithToken = { ...user, accessToken };
                return userWithToken;
            }

        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }: { session: SessionExtended; token: JWTExtended }) {
            session.user = token.user;
            session.accessToken = token.user?.accessToken;
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
});
