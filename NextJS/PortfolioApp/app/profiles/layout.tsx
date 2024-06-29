import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfis",
  description: "Página com informação de todos os perfis",
};

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {

  return (
    <>
      {children}
    </>
  );
}
