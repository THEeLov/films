import { useParams } from "react-router-dom";
import { store } from "../config/firebase";
import { useEffect, useState } from "react";
import { Movie } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { CircularProgress, Box, useTheme, Typography } from "@mui/material";
import Decorator from "../decorators/Decorator";
import SecondaryText from "../components/SecondaryText";

const FilmView = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      if (!id) {
        setError("Invalid Film ID");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(store, "movies", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const movieData = docSnap.data() as Movie;
          setMovie({ ...movieData, id: docSnap.id });
        } else {
          setError("Film not found");
        }
      } catch (err) {
        setError("Failed to retrieve film data");
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "1rem",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {loading && <CircularProgress color="error" />}

      {error && <>{error}</>}

      {movie && (
        <>
          <Box component="div" display="flex" gap="2rem" flexWrap="wrap">
            <Box
              component="img"
              src={movie.imageUrl}
              width="200px"
              height="250px"
            ></Box>
            <Box component="div">
              <Typography
                component="h3"
                variant="h3"
                fontWeight="bold"
                marginBottom="1rem"
              >
                {movie.title}
              </Typography>
              <SecondaryText label="Release Date" value={movie.releaseDate} />
              <SecondaryText label="Genres" value={movie.genre.join(" / ")} />
              <SecondaryText label="Rating" value={movie.rating} />
              <SecondaryText label="Description" value={movie.description}/>
            </Box>
          </Box>
          <Box>
            
          </Box>

          <Decorator />
        </>
      )}
    </Box>
  );
};

export default FilmView;
