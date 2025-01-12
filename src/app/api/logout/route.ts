import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST() {
    try {

        cookies().set('auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 0,
        });

        cookies().set('user_role', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 0, 
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error en logout:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}