import { SubmitHandler, useForm } from "react-hook-form";
import {
  API_CREATE_FIELD_FARM_METHOD,
  API_CREATE_FIELD_FARM_URL,
  API_CREATE_FIELD_SOIL_METHOD,
  API_CREATE_FIELD_SOIL_URL,
  Farm,
  Soil,
  fieldData,
  fieldSchema,
} from "../../Create/CreateField/CreateField.static";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  API_UPDATE_FIELD_HEADERS,
  API_UPDATE_FIELD_METHOD_GET,
  API_UPDATE_FIELD_METHOD_PATCH,
  API_UPDATE_FIELD_URL,
  FieldUpdateHandler,
} from "./UpdateField.static";
import { fieldService } from "./UpdateField.logic";

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

  useEffect(() => {
    const fetchSoils = async () => {
      try {
        const url = API_CREATE_FIELD_SOIL_URL;
        const options = {
          method: API_CREATE_FIELD_SOIL_METHOD,
          headers: {
            ...API_UPDATE_FIELD_HEADERS,
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const soilsData = await fieldService(url, options);
        setSoilOptions(soilsData);
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

    const fetchFarms = async () => {
      try {
        const url = API_CREATE_FIELD_FARM_URL;
        const options = {
          method: API_CREATE_FIELD_FARM_METHOD,
          headers: {
            ...API_UPDATE_FIELD_HEADERS,
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const farmsData = await fieldService(url, options);
        setFarmOptions(farmsData);
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

    const fetchField = async () => {
      try {
        const url = `${API_UPDATE_FIELD_URL}/${id}`;
        const options = {
          method: API_UPDATE_FIELD_METHOD_GET,
          headers: {
            ...API_UPDATE_FIELD_HEADERS,
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const fieldData = await fieldService(url, options);

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
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };

    fetchSoils();
    fetchFarms();
    fetchField();
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

      const url = `${API_UPDATE_FIELD_URL}/${id}`;
      const options = {
        method: API_UPDATE_FIELD_METHOD_PATCH,
        headers: {
          ...API_UPDATE_FIELD_HEADERS,
          Authorization: `Bearer ${user?.access_token}`,
        },
        body: JSON.stringify(fieldObj),
      };

      await fieldService(url, options);
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
      <FormTitle>Create a field</FormTitle>
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
        <ErrorMsg>{errors.boundaries.message as string}</ErrorMsg>
      )}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
