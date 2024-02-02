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
        const url = endpoint.FARM;
        const farmsData = await fetchDataFromApi(
          url,
          user!,
          method.GET,
          null,
          "Error fetching farms data"
        );
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
        const url = `${endpoint.MACHINERY}/${id}`;
        const machineryData = await fetchDataFromApi(
          url,
          user!,
          method.GET,
          null,
          "Error fetching machinery data"
        );

        setValue("brand", machineryData.brand);
        setValue("model", machineryData.model);
        setValue("identificationNumber", machineryData.identificationNumber);
        setValue("farmId", machineryData.farmId);
      } catch (error) {
        console.error("Error fetching machinery data:", error);
      }
    };

    fetchFarms();
    fetchMachinery();
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
