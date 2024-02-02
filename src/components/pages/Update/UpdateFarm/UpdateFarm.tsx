// UpdateFarm.tsx
import React, { useContext, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import {
  ErrorMsg,
  Form,
  FormTitle,
  Input,
  Label,
} from "../../../../styles/Form.styled";
import { Button } from "../../../../styles/Global.styled";
import { catalog, endpoint, method } from "../../../../static/endPoints";
import {
  FarmHandler,
  FarmObj,
  farmData,
  farmSchema,
} from "../../Create/CreateFarm/CreateFarm.static";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";

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
        const url = `${endpoint.FARM}/${id}`;

        const farmData = await fetchDataFromApi(
          url,
          user!,
          method.GET,
          null,
          "Error fetching farm data"
        );
        setValue("name", farmData.name);
        setValue("location", farmData.location.coordinates.join(","));
      } catch (error) {
        console.error("Error fetching farm data:", error);
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

      const url = `${endpoint.FARM}/${id}`;

      await fetchDataFromApi(
        url,
        user!,
        method.PATCH,
        farmObj,
        "Error updating farm data"
      );
      navigate(`${catalog.FARM}`);
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
