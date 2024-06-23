import Calendar from "@/components/pagesComponents/Calendar";
import { Metadata } from "next";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";

export const  metadata: Metadata = {
  title: "Calendar Page ",
  description: "This is Calendar page",
  // other metadata
};

const CalendarPage = async () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Calendar />
    </Suspense>
  );
};

export default CalendarPage;
