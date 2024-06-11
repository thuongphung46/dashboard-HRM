import { FC, useCallback, useMemo } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Action } from "types/action";

export interface IFormField {
  id: string;
  label: string;
  type: string;
  isRequire?: boolean;
  readonly?: boolean;
  ref?: any;
  options?: {
    value: string | number;
    label: string;
  }[];
  defaultValue?: string | number;
}
interface Props extends Action {
  fields: IFormField[];
  handleOnChangeField: (data: any) => void;
  formData: any;
}

const FormField: FC<Props> = ({
  fields,
  handleOnChangeField,
  formData,
  action,
}) => {
  const renderField = useCallback(
    (field: IFormField) => {
      switch (field.type) {
        case "select":
          return (
            <>
              {((field.options && field.options.length > 0) ||
                action === "add") && (
                <Autocomplete
                  disablePortal
                  readOnly={field.readonly}
                  size="small"
                  ref={field.ref}
                  id={field.id}
                  defaultValue={
                    field.options &&
                    field.options.length > 0 &&
                    formData[field.id] !== undefined
                      ? field.options.find(
                          (option) => option.value === formData[field.id] || ""
                        )
                      : ""
                  }
                  onChange={(e, newValue: any) => {
                    handleOnChangeField({
                      target: {
                        name: field.id,
                        value: newValue ? newValue.value : "",
                      },
                    });
                  }}
                  options={
                    field.options && field.options.length > 0
                      ? [...field.options, { value: "", label: "" }]
                      : [{ value: "", label: "" }]
                  }
                  getOptionKey={(option) => option.value.toString()}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      required={field.isRequire}
                      label={field.label}
                      variant="outlined"
                    />
                  )}
                />
              )}
            </>
          );
        default:
          return (
            <TextField
              size="small"
              fullWidth
              required={field.isRequire}
              inputRef={field.ref}
              id={field.id}
              name={field.id}
              autoComplete="new-password"
              InputProps={{
                readOnly: field.readonly,
              }}
              type={field.type}
              defaultValue={formData[field.id] ?? ""}
              onChange={(e) => handleOnChangeField(e)}
            />
          );
      }
    },
    [action, formData, handleOnChangeField]
  );

  const renderFields = useMemo(() => {
    return fields.map((field) => (
      <Grid item xs={6} key={field.id}>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <InputLabel required={field.isRequire} htmlFor={field.id}>
              {field.label}
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            {renderField(field)}
          </Grid>
        </Grid>
      </Grid>
    ));
  }, [fields, renderField]);

  return <>{renderFields}</>;
};

export default FormField;
