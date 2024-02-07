import { SubmitHandler, useForm } from "react-hook-form";
import { UserHandler, userData, userSchema } from "./UpdateUser.static";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { auth, endpoint, method } from "../../../../static/endPoints";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormSkeleton } from "../../Skeleton/SkeletonForm";
import {
  Form,
  FormTitle,
  Label,
  Select,
  Option,
  Input,
  ErrorMsg,
} from "../../../../styles/Form.styled";
import React from "react";
import { Button } from "../../../../styles/Global.styled";

export const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserHandler>({ resolver: zodResolver(userSchema) });

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const rights = ["OWNER", "OPERATOR", "VIEWER"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const url = `${endpoint.DASHBOARD}/${id}`;
          const currentUser = await fetchDataFromApi(
            url,
            user,
            method.GET,
            null,
            "Error fetching user"
          );

          // Set values for each input field
          setValue("email", currentUser.email);
          setValue("firstName", currentUser.firstName);
          setValue("lastName", currentUser.lastName);
          setValue("rights", currentUser.rights);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError("root", {
            message: error.message,
          });
          toast.error(`${error.message}`);
        } else {
          console.error("An unexpected error occurred:", error);
          toast.error(`${error}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, user, setValue]);

  const onUserHandler: SubmitHandler<UserHandler> = async (userObj) => {
    try {
      const url = `${endpoint.DASHBOARD}/${id}`;
      await fetchDataFromApi(
        url,
        user!,
        method.PATCH,
        userObj,
        "Error updating user data"
      );
      navigate(`${auth.DASHBOARD}`);
    } catch (error) {
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

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <Form onSubmit={handleSubmit(onUserHandler)}>
      <FormTitle>Update a user</FormTitle>
      {userData.map((el, key) => (
        <React.Fragment key={key}>
          <Label>{el.placeholder}</Label>
          {el.type === "select" ? (
            <Select {...register(`${el.registerName}`)}>
              <Option value="" disabled>
                {el.placeholder}
              </Option>
              {rights.map((right, id) => (
                <Option key={id} value={right}>
                  {right}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              {...register(`${el.registerName}`)}
              type={el.type}
              placeholder={el.placeholder}
            />
          )}
          {errors[el.errors]?.message && (
            <ErrorMsg>{errors[el.errors]?.message as string}</ErrorMsg>
          )}
        </React.Fragment>
      ))}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Update"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
