"use client"
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const productData: Product[] = [
  {
    image: "/images/product.png",
    name: "Apple Watch Series 7",
    category: "Electronics",
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: "/images/product.png",
    name: "Macbook Pro M1",
    category: "Electronics",
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: "/images/product.png",
    name: "Dell Inspiron 15",
    category: "Electronics",
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: "/images/product.png",
    name: "HP Probook 450",
    category: "Electronics",
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableSort = () => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 2;

  const sortedData = [...productData];
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

  const filteredData = sortedData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (key: keyof Product) => {
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
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const renderSortIcon = (key: keyof Product) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowDropUpIcon />
    ) : (
      <ArrowDropDownIcon/>
    );
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-2 py-1 text-black dark:text-white dark:bg-boxdark"
        />
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium cursor-pointer flex items-center" onClick={() => handleSort("name")}>
            Product Name {renderSortIcon("name")}
          </p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium cursor-pointer flex items-center" onClick={() => handleSort("category")}>
            Category {renderSortIcon("category")}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium cursor-pointer flex items-center" onClick={() => handleSort("price")}>
            Price {renderSortIcon("price")}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium cursor-pointer flex items-center" onClick={() => handleSort("sold")}>
            Sold {renderSortIcon("sold")}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium cursor-pointer flex items-center" onClick={() => handleSort("profit")}>
            Profit {renderSortIcon("profit")}
          </p>
        </div>
      </div>

      {currentItems.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>
        </div>
      ))}

      <div className="flex justify-between py-4 px-4 md:px-6 2xl:px-7.5">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50 font-bold ${currentPage !== 1 && 'duration-300 ease-in-out p-2 hover:dark:bg-primary hover:bg-secondary'}`}
        >
          Previous
        </button>
        <p className="text-gray-700 dark:text-white">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-md disabled:opacity-50 font-bold ${currentPage !== totalPages && 'duration-300 ease-in-out p-2 hover:dark:bg-primary hover:bg-secondary'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableSort;
