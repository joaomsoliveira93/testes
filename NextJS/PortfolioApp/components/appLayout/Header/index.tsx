"use client";
import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import MenuIcon from '@mui/icons-material/Menu';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSidebar } from "@/context/SidebarContext"; // Updated import
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar(); // Use context
  const { data: session } = useSession();
  const [img, setImg] = useLocalStorage("img", "");

  useEffect(() => {
    const getUserImg = async () => {
      if (session?.user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/userImg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          },
          body: JSON.stringify({
            email: session.user.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get img");
        }

        const data = await response.json();
        const img = data.data;
        if (img) {
          setImg(img.img);
        }
      }
    };
    getUserImg();
  }, [session, setImg]);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 ">
          {!sidebarOpen && (
            <>
              <Link className="block flex-shrink-0" href="/">
                <Image
                  className="h-6 w-6 rounded-md"
                  width={400}
                  height={400}
                  src={"/images/logo.png"}
                  alt="Logo"
                />
              </Link>
              {session?.user && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-hidden={!sidebarOpen}
                  aria-controls="sidebar"
                >
                  <MenuIcon className="h-10 w-10 cursor-pointer dark:text-white duration-300 ease-in-out rounded-md hover:text-black hover:dark:bg-primary hover:bg-secondary" />
                </button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <LanguageSwitcher/>
            <DarkModeSwitcher />
            {session?.user && <DropdownNotification />}
            {session?.user && <DropdownMessage />}
          </ul>
          {session?.user && <DropdownUser />}
        </div>
      </div>
    </header>
  );
};

export default Header;
