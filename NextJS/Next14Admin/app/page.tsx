import Portfolio from "@/components/pagesComponents/mainPage/Portfolio";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Meu Portfólio ",
  description: "This is Home Blog page",
  // other metadata
};

export default async function Home() {
  return (

       <Portfolio />

  );
}
