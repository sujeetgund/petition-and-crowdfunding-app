import Link from "next/link"
import { PetitionCard } from "@/components/shared/petition-card"
import { FundraisingCard } from "@/components/shared/fundraising-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

  const featuredPetitions = [
    {
      id: "1",
      title: "Save the Local Park",
      description:
        "Help us protect our community green space from development.",
      signatureCount: 5000,
      signatureGoal: 10000,
    },
    {
      id: "2",
      title: "Clean Energy Initiative",
      description: "Push for 100% renewable energy in our city by 2030.",
      signatureCount: 7500,
      signatureGoal: 15000,
    },
  ];

  const trendingFundraisers = [
    {
      id: "1",
      title: "Community Center Renovation",
      description:
        "Help us upgrade our local community center for everyone to enjoy.",
      amountRaised: 50000,
      goalAmount: 100000,
    },
    {
      id: "2",
      title: "School Music Program",
      description:
        "Support music education in our schools by funding new instruments.",
      amountRaised: 25000,
      goalAmount: 50000,
    },
  ];

  export default function Home() {
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Make a Difference Today</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of changemakers. Sign petitions, start fundraisers, and create positive impact in your
            community and beyond.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/start-petition">Start a Petition</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/create-fundraiser">Create Fundraiser</Link>
            </Button>
          </div>
        </section>
  
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Featured Causes</h2>
          <Tabs defaultValue="petitions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="petitions">Petitions</TabsTrigger>
              <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
            </TabsList>
            <TabsContent value="petitions">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPetitions.map((petition) => (
                  <PetitionCard key={petition.id} {...petition} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="fundraisers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingFundraisers.map((fundraiser) => (
                  <FundraisingCard key={fundraiser.id} {...fundraiser} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
  
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
              <CardDescription>See the impact our community has made</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Add success story cards here */}
                <Card>
                  <CardHeader>
                    <CardTitle>Local Park Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Thanks to 10,000 signatures, our local government agreed to preserve the community park.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>New School Library</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Our fundraiser collected $50,000 to build a new library for underprivileged students.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Clean Energy Policy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>15,000 signatures helped pass a new clean energy policy in our city council.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>
  
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">Join thousands of others who are creating change every day.</p>
          <Button size="lg" asChild>
            <Link href="/signup">Sign Up Now</Link>
          </Button>
        </section>
      </main>
    )
  }