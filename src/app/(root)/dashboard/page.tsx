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
import { getPetitionsByEmail } from "@/lib/actions/petition.actions";
import { IPetition } from "@/lib/database/models/petition.model";
import { getFundraisingByEmail } from "@/lib/actions/fundraising.actions";
import { IFundraising } from "@/lib/database/models/fundraising.model";

// This would typically come from an API call

export default async function DashboardPage() {
  const session = await auth();
  // console.log(session)
  if (!session?.user || !session?.user.email) {
    // Redirect to sign-in page if user is not authenticated
    redirect("/sign-in");
  }

  const createdPetitions: IPetition[] = await getPetitionsByEmail(
    session.user.email
  );
  const createdFundraisers: IFundraising[] = await getFundraisingByEmail(
    session.user.email
  );
  // console.log(createdPetitions)

  const userData = {
    name: session.user.name,
    avatar: session.user.image,
    createdPetitions: createdPetitions,
    createdFundraisers: createdFundraisers,
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
        _id: "2",
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
                <div className="flex-wrap space-y-3 gap-3 md:flex md:space-y-0 md:gap-3">
                  {userData.createdPetitions.map((petition) => (
                    <PetitionCard
                      key={String(petition._id)}
                      _id={String(petition._id)}
                      title={petition.title}
                      description={petition.description}
                      current={petition.current}
                      goal={petition.goal}
                    />
                  ))}
                </div>
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
                  <FundraisingCard
                    key={String(fundraiser._id)}
                    _id={String(fundraiser._id)}
                    title={fundraiser.title}
                    description={fundraiser.description}
                    amountRaised={fundraiser.current}
                    goalAmount={fundraiser.goal}
                  />
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
                  <FundraisingCard key={fundraiser._id} {...fundraiser} />
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
