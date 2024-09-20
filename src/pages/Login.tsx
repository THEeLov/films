import {
  Box,
  Card,
  TextField,
  Typography,
  useTheme,
  CardHeader,
  CardContent,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { loginSchema } from "../validationSchemas/authForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
import Decorator from "../decorators/Decorator";

type LoginSchema = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const theme = useTheme();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("root", { message: "Incorrect username or password" });
    } finally {
      setLoading(false);
    }
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
        position: "relative",
        overflowX: "hidden",
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
          boxShadow: 10
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
            variant="filled"
            {...register("email")}
            error={typeof errors.email !== "undefined"}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            {...register("password")}
            error={typeof errors.password !== "undefined"}
            helperText={errors.password?.message}
          />

          {errors.root && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.root.message}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? <CircularProgress color="secondary" /> : "SIGN IN"}
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

      <Decorator />
    </Box>
  );
};

export default Login;
