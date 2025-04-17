"use client";

import { Button } from "@/components/ui/button";
import { signPetition } from "@/lib/actions/petition.actions";
import { useActionState } from "react";

export default function SignNowButton({
  user_email,
  event_id,
}: {
  user_email: string;
  event_id: string;
}) {
  const [state, action, pending] = useActionState(signPetition, undefined);
  return (
    <form action={action}>
      <input type="hidden" value={user_email} name="user_email" />
      <input type="hidden" value={event_id} name="event_id" />
      <Button className="w-full mb-4" disabled={pending}>
        {state !== undefined && state.already_signed ? (
          <span>Already signed</span>): (
          <span>Sign Now</span>
          )}
        
      </Button>
    </form>
  );
}
