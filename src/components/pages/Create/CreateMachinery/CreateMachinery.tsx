import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Farm,
  MachineryHandler,
  machineryData,
  machinerySchema,
} from "./CreateMachinery.static";
import { UserContext } from "../../../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Label,
  Input,
  Button,
  ErrorMsg,
  Select,
  Option,
  FormTitle,
} from "../../../../styles/Form.styled";
import React from "react";
import { createMachinery, fetchFarms } from "./CreateMachinery.logic";

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
        const farmData = await fetchFarms(user);
        setFarmOptions(farmData);
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

  const onMachineryHandler: SubmitHandler<MachineryHandler> = async (
    machineryObj
  ) => {
    try {
      await createMachinery(user, machineryObj);
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
            <Select
              {...register(`${el.registerName}`)}
              // placeholder={el.placeholder}
            >
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
