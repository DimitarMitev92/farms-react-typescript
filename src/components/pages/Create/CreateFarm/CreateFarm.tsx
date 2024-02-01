import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import {
  Form,
  Label,
  Input,
  ErrorMsg,
  FormTitle,
} from "../../../../styles/Form.styled";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import {
  API_CREATE_FARM_HEADERS,
  API_CREATE_FARM_METHOD,
  API_CREATE_FARM_URL,
  FarmHandler,
  FarmObj,
  farmData,
  farmSchema,
} from "./CreateFarm.static";
import { farmService } from "./CreateFarm.logic";
import { Button } from "../../../../styles/Global.styled";

export const CreateFarm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FarmHandler>({
    resolver: zodResolver(farmSchema),
  });

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const onFarmHandler: SubmitHandler<FarmHandler> = async (farmObj) => {
    try {
      let coordinates: [number, number];

      if (typeof farmObj.location === "string") {
        coordinates = farmObj.location.split(",").map(parseFloat) as [
          number,
          number
        ];
      } else {
        coordinates = farmObj.location.coordinates;
      }

      farmObj.location = {
        type: "Point",
        coordinates,
      } as FarmObj["location"];

      const options = {
        method: API_CREATE_FARM_METHOD,
        headers: {
          ...API_CREATE_FARM_HEADERS,
          Authorization: `Bearer ${user?.access_token}`,
        },
        body: JSON.stringify(farmObj),
      };

      await farmService(API_CREATE_FARM_URL, options);
      navigate("/catalog/farm");
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
    <Form onSubmit={handleSubmit(onFarmHandler)}>
      <FormTitle>Create a farm</FormTitle>
      {farmData.map((el, key) => {
        return (
          <React.Fragment key={key}>
            <Label>{el.placeholder}</Label>
            <Input
              {...register(`${el.registerName}`)}
              type={el.type}
              placeholder={el.placeholder}
            />
            {errors[el.errors]?.message && (
              <ErrorMsg>{errors[el.errors]?.message as string}</ErrorMsg>
            )}
          </React.Fragment>
        );
      })}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
