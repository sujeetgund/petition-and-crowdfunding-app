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
import { Input } from "@/components/ui/input";
import type { Metadata, ResolvingMetadata } from "next";
import { getFundraisingById } from "@/lib/actions/fundraising.actions";
import { redirect } from "next/navigation";

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
  const searchParamsObj = await searchParams;
  const campaign = await getFundraisingById(id);
  if (!campaign)
    return {
      title: "Campaign not found",
      description: "This campaign does not exist.",
      openGraph: {
        title: "Campaign not found",
        description: "This campaign does not exist.",
      },
    };
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const campaignTitle = `${campaign.title} - PetitionFund`;

  return {
    title: campaignTitle,
    description: campaign.description,
    openGraph: {
      title: campaignTitle,
      description: campaign.description,
      images: [
        {
          url: String(campaign.image),
          alt: campaignTitle,
        },
      ],
    },
  };
}

// This would typically come from an API call
// const campaign = {
//   id: "1",
//   title: "Community Center Renovation",
//   description:
//     "Our local community center has been a cornerstone of our neighborhood for decades, but it's in desperate need of renovation. We're raising funds to update the facilities, improve accessibility, and create new spaces for community programs. Your donation will help ensure that this vital resource continues to serve our community for generations to come.",
//   image: `${process.env.NEXT_PUBLIC_DOMAIN}/community-centre-renovation.jpeg`,
//   creatorName: "Community First Organization",
//   creatorAvatar: "/placeholder.svg",
//   amountRaised: 50000,
//   goalAmount: 100000,
//   supporters: [
//     { id: "1", name: "Alice Johnson", amount: 100 },
//     { id: "2", name: "Bob Williams", amount: 250 },
//   ],
//   updates: [
//     {
//       id: "1",
//       date: "2023-06-15",
//       content:
//         "We've reached 50% of our goal! Thank you to all our supporters.",
//     },
//     {
//       id: "2",
//       date: "2023-06-01",
//       content:
//         "Renovation plans have been finalized. We're excited to share them soon!",
//     },
//   ],
// };

export default async function FundraisingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  // console.log(id);
  const campaign = await getFundraisingById(id);
  if (!campaign) return redirect("/");
  const progress = (campaign.current / campaign.goal) * 100;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
          <Image
            src={campaign.image || "/placeholder.svg"}
            alt={campaign.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-lg mb-6">{campaign.description}</p>
          <div className="flex items-center mb-6">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage
                src={campaign.creatorAvatar}
                alt={campaign.creatorName}
              />
              <AvatarFallback>
                {campaign.creatorName?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                Organized by {campaign.creatorName}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Updates</h2>
          {/* {campaign.updates.map((update) => (
            <Card key={update.id} className="mb-4">
              <CardHeader>
                <CardTitle>
                  {new Date(update.date).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{update.content}</CardDescription>
              </CardContent>
            </Card>
          ))} */}
          No updates yet.
        </div>
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Support this campaign</CardTitle>
              <CardDescription>
                ₹{campaign.current.toLocaleString()} raised of ₹
                {campaign.goal.toLocaleString()} goal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="mb-4" />
              <Input
                type="number"
                placeholder="Enter amount"
                className="mb-2"
              />
              <Button className="w-full mb-4">Donate Now</Button>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Share:</span>
                <span>Facebook</span>
                <span>Twitter</span>
                <span>Email</span>
              </div>
            </CardContent>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Supporters</CardTitle>
            </CardHeader>
            <CardContent>
              {/* {campaign.supporters.map((supporter) => (
                <div
                  key={supporter.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span>{supporter.name}</span>
                  <span>${supporter.amount}</span>
                </div>
              ))} */}
              No recent supporters yet.
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
