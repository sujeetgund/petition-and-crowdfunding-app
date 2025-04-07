import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FeaturedCauses from "./_components/FeaturedCauses";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 grow">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Make a Difference Today</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community of changemakers. Sign petitions, start fundraisers,
          and create positive impact in your community and beyond.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/petition/create">Start a Petition</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/fundraising/create">Create Fundraiser</Link>
          </Button>
        </div>
      </section>

      {/* featured causes */}
      <Suspense>
        <FeaturedCauses />
      </Suspense>

      <section className="my-16">
        <Card>
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>
              See the impact our community has made
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add success story cards here */}
              <Card>
                <CardHeader>
                  <CardTitle>Local Park Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Thanks to 10,000 signatures, our local government agreed to
                    preserve the community park.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>New School Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our fundraiser collected $50,000 to build a new library for
                    underprivileged students.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Clean Energy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    15,000 signatures helped pass a new clean energy policy in
                    our city council.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="text-center my-16">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of others who are creating change every day.
        </p>
        <Button size="lg" asChild>
          <Link href="/sign-in">Sign Up Now</Link>
        </Button>
      </section>
    </main>
  );
}
