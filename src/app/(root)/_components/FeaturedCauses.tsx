import { PetitionCard } from "@/components/shared/petition-card";
import { FundraisingCard } from "@/components/shared/fundraising-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getPetitions } from "@/lib/actions/petition.actions";
import { getFundraisings } from "@/lib/actions/fundraising.actions";

export default async function FeaturedCauses() {
  // const featuredPetitions = await getPetitions({ limit: 6 });
  // const trendingFundraisers = await getFundraisings({ limit: 6 });

  const [featuredPetitions, trendingFundraisers] = await Promise.all([
    getPetitions({ limit: 6 }),
    getFundraisings({ limit: 6 }),
  ]);

  return (
    <section className="my-16">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Featured Causes
      </h2>
      <Tabs defaultValue="petitions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="petitions">Petitions</TabsTrigger>
          <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
        </TabsList>
        <TabsContent value="petitions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPetitions !== undefined ? (
              featuredPetitions.length > 0 ? (
                featuredPetitions.map((petition) => (
                  <PetitionCard
                    key={String(petition._id)}
                    _id={String(petition._id)}
                    title={petition.title}
                    description={petition.description}
                    current={petition.current}
                    goal={petition.goal}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center">
                  <p className="text-gray-500">
                    No petitions available at the moment.
                  </p>
                </div>
              )
            ) : (
              <div className="col-span-3 text-center">
                <p className="text-red-500">
                  Failed to fetch petitions. Please try again later.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="fundraisers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingFundraisers !== undefined ? (
              trendingFundraisers.length > 0 ? (
                trendingFundraisers.map((campaign) => (
                  <FundraisingCard
                    key={String(campaign._id)}
                    _id={String(campaign._id)}
                    title={campaign.title}
                    description={campaign.description}
                    amountRaised={campaign.current}
                    goalAmount={campaign.goal}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center">
                  <p className="text-gray-500">
                    No fundraising campaigns available at the moment.
                  </p>
                </div>
              )
            ) : (
              <div className="col-span-3 text-center">
                <p className="text-red-500">
                  Failed to fetch fundraising campaigns. Please try again later.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
