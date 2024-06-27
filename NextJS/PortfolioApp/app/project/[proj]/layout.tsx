import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Project Page",
    description: "This is Project page",
    // other metadata
  };
  
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
