import React, { useContext, useState } from "react";
import {
  Form,
  Label,
  Input,
  ErrorMsg,
  FormTitle,
  PasswordInputContainer,
  EyeIcon,
} from "../../../styles/Form.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import {
  loginData,
  FormLoginData,
  changePasswordLoginData,
  loginChangePasswordSchema,
} from "./Login.static";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { UserContext } from "../../../context/UserContext";
import { Anchor, Button } from "../../../styles/Global.styled";
import { catalog, endpoint, header, method } from "../../../static/endPoints";
import { signService } from "../../../services/signService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginData>({
    resolver: zodResolver(loginChangePasswordSchema),
  });

  const navigate = useNavigate();

  const { setItem } = useLocalStorage();

  const { setUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(false);

  const toggleChangePasswordForm = () => {
    setChangePasswordForm(!changePasswordForm);
  };

  const onLoginHandler: SubmitHandler<FormLoginData> = async (userObj) => {
    try {
      const parsedData = loginChangePasswordSchema.parse(userObj);
      console.log(parsedData);
      if (changePasswordForm) {
        if (parsedData.newPassword !== parsedData.compareNewPassword) {
          throw new Error("Passwords mismatch!");
        }
      }
      const url = changePasswordForm
        ? endpoint.CHANGE_PASSWORD
        : endpoint.LOGIN;
      const options = {
        method: method.POST,
        headers: header.CONTENT_TYPE_APP_JSON,
        body: changePasswordForm
          ? JSON.stringify({
              email: userObj.email,
              oldPassword: userObj.password?.toString(),
              newPassword: userObj.newPassword?.toString(),
            })
          : JSON.stringify({
              email: userObj.email,
              password: userObj.password?.toString(),
            }),
      };
      console.log(url);
      console.log(options);

      const userDataFromApi = await signService(url, options);
      setItem("user", JSON.stringify(userDataFromApi));
      setUser(userDataFromApi);
      navigate(`${catalog.FARM}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
        toast.error(`${error.message}`);
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error(`${error}`);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form onSubmit={handleSubmit(onLoginHandler)}>
      <FormTitle>{changePasswordForm ? "Change password" : "Login"}</FormTitle>
      {changePasswordForm
        ? changePasswordLoginData.map((el, key) => (
            <React.Fragment key={key}>
              <Label>{el.name}</Label>
              {el.type === "password" ? (
                <PasswordInputContainer>
                  <Input
                    {...register(`${el.registerName}` as "email" | "password")}
                    type={showPassword ? "text" : "password"}
                    placeholder={el.placeholder}
                  />
                  {showPassword ? (
                    <EyeIcon onClick={togglePasswordVisibility}>
                      <FiEye />
                    </EyeIcon>
                  ) : (
                    <EyeIcon onClick={togglePasswordVisibility}>
                      <FiEyeOff />
                    </EyeIcon>
                  )}
                </PasswordInputContainer>
              ) : (
                <Input
                  {...register(`${el.registerName}` as "email" | "password")}
                  type={el.type}
                  placeholder={el.placeholder}
                />
              )}
              {errors[el.errors as keyof FieldErrors<FormLoginData>] && (
                <ErrorMsg>
                  {errors[el.errors as keyof FieldErrors<FormLoginData>]
                    ?.message || ""}
                </ErrorMsg>
              )}
            </React.Fragment>
          ))
        : loginData.map((el, key) => (
            <React.Fragment key={key}>
              <Label>{el.name}</Label>
              {el.type === "password" ? (
                <PasswordInputContainer>
                  <Input
                    {...register(`${el.registerName}` as "email" | "password")}
                    type={showPassword ? "text" : "password"}
                    placeholder={el.placeholder}
                  />
                  {showPassword ? (
                    <EyeIcon onClick={togglePasswordVisibility}>
                      <FiEye />
                    </EyeIcon>
                  ) : (
                    <EyeIcon onClick={togglePasswordVisibility}>
                      <FiEyeOff />
                    </EyeIcon>
                  )}
                </PasswordInputContainer>
              ) : (
                <Input
                  {...register(`${el.registerName}` as "email" | "password")}
                  type={el.type}
                  placeholder={el.placeholder}
                />
              )}
              {errors[el.errors as keyof FieldErrors<FormLoginData>] && (
                <ErrorMsg>
                  {errors[el.errors as keyof FieldErrors<FormLoginData>]
                    ?.message || ""}
                </ErrorMsg>
              )}
            </React.Fragment>
          ))}
      <Anchor onClick={toggleChangePasswordForm}>
        {changePasswordForm ? "Login Form" : "Change password"}
      </Anchor>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
