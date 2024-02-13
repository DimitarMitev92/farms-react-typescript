// UpdateMachinery.tsx
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import {
  ErrorMsg,
  Form,
  FormTitle,
  Label,
  Select,
  Option,
  Input,
} from "../../../../styles/Form.styled";
import { Button } from "../../../../styles/Global.styled";
import { catalog, endpoint, method } from "../../../../static/endPoints";
import {
  MachineryHandler,
  machineryData,
  machinerySchema,
} from "../../Create/CreateMachinery/CreateMachinery.static";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { Farm } from "../../../../static/interfaces";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormSkeleton } from "../../Skeleton/SkeletonForm";

export const UpdateMachinery = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MachineryHandler>({ resolver: zodResolver(machinerySchema) });

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [farmOptions, setFarmOptions] = useState<Farm[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmsData, machineryData] = await Promise.all([
          fetchDataFromApi(
            endpoint.FARM,
            user!,
            method.GET,
            null,
            "Error fetching farms data"
          ),
          fetchDataFromApi(
            `${endpoint.MACHINERY}/${id}`,
            user!,
            method.GET,
            null,
            "Error fetching machinery data"
          ),
        ]);

        setFarmOptions(farmsData);

        setValue("brand", machineryData.brand);
        setValue("model", machineryData.model);
        setValue("identificationNumber", machineryData.identificationNumber);
        setValue("farmId", machineryData.farmId);

        setIsLoading(false);
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

  const onMachineryHandler: SubmitHandler<MachineryHandler> = async (
    machineryObj
  ) => {
    try {
      const url = `${endpoint.MACHINERY}/${id}`;

      await fetchDataFromApi(
        url,
        user!,
        method.PATCH,
        machineryObj,
        "Error updating machinery data"
      );
      navigate(`${catalog.MACHINERY}`);
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
    <Form onSubmit={handleSubmit(onMachineryHandler)}>
      <FormTitle>Update a machinery</FormTitle>
      {machineryData.map((el, key) => (
        <React.Fragment key={key}>
          <Label>{el.name}</Label>
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
        {isSubmitting ? "Loading..." : "Update"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
