import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { MenuProps } from "components/molecules/staff/tab_detail/info_staff";

export interface IFormData {
  id: string;
  label: string;
  type: string;
  ref?: any;
  options?: {
    value: string | number | undefined;
    label: string;
  }[];
  defaultValue?: string | number;
}
interface Props {
  field: IFormData;
  hanldeOnChangefield?: (event: any) => void;
  formData?: any;
}

const ReusableField: FC<Props> = ({ field, hanldeOnChangefield, formData }) => {
  return (
    <>
      <Grid item xs={6} key={field.id}>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
          </Grid>
          <Grid item xs={6}>
            {field.type === "select" && field.options ? (
              <FormControl fullWidth>
                <Select
                  name={field.id}
                  size="small"
                  id={field.id}
                  MenuProps={MenuProps}
                  onChange={hanldeOnChangefield}
                  defaultValue={formData ? formData[field.id] : ""}
                >
                  {field.options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                size="small"
                fullWidth
                id={field.id}
                name={field.id}
                type={field.type}
                defaultValue={formData ? formData[field.id] : ""}
                onChange={hanldeOnChangefield}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReusableField;
