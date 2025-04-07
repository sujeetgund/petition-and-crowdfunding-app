import { auth } from "@/auth";
import { CreateFundraisingForm } from "./CreateFundraisingForm";
import { redirect } from "next/navigation";

export default async function CreateFundraisingPage() {
  const session = await auth();
  if (!session?.user?.email) return redirect("/sign-in");

  const user_email = session.user.email;

  return (
    <div className="container max-w-3xl mx-auto py-10">
      <CreateFundraisingForm email={user_email} />
    </div>
  );
}
