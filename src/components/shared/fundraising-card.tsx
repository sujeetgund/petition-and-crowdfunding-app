import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FundraisingCardProps {
  _id: string;
  title: string;
  description: string;
  amountRaised: number;
  goalAmount: number;
}

export function FundraisingCard({
  _id,
  title,
  description,
  amountRaised,
  goalAmount,
}: FundraisingCardProps) {
  const progress = (amountRaised / goalAmount) * 100;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        <Progress value={progress} className="w-full" />
        <p className="text-sm mt-2">
          ₹{amountRaised.toLocaleString()} of ₹{goalAmount.toLocaleString()}{" "}
          raised
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/fundraising/${_id}`}>Donate Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
