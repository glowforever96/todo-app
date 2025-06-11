import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/store/auth-context";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Header() {
  const { isAuth, logout } = useAuth();

  return (
    <header className="w-full p-4 shadow flex justify-between items-center">
      <div className="flex gap-4 items-center text-lg">
        <div>MyApp</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/todos">TODO 조회</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isAuth && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Button onClick={logout}>로그아웃</Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </header>
  );
}
