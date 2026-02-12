import { NextResponse } from "next/server";

export async function POST() {
  // Create a response
  const response = NextResponse.json({
    message: "Logged out successfully",
    success: true,
  });

  // 💣 FORCE DELETE THE COOKIE
  // We set the cookie to an empty string and expire it immediately.
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Set date to 1970 (expired)
    path: "/", // Ensure it clears for the whole app
  });

  return response;
}