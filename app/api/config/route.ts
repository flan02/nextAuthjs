import User from "@/models/user";
import { connectDB } from "@/mongodb/mongodb";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    await connectDB();
    const usersFound = await User.find();
    //console.log(usersFound);
    return NextResponse.json(usersFound);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message
      })
    }
    return NextResponse.json({ status: 500, message: 'Internal Server Error' })
  }
}