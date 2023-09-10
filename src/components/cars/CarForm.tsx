import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../common/TextInput";
import { ICar } from "../../types/car.type";
import SelectInput from "../../common/SelectInput";
import carType from "../../context/data/carType";
import carBrand from "../../context/data/carBrand";
import carClass from "../../context/data/carClass";
import { Button, Typography } from "@material-tailwind/react";

const validationSchema = Yup.object().shape({
  brand: Yup.string().required("Brand is required"),
  model: Yup.string().required("Model is required"),
  vehicleClass: Yup.string().required("Vehicle class is required"),
  year: Yup.number()
    .typeError("Year must be a number")
    .required("Year is required"),
  vehicleType: Yup.string().required("Vehicle type is required"),
  country: Yup.string().required("Country is required"),
  registryDate: Yup.string().required("Registry date is required"),
  licencePlate: Yup.string().required("Licence plate is required"),
  color: Yup.string().required("Color is required"),
  isAvailable: Yup.boolean(),
  transmission: Yup.string().required("Transmission is required"),
  horsePower: Yup.number()
    .typeError("Horse power must be a number")
    .required("Horse power is required"),
  fuel: Yup.string().required("Fuel is required"),
  seatCapacity: Yup.number()
    .typeError("Seat capacity must be a number")
    .required("Seat capacity is required"),
  door: Yup.number()
    .typeError("Door must be a number")
    .required("Door is required"),
  dailyPrice: Yup.number()
    .typeError("Daily price must be a number")
    .required("Daily price is required"),
});

function CarForm({
  selectedCar,
  onClose,
}: {
  selectedCar: ICar | null;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ICar>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (selectedCar) {
      reset(selectedCar);
    }
  }, [selectedCar]);
  useEffect(() => {
    watch();
  }, []);
  let sortedCarBrand = carBrand.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
  });

  const selectedBrand = watch("brand", "");
  const onSubmit = (data: ICar) => {
    console.log("data", data);
    reset();
  };
  return (
    <div className=" bg-white p-4 rounded-lg ">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-full w-full">
        <div className="flex justify-between m-4 items-center  ">
          <Typography variant="h5" color="blue-gray">
            {selectedCar ? "Edit Car Details" : "Add Car Details"}
          </Typography>
          <Button
            className="flex items-center gap-3"
            size="sm"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onClick={onClose}
          >
            Back to Car Table
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className=" flex flex-wrap max-w-screen-xl w-24 min-w-full mx-auto 	"
        >
          <SelectInput
            options={sortedCarBrand}
            name="brand"
            label="Brand"
            register={register}
            errors={errors}
            trigger={trigger}
            value={getValues("brand")}
            width="w-[200px]"
            setValue={setValue}
          />
          <SelectInput
            key={selectedBrand}
            label="Model"
            name="model"
            trigger={trigger}
            register={register}
            errors={errors}
            value={getValues("model")}
            width="w-[200px]"
            options={
              sortedCarBrand.find((m) => m.name === selectedBrand)?.models || []
            }
            setValue={setValue}
          />
          <SelectInput
            label="Vehicle Class"
            name="vehicleClass"
            register={register}
            errors={errors}
            trigger={trigger}
            width="w-[200px]"
            value={getValues("vehicleClass")}
            setValue={setValue}
            options={carClass}
          />
          <TextInput
            value={getValues("year")}
            label="Year"
            name="year"
            register={register}
            errors={errors}
            trigger={trigger}
            width="w-[200px]"
            type="number"
            setValue={setValue}
          />
          <SelectInput
            label="Vehicle Type"
            name="vehicleType"
            value={getValues("vehicleType")}
            register={register}
            options={carType}
            errors={errors}
            setValue={setValue}
            width="w-[200px]"
            trigger={trigger}
          />
          <SelectInput
            label="Country"
            name="country"
            value={getValues("country")}
            register={register}
            errors={errors}
            setValue={setValue}
            options={[]}
            width="w-[200px]"
            trigger={trigger}
          />
          <TextInput
            value={getValues("registryDate")}
            label="Registry Date"
            name="registryDate"
            type="date"
            register={register}
            trigger={trigger}
            errors={errors}
            width="w-[200px]"
            setValue={setValue}
          />
          <TextInput
            value={getValues("licencePlate")}
            label="Licence Plate"
            name="licencePlate"
            type="text"
            register={register}
            errors={errors}
            trigger={trigger}
            width="w-[200px]"
            setValue={setValue}
          />
          <TextInput
            value={getValues("color")}
            label="Color"
            name="color"
            type="text"
            register={register}
            trigger={trigger}
            errors={errors}
            width="w-[200px]"
            setValue={setValue}
          />
          <SelectInput
            value={getValues("transmission")}
            label="Transmission"
            name="transmission"
            register={register}
            trigger={trigger}
            errors={errors}
            options={["Automatic", "Manual"]}
            width="w-[200px]"
            setValue={setValue}
          />
          <TextInput
            value={getValues("horsePower")}
            label="Horse Power"
            name="horsePower"
            type="number"
            register={register}
            trigger={trigger}
            errors={errors}
            width="w-[200px]"
            setValue={setValue}
          />
          <SelectInput
            value={getValues("fuel")}
            label="Fuel"
            name="fuel"
            options={["Diesel", "Gasoline", "Electric", "Hybrid"]}
            register={register}
            trigger={trigger}
            errors={errors}
            width="w-[200px]"
            setValue={setValue}
          />
          <TextInput
            value={getValues("seatCapacity")}
            label="Seat Capacity"
            name="seatCapacity"
            type="number"
            register={register}
            trigger={trigger}
            errors={errors}
            width="w-[200px]"
            setValue={setValue}
          />
          <TextInput
            value={getValues("door")}
            label="Door"
            name="door"
            type="number"
            register={register}
            trigger={trigger}
            errors={errors}
            width="w-[200px]"
            setValue={setValue}
          />
          <TextInput
            value={getValues("dailyPrice")}
            label="Daily Price"
            name="dailyPrice"
            type="number"
            register={register}
            trigger={trigger}
            width="w-[200px]"
            errors={errors}
            setValue={setValue}
          />
          <div className="flex w-full justify-end">
            <Button
              className="h-9 m-3"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={handleSubmit(onSubmit)}
            >
              Ajouter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CarForm;
