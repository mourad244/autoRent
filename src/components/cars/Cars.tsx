import { useState, useMemo } from "react";

import { ICar } from "../../types/car.type";

import car from "../../context/data/car";
import carType from "../../context/data/carType";
import carBrand from "../../context/data/carBrand";
import carClass from "../../context/data/carClass";

import CarForm from "./CarForm";
import CarTable from "./CarTable";

import { sortItems } from "../../utils/sortItems";
import CarDetails from "./CarDetails";

interface State {
  cars: ICar[] | [];
  filteredCars: ICar[];
  selectedCar: ICar | null;
  selectedCars: ICar[] | [];
  selectedCarBrand: string;
  selectedCarType: string;
  selectedCarClass: string;
  sortedColumn: { key: keyof ICar; direction: "asc" | "desc" };
  showForm: boolean;
  showDetails: boolean;
  currentPage: number;
  itemsPerPage: number;
  selectedFields: {
    order: number;
    name: string;
    label: string;
  }[];
  fields: {
    order: number;
    name: string;
    label: string;
  }[];
}
/*  id: 1,
    brand: "Peugeot",
    model: "208",
    vehicleClass: "Compact",
    year: 2021,
    vehicleType: "Coupe",
    country: "France",
    registryDate: "2021-06-15",
    licencePlate: "P2O8",
    color: "Blue",
    isAvailable: true,
    transmission: "Manual",
    horsePower: 110,
    fuel: "Essence",
    seatCapacity: 5,
    door: 4,
    dailyPrice: 70,
    picture: "https://i.ibb.co/0j3QY1Z/peugeot-208-1.jpg", */
function Cars() {
  const [state, setState] = useState<State>({
    cars: car as ICar[],
    filteredCars: car as ICar[],
    selectedCar: null,
    selectedCars: [],
    selectedCarBrand: "All",
    selectedCarType: "All",
    selectedCarClass: "All",
    sortedColumn: {
      key: "brand",
      direction: "asc",
    },
    showForm: false,
    showDetails: false,
    currentPage: 1,
    itemsPerPage: 10,
    fields: [
      { order: 1, name: "select", label: "Select" },
      { order: 2, name: "brand", label: "Brand" },
      { order: 3, name: "model", label: "Model" },
      { order: 4, name: "vehicleClass", label: "Vehicle class" },
      { order: 5, name: "year", label: "Year" },
      { order: 6, name: "vehicleType", label: "Vehicle type" },
      { order: 7, name: "isAvailable", label: "Available" },
      { order: 8, name: "fuel", label: "Fuel" },
      { order: 9, name: "dailyPrice", label: "Daily Price" },
      { order: 10, name: "country", label: "Country" },
      { order: 11, name: "registryDate", label: "Registry Date" },
      { order: 12, name: "color", label: "Color" },
      { order: 13, name: "transmission", label: "Transmission" },
      { order: 14, name: "horsePower", label: "Horse Power" },
      { order: 15, name: "seatCapacity", label: "Seat Capacity" },
      { order: 16, name: "door", label: "Door" },
    ],
    selectedFields: [
      { order: 1, name: "select", label: "Select" },
      { order: 2, name: "brand", label: "Brand" },
      { order: 4, name: "vehicleClass", label: "Vehicle class" },
      { order: 7, name: "isAvailable", label: "Available" },
      { order: 8, name: "fuel", label: "Fuel" },
      { order: 9, name: "dailyPrice", label: "Daily Price" },
    ],
  });
  const sortedCarBrand = useMemo(() => {
    return carBrand.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    );
  }, [carBrand]);

  const onFilterChange = (name: string, value: string) => {
    const { selectedCarBrand, selectedCarType, selectedCarClass } = state;
    let result = [...state.cars];
    let filterName = "";
    if (name === "brand") {
      filterName = "selectedCarBrand";
      if (value === "All") {
        result = [...state.cars];
      } else {
        result = result.filter((c) => c.brand === value);
      }
    }
    if (name === "vehicleType") {
      filterName = "selectedCarType";
      if (value === "All") {
        result = [...state.cars];
      } else {
        result = result.filter((c) => c.vehicleType === value);
      }
    }
    if (name === "vehicleClass") {
      filterName = "selectedCarClass";
      if (value === "All") {
        result = [...state.cars];
      } else {
        result = result.filter((c) => c.vehicleClass === value);
      }
    }
    if (selectedCarBrand !== "All" && filterName !== "selectedCarBrand") {
      result = result.filter((c) => c.brand === selectedCarBrand);
    }
    if (selectedCarType !== "All" && filterName !== "selectedCarType") {
      result = result.filter((c) => c.vehicleType === selectedCarType);
    }
    if (selectedCarClass !== "All" && filterName !== "selectedCarClass") {
      result = result.filter((c) => c.vehicleClass === selectedCarClass);
    }
    setState((prev) => ({
      ...prev,
      filteredCars: result,
      [filterName]: value,
      currentPage: 1,
    }));
  };
  const handleOpenForm = () => {
    setState((prev) => ({ ...prev, showForm: true }));
  };
  const handleCloseForm = () => {
    setState((prev) => ({ ...prev, showForm: false }));
  };

  const handleDisplayDetails = () => {
    setState((prev) => ({ ...prev, showDetails: true }));
  };
  const handleCloseDetails = () => {
    setState((prev) => ({ ...prev, showDetails: false }));
  };
  const handleSelectField = (field: {
    order: number;
    name: string;
    label: string;
  }) => {
    setState((prev) => {
      const selectedFields = [...prev.selectedFields];
      const index = selectedFields.findIndex((f) => f.name === field.name);
      if (index === -1) {
        selectedFields.push(field);
      } else {
        selectedFields.splice(index, 1);
      }
      selectedFields.sort((a, b) => a.order - b.order);
      return {
        ...prev,
        selectedFields,
      };
    });
  };

  const handleSelectCar = (car: ICar) => {
    console.log("car", state.cars);
    setState((prevState: State) => {
      const selectedCars: ICar[] = [...prevState.selectedCars];
      const index = selectedCars.findIndex((c) => c.id === car.id);
      if (index === -1) {
        selectedCars.push(car);
      } else {
        selectedCars.splice(index, 1);
      }
      let selectedCar = null as ICar | null;
      let founded: ICar | undefined = state.cars.find((c) => c.id === car.id);
      if (founded && selectedCars.length === 1) selectedCar = founded;
      // if (selectedCars.length === 1)
      // selectedCar = state.cars.find((c) => c.id === car.id);

      return {
        ...prevState,
        selectedCars,
        // selectedCar: selectedCars.length === 1 ? selectedCars[0] : null,
        // i want to set selectedCar with all its properties from cars
        selectedCar: selectedCars.length === 1 ? selectedCar : null,
      };
    });
  };

  const handleSelectCars = () => {
    setState((prevState: State) => {
      const selectedCars: ICar[] =
        prevState.selectedCars.length === prevState.filteredCars.length
          ? []
          : [...prevState.filteredCars];
      return {
        ...prevState,
        selectedCars,
        selectedCar: selectedCars.length === 1 ? selectedCars[0] : null,
      };
    });
  };

  const handleSearch = (query: string) => {
    let result = [...state.cars];
    if (query) {
      result = result.filter((c) =>
        c.brand.toLowerCase().includes(query.toLowerCase()),
      );
    }
    setState((prev) => ({
      ...prev,
      currentPage: 1,
      filteredCars: result,
      selectedCar: null,
      selectedCars: [],
    }));
  };

  const handleEditCar = () => {
    setState((prev) => ({ ...prev, showForm: true }));
  };
  const handleViewDetails = () => {
    setState((prev) => ({ ...prev, showDetails: true }));
  };

  const handleDeleteCar = () => {
    const { selectedCars, cars, filteredCars } = state;
    if (selectedCars.length > 0) {
      const selectedCarIds = new Set(selectedCars.map((car) => car.id));
      const newCars = cars.filter((c) => !selectedCarIds.has(c.id));
      const newFilteredCars = filteredCars.filter(
        (c) => !selectedCarIds.has(c.id),
      );
      if (newCars.length !== cars.length) {
        setState((prev) => ({
          ...prev,
          cars: newCars,
          filteredCars: newFilteredCars,
          selectedCars: [],
          selectedCar: null,
        }));
      }
    }
  };

  const handleSort = (column: keyof ICar) => {
    let result = [...state.cars];

    result = sortItems(result, {
      key: column,
      direction: state.sortedColumn.direction === "asc" ? "desc" : "asc",
    }) as ICar[];
    setState((prev) => ({
      ...prev,
      filteredCars: result,
      sortedColumn: {
        key: column,
        direction: state.sortedColumn.direction === "asc" ? "desc" : "asc",
      },
    }));
  };

  const handlePageChange = (newPage: number) => {
    setState((prev) => ({ ...prev, currentPage: newPage }));
  };

  const displayedCars = useMemo(() => {
    const { selectedFields, filteredCars, currentPage, itemsPerPage } = state;
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    return filteredCars.slice(start, end).map((car: ICar) => {
      const newCar: any = {};
      selectedFields.forEach((field: any) => {
        newCar[field.name as keyof ICar] = car[field.name as keyof ICar];
      });
      newCar.id = car.id;
      return newCar;
    });
  }, [
    state.filteredCars,
    state.currentPage,
    state.itemsPerPage,
    state.selectedFields,
  ]);
  console.log("selectedCar", state.selectedCar);
  console.log("selectedCars", state.selectedCars);
  if (state.showForm && state.selectedCar)
    return (
      <CarForm
        selectedCar={state.selectedCar}
        carsBrand={sortedCarBrand}
        carsType={carType}
        carsClass={carClass}
        onClose={handleCloseForm}
      />
    );
  else if (state.showDetails && state.selectedCar)
    return (
      <CarDetails
        selectedCar={state.selectedCar}
        onClose={handleCloseDetails}
      />
    );
  else
    return (
      <CarTable
        headers={state.selectedFields}
        fields={state.fields}
        onFieldSelect={handleSelectField}
        onEditCar={state.selectedCar ? handleEditCar : undefined}
        onViewDetails={state.selectedCar ? handleViewDetails : undefined}
        onDeleteCar={
          state.selectedCar !== null || state.selectedCars.length !== 0
            ? handleDeleteCar
            : undefined
        }
        onValueChange={onFilterChange}
        carsBrand={[{ name: "All", id: "all" }, ...sortedCarBrand]}
        carsType={[{ name: "All", id: "all" }, ...carType]}
        carsClass={[{ name: "All", id: "all" }, ...carClass]}
        selectedCarBrand={state.selectedCarBrand}
        selectedCarType={state.selectedCarType}
        selectedCarClass={state.selectedCarClass}
        rows={displayedCars}
        onSort={handleSort}
        onSearch={handleSearch}
        currentPage={state.currentPage}
        onAddCar={handleOpenForm}
        selectedCar={state.selectedCar}
        selectedCars={state.selectedCars}
        itemsPerPage={state.itemsPerPage}
        onPageChange={handlePageChange}
        onItemSelect={handleSelectCar}
        onItemsSelect={handleSelectCars}
        totalItems={state.filteredCars.length}
      />
    );
}

export default Cars;
