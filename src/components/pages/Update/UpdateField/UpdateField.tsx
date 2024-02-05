// UpdateField.tsx
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
  TextArea,
} from "../../../../styles/Form.styled";
import { Button } from "../../../../styles/Global.styled";
import { catalog, endpoint, method } from "../../../../static/endPoints";
import { FieldUpdateHandler } from "./UpdateField.static";
import {
  fieldData,
  fieldSchema,
} from "../../Create/CreateField/CreateField.static";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { Farm, Soil } from "../../../../static/interfaces";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormSkeleton } from "../../Skeleton/SkeletonForm";

export const UpdateField = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FieldUpdateHandler>({ resolver: zodResolver(fieldSchema) });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [soilOptions, setSoilOptions] = useState<Soil[]>([]);
  const [farmOptions, setFarmOptions] = useState<Farm[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [soilsData, farmsData, fieldData] = await Promise.all([
          fetchDataFromApi(
            endpoint.SOIL,
            user!,
            method.GET,
            null,
            "Error fetching soils data"
          ),
          fetchDataFromApi(
            endpoint.FARM,
            user!,
            method.GET,
            null,
            "Error fetching farms data"
          ),
          fetchDataFromApi(
            `${endpoint.FIELD}/${id}`,
            user!,
            method.GET,
            null,
            "Error fetching field data"
          ),
        ]);

        setSoilOptions(soilsData);
        setFarmOptions(farmsData);

        setValue("name", fieldData.name);
        setValue("farmId", fieldData.farmId);
        setValue("soilId", fieldData.soilId);
        setValue(
          "boundaries",
          JSON.stringify(fieldData.boundaries.coordinates)
        );
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

  const onFieldHandler: SubmitHandler<FieldUpdateHandler> = async (
    fieldObj
  ) => {
    try {
      if (typeof fieldObj.boundaries === "string") {
        fieldObj.boundaries = JSON.parse(fieldObj.boundaries);
      } else {
        if (!fieldObj.boundaries.type || !fieldObj.boundaries.coordinates) {
          throw new Error("Invalid boundaries object");
        }
      }

      const url = `${endpoint.FIELD}/${id}`;

      await fetchDataFromApi(
        url,
        user!,
        method.PATCH,
        fieldObj,
        "Error updating field data"
      );
      navigate(`${catalog.FIELD}`);
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
    <Form onSubmit={handleSubmit(onFieldHandler)}>
      <FormTitle>Create a field</FormTitle>
      {fieldData.map((el, key) => (
        <React.Fragment key={key}>
          <Label>{el.placeholder}</Label>
          {el.type === "select" ? (
            <Select {...register(`${el.registerName}`)}>
              <Option value="" disabled>
                {el.placeholder}
              </Option>
              {el.registerName === "farmId"
                ? farmOptions.map((farm) => (
                    <Option key={farm.id} value={farm.id}>
                      {farm.name}
                    </Option>
                  ))
                : soilOptions.map((soil) => (
                    <Option key={soil.id} value={soil.id}>
                      {soil.soil}
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
      <Label>Boundaries</Label>
      <TextArea {...register(`boundaries`)} placeholder="Boundaries"></TextArea>
      {errors.boundaries && (
        <ErrorMsg>{errors.boundaries.message as string}</ErrorMsg>
      )}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
