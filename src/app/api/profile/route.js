import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json()
  const session = await getServerSession(authOptions);
  console.log("profile api route")
  console.log(session)
  const email = session.user.email;

  const update = {}
  if ('name' in data) {
    update.name = data.name;
  }
  if ('image' in data) {
    update.image = data.image;
  }

  if (Object.keys(update).length > 0) {
    // update user name
    await User.updateOne({ email }, update)
    console.log("updating email: " + email)
    console.log("updating name: " + data.name)
  }
  return Response.json(true);
}