import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// This would typically come from an API call
const petition = {
  id: "1",
  title: "Save the Local Park",
  description:
    "Our beloved community park is at risk of being sold to developers. This green space has been a cornerstone of our neighborhood for generations, providing a place for children to play, families to gather, and nature to thrive in our urban environment. We&apos;re calling on the city council to protect this vital community asset and maintain it as a public park for years to come.",
  image: "/save-the-local-parks.jpeg",
  creatorName: "Jane Doe",
  creatorAvatar: "/placeholder.svg",
  signatureCount: 5000,
  signatureGoal: 10000,
  comments: [
    {
      id: "1",
      author: "John Smith",
      content: "This park means so much to our community. We must save it!",
    },
    {
      id: "2",
      author: "Emily Brown",
      content:
        "I&apos;ve been bringing my kids here for years. It would be a tragedy to lose this space.",
    },
  ],
};

export default async function PetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);
  const progress = (petition.signatureCount / petition.signatureGoal) * 100;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <AvatarFallback>{petition.creatorName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                Petition by {petition.creatorName}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
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
          <Button>Post Comment</Button>
        </div>
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Sign this petition</CardTitle>
              <CardDescription>
                {petition.signatureCount.toLocaleString()} have signed. Help us
                get to {petition.signatureGoal.toLocaleString()}!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              <Button className="w-full mb-4">Sign Now</Button>
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
