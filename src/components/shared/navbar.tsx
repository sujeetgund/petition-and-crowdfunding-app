import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/shared/mode-toggle";
import Navlinks from "./navlinks";
import { auth, signOut } from "@/auth";

export async function Navbar() {
  let links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
  ];
  const session = await auth();
  if (!session) {
    links = [];
  }
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              PetitionFund
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Navlinks links={links} />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Input type="search" placeholder="Search..." className="mr-2" />
              <ModeToggle />
              {session?.user ? (
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button className="ml-2" type="submit">
                    Sign Out
                  </Button>
                </form>
              ) : (
                <Button asChild className="ml-2">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
