import React from "react";
import { EduExp } from "@/types/expEdu";

type Props = {
  eduExp?: EduExp[]
};

const ExpEduItem = (props: Props) => {
  const { eduExp } = props;
  return (
    <>
    { eduExp?.length !== 0 ? (
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
              <a className="underline" target="_blank" href={row?.webSite}>{row?.webSite}</a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
            <div className="flex">
              <p>{row?.startedAt}</p><p className="px-2">-</p><p>{!row?.endedAt ? 'Atual' : row?.endedAt}</p>
            </div>
          </div>
          <hr className="py-2"/>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
            <div className="flex">
              <p>{row?.detailsPT}</p>
            </div>
          </div>
        </div>
      ))}
    </div> 
    ):(
      <p className="py-3">Sem Educação e Formação</p>
    )}
    </>
   
  );
};

export default ExpEduItem;
