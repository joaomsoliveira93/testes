import ECommerce from "@/components/pagesComponents/Dashboard/E-commerce";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard ",
  description: "This is Home Blog page",
  // other metadata
};

export default async function Home() {
  return (

       <ECommerce />

  );
}
