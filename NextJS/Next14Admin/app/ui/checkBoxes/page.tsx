import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckBox from "@/components/Checkboxes/CheckboxOne";
import CheckBoxTwo from "@/components/Checkboxes/CheckboxTwo";
import CheckBoxThree from "@/components/Checkboxes/CheckboxThree";
import CheckBoxFour from "@/components/Checkboxes/CheckboxFour";
import CheckBoxFive from "@/components/Checkboxes/CheckboxFive";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CheckBoxes Page | Next.js E-commerce Dashboard Template",
  description: "This is Buttons page for TailAdmin Next.js",
  // other metadata
};

const CheckBoxes = () => {
  return (
    <>
    <Breadcrumb pageName="CheckBoxes" />

    {/* <!-- Check Boxes Items --> */}
    <div className="mb-10 rounded-md border border-stroke bg-white shadow-default shadow-white dark:border-strokedark dark:bg-boxdark dark:shadow-2xl">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Check Boxes
        </h3>
      </div>

      <div className="p-4 md:p-6 xl:p-9">
        <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
          <CheckBox/>
          <CheckBoxTwo/>
          <CheckBoxThree/>
          <CheckBoxFour/>
          <CheckBoxFive/>  
        </div>
      </div>
    </div>

  </>
  );
};

export default CheckBoxes;
