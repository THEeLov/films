import { Box } from "@mui/material";
import { largeCircle } from "./circleDecorator";

const Decorator = () => {
  return (
    <>
      <Box
        component="div"
        sx={{
          ...largeCircle,
          top: "50%",
          left: "-150px",
          transform: "translateY(-50%)",
          filter: "blur(100px)",
        }}
      ></Box>
      <Box
        component="div"
        sx={{
          ...largeCircle,
          top: "50%",
          right: "-150px",
          transform: "translateY(-50%)",
          filter: "blur(100px)",
        }}
      ></Box>
    </>
  );
};

export default Decorator;
