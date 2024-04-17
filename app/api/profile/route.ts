import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest, res: NextApiResponse) {
  // ? I can look for the token in the cookies
  let user
  const rawCookie = req.cookies.get('tokenSerialized')?.value
  console.log(rawCookie);
  if (rawCookie) {
    const start = '='
    const end = ';'
    const startIndex = rawCookie.indexOf(start) + 1
    const endIndex = rawCookie.indexOf(end, startIndex)
    // if (startIndex !== -1 || endIndex !== -1) {
    const token = rawCookie.substring(startIndex, endIndex)
    try {
      user = verify(token, 'MISECRET')
      //console.log(user);
      return NextResponse.json([user])
    } catch (error) {
      return NextResponse.json({ status: 401, error: 'Bad validation.' })
    }
    //  }
  } else {
    return NextResponse.json({ status: 401, error: 'No token sent.' })
  }

}

