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

interface PetitionCardProps {
  id: string;
  title: string;
  description: string;
  signatureCount: number;
  signatureGoal: number;
}

export function PetitionCard({
  id,
  title,
  description,
  signatureCount,
  signatureGoal,
}: PetitionCardProps) {
  const progress = (signatureCount / signatureGoal) * 100;

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
          {signatureCount} of {signatureGoal} signatures
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/petition/${id}`}>Sign Petition</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
