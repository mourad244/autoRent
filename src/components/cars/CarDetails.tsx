import { ICar } from "../../types/car.type";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
const TextComponent = ({
  label,
  text,
}: {
  label: string;
  text: string | number;
}) => {
  return (
    <div className="m-2 flex w-64 flex-row border-b-2 ">
      <Typography variant="h6" color="gray" className="m-3 w-28 font-bold ">
        {label}:
      </Typography>
      <Typography variant="h6" color="gray" className="m-3 font-normal">
        {text}
      </Typography>
    </div>
  );
};

function CarDetails({
  selectedCar,
  onClose,
}: {
  selectedCar: ICar;

  onClose: () => void;
}) {
  return (
    <div className="row mt-3  flex  w-screen  ">
      <Card
        nonce={undefined}
        className=" mr-2 w-fit"
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className=" m-auto w-fit rounded-none"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <img
            src={selectedCar.picture}
            alt={`${selectedCar.brand} ${selectedCar.model} ${selectedCar.year}`}
            className="m-auto"
          />
        </CardHeader>
        <CardBody
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          className="m-auto  w-fit "
        >
          {/* <Typography variant="h4" color="blue-gray" className="text-center">
            Car Details
          </Typography> */}
          <div className="m-auto flex w-fit flex-wrap">
            <TextComponent label="Brand" text={selectedCar.brand} />
            <TextComponent label="Model" text={selectedCar.model} />
            <TextComponent label="Year" text={selectedCar.year} />
            <TextComponent
              label="Vehicle type"
              text={selectedCar.vehicleType}
            />
            <TextComponent label="Country" text={selectedCar.country} />
            <TextComponent
              label="Registry date"
              text={selectedCar.registryDate}
            />
            <TextComponent
              label="Licence plate"
              text={selectedCar.licencePlate}
            />
            <TextComponent label="Color" text={selectedCar.color} />
            <TextComponent
              label="Is available"
              text={selectedCar.isAvailable ? "Yes" : "No"}
            />
            <TextComponent
              label="Transmission"
              text={selectedCar.transmission}
            />
            <TextComponent label="Horse power" text={selectedCar.horsePower} />
            <TextComponent label="Fuel" text={selectedCar.fuel} />
            <TextComponent
              label="Seat capacity"
              text={selectedCar.seatCapacity}
            />
            <TextComponent label="Door" text={selectedCar.door} />
            <TextComponent label="Daily price" text={selectedCar.dailyPrice} />
          </div>
        </CardBody>
      </Card>
      <Button
        className=" flex h-fit min-w-fit items-center gap-3"
        size="sm"
        color="amber"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onClick={onClose}
      >
        x
      </Button>
    </div>
  );
}
{
  /* <div>
  {selectedCar && (
    <div>
      <h1>{selectedCar.brand}</h1>
      <h1>{selectedCar.model}</h1>
      <h1>{selectedCar.year}</h1>
      <h1>{selectedCar.vehicleType}</h1>
      <h1>{selectedCar.country}</h1>
      <h1>{selectedCar.registryDate}</h1>
      <h1>{selectedCar.licencePlate}</h1>
      <h1>{selectedCar.color}</h1>
      <h1>{selectedCar.isAvailable}</h1>
      <h1>{selectedCar.transmission}</h1>
      <h1>{selectedCar.horsePower}</h1>
      <h1>{selectedCar.fuel}</h1>
      <h1>{selectedCar.seatCapacity}</h1>
      <h1>{selectedCar.door}</h1>
      <h1>{selectedCar.dailyPrice}</h1>
      <h1>{selectedCar.picture}</h1>
    </div>
  )}
  <button onClick={onClose}>Close</button>
</div>; */
}
export default CarDetails;
