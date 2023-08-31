import CarTable from "./CarTable";
import car from "../../context/data/car";

function Cars() {
  return (
    <CarTable
      TABLE_ROWS={car}
      TABLE_HEAD={[
        "Brand",
        "Class Vehicle",
        "Availability",
        "Fuel",
        "Daily Price",
        "",
      ]}
      TABS={[
        {
          label: "All",
          value: "all",
        },
        {
          label: "Monitored",
          value: "monitored",
        },
        {
          label: "Unmonitored",
          value: "unmonitored",
        },
      ]}
    />
  );
}

export default Cars;
