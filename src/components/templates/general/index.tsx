import React, { useCallback, useMemo, useState } from "react";
import { GeneralPosition } from "components/molecules/general/position_columns";
import { GeneralResion } from "components/molecules/general/resion_columns";
import { GeneralRank } from "components/molecules/general/rank_columns";
import { Box, Button } from "@mui/material";
import ReusableField from "components/atoms/field";
import { fields } from "./fields";

interface Props {
  GenneralData: GeneralEdit;
}

export interface GeneralEdit {
  teaching?: number;
  base_salary?: number;
  time_worked?: number;
  [key: string]: any;
}

export interface GeneralField {
  name: string;
  label: string;
  type: string;
  defaultValue: number | string;
}

export const MultipleTablesPage = ({ GenneralData }: Props) => {
  const [GeneralEdit, setGeneralEdit] = useState<GeneralEdit>({
    teaching: 0,
    base_salary: 0,
    time_worked: 0,
  });
  const [edited, setEdited] = useState<boolean>(false);

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setGeneralEdit((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
      setEdited(true);
    },
    []
  );

  const handleUpdate = useCallback(() => {
    // Perform update logic here
    console.log("Updated data:", GeneralEdit);
  }, [GeneralEdit]);

  const renderGeneralFields = useMemo(() => {
    return (
      <>
        {GenneralData &&
          fields.map((item, index) => {
            return (
              <div key={index}>
                <ReusableField
                  field={item}
                  formData={GenneralData}
                  hanldeOnChangefield={handleValueChange}
                />
              </div>
            );
          })}
      </>
    );
  }, [GenneralData, handleValueChange]);

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      <Button disabled={!edited} onClick={handleUpdate}>
        Lưu
      </Button>
      {renderGeneralFields}
      <GeneralResion />
      <GeneralPosition />
      <GeneralRank />
    </Box>
  );
};
