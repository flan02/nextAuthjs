// TODO: Creating petition handlers
import { NextApiRequest, NextApiResponse, NextConfig } from "next";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";
import { NextResponse } from "next/server";
//import { NextApiRequest, NextApiResponse } from "next";


type typeReqBody = {
  email: string,
  password: string
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  //console.log('The request from clientside is', req);

  try {
    if (req.method === 'POST') {
      // Leer el cuerpo de la solicitud como JSON
      const response = await req.body
      console.log('The request from clientside is', response);
      // * 1- check if email and password are valid
      // ........
      if (response.email === 'chanivetdan@hotmail.com' && response.password === 'Aixakuki01') {
        // * 2- check if the user exists in the database, create a token
        const token = jwt.sign({
          email: response.email,
          name: 'Dan Chanivet',
          exp: Math.floor(Date.now() / 1000) + 30 // * 30 seconds
        }, 'secret', { expiresIn: '60' }, (err, token) => {
          if (err) {
            return NextResponse.json({ message: 'Error creating token' })
          }
          if (token) {
            const serializedCookie = serialize('myToken', token, {
              httpOnly: true, // * In production Cookie cannot be accessed by JavaScript nor console browser F12.
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict', // * Cookie cannot be sent from another domain | sameSite: 'none' is the less strict allowing us to communicate with other domains.
              maxAge: 45, // * Cookie could have its own expiration time different from the token.
              path: '/' // * Cookie is available in all the routes.
            })
            res.setHeader('Set-Cookie', serializedCookie)
            return NextResponse.json({ message: 'User logged in' })
          }
        })
      }
    } else {
      return NextResponse.json({ status: 500, message: 'Invalid Method' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Error en el servidor' });
  }
  return 0
}


//const data: typeReqBody = await req.body;
/*
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const response = await req.body
  console.log(response);
  // * 1- check if email and password are valid
  // ........
  if (response.email === 'chanivetdan@hotmail.com' && response.password === 'Aixakuki01') {
    // * 2- check if the user exists in the database, create a token
    const token = jwt.sign({
      email: response.email,
      name: 'Dan Chanivet',
      exp: Math.floor(Date.now() / 1000) + 30 // * 30 seconds
    }, 'secret', { expiresIn: '60' }, (err, token) => {
      if (err) {
        return res.json({ message: 'Error creating token' })
      }
      if (token) {
        const serializedCookie = serialize('myToken', token, {
          httpOnly: true, // * In production Cookie cannot be accessed by JavaScript nor console browser F12.
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict', // * Cookie cannot be sent from another domain | sameSite: 'none' is the less strict allowing us to communicate with other domains.
          maxAge: 45, // * Cookie could have its own expiration time different from the token.
          path: '/' // * Cookie is available in all the routes.
        })
        res.setHeader('Set-Cookie', serializedCookie)
        return res.json({ message: 'User logged in' })
      }
    })

    // return res.json({ token }) // ! We must not return the token to the client instead send it in a header.

  }
  return res.status(401).json({ message: 'Invalid credentials' })
  //return res.json({ message: 'Hello from auth route server' })
}
*/