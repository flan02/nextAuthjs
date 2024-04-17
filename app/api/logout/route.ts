import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { cookies } = req;
  console.log(cookies);
  return NextResponse.json({ message: 'Logout' });
}