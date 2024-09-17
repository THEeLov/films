import { Box } from "@mui/material";

const Decorator = () => {
  const boxes = Array.from({ length: 20 });

  return (
    <>
      {boxes.map((_, index) => {
        return (
          <Box
            key={index}
            sx={{
              ...sizeStyle,
              ...positionStyle,
            }}
          />
        );
      })}
    </>
  );
};

export default Decorator;
