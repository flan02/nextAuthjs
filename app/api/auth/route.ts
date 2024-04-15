// TODO: Creating petition handlers

import { NextResponse } from "next/server";

//import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request, res: Response) {
  const frontEndData = await req.json()
  console.log(frontEndData);
  return NextResponse.json({ message: 'Hello from the server' })
}