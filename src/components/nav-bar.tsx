import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Show, UserButton } from "@clerk/nextjs";

export function NavBar() {
  return (
    <nav className="w-full border-b bg-white/80 backdrop-blue supports-backdrop-filter:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 justify-between">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight text-gray-900"
          >
            Wiki
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-2">
            <Show when="signed-out">
              <NavigationMenuItem>
                <Button asChild variant="outline">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </NavigationMenuItem>
            </Show>
            <NavigationMenuItem>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
