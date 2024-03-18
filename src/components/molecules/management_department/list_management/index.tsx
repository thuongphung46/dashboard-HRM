import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FC, useCallback } from "react";
import Button from "@mui/material/Button";

interface Props {
  listData: any[];
  handleClickItem: (item: any) => void;
}

export const ListDepartment: FC<Props> = ({ listData, handleClickItem }) => {
  const handleAddDepartment = useCallback(() => {}, []);

  return (
    <div
      style={{
        minWidth: "300px",
      }}
    >
      <Button onClick={handleAddDepartment}>Add</Button>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          "& ul": { padding: 0 },
          maxHeight: `calc(100vh - 120px)`,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {listData.map((item) => {
          return (
            <ListItemButton key={item.id} onClick={() => handleClickItem(item)}>
              <ListItemText primary={`${item.name}`} />
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
};
