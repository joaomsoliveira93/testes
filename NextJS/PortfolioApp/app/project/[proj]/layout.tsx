import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalhes do Projeto",
  description: "Página com informação detalhadas do projeto",
};

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <>
      {children}
    </>
  );
}
