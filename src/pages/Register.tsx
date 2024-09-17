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
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

type RegisterSchema = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const theme = useTheme();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log(response)
      navigate("/");
    } catch (err) {
        
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

          {errors.root && <div style={{color: "black"}}> {errors.root.message}</div>}
          {/* Display error message */}
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
