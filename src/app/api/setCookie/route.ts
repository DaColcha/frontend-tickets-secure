import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { token, rol } = await request.json();

        (await cookies()).set('auth_token', token, {
            httpOnly: true,
            secure: false,
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        (await cookies()).set('user_role', rol, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error al configurar la cookie:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}