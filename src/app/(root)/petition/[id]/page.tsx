import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata, ResolvingMetadata } from "next";
import { getPetition } from "@/lib/actions/petition.actions";
import { redirect } from "next/navigation";
import SignNowButton from "./SignPetitionButton";
import { auth } from "@/auth";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const petition = await getPetition(id);
  if (!petition)
    return {
      title: "Petition not found",
      description: "This petition does not exist.",
      openGraph: {
        title: "Petition not found",
        description: "This petition does not exist.",
      },
    };
  // const searchParamsObj = await searchParams;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // Simulate fetching petition details dynamically
  const petitionTitle = `${petition.title} - PetitionFund`;

  return {
    title: petitionTitle,
    description: petition.description,
    openGraph: {
      title: petitionTitle,
      description: petition.description,
      images: [
        {
          url: String(petition.image),
          alt: petitionTitle,
        },
      ],
    },
  };
}

export default async function PetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const petition = await getPetition(id);
  if (!petition) return redirect("/");

  const session = await auth();
  const user_email = session?.user?.email || undefined;

  if (!user_email) {
    redirect("/sign-in");
  }

  let isCreator = false;
  if (petition.creator_email === user_email) {
    isCreator = true;
  }

  const progress = (petition.current / petition.goal) * 100;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{petition.title}</h1>
          <Image
            src={petition.image || "/placeholder.svg"}
            alt={petition.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-lg mb-6">{petition.description}</p>
          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage
                src={petition.creatorAvatar}
                alt={petition.creatorName}
              />
              <AvatarFallback>
                {petition.creatorName?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                Petition by {petition.creatorName}
              </p>
            </div>
          </div>
          {/* <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {petition.comments.map((comment) => (
            <Card key={comment.id} className="mb-4">
              <CardHeader>
                <CardTitle>{comment.author}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{comment.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
          <Textarea placeholder="Add your comment..." className="mb-2" />
          <Button>Post Comment</Button> */}
        </div>
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Sign this petition</CardTitle>
              <CardDescription>
                {petition.current.toLocaleString()} have signed. Help us get to{" "}
                {petition.goal.toLocaleString()}!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              {!isCreator && <SignNowButton event_id={id} user_email={user_email} />}
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Share:</span>
                <span>Facebook</span>
                <span>Twitter</span>
                <span>Email</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
