"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createFundraising } from "./actions";

export function CreateFundraisingForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(createFundraising, undefined);
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Create a Fundraising Campaign
        </CardTitle>
        <CardDescription>
          Fill out the form below to create a new fundraising campaign. Provide
          a clear title, detailed description, and set a signature goal to get
          started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your fundraising campaign is in pending review. Once approved, it
              will be visible to the public.
            </AlertDescription>
          </Alert>
        )}

        <form id="petition-form" action={action}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter a clear, specific title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Explain your petition in detail"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creator_email">Your Email</Label>
              <Input
                id="creator_email"
                name="creator_email"
                required
                hidden
                readOnly
                value={email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Funding Goal</Label>
              <Input
                id="goal"
                name="goal"
                type="number"
                min="1"
                placeholder="1000"
                required
              />
            </div>
          </div>

          {state?.errors && (
            <Alert className="mt-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Error!</AlertTitle>
              <AlertDescription className="text-red-700">
                {state?.errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-500">
                    {error}
                  </p>
                ))}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t p-6">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" form="petition-form" disabled={pending}>
          {pending ? "Creating..." : "Create Campaign"}
        </Button>
      </CardFooter>
    </Card>
  );
}
