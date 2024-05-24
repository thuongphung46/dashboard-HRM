import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { GeneralPosition } from "components/molecules/general/position_columns";
import { GeneralResion } from "components/molecules/general/resion_columns";
import { GeneralRank } from "components/molecules/general/rank_columns";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Box } from "@mui/material";
import HRMStorage from "common/function";
import { KeyValue } from "constants/GlobalConstant";

interface Props {
  GenneralData: any[];
}

interface GeneralEdit {
  teaching: string;
  base_salary: string;
}

interface GeneralField {
  name: string;
  label: string;
  value: number | string;
}

export const MultipleTablesPage: FC<Props> = ({ GenneralData }) => {
  const level = HRMStorage.get(KeyValue.Level);
  const [GeneralField, setGeneralField] = useState<GeneralField[]>([]);
  const [GeneralEdit, setGeneralEdit] = useState<GeneralEdit>({
    teaching: "",
    base_salary: "",
  });
  const [disable, setDisable] = useState<boolean>(false);

  useEffect(() => {
    if (level !== "LEVEL_4") {
      setDisable(true);
    }
  }, [level]);

  useEffect(() => {
    if (GenneralData) {
      const initialFieldData = [
        {
          name: "teaching",
          label: "Số tiết phải giảng dạy",
          value:
            GenneralData.find((item) => item.name === "teaching")?.value || "",
        },
        {
          name: "base_salary",
          label: "Mức lương cơ sở",
          value:
            GenneralData.find((item) => item.name === "base_salary")?.value ||
            "",
        },
      ];
      setGeneralField(initialFieldData);

      setGeneralEdit({
        teaching: initialFieldData[0].value.toString(),
        base_salary: initialFieldData[1].value.toString(),
      });
    }
  }, [GenneralData]);

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setGeneralEdit((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // setEdited(true);
    },
    []
  );


  const renderGeneralFields = useMemo(() => {
    return (
      <>
        {GeneralField.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <InputLabel>{item.label}</InputLabel>
            <Input
              name={item.name}
              value={GeneralEdit[item.name as keyof GeneralEdit]}
              onChange={handleValueChange}
            />
          </Box>
        ))}
      </>
    );
  }, [GeneralField, GeneralEdit, handleValueChange]);

  return (
    <Box
      sx={{
        padding: "1rem",
      }}
    >
      {renderGeneralFields}
      <GeneralResion disable={disable} />
      <GeneralPosition disable={disable} />
      <GeneralRank />
    </Box>
  );
};
