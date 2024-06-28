import React from "react";
import { Project } from "@/types/project";
import Link from "next/link";
import Arrow from '@mui/icons-material/TrendingFlatOutlined';

type Props = {
  project?: Project[]
};

const projectItem = (props: Props) => {
  const { project } = props;
  return (
    <>
      {project ? (
        <>
          {project?.length !== 0 ? (
            <div>
              {project?.map((row: Project, index: number) => (
                <div className="py-3" key={index}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                    <div className="flex">
                      <p className="font-semibold pr-2">{row?.institution}</p><p>{row?.titlePT}</p>
                    </div>
                  </div>
                  {row.url && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                      <div className="flex">
                        <a className="underline" target="_blank" href={row?.url.toLowerCase().includes("http") ? row?.url : "https://" + row?.url}>{row?.url}</a>
                      </div>
                    </div>
                  )}

                  <hr className="py-2" />
                  <div className="">
                    <div className="flex">
                      <p>{row?.detailsPT.slice(0, 200)}...
                        <Link className="flex items-center hover:underline text-black dark:text-white" href={`/project/${row._id}`}> Ver mais <Arrow /> </Link></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-3">Sem Projetos</p>
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

export default projectItem;
