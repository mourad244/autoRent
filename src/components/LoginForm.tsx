import React, { useState, useContext, useEffect } from "react";
import Register from "./Register";
import Modal from "../common/modal";
import { useForm } from "react-hook-form";
import TextInput from "../common/TextInput";

import { login } from "../services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import LanguageSwitcher from "../common/LanguageSwitcher";
import { NavigateFunction, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import ButtonSubmit from "../common/ButtonSubmit";

type UserSubmitForm = {
  email: string;
  password: string;
};

function LoginForm() {
  let navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lockoutDuration, setLockoutDuration] = useState<number>(10);
  const [remainingLockoutTime, setRemainingLockoutTime] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must not exceed 128 characters"),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const handleFocus = () => {
    setError("");
  };

  const onSubmit = (data: UserSubmitForm) => {
    // call data from api
    const { email, password } = data;

    setError("");
    setLoading(true);

    /* login(email, password).then(
      () => {
        navigate("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setError(resMessage);
      }
    ); */
    // 2. i will simulate data from api
    if (email !== "mourad@gmail.com" && password !== "mourad123") {
      reset();
      setError("Invalid email or password");
      setFailedAttempts((prevFailedAttempts) => prevFailedAttempts + 1);

      if (failedAttempts + 1 >= 5) {
        setIsLocked(true);
        setRemainingLockoutTime(lockoutDuration);

        const interval = setInterval(() => {
          setRemainingLockoutTime(
            (prevRemainingLockoutTime) => prevRemainingLockoutTime - 1
          );
        }, 1000);

        setTimeout(() => {
          clearInterval(interval);
          setIsLocked(false);
          setFailedAttempts(0);
        }, lockoutDuration * 1000);
        setIsLocked(true);
      }
    } else {
      localStorage.setItem(
        "user",
        '{"id":1,"email":"mourad@gmail.com","role":"lessor","exp":1629788400}'
      );

      navigate("/");
      window.location.reload();
    }
  };
  // if (currentLanguage === "ar") {
  //   document.body.style.direction = "rtl";
  // } else {
  //   document.body.style.direction = "ltr";
  // }
  return (
    <div className="h-screen flex flex-wrap justify-around items-center">
      <LanguageSwitcher />
      <div className="flex flex-col w-[400px] h-[fit-content] p-5">
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          className="mx-auto h-[100px]"
        />
        <div className="flex flex-col items-center text-center">
          <h1>{t("login.welcome")}</h1>
          <p>{t("login.description")}</p>
        </div>
      </div>
      <div className="shadow-md p-5 rounded h-[fit-content]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="email"
            label={t("login.email")}
            register={register}
            errors={errors}
            value={getValues("email")}
            trigger={trigger}
            setValue={setValue}
          />
          <TextInput
            name="password"
            label={t("login.password")}
            type="password"
            register={register}
            errors={errors}
            value={getValues("password")}
            setValue={setValue}
            trigger={trigger}
            handleFocus={handleFocus}
          />
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {!isLocked ? (
            <ButtonSubmit
              type="submit"
              label={t("login.login")}
              buttonType="button"
            />
          ) : (
            <div className="alert alert-danger mt-3" role="alert">
              Your account is locked for {remainingLockoutTime} seconds
            </div>
          )}
        </form>
        <div className="mt-3 flex justify-center items-center">
          <button
            type="button"
            onClick={handleOpenModal}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            {t("login.createAccount")}
          </button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <Register />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
