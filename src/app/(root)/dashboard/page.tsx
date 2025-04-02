import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PetitionCard } from "@/components/shared/petition-card";
import { FundraisingCard } from "@/components/shared/fundraising-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// This would typically come from an API call

export default async function DashboardPage() {
  const session = await auth();
  // console.log(session)
  if (!session?.user) {
    redirect("/sign-in");
  }

  const userData = {
    name: session.user.name,
    avatar: session.user.image,
    createdPetitions: [
      {
        _id: "1",
        title: "Save the Local Park",
        description: "Protect our community green space.",
        current: 5000,
        goal: 10000,
      },
    ],
    createdFundraisers: [
      {
        id: "1",
        title: "Community Center Renovation",
        description: "Help us upgrade our local community center.",
        amountRaised: 50000,
        goalAmount: 100000,
      },
    ],
    signedPetitions: [
      {
        _id: "2",
        title: "Clean Energy Initiative",
        description: "Push for 100% renewable energy in our city.",
        current: 7500,
        goal: 15000,
      },
    ],
    donations: [
      {
        id: "2",
        title: "School Music Program",
        description: "Support music education in our schools.",
        amountRaised: 25000,
        goalAmount: 50000,
      },
    ],
  };
  return (
    <main className="container mx-auto px-4 py-8 grow">
      <div className="flex items-center mb-8">
        <Avatar className="h-20 w-20 mr-4">
          <AvatarImage src={userData.avatar || ""} alt={userData.name || ""} />
          <AvatarFallback>{userData.name?.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{session.user.name}</h1>
          {/* <Button variant="outline" className="mt-2">
            Edit Profile
          </Button> */}
          <p className="text-muted-foreground">{session.user.email}</p>
        </div>
      </div>

      <Tabs defaultValue="created" className="w-full">
        <TabsList>
          <TabsTrigger value="created">Created</TabsTrigger>
          <TabsTrigger value="supported">Supported</TabsTrigger>
        </TabsList>
        <TabsContent value="created">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Petitions</CardTitle>
                <CardDescription>Petitions you&apos;ve created</CardDescription>
              </CardHeader>
              <CardContent>
                {userData.createdPetitions.map((petition) => (
                  <PetitionCard key={petition._id} {...petition} />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Fundraisers</CardTitle>
                <CardDescription>
                  Fundraisers you&apos;ve created
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.createdFundraisers.map((fundraiser) => (
                  <FundraisingCard key={fundraiser.id} {...fundraiser} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="supported">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Signed Petitions</CardTitle>
                <CardDescription>Petitions you&apos;ve signed</CardDescription>
              </CardHeader>
              <CardContent>
                {userData.signedPetitions.map((petition) => (
                  <PetitionCard key={petition._id} {...petition} />
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Donations</CardTitle>
                <CardDescription>
                  Campaigns you&apos;ve donated to
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.donations.map((fundraiser) => (
                  <FundraisingCard key={fundraiser.id} {...fundraiser} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
