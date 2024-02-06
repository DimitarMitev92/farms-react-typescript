import { SubmitHandler, useForm } from "react-hook-form";
import {
  FieldCultivationUpdateHandler,
  fieldCultivationData,
  fieldCultivationSchema,
} from "./UpdateFieldCultivation.static";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Crop,
  Cultivation,
  FieldCultivation,
  GrowingProcess,
  Machinery,
} from "../../../../static/interfaces";
import { FieldFromApi } from "../../Catalog/CatalogField/CatalogField.static";
import { catalog, endpoint, method } from "../../../../static/endPoints";
import { fetchDataFromApi } from "../../../../services/fetchDataFromApi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  Label,
  Select,
  Option,
  Input,
  ErrorMsg,
  FormTitle,
} from "../../../../styles/Form.styled";
import React from "react";
import { Button, SubTitle } from "../../../../styles/Global.styled";
import { FormSkeleton } from "../../Skeleton/SkeletonForm";
import { fetchMachineryByFieldId } from "../../Create/CreateFieldCultivation/CreateFieldCultivation.logic";

export const UpdateFieldCultivation = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FieldCultivationUpdateHandler>({
    resolver: zodResolver(fieldCultivationSchema),
  });

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [cultivationOptions, setCultivationOptions] = useState<Cultivation[]>(
    []
  );
  const [machineryOptions, setMachineryOptions] = useState<Machinery[]>([]);
  const [cropOptions, setCropOptions] = useState<Crop[]>([]);
  const [fieldOptions, setFieldOptions] = useState<FieldFromApi[]>([]);
  const [currentFieldCultivation, setCurrentFieldCultivation] =
    useState<FieldCultivation>();
  const [currentGrowingProcess, setCurrentGrowingProcess] =
    useState<GrowingProcess>();
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [defaultFieldId, setDefaultFieldId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const cultivationData = await fetchDataFromApi(
            endpoint.CULTIVATION,
            user,
            method.GET,
            null,
            "Error fetching cultivation data"
          );
          const machineryData = await fetchDataFromApi(
            endpoint.MACHINERY,
            user,
            method.GET,
            null,
            "Error fetching machineries data"
          );
          const cropData = await fetchDataFromApi(
            endpoint.CROP,
            user,
            method.GET,
            null,
            "Error fetching crops data"
          );
          const fieldData = await fetchDataFromApi(
            endpoint.FIELD,
            user,
            method.GET,
            null,
            "Error fetching fields data"
          );

          if (fieldData.length > 0) {
            setDefaultFieldId(fieldData[0].id);
            setSelectedField(fieldData[0].id);
          }

          setCultivationOptions(cultivationData);
          setMachineryOptions(machineryData);
          setCropOptions(cropData);
          setFieldOptions(fieldData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(`${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFieldCultivation = async () => {
      try {
        if (user) {
          const urlFieldCultivation = `${endpoint.FIELD_CULTIVATION}/${id}`;
          const fieldCultivationData = await fetchDataFromApi(
            urlFieldCultivation,
            user,
            method.GET,
            null,
            "Error fetching field cultivation data"
          );

          setCurrentFieldCultivation(fieldCultivationData);

          if (fieldCultivationData?.growingProcessId) {
            const urlGrowingProcess = `${endpoint.GROWING_PROCESS}/${fieldCultivationData.growingProcessId}`;
            const growingProcessData = await fetchDataFromApi(
              urlGrowingProcess,
              user,
              method.GET,
              null,
              "Error fetching growing process data"
            );

            setCurrentGrowingProcess(growingProcessData);
          }
        }
      } catch (error) {
        console.error("Error fetching field cultivation data:", error);
        toast.error(`${error}`);
      }
    };

    fetchData();
    fetchFieldCultivation();
  }, [id, user]);

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

  useEffect(() => {
    if (currentFieldCultivation && currentGrowingProcess) {
      setValue("cultivationId", currentFieldCultivation.cultivationId);
      setValue("machineryId", currentFieldCultivation.machineryId);
      setValue("cropId", currentGrowingProcess.cropId);
      setValue("fieldId", currentGrowingProcess.fieldId);
      const formattedDate = currentFieldCultivation.startingDate
        ? new Date(currentFieldCultivation.startingDate).toLocaleDateString(
            "en-CA",
            { year: "numeric", month: "2-digit", day: "2-digit" }
          )
        : "";

      setValue("startingDate", formattedDate);
    }
  }, [currentFieldCultivation, currentGrowingProcess, setValue]);

  const onFieldCultivationHandler: SubmitHandler<
    FieldCultivationUpdateHandler
  > = async (fieldCultivationObj) => {
    try {
      if (!currentGrowingProcess || !currentFieldCultivation) {
        console.error(
          "Current growing process or field cultivation is undefined"
        );
        return;
      }

      const urlGrowingProcess = `${endpoint.GROWING_PROCESS}/${currentGrowingProcess.id}`;
      const updateGrowingProcessData = {
        cropId: fieldCultivationObj?.cropId,
        fieldId: fieldCultivationObj?.fieldId,
      };

      const urlFieldCultivation = `${endpoint.FIELD_CULTIVATION}/${id}`;
      const updateFieldCultivationData = {
        cultivationId: fieldCultivationObj.cultivationId,
        machineryId: fieldCultivationObj.machineryId,
        growingProcessId: currentGrowingProcess.id,
        startingDate: fieldCultivationObj.startingDate,
      };

      if (user) {
        await fetchDataFromApi(
          urlGrowingProcess,
          user,
          method.PATCH,
          updateGrowingProcessData,
          "Error updating growing process"
        );
        await fetchDataFromApi(
          urlFieldCultivation,
          user,
          method.PATCH,
          updateFieldCultivationData,
          "Error updating field cultivation"
        );

        navigate(`${catalog.FIELD_CULTIVATION}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
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
      <FormTitle>Update a field cultivation</FormTitle>
      <SubTitle>Please first select field.</SubTitle>
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
              />
            )}
            {errors[el.errors]?.message && (
              <ErrorMsg>{errors[el.errors]?.message as string}</ErrorMsg>
            )}
          </React.Fragment>
        );
      })}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Update"}
      </Button>

      {errors.root && <ErrorMsg>{errors.root.message}</ErrorMsg>}
    </Form>
  );
};
