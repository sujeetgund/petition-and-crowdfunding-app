"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signFundraising } from "@/lib/actions/fundraising.actions";
import { useActionState } from "react";

export default function SignNowButton({
  user_email,
  event_id,
}: {
  user_email: string;
  event_id: string;
}) {
  const [, action, pending] = useActionState(signFundraising, undefined);
  return (
    <form action={action}>
      <input type="hidden" value={user_email} name="user_email" />
      <input type="hidden" value={event_id} name="event_id" />
      <Input
        type="number"
        placeholder="Enter amount"
        name="amount"
        className="mb-2"
      />
      <Button className="w-full mb-4" disabled={pending}>
        Donate Now
      </Button>
    </form>
  );
}
