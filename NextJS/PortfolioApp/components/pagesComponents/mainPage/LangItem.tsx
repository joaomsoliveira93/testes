import React from "react";
import { Lang } from "@/types/lang";
import { useLocale,useTranslations} from 'next-intl';

type Props = {
  lang?: Lang[]
};

const LangItem = (props: Props) => {
  const { lang } = props;
  const t = useTranslations('portfolioScreen.langItem');
  const locale = useLocale();
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
                    <p className="font-medium">{t('und')} </p>
                  </th>
                  <th colSpan={2} className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">{t('spk')} </p>
                  </th>
                  <th className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">{t('write')} </p>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark" />
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">{t('undOral')} </p>
                  </td>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">{t('read')} </p>
                  </td>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">{t('prdOral')} </p>
                  </td>
                  <td className="border-b border-stroke bg-white px-4 py-4 text-center dark:bg-boxdark dark:border-strokedark">
                    <p className="font-medium">{t('intOral')} </p>
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
                      {locale==='pt' ? row?.namePT :locale==='es' ? row?.nameES: locale==='fr' ? row?.nameFR :  row?.nameEN}
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
            <p className="pl-2 pt-2 text-sm">{t('sub')} </p>
          </div>
        ) : (
          <p className="py-3">{t('noLang')} </p>
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
