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
import { registerSchema } from "../validationSchemas/authForms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { AuthErrorCodes } from "firebase/auth";
import Decorator from "../decorators/Decorator";
import { FirebaseError } from "firebase/app";
import { useUserCreate } from "../hooks/useUser";
import { RegisterSchema } from "../types";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const theme = useTheme();
  const navigate = useNavigate();

  const { mutateAsync: createUser } = useUserCreate();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await createUser(data);
      navigate("/");
    } catch (err) {
      if (!(err instanceof FirebaseError)) {
        alert("Something went wrong. Please try again later.");
        return;
      }

      const errorCode = err.code;
      if (errorCode === AuthErrorCodes.EMAIL_EXISTS) {
        setError("root", { message: "This email is already in use." });
      }
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
        minHeight: "100vh",
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
          boxShadow: 10,
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
            variant="filled"
            {...register("email")}
            error={typeof errors.email !== "undefined"}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            {...register("password")}
            error={typeof errors.password !== "undefined"}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            variant="filled"
            type="password"
            {...register("confirmPassword")}
            error={typeof errors.confirmPassword !== "undefined"}
            helperText={errors.confirmPassword?.message}
          />

          {errors.root && (
            <Alert severity="error" style={{ marginTop: "1rem" }}>
              {errors.root.message}
            </Alert>
          )}

          {isSubmitting ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              SIGN UP
            </Button>
          )}
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
      <Decorator />
    </Box>
  );
};

export default Register;
