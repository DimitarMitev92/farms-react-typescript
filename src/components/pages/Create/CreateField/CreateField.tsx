import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import {
  Farm,
  FieldHandler,
  Soil,
  fieldData,
  fieldSchema,
} from "./CreateField.static";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Label,
  Input,
  Button,
  ErrorMsg,
  TextArea,
  Select,
  Option,
} from "../../../../styles/Form.styled";
import React from "react";
import { FormFarmData } from "../CreateFarm/CreateFarm.static";
import { createField, fetchFarms, fetchSoils } from "./CreateField.logic";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const soils = await fetchSoils(user);
        setSoilOptions(soils);

        const farms = await fetchFarms(user);
        setFarmOptions(farms);
      } catch (error) {
        if (error instanceof Error) {
          setError("root", {
            message: error.message,
          });
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };

    fetchData();
  }, []);

  const onFieldHandler: SubmitHandler<FieldHandler> = async (fieldObj) => {
    try {
      await createField(user, fieldObj);
      navigate("/catalog/field");
    } catch (error) {
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
    <Form onSubmit={handleSubmit(onFieldHandler)}>
      {fieldData.map((el, key) => {
        return (
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
        );
      })}
      <Label>Boundaries</Label>
      <TextArea {...register(`boundaries`)} placeholder="Boundaries"></TextArea>
      {errors.boundaries && (
        <ErrorMsg>
          {errors.boundaries.message as keyof FieldErrors<FormFarmData>}
        </ErrorMsg>
      )}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
