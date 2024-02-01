import React, { useContext } from "react";
import { Form, Label, Input, ErrorMsg } from "../../../styles/Form.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import {
  API_REGISTER_HEADERS,
  API_REGISTER_METHOD,
  API_REGISTER_URL,
  FormRegisterData,
  registerData,
  schema,
} from "./Register.static";
import { useNavigate } from "react-router-dom";
import { registerService } from "./Register.logic";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { UserContext } from "../../../context/UserContext";
import { Button } from "../../../styles/Global.styled";

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const { setItem } = useLocalStorage();

  const { setUser } = useContext(UserContext);

  const onRegisterHandler: SubmitHandler<FormRegisterData> = async (
    userObj
  ) => {
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
            {errors[el.errors as keyof FieldErrors<FormRegisterData>] && (
              <ErrorMsg>
                {
                  errors[el.errors as keyof FieldErrors<FormRegisterData>]
                    ?.message
                }
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
