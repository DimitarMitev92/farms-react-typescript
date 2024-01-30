import React from "react";
import {
  Form,
  Label,
  Input,
  Button,
  ErrorMsg,
} from "../../../styles/Form.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import {
  API_REGISTER_HEADERS,
  API_REGISTER_METHOD,
  API_REGISTER_URL,
  registerData,
  schema,
} from "./Register.static";
import { useNavigate } from "react-router-dom";
import { registerService } from "./Register.logic";
import { useAuth } from "../../../hooks/useAuth";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const { login } = useAuth();

  const onRegisterHandler: SubmitHandler<FormData> = async (userObj) => {
    try {
      const options = {
        method: API_REGISTER_METHOD,
        headers: API_REGISTER_HEADERS,
        body: JSON.stringify({
          firstName: userObj.firstName,
          lastName: userObj.lastName,
          email: userObj.email,
          password: userObj.password,
        }),
      };

      const userDataFromApi = await registerService(API_REGISTER_URL, options);
      login(userDataFromApi);
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
    <Form onSubmit={handleSubmit(onRegisterHandler)}>
      {registerData.map((el, key) => {
        return (
          <React.Fragment key={key}>
            <Label>{el.placeholder}</Label>
            <Input
              {...register(
                `${el.registerName}` as
                  | "firstName"
                  | "lastName"
                  | "email"
                  | "password"
              )}
              type={el.type}
              placeholder={el.placeholder}
            />
            {errors[el.errors as keyof FieldErrors<FormData>] && (
              <ErrorMsg>
                {errors[el.errors as keyof FieldErrors<FormData>]?.message}
              </ErrorMsg>
            )}
          </React.Fragment>
        );
      })}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
