import React, { FC, useState } from "react";
import { GridRowId } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { BaseGrid } from "components/atoms/datagrid";

interface Props {}

export const ScientificResearch: FC<Props> = () => {
  const [selectedRows1, setSelectedRows1] = useState<GridRowId[]>([]);
  const [selectedRows2, setSelectedRows2] = useState<GridRowId[]>([]);
  const [selectedRows3, setSelectedRows3] = useState<GridRowId[]>([]);
  const [selectedRows4, setSelectedRows4] = useState<GridRowId[]>([]);
  const [selectedRows5, setSelectedRows5] = useState<GridRowId[]>([]);
  const [selectedRows6, setSelectedRows6] = useState<GridRowId[]>([]);
  const [selectedRows7, setSelectedRows7] = useState<GridRowId[]>([]);

  // Các cột cho lưới dữ liệu 1
  const columns1 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'topic_name', headerName: 'Tên đề tài', width: 150, editable: true },
    { field: 'position', headerName: 'Chủ trì/ Thư ký/ Thành viên', width: 200, editable: true },
    { field: 'topic_level', headerName: 'Cấp đề tài', width: 150, editable: true },
    { field: 'accept_date', headerName: 'Ngày nghiệm thu', width: 150, editable: true },
    { field: 'result', headerName: 'Kết quả xếp loại', width: 150, editable: true },
    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
  ];
  const rows1 = [
    { id: 1, topic_name: '', position: '', topic_level: '', accept_date: '', result: '', hours: '' },
  ];

  // Các cột cho lưới dữ liệu 2
  const columns2 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'article_name', headerName: 'Tên bài báo', width: 150, editable: true },
    { field: 'type_magazine ', headerName: 'Loại tạp chí/ hội nghị', width: 200, editable: true },
    { field: 'num_magazine', headerName: 'Chỉ số tạp chí/ hội nghị', width: 150, editable: true },
    { field: 'num_people', headerName: 'Số người', width: 150, editable: true },
    { field: 'role', headerName: 'Tác giả chính/ thành viên', width: 150, editable: true },
    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
  ];
  const rows2 = [
    { id: 1,article_name:'', type_magazine:'', num_magazine:'', num_people:'', role:'', hours:'',}
  ];

  // Các cột cho lưới dữ liệu 3
  const columns3 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'certificate_name', headerName: 'Tên bằng sáng chế, giải thưởng', width: 300, editable: true },
    { field: 'num_validation', headerName: 'Số QĐ công nhận', width: 150, editable: true },
    { field: 'date_validation', headerName: 'Ngày QĐ công nhận', width: 150, editable: true },
    { field: 'num_people', headerName: 'Số người', width: 150, editable: true },
    { field: 'role', headerName: 'Tác giả chính/ Thành viên', width: 200, editable: true },
    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
  ];
  const rows3 = [
    { id: 1, certificate_name: '', num_validation: '', date_validation: '', num_people: '', role: '', hours: '' },
  ];

  // Các cột cho lưới dữ liệu 4
  const columns4 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'book_titles', headerName: 'Tên sách, giáo trình', width: 300, editable: true },
    { field: 'public_num', headerName: 'Số xuất bản', width: 150, editable: true },
    { field: 'page_num', headerName: 'Số trang', width: 150, editable: true },
    { field: 'num_people', headerName: 'Số người', width: 150, editable: true },
    { field: 'role', headerName: 'Tác giả chính/ Thành viên', width: 200, editable: true },
    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
  ];
  const rows4= [
    { id: 1, book_titles: '', public_num: '', page_num: '', num_people: '', role: '', hours: '' },
  ];

  // Các cột cho lưới dữ liệu 5
  const columns5 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'topic_name', headerName: 'Tên đề tài', width: 300, editable: true },
    { field: 'num_decision', headerName: 'Số QĐ giao nhiệm vụ', width: 150, editable: true },
    { field: 'date_decition', headerName: 'Ngày ký QĐ giao nhiệm vụ', width: 150, editable: true },
    { field: 'result1', headerName: 'Kết quả bảo vệ cấp Khoa', width: 150, editable: true },
    { field: 'result2', headerName: 'Kết quả bảo vệ cấp Học viện', width: 200, editable: true },
    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
  ];
  const rows5= [
    { id: 1, topic_name: '', num_decision: '', date_decition: '', result1: '', result2: '', hours: '' },
  ];

  // Các cột cho lưới dữ liệu 6
  const columns6 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'training_name', headerName: 'Tên chương trình đào tạo', width: 300, editable: true },
    { field: 'num_credits', headerName: 'Số tín chỉ', width: 150, editable: true },
    { field: 'num_decision', headerName: 'Số QĐ giao nhiệm vụ, ngày ký QĐ', width: 150, editable: true },
    { field: 'num_people', headerName: 'Số thành viên', width: 150, editable: true },
    { field: 'construction', headerName: 'Hình thức xây dựng (mới/tu chỉnh)', width: 200, editable: true },
    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
  ];
  const rows6= [
    { id: 1, training_name: '', num_credits: '', num_decision: '', num_people: '', construction: '', hours: '' },
  ];

  // Các cột cho lưới dữ liệu 7
  const columns7 = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'topic_name', headerName: 'Tên giáo trình/ bài giảng', width: 300, editable: true },
    { field: 'num_decision', headerName: 'Số QĐ giao nhiệm vụ, ngày ký', width: 150, editable: true },
    { field: 'num_credits', headerName: 'Số tín chỉ', width: 150, editable: true },
    { field: 'num_people', headerName: 'Số thành viên', width: 150, editable: true },
    { field: 'role', headerName: 'Tác giả chính/ Thành viên', width: 200, editable: true },
    { field: 'hours', headerName: 'Số giờ quy đổi', width: 150, editable: true },
  ];
  const rows7= [
    { id: 1, topic_name: '', num_decision: '', num_credits: '', num_people: '', role: '', hours: '' },
  ];

  return (
    <div>
      <Box>
        <BaseGrid
          columns={columns1}
          rows={rows1}
          title="C.1 Đề tài, dự án (Phụ lục II.1 Quyết định số 1409/QĐ-HVM)"
          onSave={() => { /* Logic lưu cho lưới dữ liệu 1 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 1 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 1 */ }}
          onRowSelectionChange={setSelectedRows1}
          selectedRows={selectedRows1}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns2}
          rows={rows2}
          title="C.2 Bài báo khoa học(Phụ lục II.3 Quyết định số 1409/QĐ-HVM)"
          onSave={() => { /* Logic lưu cho lưới dữ liệu 1 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 1 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 1 */ }}
          onRowSelectionChange={setSelectedRows2}
          selectedRows={selectedRows2}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns3}
          rows={rows3}
          title="C.3 Bằng sáng chế, giải thưởng khoa học trong năm (Phụ lục II.4 Quyết định số 1409/QĐ-HVM)"
          onSave={() => { /* Logic lưu cho lưới dữ liệu 3 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 3 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 3 */ }}
          onRowSelectionChange={setSelectedRows3}
          selectedRows={selectedRows3}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns4}
          rows={rows4}
          title="C.4 Sách, giáo trình xuất bản trong nước được Hội đồng GSNN tính điểm (Phụ lục II.5 Quyết định số 1409/QĐ-HVM)"
          onSave={() => { /* Logic lưu cho lưới dữ liệu 4 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 4 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 4 */ }}
          onRowSelectionChange={setSelectedRows4}
          selectedRows={selectedRows4}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns5}
          rows={rows5}
          title="C.5 Hướng dẫn sinh viên NCKH, huấn luyện đội tuyển (Phụ lục II.6 Quyết định số 1409/QĐ-HVM)"
          onSave={() => { /* Logic lưu cho lưới dữ liệu 5 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 5 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 5 */ }}
          onRowSelectionChange={setSelectedRows5}
          selectedRows={selectedRows5}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns6}
          rows={rows6}
          title="C.6 Xây dựng chương trình đào tạo (Phụ lục II.8 Quyết định số 1409/QĐ-HVM)"
          onSave={() => { /* Logic lưu cho lưới dữ liệu 6 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 6 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 6 */ }}
          onRowSelectionChange={setSelectedRows6}
          selectedRows={selectedRows6}
        />
      </Box>
      <Box>
        <BaseGrid
          columns={columns7}
          rows={rows7}
          title="C.7 Biên soạn giáo trình, bài giảng (Phụ lục II.9 Quyết định số 1409/QĐ-HVM)"
          onSave={() => { /* Logic lưu cho lưới dữ liệu 7 */ }}
          onDelete={() => { /* Logic xóa cho lưới dữ liệu 7 */ }}
          onAddRow={() => { /* Logic thêm dòng cho lưới dữ liệu 7 */ }}
          onRowSelectionChange={setSelectedRows7}
          selectedRows={selectedRows7}
        />
      </Box>
    </div>
  );
};
