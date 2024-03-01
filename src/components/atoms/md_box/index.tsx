import { FC, forwardRef } from "react";
import MDBoxRoot from "components/atoms/md_box/md_box_root";

interface IMDBoxProps {
  variant?: "contained" | "gradient";
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "light"
    | "dark"
    | "none";
}
const MDBox: FC<IMDBoxProps> = forwardRef(
  (
    {
      variant,
      bgColor,
      color,
      opacity,
      borderRadius,
      shadow,
      coloredShadow,
      ...rest
    },
    ref
  ) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{
        variant: variant || "contained",
        bgColor: bgColor || "transparent",
        color: color || "dark",
        opacity: opacity || 1,
        borderRadius: borderRadius || "none",
        shadow: shadow || "none",
        coloredShadow: coloredShadow || "none",
      }}
    />
  )
);

export default MDBox;
