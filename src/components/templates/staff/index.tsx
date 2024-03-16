import { ListStaff } from "components/molecules/staff/list_star";
import { PopupDetailStaff } from "components/molecules/staff/popup_detail";

export const StaffTemplate = () => {
  // code truyền state từ đây
  
  return (
    <div>
      <ListStaff></ListStaff>
      <PopupDetailStaff></PopupDetailStaff>
    </div>
  );
};
