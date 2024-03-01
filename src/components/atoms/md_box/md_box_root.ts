// import { Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

interface CustomBoxProps {
  theme?: {
    palette: {
      [key: string]: any;
    };
    functions: { linearGradient: (color1: string, color2: string) => string };
    borders: { borderRadius: { [key: string]: string } };
    boxShadows: { colored: { [key: string]: string } };
  };
  ownerState: {
    variant: string;
    bgColor: string;
    color: string;
    opacity: number;
    borderRadius: string;
    shadow: string;
    coloredShadow: string;
  };
}

export default styled(Box)<CustomBoxProps>(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows } = theme;
  const {
    variant,
    bgColor,
    color,
    opacity,
    borderRadius,
    shadow,
    coloredShadow,
  } = ownerState;

  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;

  const greyColors: { [key: string]: string } = {
    "grey-100": grey[100],
    "grey-200": grey[200],
    "grey-300": grey[300],
    "grey-400": grey[400],
    "grey-500": grey[500],
    "grey-600": grey[600],
    "grey-700": grey[700],
    "grey-800": grey[800],
    "grey-900": grey[900],
  };

  const validGradients: string[] = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ];

  const validColors: string[] = [
    "transparent",
    "white",
    "black",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "grey-100",
    "grey-200",
    "grey-300",
    "grey-400",
    "grey-500",
    "grey-600",
    "grey-700",
    "grey-800",
    "grey-900",
  ];

  const validBorderRadius: string[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl",
    "section",
  ];
  const validBoxShadows: string[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl",
    "inset",
  ];

  // background value
  let backgroundValue: string = bgColor;

  if (variant === "gradient") {
    backgroundValue = validGradients.find((el) => el === bgColor)
      ? linearGradient(gradients[bgColor].main, gradients[bgColor].state)
      : white.main;
  } else if (validColors.find((el) => el === bgColor)) {
    backgroundValue = palette[bgColor]
      ? palette[bgColor].main
      : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  // color value
  let colorValue: string = color;

  if (validColors.find((el) => el === color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  // borderRadius value
  let borderRadiusValue: string = borderRadius;

  if (validBorderRadius.find((el) => el === borderRadius)) {
    borderRadiusValue = radius[borderRadius];
  }

  // boxShadow value
  let boxShadowValue: string = "none";

  if (validBoxShadows.find((el) => el === shadow)) {
    // boxShadowValue = boxShadows[shadow];
    boxShadowValue = shadow;
  } else if (coloredShadow) {
    boxShadowValue = colored[coloredShadow] ? colored[coloredShadow] : "none";
  }

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  };
});
