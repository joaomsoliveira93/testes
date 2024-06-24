"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
import s from "../../appLayout/Sidebar/style.module.css";
type Props = {
  children?: React.ReactNode;
  name?: string;
};

const ExpandItem = (props: Props) => {
  const { children,name } = props;
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="">
      <CollapsibleTrigger asChild className={`group px-3 py-2  duration-300 ease-in-out p-2  hover:dark:bg-primary hover:bg-secondary ${open ? 'dark:bg-primary bg-secondary dark:text-black text-white rounded-t-md':'bg-primary dark:bg-secondary dark:text-black text-white rounded-md'}`}>
          <div className="flex w-full items-center text-gray-2 cursor-pointer">
            <div className="flex w-full transform items-center justify-between duration-300 ease-in">
              <p
                className={`ml-2 text-lg text-gray-2 group-hover:text-white ${open ? 'dark:bg-primary bg-secondary text-white':'bg-primary dark:bg-secondary dark:text-black text-white'}`}
              >
                {name}
              </p>
              <ChevronRight
                className={`text-gary-2 ml-2 h-4 w-4  duration-300 ease-in-out group-hover:rotate-90 ${open && 'rotate-90'}`}
              />
            </div>
          </div>

      </CollapsibleTrigger>
      <CollapsibleContent className={s.CollapsibleContent}>
        <div className="px-3 bg-slate-200 dark:bg-boxdark rounded-b-md">{open && children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ExpandItem;
