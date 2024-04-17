// TODO: Creating petition handlers
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";





interface IReqBody {
  email: string,
  password: string
}

const secretKey = 'Aixakuki01'


const createJWT = (payload: IReqBody) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
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
      name: 'myOwnToken',
      value: serializedCookie,
    });

    return response

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: (error as Error).message });
  }

}




// API route handler para verificar un JWT
/*
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Obtiene el token del encabezado de autorización
    const token = req.headers.authorization?.replace('Bearer ', '');
    // Verifica el token if it exists
    const decodedToken = token ? verifyJWT(token) : undefined;
    // Si la verificación es exitosa, devuelve el contenido decodificado del token
    res.status(200).json({ user: decodedToken });
  } catch (error) {
    // Si ocurre un error, devuelve un mensaje de error
    res.status(401).json({ error: (error as Error).message });
  }
}
*/