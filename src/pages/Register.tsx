import {
  Box,
  Card,
  TextField,
  Typography,
  useTheme,
  CardHeader,
  CardContent,
  Button,
} from "@mui/material";
import { registerSchema } from "../validationSchemas/authForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link } from "react-router-dom";

type RegisterSchema = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const theme = useTheme();

  const onSubmit = (data: RegisterSchema) => {
    console.log("Yeezus");
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "30ch" },
        padding: "1rem",
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <Card
        sx={{
          padding: "1rem",
          backgroundColor: theme.palette.secondary.main,
          width: "min-content",
          height: "max-content",
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", userSelect: "none" }}
            >
              SIGN UP
            </Typography>
          }
        />

        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            label="Email"
            {...register("email")}
            error={typeof errors.email !== "undefined"}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={typeof errors.password !== "undefined"}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={typeof errors.confirmPassword !== "undefined"}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            SIGN UP
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account ?{" "}
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              sx={{ color: theme.palette.primary.main }}
            >
              Sign In
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
