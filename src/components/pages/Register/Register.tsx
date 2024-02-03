import React, { useContext } from "react";
import {
  Form,
  Label,
  Input,
  ErrorMsg,
  FormTitle,
} from "../../../styles/Form.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { FormRegisterData, registerData, schema } from "./Register.static";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { UserContext } from "../../../context/UserContext";
import { Button } from "../../../styles/Global.styled";
import { catalog, endpoint, header, method } from "../../../static/endPoints";
import { signService } from "../../../services/signService";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const url = endpoint.REGISTER;
      const options = {
        method: method.POST,
        headers: header.CONTENT_TYPE_APP_JSON,
        body: JSON.stringify({
          firstName: userObj.firstName,
          lastName: userObj.lastName,
          email: userObj.email,
          password: userObj.password,
        }),
      };

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

  return (
    <Form onSubmit={handleSubmit(onRegisterHandler)}>
      <FormTitle>Register</FormTitle>
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
