import React from "react";
import { Document } from "@/types/document";
import OpenPdfButton from "@/components/ui/openPDFButton";

type Props = {
  doc?: Document[]
};

const DocumentItem = (props: Props) => {
  const { doc } = props;
  return (<>{doc ? (
    <>
      {doc?.length !== 0 ? (
        <div>
          {doc?.map((row: Document, index: number) => (
            <div className="py-3" key={index}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                <div className="flex">
                  <p className="font-semibold pr-2">{row?.namePT}</p>
                </div>
              </div>
              <OpenPdfButton base64Pdf={row?.binary}/>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-3">Sem Documentos</p>
      )}
    </>
  ) : (
    <div role="status" className=" animate-pulse overflow-hidden shadow-default ">
      <div className="py-3" >
        <div className="grid grid-cols-1 gap-1 md:grid-cols-1 md:gap-1 xl:grid-cols-1 2xl:gap-7.5">
          <div className="h-4 dark:bg-white rounded-full bg-black max-w-[80%] mb-1"></div>
          <div className="h-4 dark:bg-white rounded-full bg-black max-w-[50%] mb-1"></div>
        </div>
      </div>
      <div className="py-3" >
        <div className="grid grid-cols-1 gap-1 md:grid-cols-1 md:gap-1 xl:grid-cols-1 2xl:gap-7.5">
          <div className="h-4 dark:bg-white rounded-full bg-black max-w-[80%] mb-1"></div>
          <div className="h-4 dark:bg-white rounded-full bg-black max-w-[50%] mb-1"></div>
        </div>
      </div>
    </div>
  )}
  </>


  );
};

export default DocumentItem;
