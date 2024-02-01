import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Crop,
  Cultivation,
  FieldCultivationHandler,
  FieldOption,
  Machinery,
  fieldCultivationData,
  fieldCultivationSchema,
} from "./CreateFieldCultivation.static";
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
import {
  createFieldCultivation,
  createGrowingProcess,
  fetchCrops,
  fetchCultivations,
  fetchFields,
  fetchMachinery,
} from "./CreateFieldCultivation.logic";

export const CreateFieldCultivation = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FieldCultivationHandler>({
    resolver: zodResolver(fieldCultivationSchema),
  });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [cultivationOptions, setCultivationOptions] = useState<Cultivation[]>(
    []
  );
  const [machineryOptions, setMachineryOptions] = useState<Machinery[]>([]);
  const [cropOptions, setCropOptions] = useState<Crop[]>([]);
  const [fieldOptions, setFieldOptions] = useState<FieldOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cultivationData = await fetchCultivations(user);
        setCultivationOptions(cultivationData);

        const machineryData = await fetchMachinery(user);
        setMachineryOptions(machineryData);

        const cropData = await fetchCrops(user);
        setCropOptions(cropData);

        const fieldData = await fetchFields(user);
        setFieldOptions(fieldData);
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

  const onFieldCultivationHandler: SubmitHandler<
    FieldCultivationHandler
  > = async (fieldCultivationObj) => {
    const growingProcessObj = {
      cropId: fieldCultivationObj.cropId,
      fieldId: fieldCultivationObj.fieldId,
    };
    try {
      const growingProcessObjFromAPI = await createGrowingProcess(
        growingProcessObj,
        user
      );

      const fieldCultivationObjForRes = {
        growingProcessId: growingProcessObjFromAPI.id,
        cultivationId: fieldCultivationObj.cultivationId,
        machineryId: fieldCultivationObj.machineryId,
        startingDate: new Date(fieldCultivationObj?.startingDate) || null,
      };
      await createFieldCultivation(fieldCultivationObjForRes, user);

      navigate("/catalog/field-cultivation");
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
    <Form onSubmit={handleSubmit(onFieldCultivationHandler)}>
      <FormTitle>Create a field cultivation</FormTitle>
      {fieldCultivationData.map((el, key) => {
        return (
          <React.Fragment key={key}>
            <Label>{el.placeholder}</Label>
            {el.type === "select" ? (
              <Select {...register(`${el.registerName}`)}>
                <Option value="" disabled>
                  {el.placeholder}
                </Option>
                {el.registerName === "cultivationId"
                  ? cultivationOptions.map((cultivation) => (
                      <Option key={cultivation.id} value={cultivation.id}>
                        {cultivation.cultivation}
                      </Option>
                    ))
                  : el.registerName === "machineryId"
                  ? machineryOptions.map((machinery) => (
                      <Option key={machinery.id} value={machinery.id}>
                        {machinery.brand}
                      </Option>
                    ))
                  : el.registerName === "cropId"
                  ? cropOptions.map((crop) => (
                      <Option key={crop.id} value={crop.id}>
                        {crop.crop}
                      </Option>
                    ))
                  : fieldOptions.map((field) => (
                      <Option key={field.id} value={field.id}>
                        {field.name}
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

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
