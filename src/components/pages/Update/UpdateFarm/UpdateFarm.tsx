import { zodResolver } from "@hookform/resolvers/zod";
import { farmData, farmSchema } from "./UpdateFarm.static";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserContext } from "../../../../context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMsg, Form, Input, Label } from "../../../../styles/Form.styled";
import React from "react";
import { Button } from "../../../../styles/Global.styled";
import { FarmHandler } from "../../Create/CreateFarm/CreateFarm.static";
import { fetchFarm, updateFarm } from "./UpdateFarm.logic";

export const UpdateFarm = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FarmHandler>({ resolver: zodResolver(farmSchema) });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchFarmData = async () => {
      try {
        const farmData = await fetchFarm(id, user);
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
      await updateFarm(farmObj, id, user);
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
      {farmData.map((el, key) => (
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
      ))}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
