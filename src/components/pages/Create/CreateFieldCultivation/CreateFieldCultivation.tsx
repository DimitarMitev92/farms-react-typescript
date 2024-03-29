import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FieldCultivationHandler,
  FieldOption,
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
  ErrorMsg,
  Select,
  Option,
  FormTitle,
  FromSubTitle,
} from "../../../../styles/Form.styled";
import React from "react";
import {
  createFieldCultivation,
  createGrowingProcess,
  fetchCrops,
  fetchCultivations,
  fetchFields,
  fetchMachinery,
  fetchMachineryByFieldId,
} from "./CreateFieldCultivation.logic";
import { Button } from "../../../../styles/Global.styled";
import { catalog } from "../../../../static/endPoints";
import { Crop, Cultivation, Machinery } from "../../../../static/interfaces";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormSkeleton } from "../../Skeleton/SkeletonForm";

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
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [defaultFieldId, setDefaultFieldId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const cultivationData = await fetchCultivations(user);
          setCultivationOptions(cultivationData);

          const machineryData = await fetchMachinery(user);
          setMachineryOptions(machineryData);

          const cropData = await fetchCrops(user);
          setCropOptions(cropData);

          const fieldData = await fetchFields(user);
          setFieldOptions(fieldData);

          if (fieldData.length > 0) {
            setDefaultFieldId(fieldData[0].id);
            setSelectedField(fieldData[0].id);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          setError("root", {
            message: error.message,
          });
          toast.error(`${error.message}`);
        } else {
          console.error("An unexpected error occurred:", error);
          toast.error(`${error}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user && selectedField) {
        const fetchedMachineryData = await fetchMachineryByFieldId(
          user,
          selectedField
        );
        setMachineryOptions(fetchedMachineryData);
      }
    };
    fetchData();
  }, [selectedField]);

  const onFieldCultivationHandler: SubmitHandler<
    FieldCultivationHandler
  > = async (fieldCultivationObj) => {
    const growingProcessObj = {
      cropId: fieldCultivationObj.cropId,
      fieldId: fieldCultivationObj.fieldId,
    };
    try {
      if (user) {
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

        navigate(`${catalog.FIELD_CULTIVATION}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
        toast.error(`${error.message}`);
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error(`${error}`);
      }
    }
  };

  const handleSelectedField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedField(selectedId);
  };

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <Form onSubmit={handleSubmit(onFieldCultivationHandler)}>
      <FormTitle>Create a field cultivation</FormTitle>
      <FromSubTitle>Please first select field.</FromSubTitle>
      {fieldCultivationData.map((el, key) => {
        return (
          <React.Fragment key={key}>
            <Label>{el.placeholder}</Label>
            {el.type === "select" ? (
              <Select
                {...register(`${el.registerName}`)}
                onChange={
                  el.registerName === "fieldId"
                    ? handleSelectedField
                    : undefined
                }
                defaultValue={
                  el.registerName === "fieldId" && defaultFieldId !== null
                    ? defaultFieldId
                    : undefined
                }
              >
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
                        {machinery.brand} {machinery.model} -{" "}
                        {machinery.identification_number}
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
                disabled={el.registerName === "machineryId" && !selectedField}
              />
            )}
            {errors[el.errors]?.message && (
              <ErrorMsg>{errors[el.errors]?.message as string}</ErrorMsg>
            )}
          </React.Fragment>
        );
      })}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Create"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
