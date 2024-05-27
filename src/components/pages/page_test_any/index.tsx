import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import FormField, { IFormField } from "components/atoms/form_value";
import { Button } from "@mui/material";

const formFields: IFormField[] = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    isRequire: true,
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    isRequire: true,
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
    isRequire: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    isRequire: true,
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    isRequire: false,
  },
];

const FormContainer: FC = () => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setFormData({});
  }, []);

  const handleOnChangeField = useCallback((data: any) => {
    const { name, value } = data.target;
    setFormData((prevData: any) => {
      const newFormData = { ...prevData };
      newFormData[name] = value;
      return newFormData;
    });
  }, []);

  const handleShow = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      console.log(formData);
    },
    [formData]
  );

  const renderField = useMemo(() => {
    return (
      <>
        {formFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            hanldeOnChangefield={handleOnChangeField}
            formData={formData}
          />
        ))}
      </>
    );
  }, [formData, handleOnChangeField]);

  return (
    <form onSubmit={handleShow}>
      <Grid container spacing={2}>
        {renderField}
      </Grid>
      <Button size="small" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default FormContainer;
