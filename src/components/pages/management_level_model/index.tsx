import React, { FC } from "react";
import { ManagementLevelModelTemplate } from "components/templates/management_level_model";

interface Props {
  form_state: string;
}

export const ManagementLevelModelPage: FC<Props> = ({ form_state }) => {
  return (
    <div>
      <ManagementLevelModelTemplate></ManagementLevelModelTemplate>
    </div>
  );
};
