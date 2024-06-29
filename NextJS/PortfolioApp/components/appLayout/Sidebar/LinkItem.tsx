import React from "react";
import Link from "next/link";
//import { useSidebar } from "./use-sidebar";
import { useSidebar } from "@/context/SidebarContext";

type Props = {
  icon?: React.ReactNode;
  title: string;
  href: string;
  active:boolean;
};

const LinkItem = (props: Props) => {
  const { title } = props;
  const { sidebarOpen } = useSidebar();
  return (
    <Link
      className={`group relative flex items-center gap-2.5 duration-300 ease-in-out p-2 rounded-md hover:dark:bg-primary hover:bg-secondary px-3 py-2 font-medium text-gray-3  dark:hover:text-white ${props.active && 'bg-primary'} `}
      href={props.href}
    >
      <div className="">{props.icon}</div>
      <p>{sidebarOpen && title}</p>
    </Link>
  );
};

export default LinkItem;
