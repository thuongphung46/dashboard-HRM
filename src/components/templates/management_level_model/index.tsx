import { DetailDepartMent } from "components/molecules/management_department/detail_department";
import { ListDepartment } from "components/molecules/management_department/list_management";
import { useCallback, useEffect, useState } from "react";
const DataList = [
  {
    id: 1,
    name: "Ban giám đốc",
  },
  {
    id: 2,
    name: "Phòng Chính trị - Tổ chức",
  },
  {
    id: 3,
    name: "Phòng Đào tạo",
  },
  {
    id: 4,
    name: "Phòng Khảo thí và Đảm bảo chất lượng đào tạo",
  },
  {
    id: 5,
    name: "Phòng Sau đại học",
  },
  {
    id: 6,
    name: "Phòng hành chính",
  },
  {
    id: 7,
    name: "Phòng Kế hoạch - Tài chính",
  },
  {
    id: 8,
    name: "Phòng Thiết bị - Quản trị",
  },
  {
    id: 9,
    name: "Khoa Mật mã",
  },
  {
    id: 10,
    name: "Khoa An toàn thông tin",
  },
  {
    id: 11,
    name: "Khoa Công nghệ thông tin",
  },
  {
    id: 12,
    name: "Khoa Điện tử Viễn thông",
  },
  {
    id: 13,
    name: "Khoa Lý luận chính trị",
  },
  {
    id: 14,
    name: "Khoa cơ bản",
  },
];
const DataListSubject = [
  {
    id: 1,
    name: "Bộ môn A",
  },
  {
    id: 2,
    name: "Bộ môn B",
  },
  {
    id: 3,
    name: "Bộ môn C",
  },
  {
    id: 4,
    name: "Bộ môn D",
  },
  {
    id: 5,
    name: "Bộ môn E",
  },
  {
    id: 6,
    name: "Bộ môn NTT-IT",
  },
  {
    id: 7,
    name: "Bộ môn Tin học",
  },
  {
    id: 8,
    name: "Bổng tố",
  },
  {
    id: 9,
    name: "Bộ môn toán cao cấp",
  },
  {
    id: 10,
    name: "Bộ môn Lập trình căn bản",
  },
  {
    id: 11,
    name: "Bộ môn phân tích thiết kế hệ thống",
  },
];

export const ManagementLevelModelTemplate = () => {
  const [listData, setListData] = useState<any[]>(DataList);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [listSubject, setListSubject] = useState<any[]>([]);

  useEffect(() => {
    setListSubject(DataListSubject);
  }, []);

  const handleClickItem = useCallback((e: any) => {
  }, []);

  return (
    <div
      style={{
        display: "flex",
      }}>
      <ListDepartment handleClickItem={handleClickItem} listData={listData} />
      <DetailDepartMent dataDetail={dataDetail} listSubject={listSubject} />
    </div>
  );
};
