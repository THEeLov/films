const baseCircle = {
  backgroundColor: "#ff6464",
  borderRadius: "50%",
  position: "absolute",
  display: {
    xs: "none",
    sm: "block", 
  },
  zIndex: 0,
};

export const littleCircle = {
  ...baseCircle,
  width: "50px",
  height: "50px",
};

export const mediumCircle = {
  ...baseCircle,
  width: "100px",
  height: "100px",
};

export const largeCircle = {
  ...baseCircle,
  width: "300px",
  height: "300px",
};