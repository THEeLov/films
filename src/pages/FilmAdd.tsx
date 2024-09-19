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
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import { addTextFieldStyle } from "../theme";
import { addCheckboxStyle } from "../theme";
import Decorator from "../decorators/Decorator";
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, store } from '../config/firebase';
import { useNavigate } from "react-router-dom";
import { Movie } from "../types";


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
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `movie-images/${file.name + uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };
  
  const onSubmit = async (data: MovieCreateSchema) => {
    setLoading(true);
    try {
      let imageUrl = '';

      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        imageUrl = await uploadImage(file);
      }

      const movieId = uuidv4();

      const movie: Omit<Movie, 'id'> = {
        title: data.title,
        description: data.description,
        name: data.title,
        imageUrl: imageUrl,
        rating: data.rating,
        releaseDate: data.releaseDate,
        genre: data.genre,
      };

      await setDoc(doc(store, 'movies', movieId), movie);
      alert('Movie added successfully!');
      navigate("/");

    } catch (error) {
      alert('Something went wrong we are sorry!');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
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
          label="Rating"
          variant="filled"
          type="number"
          {...register("rating")}
          error={!!errors.rating}
          helperText={errors.rating?.message}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <StarHalfIcon />
                </InputAdornment>
              ),
              inputProps: {
                min: 1,
                max: 5,
              },
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
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          }}
        >
          {loading ? <CircularProgress color="secondary" /> : "Submit"}
        </Button>

        <Decorator />
      </Box>
    </Box>
  );
};

export default FilmAdd;
