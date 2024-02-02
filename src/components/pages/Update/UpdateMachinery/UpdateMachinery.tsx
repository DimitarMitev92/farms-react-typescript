import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  FormTitle,
  Label,
  Select,
  Option,
  Input,
  ErrorMsg,
} from "../../../../styles/Form.styled";
import { Button } from "../../../../styles/Global.styled";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  API_CREATE_MACHINERY_URL,
  Farm,
  MachineryHandler,
  machineryData,
  machinerySchema,
} from "../../Create/CreateMachinery/CreateMachinery.static";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { API_CREATE_FARM_URL } from "../../Create/CreateFarm/CreateFarm.static";
import { API_CREATE_MACHINERY_FARM_METHOD } from "../../Catalog/CatalogMachinery/CatalogMachinery.static";
import {
  API_UPDATE_MACHINERY_HEADERS,
  API_UPDATE_MACHINERY_METHOD_GET,
  API_UPDATE_MACHINERY_METHOD_PATCH,
  API_UPDATE_MACHINERY_URL,
} from "./UpdateMachinery.static";
import { farmService } from "../UpdateFarm/UpdateFarm.logic";
import { machineryService } from "./UpdateMachinery.logic";

export const UpdateMachinery = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<MachineryHandler>({ resolver: zodResolver(machinerySchema) });

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const [farmOptions, setFarmOptions] = useState<Farm[]>([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const url = API_CREATE_FARM_URL;
        const options = {
          method: API_CREATE_MACHINERY_FARM_METHOD,
          headers: {
            ...API_UPDATE_MACHINERY_HEADERS,
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const farmsData = await farmService(url, options);
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

    const fetchMachinery = async () => {
      try {
        const url = `${API_CREATE_MACHINERY_URL}/${id}`;
        const options = {
          method: API_UPDATE_MACHINERY_METHOD_GET,
          headers: {
            ...API_UPDATE_MACHINERY_HEADERS,
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const machineryData = await machineryService(url, options);

        setValue("brand", machineryData.brand);
        setValue("model", machineryData.model);
        setValue("identificationNumber", machineryData.identificationNumber);
        setValue("farmId", machineryData.farmId);
      } catch (error) {
        console.log("Error fetching farm data:", error);
      }
    };

    fetchFarms();
    fetchMachinery();
  }, [id, user, setValue]);

  const onMachineryHandler: SubmitHandler<MachineryHandler> = async (
    machineryObj
  ) => {
    try {
      const url = `${API_UPDATE_MACHINERY_URL}/${id}`;
      const options = {
        method: API_UPDATE_MACHINERY_METHOD_PATCH,
        headers: {
          ...API_UPDATE_MACHINERY_HEADERS,
          Authorization: `Bearer ${user?.access_token}`,
        },
        body: JSON.stringify(machineryObj),
      };

      await machineryService(url, options);
      navigate("/catalog/machinery");
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
