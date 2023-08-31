import React, { useState } from "react";
import { IUser } from "../types/user.type";

import * as Yup from "yup";
import FileInput from "../common/FileInput";
import TextInput from "../common/TextInput";
import { useForm } from "react-hook-form";
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
    <div className="w-[400px]">
      <h2 className="text-center mb-5">{t("register.signUp")}</h2>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <TextInput
          name="firstName"
          label={t("register.firstName")}
          register={register}
          errors={errors}
        />
        <TextInput
          name="lastName"
          label={t("register.lastName")}
          register={register}
          errors={errors}
        />
        <TextInput
          name="email"
          label={t("register.email")}
          register={register}
          errors={errors}
        />
        <TextInput
          name="password"
          label={t("register.password")}
          type="password"
          register={register}
          errors={errors}
          isPasswordStrength={true}
        />
        <TextInput
          name="confirmPassword"
          label={t("register.confirmPassword")}
          type="password"
          register={register}
          errors={errors}
          isPasswordStrength={true}
        />
        <FileInput
          name="picture"
          label={t("register.picture")}
          register={register}
          watch={watch}
        />
        <ButtonSubmit
          type="submit"
          label={t("register.signUp")}
          buttonType="submit"
        />
      </form>
    </div>
  );
}

export default Register;
