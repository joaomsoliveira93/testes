import React from "react";
import { OtherInfo } from "@/types/other";
import { useLocale, useTranslations } from 'next-intl';

type Props = {
  other?: OtherInfo[]
};

const OtherItem = (props: Props) => {
  const { other } = props;
  const t = useTranslations('portfolioScreen.otherItem');
  const locale = useLocale();
  return (<>{other ? (
    <>
      {other?.length !== 0 ? (
        <div>
          {other?.map((row: OtherInfo, index: number) => (
            <div className="py-3" key={index}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                <div className="flex">
                  <p className="font-semibold pr-2">{row?.institution}</p><p>{locale === 'pt' ? row?.titlePT : locale === 'es' ? row?.titleES : locale === 'fr' ? row?.titleFR : row?.titleEN}</p>
                </div>
                {(locale === 'pt' && row?.locationPT) && (
                  <div className="flex">
                    <p>{row?.locationPT}</p>
                  </div>
                )}

                {(locale === 'en' && row?.locationEN) && (
                  <div className="flex">
                    <p>{row?.locationEN}</p>
                  </div>
                )}

                {(locale === 'es' && row?.locationES) && (
                  <div className="flex">
                    <p>{row?.locationES}</p>
                  </div>
                )}

                {(locale === 'fr' && row?.locationFR) && (
                  <div className="flex">
                    <p>{row?.locationFR}</p>
                  </div>
                )}

              </div>
              {row.webSite && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                  <div className="flex">
                    <a className="underline" target="_blank" href={row?.webSite}>{row?.webSite}</a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                <div className="flex">
                  <p>{row?.startedAt}</p><p className="px-2">-</p><p>{!row?.endedAt ? t('present') : row?.endedAt}</p>
                </div>
              </div>
              <hr className="py-2" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-1 2xl:gap-7.5">
                <div className="flex">
                  <p>{locale === 'pt' ? row?.detailsPT : locale === 'es' ? row?.detailsES : locale === 'fr' ? row?.detailsFR : row?.detailsEN}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-3">{t('noOther')}</p>
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

export default OtherItem;
