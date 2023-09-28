import React, { useState } from "react";
import { IUser } from "../types/user.type";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import * as Yup from "yup";
import FileInput from "../common/FileInput";
import TextInput from "../common/TextInput";
import { get, useForm } from "react-hook-form";
import ButtonSubmit from "../common/ButtonSubmit";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { register as reg } from "../services/auth.service";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture: string;
};
function Register() {
  const { t } = useTranslation();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [, setForceRender] = useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    // only letters in first name and last name
    firstName: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
      .required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Confirm Password does not match"),
    picture: Yup.string().required("Picture is required"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    trigger,

    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(validationSchema),
  });
  const handleRegister = (data: User) => {
    const { email, password } = data;
    reg(email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
    >
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        className=" mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(handleRegister)}
        noValidate
      >
        <div className="mb-4 flex flex-col ">
          <TextInput
            name="firstName"
            label={t("register.firstName")}
            register={register}
            errors={errors}
            value={get("firstName")}
            trigger={trigger}
            setValue={setValue}
            width="w-[150px]"
          />
          <TextInput
            name="lastName"
            label={t("register.lastName")}
            register={register}
            errors={errors}
            value={get("lastName")}
            trigger={trigger}
            setValue={setValue}
            width="w-[150px]"
          />
          <TextInput
            name="email"
            label={t("register.email")}
            register={register}
            errors={errors}
            value={get("email")}
            trigger={trigger}
            setValue={setValue}
          />
          <TextInput
            name="password"
            label={t("register.password")}
            type="password"
            register={register}
            errors={errors}
            isPasswordStrength={true}
            value={get("password")}
            trigger={trigger}
            setValue={setValue}
          />
          <TextInput
            name="confirmPassword"
            label={t("register.confirmPassword")}
            type="password"
            register={register}
            errors={errors}
            isPasswordStrength={true}
            value={get("confirmPassword")}
            trigger={trigger}
            setValue={setValue}
          />
          <FileInput
            name="picture"
            label={t("register.picture")}
            register={register}
            setValue={setValue}
            value={get("picture")}
            trigger={trigger}
            errors={errors}
            width="w-[150px]"
          />
        </div>
        <ButtonSubmit
          type="submit"
          label={t("register.signUp")}
          buttonType="submit"
        />
      </form>
    </Card>
  );
}

export default Register;
