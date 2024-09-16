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
import { loginSchema } from "../validationSchemas/authForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link } from "react-router-dom";

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const theme = useTheme();

  const onSubmit = (data: LoginSchema) => {
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
              SIGN IN
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

          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            SIGN IN
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <Typography
              component={Link}
              to="/register"
              variant="body2"
              sx={{ color: theme.palette.primary.main }}
            >
              Sign Up
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
