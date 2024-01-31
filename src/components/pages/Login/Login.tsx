import React, { useContext } from "react";
import {
  Form,
  Label,
  Input,
  ErrorMsg,
  Button,
} from "../../../styles/Form.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import {
  loginData,
  schema,
  API_LOGIN_URL,
  API_LOGIN_METHOD,
  API_LOGIN_HEADERS,
  FormLoginData,
} from "./Login.static";
import { useNavigate } from "react-router-dom";
import { loginService } from "./Login.logic";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { UserContext } from "../../../context/UserContext";

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const { setItem } = useLocalStorage();

  const { setUser } = useContext(UserContext);

  const onLoginHandler: SubmitHandler<FormLoginData> = async (userObj) => {
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
      setItem("user", JSON.stringify(userDataFromApi));
      setUser(userDataFromApi);
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
          {errors[el.errors as keyof FieldErrors<FormLoginData>] && (
            <ErrorMsg>
              {errors[el.errors as keyof FieldErrors<FormLoginData>]?.message ||
                ""}
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
