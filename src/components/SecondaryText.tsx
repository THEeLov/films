import { Typography } from "@mui/material";

const SecondaryText = ({ label, value }: {label: string, value: string}) => {
  return (
    <Typography
      component="h3"
      variant="h6"
      color="hsla(0, 0%, 100%, 0.5)"
      maxWidth="500px"
    >
      <b>{label}:</b> <Typography component="span">{value}</Typography>
    </Typography>
  );
};

export default SecondaryText;