import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FieldHandler, fieldData, fieldSchema } from "./CreateField.static";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";
import { catalog, endpoint, method } from "../../../../static/endPoints";
import {
  Form,
  FormTitle,
  Label,
  Select,
  Option,
  Input,
  ErrorMsg,
  TextArea,
} from "../../../../styles/Form.styled";
import React from "react";
import { Button } from "../../../../styles/Global.styled";
import { Farm, Soil } from "../../../../static/interfaces";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormSkeleton } from "../../Skeleton/SkeletonForm";

export const CreateField = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FieldHandler>({ resolver: zodResolver(fieldSchema) });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [soilOptions, setSoilOptions] = useState<Soil[]>([]);
  const [farmOptions, setFarmOptions] = useState<Farm[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const [soils, farms] = await Promise.all([
            fetchDataFromApi(
              endpoint.SOIL,
              user,
              method.GET,
              null,
              "Failed to fetch soils"
            ),
            fetchDataFromApi(
              endpoint.FARM,
              user,
              method.GET,
              null,
              "Failed to fetch farms"
            ),
          ]);

          setSoilOptions(soils);
          setFarmOptions(farms);
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
  }, [user, setError]);

  const onFieldHandler: SubmitHandler<FieldHandler> = async (fieldObj) => {
    try {
      if (user) {
        const coordinates = JSON.parse(fieldObj.boundaries);

        fieldObj.boundaries = {
          type: "Polygon",
          coordinates,
        };

        await fetchDataFromApi(
          endpoint.FIELD,
          user,
          method.POST,
          fieldObj,
          "Failed to create field"
        );
        navigate(`${catalog.FIELD}`);
      }
    } catch (error) {
      setError("root", {
        message: String(error),
      });
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
          <Label>{el.name}</Label>
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
      <TextArea
        {...register(`boundaries`)}
        placeholder="You must submit a polygon"
      ></TextArea>
      {errors.boundaries && (
        <ErrorMsg>{errors.boundaries.message as string}</ErrorMsg>
      )}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Create"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
