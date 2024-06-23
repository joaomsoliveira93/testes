"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Profile from '@mui/icons-material/AccountBox';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Settings from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const [img, setImg] = useLocalStorage("img", "");

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const getUserImg = async () => {
      if (session?.user) {

        const response = await fetch("http://localhost:3010/auth/userImg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get img");
        }

        const data = await response.json();
        const img = data.data
        if (img) {
          setImg(img.img);
        }
      }
    }
    getUserImg();
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 hover:dark:bg-primary hover:bg-secondary rounded-md p-1"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {session?.user?.name}
          </span>
          <span className="block text-xs">{session?.user?.email}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            className="rounded-full"
            width={60}
            height={60}
            src={`data:image/png;base64,${img}`}
            alt="User"
          />
        </span>
        <KeyboardArrowDownIcon/>

      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col border-b border-stroke px-3 py-3 dark:border-strokedark">
          <li>
            <Link
              onClick={() => setDropdownOpen(!dropdownOpen)}
              href="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out p-2 rounded-md hover:dark:bg-primary hover:bg-secondary  lg:text-base"
            >
              <Profile/>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setDropdownOpen(!dropdownOpen)}
              href="#"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out p-2 rounded-md hover:dark:bg-primary hover:bg-secondary lg:text-base"
            >
              <RecentActorsIcon/>
              My Contacts
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setDropdownOpen(!dropdownOpen)}
              href="/pages/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out p-2 rounded-md hover:dark:bg-primary hover:bg-secondary lg:text-base"
            >
              <Settings/>
              Account Settings
            </Link>
          </li>
        </ul>
        <div className="flex flex-col border-b border-stroke px-3 dark:border-strokedark">
        <button 
          className=" flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out p-2 rounded-md hover:dark:bg-primary hover:bg-secondary lg:text-base"
          onClick={() => {signOut(); window.localStorage.removeItem("img");}}
        >
          <LogoutIcon/>
          Log Out
        </button>
        </div>

      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
