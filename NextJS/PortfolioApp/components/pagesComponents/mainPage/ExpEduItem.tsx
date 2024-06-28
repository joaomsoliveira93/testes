import React from "react";
import { EduExp } from "@/types/expEdu";

type Props = {
  eduExp?: EduExp[]
};

const ExpEduItem = (props: Props) => {
  const { eduExp } = props;
  return (
    <>{eduExp ? (
      <>
        {eduExp?.length !== 0 ? (
          <div>
            {eduExp?.map((row: EduExp, index: number) => (
              <div className="py-3" key={index}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                  <div className="flex">
                    <p className="font-semibold pr-2">{row?.institution}</p><p>{row?.coursePT}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                  <div className="flex">
                    <a className="underline" target="_blank" href={row?.webSite.toLowerCase().includes("http") ? row?.webSite : `https://${row?.webSite}`}>{row?.webSite}</a>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                  <div className="flex">
                    <p>{row?.startedAt}</p><p className="px-2">-</p><p>{!row?.endedAt ? 'Atual' : row?.endedAt}</p>
                  </div>
                </div>
                <hr className="py-2" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                  <div className="flex">
                    <p>{row?.detailsPT}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-3">Sem Educação e Formação</p>
        )}
      </>
    ) : (
      <div role="status" className=" animate-pulse overflow-hidden shadow-default ">
        <div className="py-3" >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[60%] mb-1"></div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[30%] mb-1"></div>
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[30%] mb-1"></div>
          </div>
          <hr className="py-2" />
          <div className="">
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
          </div>
        </div>

        <div className="py-3 mt-3" >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[60%] mb-1"></div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[30%] mb-1"></div>
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[30%] mb-1"></div>
          </div>
          <hr className="py-2" />
          <div className="">
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
            <div className="h-4 dark:bg-white rounded-full bg-black max-w-[95%] mb-1"></div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ExpEduItem;
