import { FC, useCallback, useMemo } from "react";
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
        value: string | number;
        label: string;
    }[];
    defaultValue?: string | number;
}
interface Props {
    fields: IFormField[];
    handleOnChangeField: (data: any) => void;
    formData: any;
}

const FormField: FC<Props> = ({ fields, handleOnChangeField, formData }) => {
    const renderField = useCallback((field: IFormField) => {
        switch (field.type) {
            case "select":
                return (
                    <Autocomplete
                        disablePortal
                        size="small"
                        ref={field.ref}
                        id={field.id}
                        defaultValue={field.options?.find(option => option.value === formData[field.id])}
                        onChange={(e, newValue: any) => {
                            handleOnChangeField({
                                target: {
                                    name: field.id,
                                    value: newValue ? newValue.value : ""
                                }
                            });
                        }}
                        // inputValue={
                        //     field.options?.find(option => option.value === formData[field.id])?.label || ""
                        // }
                        options={field.options ? field.options : []}
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
                        defaultValue={formData[field.id] || ""}
                        onChange={(e) => handleOnChangeField(e)}
                    />
                );
        }
    }, [formData, handleOnChangeField]);

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
        )
        )
    }, [fields, renderField]);

    return (
        <>
            {renderFields}
        </>
    );

};


export default FormField;
