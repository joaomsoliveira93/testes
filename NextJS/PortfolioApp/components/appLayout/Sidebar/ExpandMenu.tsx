"use client";
import React from "react";
import { ChevronRight, HomeIcon } from "lucide-react";
import LinkItem from "./LinkItem";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
import s from "./style.module.css";
import { useSidebar } from "@/context/SidebarContext";
type Props = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  name?: string;
};

const ExpandMenu = (props: Props) => {
  const { children, icon, name } = props;
  const [open, setOpen] = React.useState(false);
  const { sidebarOpen } = useSidebar();
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="">
      <CollapsibleTrigger asChild className="group rounded-md px-3 py-2  duration-300 ease-in-out p-2  hover:dark:bg-primary hover:bg-secondary">
        {sidebarOpen ? (
          <div className="flex w-full items-center text-gray-2 cursor-pointer">
            {icon}
            <div
              className="flex w-full transform items-center justify-between duration-300 ease-in"
            >
              <p
                className="ml-2 text-lg text-gray-2 group-hover:text-white ">
                {name}
              </p>
              <ChevronRight
                className={`text-gary-2 ml-2 h-4 w-4  duration-300 ease-in-out group-hover:rotate-90 ${open && "rotate-90"}`}
              />
            </div>
          </div>
        ) : (
          <LinkItem title="Home" href="/" icon={icon} active={false}></LinkItem>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className={s.CollapsibleContent}>
        <div className="px-3">{sidebarOpen && children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ExpandMenu;
