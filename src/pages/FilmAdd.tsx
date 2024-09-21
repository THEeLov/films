import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
  FormLabel,
  FormControlLabel,
  Checkbox,
  useTheme,
} from "@mui/material";
import { movieCreateSchema } from "../validationSchemas/movieForms";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import { addTextFieldStyle } from "../theme";
import { addCheckboxStyle } from "../theme";
import Decorator from "../decorators/Decorator";
import { useNavigate } from "react-router-dom";
import { useFilmCreate } from "../hooks/useFilms";
import useImagePreview from "../hooks/useImagePreview";

type MovieCreateSchema = z.infer<typeof movieCreateSchema>;

// Could be in seperate file
export const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const FilmAdd = () => {
  const navigate = useNavigate();

  const { mutateAsync: createMovie, isPending } = useFilmCreate();
  const { imagePreview, handleImageChange } = useImagePreview();

  const theme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MovieCreateSchema>({
    resolver: zodResolver(movieCreateSchema),
    defaultValues: {
      genre: [],
    },
  });

  watch("genre");

  const onSubmit = async (data: MovieCreateSchema) => {
    try {
      await createMovie(data);
      navigate("/");
    } catch {
      alert("Something went wrong, we are sorry!");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "30ch" },
        position: "relative",
        backgroundColor: theme.palette.primary.main,
        padding: "1rem",
        overflowX: "hidden",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{
            fontWeight: "bold",
            userSelect: "none",
            color: theme.palette.secondary.main,
          }}
        >
          ADD FILM
        </Typography>

        <TextField
          label="Title"
          variant="filled"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <DriveFileRenameOutlineIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={addTextFieldStyle}
        />
        <TextField
          label="Release Date"
          variant="filled"
          type="number"
          {...register("releaseDate")}
          error={!!errors.releaseDate}
          helperText={errors.releaseDate?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={addTextFieldStyle}
        />

        <TextField
          label="Description"
          variant="filled"
          multiline
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={addTextFieldStyle}
        />

        <FormLabel
          component="legend"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            color: theme.palette.secondary.main,
          }}
        >
          Genre
        </FormLabel>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {genres.map((genre) => (
            <Controller
              key={genre}
              name="genre"
              control={control}
              render={({ field: { value } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value.includes(genre)}
                      onChange={(e) => {
                        const newGenres = e.target.checked
                          ? [...value, genre]
                          : value.filter((g) => g !== genre);
                        setValue("genre", newGenres);
                      }}
                      sx={addCheckboxStyle}
                    />
                  }
                  label={genre}
                  sx={{ color: theme.palette.secondary.main }}
                />
              )}
            />
          ))}
        </Box>

        <TextField
          label="Image"
          variant="filled"
          type="file"
          {...register("image")}
          error={!!errors.image}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ImageIcon />
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => {
            register("image").onChange(e);
            handleImageChange(e as React.ChangeEvent<HTMLInputElement>);
          }}
          sx={addTextFieldStyle}
        />

        {imagePreview && (
          <Box sx={{ mt: 2, maxWidth: "200px", maxHeight: "200px" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
        >
          {isPending ? <CircularProgress color="secondary" /> : "Submit"}
        </Button>

        <Decorator />
      </Box>
    </Box>
  );
};

export default FilmAdd;
