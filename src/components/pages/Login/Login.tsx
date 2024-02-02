import React, { useContext } from "react";
import { Form, Label, Input, ErrorMsg } from "../../../styles/Form.styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { loginData, schema, FormLoginData } from "./Login.static";
import { useNavigate } from "react-router-dom";
import { loginService } from "./Login.logic";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { UserContext } from "../../../context/UserContext";
import { Button } from "../../../styles/Global.styled";
import { catalog, endpoint, header, method } from "../../../static/endPoints";

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
        method: method.POST,
        headers: header.CONTENT_TYPE_APP_JSON,
        body: JSON.stringify({
          email: userObj.email,
          password: userObj.password,
        }),
      };

      const userDataFromApi = await loginService(endpoint.LOGIN, options);
      setItem("user", JSON.stringify(userDataFromApi));
      setUser(userDataFromApi);
      navigate(`${catalog.FARM}`);
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
