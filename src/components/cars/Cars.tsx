import { useState, useEffect } from "react";

import car from "../../context/data/car";

import CarForm from "./CarForm";
import CarTable from "./CarTable";

import { ICar } from "../../types/car.type";
import { sortItems } from "../../utils/sortItems";

interface sortedColumn {
  key: keyof ICar;
  direction: "asc" | "desc";
}

function Cars() {
  const [cars, setCars] = useState<ICar[]>([]);
  const [filteredCars, setFilteredCars] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortedColumn, setSortedColumn] = useState<sortedColumn | null>({
    key: "brand",
    direction: "asc",
  });

  const [showForm, setShowForm] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // default to 10 items

  useEffect(() => {
    let result = car as ICar[];
    setCars(result);
  }, []);

  useEffect(() => {
    const handleFilter = () => {
      let result = [...cars];
      if (searchQuery) {
        result = result.filter((c) =>
          c.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (sortedColumn) {
        result = sortItems(result, sortedColumn) as ICar[];
      }
      setFilteredCars(result);
    };
    if (cars.length > 0) handleFilter();
  }, [searchQuery, sortedColumn?.direction, sortedColumn?.key, cars]);

  const handleOpenForm = () => {
    setSelectedCar(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSelectCar = (car: ICar) => {
    setSelectedCar(car);
    setShowForm(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (column: keyof ICar) => {
    let newDirection: "asc" | "desc" = "asc";
    if (sortedColumn?.key === column) {
      newDirection = sortedColumn.direction === "asc" ? "desc" : "asc";
    }
    setSortedColumn({ key: column, direction: newDirection });
  };

  const displayedCars = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      {showForm ? (
        <CarForm selectedCar={selectedCar} onClose={handleCloseForm} />
      ) : (
        <CarTable
          rows={displayedCars}
          headers={[
            "Brand",
            "Class Vehicle",
            "Availability",
            "Fuel",
            "Daily Price",
            "",
          ]}
          headersKey={[
            "brand",
            "vehicleClass",
            "isAvailable",
            "fuel",
            "dailyPrice",
          ]}
          onSort={handleSort}
          onSearch={handleSearch}
          currentPage={currentPage}
          onAddCar={handleOpenForm}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemSelect={handleSelectCar}
          totalItems={filteredCars.length}
        />
      )}
    </>
  );
}

export default Cars;
