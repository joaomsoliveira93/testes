
import Breadcrumb from "@/components/appLayout/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/pagesComponents/Tables/TableThree";
import TableTwo from "@/components/pagesComponents/Tables/TableTwo";
import TableSort from "@/components/pagesComponents/Tables/TableSort";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page ",
  description: "This is Tables page",
  // other metadata
};

const TablesPage =  async () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        <TableThree />
        <TableSort />
      </div>
    </>
  );
};

export default TablesPage;
