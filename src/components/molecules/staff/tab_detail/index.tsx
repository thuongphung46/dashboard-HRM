import React, {
  FC,
  useState,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { InfoStaff } from "./info_staff";
import { WorkingHistory } from "./working_history";
import { Analytic } from "components/molecules/staff/tab_analytic";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStaff } from "services/hooks/useGetListStaff";
import { Action } from "types/action";
import { StaffService } from "services/staff_service";
import { MessageCode } from "types/enum/message_code";
import { toastMessage } from "components/molecules/toast_message";
import { initStaffInfo } from "services/mock_data/staff_info";
import HRMStorage from "common/function";
import { KeyValue } from "constants/GlobalConstant";
import { TeachingContract } from "../tab_teaching_contract";
import { PropupConfirm } from "components/atoms/popup_comfirm";

interface Props extends Action {}

export const TabDetailStaff: FC<Props> = ({ action }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [open, setOpen] = useState<boolean>(false);
  const [dataDetailMe, setDataDetailMe] = useState<any>(initStaffInfo);
  const { data, loading } = useGetStaff(id);
  const level = HRMStorage.get(KeyValue.Level);

  useEffect(() => {
    const fetch = async () => {
      const res = await StaffService.GetMyProfile();
      if (res.msg_code === MessageCode.Success) {
        setDataDetailMe(res.content);
      } else {
        toastMessage(res.message, "error");
      }
    };
    if (action === "me") {
      fetch();
    }
  }, [data, action]);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleOnClickSave = useCallback(() => {
    if (action === "add") {
      StaffService.createStaff(formData)
        .then((res) => {
          if (res.msg_code === MessageCode.Success) {
            toastMessage("Thành công", "success");
          } else {
            toastMessage(res.message, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (id) {
      StaffService.UpdateInfoStaff(formData, id)
        .then((res) => {
          if (res.msg_code === MessageCode.Success) {
            toastMessage("Thành công", "success");
          } else {
            toastMessage(res.message, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (action === "me") {
      let id = HRMStorage.get(KeyValue.id);
      StaffService.UpdateInfoStaff(formData, id)
        .then((res) => {
          if (res.msg_code === MessageCode.Success) {
            toastMessage("Thành công", "success");
          } else {
            toastMessage(res.message, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [action, formData, id]);

  const handleExit = useCallback(() => {
    if (formData) {
      setOpen(true);
    } else {
      navigate(-1);
    }
  }, [formData, navigate]);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    navigate(-1);
  }, [navigate]);

  return (
    <div
      style={{
        padding: "8px",
      }}
    >
      <Button size="small" variant="outlined" onClick={handleExit}>
        Thoát
      </Button>
      {value === 0 && (
        <Button
          variant="outlined"
          size="small"
          sx={{ marginLeft: "4px" }}
          onClick={handleOnClickSave}
        >
          Lưu
        </Button>
      )}
      <Button size="small" variant="outlined" sx={{ marginLeft: "4px" }}>
        Scan
      </Button>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <Tab value={0} label="Thông tin chung" />
        {(action === "edit" || action === "me") && (
          <Tab value={1} label="Quá trình làm việc tại đơn vị" />
        )}
        {(action === "edit" || action === "me") && level !== "LEVEL_1" && (
          <Tab value={2} label="Thống kê" />
        )}
        {(action === "edit" || action === "me") &&
          (level === "LEVEL_4" || level === "LEVEL_1") && (
            <Tab value={3} label={"Hợp đồng giảng dạy"} />
          )}
      </Tabs>
      <TabPanel value={value} index={0}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <InfoStaff
            formData={formData}
            setFormData={setFormData}
            action={action}
            data={action === "me" ? dataDetailMe : data}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <WorkingHistory action={action} data={data} id={id} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {level !== "LEVEL_1" ? (
          <>
            <Analytic action={action} data={data} />
          </>
        ) : null}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {level === "LEVEL_1" || level === "LEVEL_4" ? (
          <>
            <TeachingContract />
          </>
        ) : null}
      </TabPanel>
      <PropupConfirm
        onClose={() => setOpen(false)}
        open={open}
        onConfirm={handleConfirm}
        title="Xác nhận"
        message="Bạn chắc chắn muốn thoát?"
      />
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, height: "calc(100vh - 180px)", overflow: "auto" }}>
          {children}
        </Box>
      )}
    </div>
  );
}
