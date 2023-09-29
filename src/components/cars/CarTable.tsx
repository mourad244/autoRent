import React, { useState } from "react";
import { Pagination } from "../../common/Pagination";

import { ICar } from "../../types/car.type";

import Table from "../../common/Table";
import SelectInput from "../../common/SelectInput";
import SearchableDropdown from "../../common/SearchableDropdown";

import { v4 as uuidv4 } from "uuid";

import {
  EyeIcon,
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { RiCarLine } from "react-icons/ri";

import {
  Card,
  Chip,
  Input,
  Button,
  Tooltip,
  CardBody,
  Checkbox,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import ChipBlock from "../../common/ChipBlock";
import TextBlock from "../../common/TextBlock";
type CarKeys = keyof ICar;
type CarTableProps = {
  rows: ICar[];
  headers: {
    name: string;
    label: string;
  }[];
  fields: {
    name: string;
    label: string;
    order: number;
  }[];
  onAddCar: () => void;
  onEditCar?: () => void;
  onDeleteCar?: () => void;
  onViewDetails?: () => void;

  onSearch: (query: string) => void;
  onItemSelect: (car: ICar) => void;
  onItemsSelect: () => void;

  onFieldSelect: (field: {
    order: number;
    name: string;
    label: string;
  }) => void;

  onSort: (column: keyof ICar) => void;
  onPageChange: (page: number) => void;
  onValueChange: (name: string, value: string) => void;

  totalItems: number;
  currentPage: number;
  itemsPerPage: number;

  carsType: any[];
  carsClass: any[];
  carsBrand: any[];

  selectedCar: ICar | null;
  selectedCars: ICar[];

  selectedCarType: string;
  selectedCarClass: string;
  selectedCarBrand: string;
};

function CarTable({
  rows,
  headers,
  fields,
  carsType,
  carsClass,
  carsBrand,

  selectedCars,

  selectedCarType,
  selectedCarClass,
  selectedCarBrand,

  onAddCar,
  onEditCar,
  onDeleteCar,
  onViewDetails,

  onItemSelect,
  onItemsSelect,
  onSort,
  onSearch,
  onValueChange,

  onFieldSelect,

  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage,
}: CarTableProps) {
  const [state, setState] = useState<any>({
    isFilterOpen: false,
    isFieldsOpen: false,
    selectedCollapse: "",
    isCollapseOpen: false,
  });

  const toggleFilter = () => {
    setState({
      isFilterOpen: !state.isFilterOpen,
      isFieldsOpen: false,
      selectedCollapse: state.isFilterOpen ? "" : "filter",
      isCollapseOpen: !state.isCollapseOpen,
    });
  };
  const toggleVisibleFields = () => {
    setState({
      isFilterOpen: false,
      isFieldsOpen: !state.isFieldsOpen,
      isCollapseOpen: !state.isCollapseOpen,
      selectedCollapse: state.isFieldsOpen ? "" : "visibleFields",
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const filterFunctions = (
    <>
      <SearchableDropdown
        name="brand"
        label="Brand"
        options={carsBrand}
        value={selectedCarBrand}
        width="w-[200px]"
        onChange={(name, value) => {
          onValueChange("brand", value);
        }}
      />
      <SelectInput
        options={carsType}
        name="vehicleType"
        label="Vehicle type"
        width="w-[200px]"
        value={selectedCarType}
        onValueChange={(name, value) => {
          onValueChange(name, value);
        }}
      />
      <SelectInput
        options={carsClass}
        name="vehicleClass"
        label="Vehicle class"
        width="w-[200px]"
        value={selectedCarClass}
        onValueChange={(name, value) => {
          onValueChange(name, value);
        }}
      />
    </>
  );

  type CheckBoxFieldProps = {
    label: string;
    name: string;
    order: number;
    onFieldSelect: (field: {
      order: number;
      name: string;
      label: string;
    }) => void;
    isChecked: boolean;
  };

  const CheckboxField = ({
    label,
    name,
    order,
    onFieldSelect,
    isChecked,
  }: CheckBoxFieldProps) => {
    const handleFieldSelect = () => {
      onFieldSelect({ order, name, label });
    };

    return (
      <Checkbox
        color="blue"
        value="Value"
        label={label}
        onChange={handleFieldSelect}
        checked={isChecked}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        labelProps={{
          className: "text-sm",
        }}
      />
    );
  };

  const visibleFieldsFunctions = (
    <div className="flex w-[600px] flex-wrap">
      {fields.map(
        (field) =>
          field.name !== "select" && (
            <CheckboxField
              key={field.name}
              {...field}
              onFieldSelect={onFieldSelect}
              isChecked={
                headers.findIndex((header) => header.name === field.name) !== -1
              }
            />
          ),
      )}
    </div>
  );

  const collapseFunction = (selectedCollapse: string) => {
    let children = <></>;
    switch (selectedCollapse) {
      case "filter":
        children = filterFunctions;
        break;
      case "visibleFields":
        children = visibleFieldsFunctions;
        break;
      default:
        break;
    }
    let isOpen = false;
    if (selectedCollapse === "filter" && state.isFilterOpen) {
      isOpen = true;
    } else if (selectedCollapse === "visibleFields" && state.isFieldsOpen) {
      isOpen = true;
    }
    return (
      <Collapse open={isOpen} className="!basis-auto">
        <Card
          className=" mx-auto mt-2 w-full bg-black/5"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <CardBody
            className="p-2"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            children={children}
          />
        </Card>
      </Collapse>
    );
  };
  const collapseButton = (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-row items-center gap-2   ">
        <div className="w-fit items-start">
          <Button
            onClick={toggleFilter}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <span className=" md:block">Filter</span>
          </Button>
        </div>
        <div className="w-fit ">
          <Button
            onClick={toggleVisibleFields}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            <span className="md:block">Visible Fields</span>
          </Button>
        </div>
      </div>
    </div>
  );

  const searchInput = (
    <div className="items-top  ml-2 flex flex-col justify-between gap-2 md:flex-row">
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
  const tableControlPanel = (
    <div className=" mb-2 flex  flex-col">
      <div className="flex flex-row">
        {collapseButton}
        {searchInput}
      </div>
      {collapseFunction(state.selectedCollapse)}
    </div>
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
    if (header.label === "Select") {
      return (
        <th
          key={uuidv4()}
          className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 transition-colors hover:bg-blue-gray-50"
          // onClick={() => onSort(headersKey[index] as keyof ICar)}
        >
          <Checkbox
            color="blue"
            value="Value"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            checked={totalItems === selectedCars.length}
            onChange={() => {
              onItemsSelect();
            }}
          />
        </th>
      );
    }

    return (
      <th
        key={uuidv4()}
        className="max-w-[120px] cursor-pointer border-y border-blue-gray-100  bg-blue-gray-50/50 p-2 transition-colors hover:bg-blue-gray-50"
        onClick={() => onSort(headers[index]["name"] as keyof ICar)}
      >
        {header.label}
      </th>
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

  const tableRows = rows.map((car, index) => {
    const isLast = index === rows.length - 1;
    const classes = isLast
      ? "max-w-[120px] p-2 "
      : "p-2 border-b border-blue-gray-50 max-w-[120px]";
    return (
      <tr key={uuidv4()}>
        <td className={classes}>
          <Checkbox
            color="blue"
            value="Value"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            checked={selectedCars.findIndex((c) => c.id === car.id) !== -1}
            onChange={() => {
              onItemSelect(car);
            }}
          />
        </td>

        {headers.map((header, index) => {
          const key = header.name as CarKeys;
          if (header.name === "select") return null;
          if (header.name in car) {
            if (key === "isAvailable") {
              return (
                <td key={uuidv4()} className={classes}>
                  <ChipBlock isAvailable={car.isAvailable} />
                </td>
              );
            } else {
              return (
                <td key={uuidv4()} className={classes}>
                  <TextBlock text={car[key]} />
                </td>
              );
            }
          }
        })}
      </tr>
    );
  });
  const itemActions = (
    <div className=" flex items-center gap-2 rounded-lg border-2 bg-blue-gray-50/50 ">
      <Tooltip content="View Details">
        <IconButton
          variant="text"
          onClick={onViewDetails}
          nonce={undefined}
          onResize={undefined}
          disabled={onViewDetails === undefined}
          onResizeCapture={undefined}
        >
          <EyeIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Edit Car ">
        <IconButton
          variant="text"
          onClick={onEditCar}
          nonce={undefined}
          onResize={undefined}
          disabled={onEditCar === undefined}
          onResizeCapture={undefined}
        >
          <PencilIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Delete Car">
        <IconButton
          variant="text"
          onClick={onDeleteCar}
          nonce={undefined}
          onResize={undefined}
          disabled={onDeleteCar === undefined}
          onResizeCapture={undefined}
        >
          <TrashIcon className="h-4 w-4" />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <div className="rounded-lg bg-white p-2 shadow-md">
      <Table
        title="Cars list"
        tableRows={tableRows}
        itemActions={itemActions}
        tableHeaders={tableHeaders}
        additionalActions={addCarButton}
        tableControlPanel={tableControlPanel}
        footerComponent={paginationComponent}
        subtitle="See information about all cars"
      />
    </div>
  );
}

export default CarTable;
