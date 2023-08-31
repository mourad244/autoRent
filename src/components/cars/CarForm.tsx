import React, { useState, ChangeEvent } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../common/TextInput";
import { ICar } from "../../types/car.type";
import SelectInput from "../../common/SelectInput";
import carType from "../../context/data/carType";
import carBrand from "../../context/data/carBrand";
import carClass from "../../context/data/carClass";

function CarForm() {
  const [error, setError] = useState<string>("");

  const labelInside = false;

  let sortedCarBrand = carBrand.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
  });

  const validationSchema = Yup.object().shape({
    brand: Yup.string().required("brand is required"),
    model: Yup.string().required("model is required"),
    vehicleClass: Yup.string().required("vehicle class is required"),
    year: Yup.number().required("year is required"),
    vehicleType: Yup.string().required("vehicleType is required"),
    country: Yup.string().required("country is required"),
    registryDate: Yup.date().required("registryDate is required"),
    licencePlate: Yup.string().required("licencePlate is required"),
    color: Yup.string().required("color is required"),
    isAVailable: Yup.boolean(),
    transmission: Yup.string().required("transmission is required"),
    horsePower: Yup.number().required("horsePower is required"),
    fuel: Yup.string().required("fuel is required"),
    seatCapacity: Yup.number().required("seatCapacity is required"),
    door: Yup.number().required("door is required"),
    dailyPrice: Yup.number().required("dailyPrice is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ICar>({
    resolver: yupResolver(validationSchema),
  });
  const selectedBrand = watch("brand", "");
  console.log("selectedBrand", selectedBrand);
  const onSubmit = (data: ICar) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Car Details</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-[800px] flex flex-wrap"
      >
        <SelectInput
          options={sortedCarBrand}
          name="brand"
          label="Brand"
          register={register}
          errors={errors}
          width="w-[200px]"
          labelInside={labelInside}
        />
        <SelectInput
          key={selectedBrand}
          label="Model"
          name="model"
          register={register}
          errors={errors}
          width="w-[200px]"
          options={
            sortedCarBrand.find((m) => m.name === selectedBrand)?.models || []
          }
          labelInside={labelInside}
        />
        <SelectInput
          label="Vehicle Class"
          name="vehicleClass"
          register={register}
          errors={errors}
          width="w-[200px]"
          labelInside={labelInside}
          options={carClass}
        />
        <TextInput
          label="Year"
          name="year"
          type="number"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <SelectInput
          label="Vehicle Type"
          name="vehicleType"
          register={register}
          options={carType}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Country"
          name="country"
          type="text"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Registry Date"
          name="registryDate"
          type="date"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Licence Plate"
          name="licencePlate"
          type="text"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Color"
          name="color"
          type="text"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Transmission"
          name="transmission"
          type="text"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Horse Power"
          name="horsePower"
          type="number"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Fuel"
          name="fuel"
          type="text"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Seat Capacity"
          name="seatCapacity"
          type="number"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Door"
          name="door"
          type="number"
          register={register}
          errors={errors}
          labelInside={labelInside}
          width="w-[200px]"
        />
        <TextInput
          label="Daily Price"
          name="dailyPrice"
          type="number"
          register={register}
          width="w-[200px]"
          labelInside={labelInside}
          errors={errors}
        />
      </form>
    </div>
  );
}

export default CarForm;
