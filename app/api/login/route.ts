import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Verify Credentials (Mock Database)
    if ((email === "admin@kiranahub.com" && password === "admin") || (email === "abhi@gmail.com" && password === "password")) {
      
      // 2. Prepare the Secret
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'default_secret_key'
      );

      // 3. Generate the JWT (The "ID Card")
      const token = await new SignJWT({ 
        role: 'admin', 
        email: email 
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Token expires in 24 hours
        .sign(secret);

      // 4. Set the HttpOnly Cookie
      // Ideally, await cookies() for Next.js 15+ compatibility
      const cookieStore = await cookies();
      
      cookieStore.set('token', token, {
        httpOnly: true, // 🔒 JavaScript cannot read this
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'strict', // Protects against CSRF
        maxAge: 60 * 60 * 24, // 1 day
        path: '/', // Accessible across the whole site
      });

      // 5. Return Success
      return NextResponse.json({ 
        success: true, 
        message: "Login successful",
        user: { name: "Rahul Sharma", role: "Super Admin" } 
      }, { status: 200 });

    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}