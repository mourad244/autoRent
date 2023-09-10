import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Pagination } from "../../common/Pagination";
import {
  Button,
  Chip,
  Typography,
  Input,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Table from "../../common/Table";
import { RiCarLine } from "react-icons/ri";
import { ICar } from "../../types/car.type";

type CarTableProps = {
  rows: ICar[];
  headers: string[];
  headersKey: string[];
  onAddCar: () => void;
  onSearch: (query: string) => void;
  onSort: (column: keyof ICar) => void;
  totalItems: number;
  itemsPerPage: number;
  onItemSelect: (car: ICar) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function CarTable({
  rows,
  headers,
  headersKey,
  onAddCar,
  onSearch,
  onSort,
  totalItems,
  itemsPerPage,
  currentPage,
  onItemSelect,
  onPageChange,
}: CarTableProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };
  const searchInput = (
    <div className="flex  flex-col items-center justify-between gap-4 md:flex-row">
      <div className="w-full md:w-72">
        <Input
          onChange={handleSearchChange}
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          label="Search"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </div>
    </div>
  );

  const tableRows = rows.map((car, index) => {
    const isLast = index === rows.length - 1;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    return (
      <tr key={uuidv4()}>
        <td className={classes}>
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {car.brand}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                {car.model}
              </Typography>
            </div>
          </div>
        </td>
        <td className={classes}>
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {car.vehicleClass}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {car.year}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <div className="w-max">
            <Chip
              variant="ghost"
              size="sm"
              value={car.isAvailable ? "Available" : "Not Available"}
              color={car.isAvailable ? "green" : "blue-gray"}
            />
          </div>
        </td>
        <td className={classes}>
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {car.fuel}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {car.dailyPrice}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <Tooltip content="Edit Car">
            <IconButton
              variant="text"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                onItemSelect(car);
              }}
            >
              <PencilIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    );
  });
  const paginationComponent = (
    <Pagination
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
  const addCarButton = (
    <Button
      className="flex items-center gap-3"
      onClick={onAddCar}
      size="sm"
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <RiCarLine strokeWidth={2} className="h-4 w-4" /> + Add Car
    </Button>
  );

  const tableHeaders = headers.map((header, index) => {
    return (
      <th
        key={uuidv4()}
        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
        onClick={() => onSort(headersKey[index] as keyof ICar)}
      >
        {header}
      </th>
    );
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Table
        tableHeaders={tableHeaders}
        tableRows={tableRows}
        title="Cars list"
        subtitle="See information about all members"
        additionalActions={addCarButton}
        searchComponent={searchInput}
        footerComponent={paginationComponent}
      />
    </div>
  );
}

export default CarTable;
