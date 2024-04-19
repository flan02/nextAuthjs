import User from "@/models/user";
import { connectDB } from "@/mongodb/mongodb";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await req.json();
  //console.log(user);
  try {
    connectDB();
    //console.log(user.email);
    const userFound = await User.find({ email: user.email });
    //console.log(userFound);
    if (userFound.length !== 0) {
      return NextResponse.json({ status: 400, message: 'User already exists...' })
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await User.create(user);
    const { password, ...data } = newUser.toObject();
    //console.log(data);
    return NextResponse.json({ status: 200, message: 'User added...', data })
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: 500, message: error.message })
  }
}

export async function GET(req: NextRequest) {
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