import Calendar from "@/components/pagesComponents/Calendar";
import { Metadata } from "next";

export const  metadata: Metadata = {
  title: "Calendar Page ",
  description: "This is Calendar page",
  // other metadata
};

const CalendarPage = async () => {
  return (
    <>
      <Calendar />
    </>
  );
};

export default CalendarPage;
