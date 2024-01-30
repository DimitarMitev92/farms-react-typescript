// Login.tsx
import React from "react";
import {
  Form,
  Label,
  Input,
  ErrorMsg,
  Button,
} from "../../../styles/Form.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { loginData, schema } from "./Logic.static";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { loginService } from "./Logic.logic";

interface FormData {
  email: string;
  password: string;
}

const API_LOGIN_URL = "http://localhost:8080/auth/login";
const API_LOGIN_METHOD = "POST";
const API_LOGIN_HEADERS = {
  "Content-Type": "application/json",
};

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const { setItem } = useLocalStorage("access_token");

  const onLoginHandler: SubmitHandler<FormData> = async (userObj) => {
    try {
      const options = {
        method: API_LOGIN_METHOD,
        headers: API_LOGIN_HEADERS,
        body: JSON.stringify({
          email: userObj.email,
          password: userObj.password,
        }),
      };

      const userDataFromApi = await loginService(API_LOGIN_URL, options);

      setItem(userDataFromApi.access_token);
      navigate("/catalog/farm");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onLoginHandler)}>
      {loginData.map((el, key) => (
        <React.Fragment key={key}>
          <Label>{el.placeholder}</Label>
          <Input
            {...register(`${el.registerName}` as "email" | "password")}
            type={el.type}
            placeholder={el.placeholder}
          />
          {errors[el.errors as keyof FieldErrors<FormData>] && (
            <ErrorMsg>
              {errors[el.errors as keyof FieldErrors<FormData>]?.message || ""}
            </ErrorMsg>
          )}
        </React.Fragment>
      ))}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
