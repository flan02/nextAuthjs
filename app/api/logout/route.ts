import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {

  const rawCookie = req.cookies.get('tokenSerialized')?.value
  //console.log(rawCookie);
  if (rawCookie) {
    const start = '='
    const end = ';'
    const startIndex = rawCookie.indexOf(start) + 1
    const endIndex = rawCookie.indexOf(end, startIndex)
    // if (startIndex !== -1 || endIndex !== -1) {
    const token = rawCookie.substring(startIndex, endIndex)
    try {
      verify(token, 'MISECRET')
      const serializedCookie = serialize('myOwnToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      })
      const response = NextResponse.json({
        token,
      });

      response.cookies.set({
        name: 'tokenSerialized',
        value: serializedCookie,
      });

      return response
    } catch (error) {
      return NextResponse.json({ status: 401, error: 'Bad validation.' })
    }
  } else {
    return NextResponse.json({ status: 401, error: 'No token sent.' })
  }
}