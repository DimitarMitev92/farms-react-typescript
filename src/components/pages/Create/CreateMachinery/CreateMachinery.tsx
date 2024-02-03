import React, { useEffect, useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MachineryHandler,
  machineryData,
  machinerySchema,
} from "./CreateMachinery.static";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Farm } from "../../../../static/interfaces";
import {
  FetchDataError,
  fetchDataFromApi,
} from "../../../../services/fetchDataFromApi";
import { catalog, endpoint, method } from "../../../../static/endPoints";
import {
  ErrorMsg,
  Form,
  FormTitle,
  Input,
  Label,
  Select,
  Option,
} from "../../../../styles/Form.styled";
import { Button } from "../../../../styles/Global.styled";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateMachinery = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MachineryHandler>({ resolver: zodResolver(machinerySchema) });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [farmOptions, setFarmOptions] = useState<Farm[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const farmData = await fetchDataFromApi(
            endpoint.FARM,
            user,
            method.GET,
            null,
            "Error fetching farms"
          );
          setFarmOptions(farmData);
        }
      } catch (error) {
        if (error instanceof FetchDataError) {
          setError("root", { message: error.message });
          toast.error(`${error.message}`);
        } else {
          console.error("An unexpected error occurred:", error);
          toast.error(`${error}`);
        }
      }
    };

    fetchData();
  }, [user]);

  const onMachineryHandler: SubmitHandler<MachineryHandler> = async (
    machineryObj
  ) => {
    try {
      if (user) {
        await fetchDataFromApi(
          endpoint.MACHINERY,
          user,
          method.POST,
          machineryObj,
          "Error creating machinery"
        );
        navigate(`${catalog.MACHINERY}`);
      }
    } catch (error) {
      if (error instanceof FetchDataError) {
        setError("root", { message: error.message });
        toast.error(`${error.message}`);
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error(`${error}`);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onMachineryHandler)}>
      <FormTitle>Create a machinery</FormTitle>
      {machineryData.map((el, key) => (
        <React.Fragment key={key}>
          <Label>{el.placeholder}</Label>
          {el.type === "select" ? (
            <Select {...register(`${el.registerName}`)}>
              <Option value="" disabled>
                {el.placeholder}
              </Option>
              {farmOptions.map((farm) => (
                <Option key={farm.id} value={farm.id}>
                  {farm.name}
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
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
