import { ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonProps = {
  action: string;
};

export const Button = ({ action }: ButtonProps) => {
  const handleClick = () => {
    switch(action) {
      case 'Save':
        // Handle save action
        console.log('Save action');
        break;
      case 'Delete':
        // Handle delete action
        console.log('Delete action');
        break;
      case 'AddRow':
        // Handle add row action
        console.log('Add row action');
        break;
      default:
        console.log('No action');
    }
  }

  return (
    <div>
      <button onClick={handleClick}>{action}</button>
    </div>
  );
};