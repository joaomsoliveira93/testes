"use client";
import { useState } from "react";
import Image from "next/image";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import {useTranslations} from 'next-intl';

type Props<T> = {
  data: T[];
  columns: (keyof T)[];
  labels: { [key in keyof T]: string };
  imageKey?: keyof T;
  link: string;
};

const TableSort = <T,>({ data, columns, labels, imageKey, link }: Props<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);
  const t = useTranslations('tableSort');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 2;

  const sortedData = [...data];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  const filteredData = sortedData.filter((item) =>
    columns.some((key) => item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const renderSortIcon = (key: keyof T) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  };

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white"></h4>
        <input
          type="text"
          placeholder={t('search')}
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-2 py-1 text-black dark:text-white dark:bg-boxdark"
        />
      </div>

      <div className={`grid grid-cols-${link ? columns.length : columns.length-1} border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-${link ? columns.length : columns.length-1} md:px-6 2xl:px-7.5`}>
        {columns.map((key) => (
          <>{key !== '_id' && (
            <div key={key as string} className="col-span-1 flex items-center">
              <p className="font-medium cursor-pointer flex items-center" onClick={() => handleSort(key)}>
                {labels[key]} {renderSortIcon(key)}
              </p>
            </div>
          )}
          </>
        ))}
        <>
          {link && (
            <div className="col-span-1 flex items-center"></div>
          )}
        </>
      </div>

      {currentItems.map((item, index) => (
        <div key={index} className={`grid grid-cols-${link ? columns.length : columns.length-1} border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-${link ? columns.length : columns.length-1} md:px-6 2xl:px-7.5`}>
          {columns.map((key) => (
            <>{key !== '_id' && (
              <div key={key as string} className="col-span-1 flex items-center">
                {key === imageKey ? (
                  <Image src={`data:image/jpeg;base64,${item[key] as unknown as string}`} width={60} height={50} alt="Image" />
                ) : (
                  <>{key === 'active' ? (
                    <p className="text-sm text-black dark:text-white">{item[key] ? 'Ativo' : 'Inativo'}</p>
                  ) : (
                    <p className="text-sm text-black dark:text-white">{item[key]?.toString()}</p>
                  )}
                  </>
                )}
              </div>
            )}
            </>
          ))}
          <div className="col-span-1 flex items-center">
            {link && (
              <Link
                className={`hover:dark:bg-secondary hover:dark:text-black hover:bg-primary hover:text-white group relative flex items-center gap-2.5 duration-300 ease-in-out p-2 rounded-md px-3 py-2 font-medium dark:text-white text-black dark:hover:text-white dark:bg-primary bg-secondary `}
                href={`${link}${item?._id.toString()}`}
              >
                <div className=""> {t('details')}</div>
              </Link>
            )}
          </div>
        </div>
      ))
      }

      <div className="flex justify-between py-4 px-4 md:px-6 2xl:px-7.5">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50 font-bold ${currentPage !== 1 && "duration-300 ease-in-out p-2 hover:dark:bg-primary hover:bg-secondary"
            }`}
        >
          {t('prev')}
        </button>
        <p className="text-gray-700 dark:text-white">
          {t('page')} {currentPage} {t('of')} {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50 font-bold ${currentPage !== totalPages && "duration-300 ease-in-out p-2 hover:dark:bg-primary hover:bg-secondary"
            }`}
        >
          {t('next')}
        </button>
      </div>
    </div >
  );
};

export default TableSort;
