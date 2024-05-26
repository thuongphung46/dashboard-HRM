import { FC, useMemo } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

export interface IFormField {
    id: string;
    label: string;
    type: string;
    isRequire?: boolean;
    ref?: any;
    options?: {
        value: string | number | undefined;
        label: string;
    }[];
    defaultValue?: string | number;
}
interface Props {
    field: IFormField;
    hanldeOnChangefield: (data: any) => void;
    formData: any;
}

const FormField: FC<Props> = ({ field, hanldeOnChangefield, formData }) => {
    const renderField = useMemo(() => {
        switch (field.type) {
            case "select":
                return (
                    <>
                        <Autocomplete
                            disablePortal
                            size="small"
                            ref={field.ref}
                            id={field.id}
                            defaultValue={formData ? formData[field.id] : ""}
                            onChange={(e, newValue: any) => {
                                hanldeOnChangefield({
                                    target: {
                                        name: field.id,
                                        value: newValue ? newValue.value : ""
                                    }
                                })
                            }}
                            options={field.options ? field.options : []}
                            getOptionKey={(option) => option.value}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => <TextField  {...params} required={field.isRequire} name={field.id} placeholder={field.label} />}
                        />
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
                        type={field.type}
                        defaultValue={formData ? formData[field.id] : ""}
                        onChange={hanldeOnChangefield}
                    />
                );
        }
    }, [field.id, field.isRequire, field.label, field.options, field.ref, field.type, formData, hanldeOnChangefield]);

    return (
        <Grid item xs={6} key={field.id}>
            <Grid container alignItems="center">

                <Grid item xs={5}>
                    <InputLabel required={
                        field.isRequire
                    } htmlFor={field.id}>{field.label}</InputLabel>
                </Grid>
                <Grid item xs={6}>
                    {renderField}
                </Grid>

            </Grid>

        </Grid>
    );
};

export default FormField;
