import { FC } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

interface Props {
  field: any;
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
                  onChange={hanldeOnChangefield}
                  value={formData ? formData[field.id] || "" : ""}>
                  {field.options.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
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
                value={formData ? formData[field.id] || "" : ""}
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
