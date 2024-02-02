import { SubmitHandler, useForm } from "react-hook-form";
import {
  FarmHandler,
  FarmObj,
  farmData,
  farmSchema,
} from "../../Create/CreateFarm/CreateFarm.static";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { farmService } from "./UpdateFarm.logic";
import {
  ErrorMsg,
  Form,
  FormTitle,
  Input,
  Label,
} from "../../../../styles/Form.styled";
import React from "react";
import { Button } from "../../../../styles/Global.styled";
import {
  API_UPDATE_FARM_HEADERS,
  API_UPDATE_FARM_METHOD_GET,
  API_UPDATE_FARM_METHOD_PATCH,
  API_UPDATE_FARM_URL,
} from "./UpdateFarm.static";

export const UpdateFarm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FarmHandler>({
    resolver: zodResolver(farmSchema),
  });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        const url = `${API_UPDATE_FARM_URL}/${id}`;
        const options = {
          method: API_UPDATE_FARM_METHOD_GET,
          headers: {
            ...API_UPDATE_FARM_HEADERS,
            Authorization: `Bearer ${user?.access_token}`,
          },
        };

        const farmData = await farmService(url, options);
        setValue("name", farmData.name);
        setValue("location", farmData.location.coordinates.join(","));
      } catch (error) {
        console.log("Error fetching farm data:", error);
      }
    };

    fetchFarmData();
  }, [id, user, setValue]);

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
        method: API_UPDATE_FARM_METHOD_PATCH,
        headers: {
          ...API_UPDATE_FARM_HEADERS,
          Authorization: `Bearer ${user?.access_token}`,
        },
        body: JSON.stringify(farmObj),
      };

      await farmService(`${API_UPDATE_FARM_URL}/${id}`, options);
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
