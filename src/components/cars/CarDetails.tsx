import { ICar } from "../../types/car.type";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function CarDetails({
  selectedCar,
  onClose,
}: {
  selectedCar: ICar | null;
  onClose: () => void;
}) {
  return (
    <Card
      nonce={undefined}
      className="max-w-[24rem] overflow-hidden"
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        <Typography variant="h4" color="blue-gray">
          Car Details
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          Because it&apos;s about motivating the doers. Because I&apos;m here to
          follow my dreams and inspire others.
        </Typography>
      </CardBody>
    </Card>
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
