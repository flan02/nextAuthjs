// TODO: Creating petition handlers
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";





interface IReqBody {
  email: string,
  password: string
}

const secretKey = 'MISECRET'


const createJWT = (payload: IReqBody) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '10 minutes' })
  return token
}

const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (error) {
    // ? If there are errors while verifying the token, we can throw an error.
    throw new Error('Invalid token')
  }
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  //const body = await req.json();
  //console.log('Body:', body);
  try {
    // ? Create a JWT using the req.body as payload
    const payload = await req.json()
    if (payload.email == 'chanivetdan@hotmail.com' && payload.password == 'Aixakuki01') {
      const token = createJWT(payload)
      // ? Create a cookie with the JWT
      const verify = verifyJWT(token)
      console.log('Token Verified', verify);
      const serializedCookie = serialize('myOwnToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      })
      //res.setHeader('Set-Cookie', serializedCookie)
      const response = NextResponse.json({
        token,
      });

      response.cookies.set({
        name: 'tokenSerialized',
        value: serializedCookie,
      });

      return response
    } else {
      return NextResponse.json({ status: 401, error: 'Invalid credentials' });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }

}




