import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        id?: string;
        fullName?: string;
        role?: string;
        accessToken?: string;
    }

    interface Session extends DefaultSession {
        user?: User;
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user?: User;
    }
}
