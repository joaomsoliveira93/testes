import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataCard from "@/components/Cards/DataCard";
import ChatCard from "@/components/Chat/ChatCard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "DataCards Page | Next.js E-commerce Dashboard Template",
  description: "This is DataCards page for TailAdmin Next.js",
  // other metadata
};

const Cards = () => {
  return (
    <>
    <Breadcrumb pageName="Cards" />

    {/* <!-- Cards Items --> */}
    <div className="mb-10 rounded-md border border-stroke bg-white shadow-default shadow-white dark:border-strokedark dark:bg-boxdark dark:shadow-2xl">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Cards
        </h3>
      </div>

      <div className="p-4 md:p-6 xl:p-9">
        <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
          <DataCard name="teste" amount={10}/>
          <DataCard name="teste2" amount={15}/>
          <DataCard name="teste3" amount={25}/>
          <DataCard name="teste4" amount={20}/>
        </div>
        <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
          <ChatCard />
        </div>
      </div>
    </div>

  </>
  );
};

export default Cards;
