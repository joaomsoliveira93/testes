import React from "react";
import { Lang } from "@/types/lang";

type Props = {
  lang?: Lang[]
};

const LangItem = (props: Props) => {
  const { lang } = props;
  return (
    <> {lang ? (
      <>
        {lang?.length !== 0 ? (
          <div className="py-2 w-full shadow-default dark:bg-boxdark">
            <table className="border w-full border-stroke bg-white px-4 py-4 text-left dark:bg-boxdark dark:border-strokedark">
              <thead >
                <tr>
                  <th className="border-b border-stroke bg-white px-4 py-4 text-left dark:bg-boxdark dark:border-strokedark" />
                  <th colSpan={2} className="text-center border-b border-stroke bg-white px-4 py-4 dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">Compreender</p>
                  </th>
                  <th colSpan={2} className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">Falar</p>
                  </th>
                  <th className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">Escrever</p>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark" />
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">Compreensão Oral</p>
                  </td>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">Leitura</p>
                  </td>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">Produção Oral</p>
                  </td>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">Interação Oral</p>
                  </td>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium"></p>
                  </td>
                </tr>

                {lang?.map((row: Lang, index: number) => (
                  <tr
                    className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark"
                    key={index}
                  >
                    <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {row?.namePT}
                      </p>
                    </td>
                    <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {row?.oralUnd}
                      </p>
                    </td>
                    <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {row?.readUnd}
                      </p>
                    </td>
                    <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {row?.oralPrd}</p>
                    </td>
                    <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {row?.oralInt}</p>
                    </td>
                    <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {row?.write}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="pl-2 pt-2 text-sm">Níveis: A1 e A2: Utilizador de base; B1 e B2: Utilizador independente; C1 e C2: Utilizador avançado</p>
          </div>
        ) : (
          <p className="py-3">Sem competências linguísticas</p>
        )}
      </>
    ) : (
      <div role="status" className=" animate-pulse overflow-hidden shadow-default ">
        <table className="border w-full border-stroke bg-white px-4 py-4 text-left dark:bg-boxdark dark:border-strokedark">
          <thead>
            <tr>
              <th className="border-b border-stroke bg-white px-4 py-4 text-left dark:bg-boxdark dark:border-strokedark" />
              <th colSpan={2} className="text-center border-b border-stroke bg-white px-4 py-4 dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </th>
              <th colSpan={2} className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </th>
              <th className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark" />
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <p className="font-medium"></p>
              </td>
            </tr>


            <tr
              className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark"
              key={1}
            >
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
            </tr>

            <tr
              className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark"
              key={2}
            >
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
              <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
              </td>
            </tr>

          </tbody>
        </table>
        <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-3"></div>
      </div>

    )}
    </>


  );
};

export default LangItem;