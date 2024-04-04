import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


function NavBar() {

  return (
    <div className='bg-gradient-to-br from-orange-500 to-orange-900 w-full pt-5 pb-5 grid grid-cols-2 border-green-900 border-b-2'>
      <div>
        <Button className='bg-invisible hover:text-red-900 hover:bg-invisible ml-6 mr-6 text-2xl'>Munch Memo</Button>
        <Button className='bg-invisible hover:text-red-900 hover:bg-invisible ml-6 mr-6 text-xl'>Meal Tracker</Button>
        <Button className='bg-invisible hover:text-red-900 hover:bg-invisible ml-6 mr-6 text-xl'>Meal Maker</Button>
      </div>
      <div className='flex justify-end mr-8' >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              {/* If Logged In, only show Log Out */}
              <Button className='bg-invisible hover:text-red-900 hover:bg-invisible ml-6 mr-6 text-xl'>Log Out</Button>
            </NavigationMenuItem>
              {/* If Logged Out, show both login/signup under menu */}
            <NavigationMenuItem className='flex justify-end mr-4'>
              <NavigationMenuTrigger className='bg-invisible hover:text-red-900 hover:bg-invisible text-white text-xl'>Login/Signup</NavigationMenuTrigger>
              <NavigationMenuContent className='flex justify-end bg-orange-900'>
                <Button className='bg-orange-900 hover:bg-orange-500 hover:text-red-900 mr-2 text-xl'>Log In</Button>
                <Button className='bg-orange-900 hover:bg-orange-500 hover:text-red-900 text-xl'>Sign Up</Button>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

export default NavBar
