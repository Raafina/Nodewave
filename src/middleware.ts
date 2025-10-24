import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: environment.AUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    if (pathname === "/auth/login" || pathname === "/auth/register") {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}

export const config = {
    matcher: ["/auth/:path*"],
};
