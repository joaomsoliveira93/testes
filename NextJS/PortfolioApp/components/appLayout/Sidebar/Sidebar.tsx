"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";
import Profile from "@mui/icons-material/AccountBox";
import BarChart2 from "@mui/icons-material/BarChart";
import Component from "@mui/icons-material/CallToAction";
import AlertCircle from "@mui/icons-material/NotificationImportant";
import MousePointerClick from "@mui/icons-material/Gamepad";
import MenuIcon from "@mui/icons-material/Menu";
import { useSidebar } from "./use-sidebar";
import LinkItem from "./LinkItem";
import ExpandMenu from "./ExpandMenu";
import { useSession } from "next-auth/react";

interface SidebarProps { }

const Sidebar = ({ }: SidebarProps) => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar((state) => state);
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <aside
          className={`absolute left-0 top-0 z-0 flex h-screen w-0 flex-col overflow-y-hidden bg-black duration-100 ease-linear  dark:bg-boxdark lg:static lg:translate-x-0 ${isSidebarOpen && "w-70 z-9999"}`}>
          <div className="relative flex w-full items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
            <Link className="flex items-center" href="/">

              <Image
                className="h-6 w-6 rounded-md"
                width={400}
                height={400}
                src={"/images/logo.png"}
                alt="Logo"
              />

              <h1 className=" ml-2 text-xl font-semibold text-white">
                Name
              </h1>

            </Link>

            <MenuIcon onClick={toggleSidebar} className="h-10 w-10 cursor-pointer text-white duration-300 hover:dark:text-white hover:text-black ease-in-out rounded-md  hover:dark:bg-primary hover:bg-secondary" />
          </div>

          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav className="px-4 py-4  lg:px-6">
              <div>
                <ul
                  className={`mb-6 flex flex-col  gap-1.5 ${!isSidebarOpen &&"items-center justify-center"}`}
                >
                  <li>
                      <LinkItem
                        icon={<HomeIcon />}
                        title="Portefólio"
                        href="/"
                        active={pathname === "/"}
                      />
                  </li>

                  <li>
                    <LinkItem
                      title="Profile"
                      href="/profile"
                      icon={<Profile />}
                      active={pathname.includes("/profile")}
                    ></LinkItem>
                  </li>

                  <li>
                    <ExpandMenu icon={<Component />} name="UI">
                      <LinkItem
                        title="Alerts"
                        href="/ui/alerts"
                        icon={<AlertCircle />}
                        active={pathname.includes("/ui/alerts")}
                      ></LinkItem>
                      <LinkItem
                        title="Buttons"
                        href="/ui/buttons"
                        icon={<MousePointerClick />}
                        active={pathname.includes("/ui/buttons")}
                      />
                    </ExpandMenu>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>
      )}
    </>

  );
};

export default Sidebar;
