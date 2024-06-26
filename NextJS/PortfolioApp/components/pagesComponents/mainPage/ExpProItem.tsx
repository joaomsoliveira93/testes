import React from "react";
import { ProExp } from "@/types/expPro";
import {useLocale, useTranslations} from 'next-intl';

type Props = {
  proExp?: ProExp[]
};

const ExpProItem = (props: Props) => {
  const { proExp } = props;
  const t = useTranslations('portfolioScreen.proExpItem');
  const locale = useLocale();
  return (
    <>
      {proExp ? (
        <>
          {
            proExp?.length !== 0 ? (
              <div>
                {proExp?.map((row: ProExp, index: number) => (
                  <div className="py-3" key={index}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                      <div className="flex">
                        <p className="font-semibold pr-2">{row?.company}</p><p>{locale==='pt' ? row?.jobTitlePT :locale==='es' ? row?.jobTitleES: locale==='fr' ? row?.jobTitleFR :  row?.jobTitleEN}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                      <div className="flex">
                        <p>{row?.startedAt}</p><p className="px-2">-</p><p>{!row?.endedAt ? t('present') : row?.endedAt}</p>
                      </div>
                    </div>
                    <hr className="py-2" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                      <div className="flex">
                        <p>{locale==='pt' ? row?.detailsPT :locale==='es' ? row?.detailsES: locale==='fr' ? row?.detailsFR :  row?.detailsEN}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-3">{t('noExp')}</p>
            )
          }
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

export default ExpProItem;
