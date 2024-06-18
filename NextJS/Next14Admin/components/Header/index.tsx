import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
//import SearchIcon from '@mui/icons-material/Search';
import { useSidebar } from "@/components/Sidebar/use-sidebar";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { toggleSidebar, isSidebarOpen } = useSidebar((state) => state);
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          {!isSidebarOpen && (<>
            <Link className="block flex-shrink-0" href="/">
            <Image
            className="h-6 w-6 rounded-md"
            width={400}
            height={400}
            src={"/images/logo/logo-icon.png"}
            alt="Logo"
          />
            </Link>
            <button
              onClick={toggleSidebar}
              aria-hidden={!isSidebarOpen}
              aria-controls="sidebar"
            >
              <MenuIcon className="duration-300  ease-in-out rounded-md hover:dark:bg-primary hover:bg-secondary dark:text-white text-black" />
            </button>


          </>)}
        </div>
        {/**
        <div className="xl:hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>
         */}

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownMessage />
          </ul>

          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
