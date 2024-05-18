import { MultipleTablesPage } from "components/templates/general";
import { useGeneralConfig } from "services/hooks/useGeneralConfig";

export const GeneralPage = () => {
  const { data: GenneralData } = useGeneralConfig();
  return <MultipleTablesPage GenneralData={GenneralData} />;
};
