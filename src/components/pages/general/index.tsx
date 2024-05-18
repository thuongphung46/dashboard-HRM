import {MultipleTablesPage, GeneralEdit} from  "components/templates/general"
import { useEffect, useState } from "react";
import { useGeneralConfig } from "services/hooks/useGeneralConfig";

export const GeneralPage = () => {
  const { data: GenneralData } = useGeneralConfig();

  const [GeneralEdit, setGeneralEdit] = useState<GeneralEdit>({
    teaching: 0,
    base_salary: 0,
    time_worked: 0,
  });

  
  useEffect(() => {
    if (GenneralData) {
      setGeneralEdit({
        teaching: GenneralData.find((item) => item.name === "teaching")?.value ,
        base_salary: GenneralData.find((item) => item.name === "base_salary")?.value ,
        time_worked: GenneralData.find((item) => item.name === "time_worked")?.value,
      });
    }
  }, [GenneralData]);
    return (
      <MultipleTablesPage GenneralData={GeneralEdit}/>
    );
  };
  