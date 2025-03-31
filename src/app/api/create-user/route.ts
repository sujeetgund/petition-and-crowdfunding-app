import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";

export async function GET(request: Request) {
  const session = await auth();
  // console.log(session);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }
  await connectToDatabase();
  const { name, email, image } = session.user;

  const newUser = await User.findOne({ email });
  // console.log(newUser);
  if (!newUser) {
    await User.create({ name, email, image });
  }

  return Response.redirect(new URL("/dashboard", request.url));
}
