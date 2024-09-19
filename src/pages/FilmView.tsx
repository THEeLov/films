import { useParams } from "react-router-dom";
import { store } from "../config/firebase";
import { useEffect, useState } from "react";
import { Movie } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { CircularProgress, Box, useTheme, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SecondaryText from "../components/SecondaryText";
import CommentForm from "../forms/CommentForm";
import Comments from "../components/Comments";
import RatingForm from "../forms/RatingForm";

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
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      {loading && <CircularProgress color="error" />}

      {error && <>{error}</>}

      {movie && (
        <>
          <Box component="div" sx={{ flexGrow: 1, marginTop: "4rem" }}>
            <Grid container>
              {/* Movie Image Section */}
              <Grid size={{ lg: 6, sm: 6 }}>
                <Box
                  component="img"
                  src={movie.imageUrl}
                  sx={{
                    width: "200px",
                    height: "250px",
                    borderRadius: "8px",
                  }}
                />
              </Grid>

              {/* Movie Info Section */}
              <Grid size={{ lg: 6, sm: 6 }}>
                <Box display="flex" flexDirection="column" flexGrow={1}>
                  <Typography
                    component="h3"
                    variant="h3"
                    fontWeight="bold"
                    marginBottom="1rem"
                  >
                    {movie.title}
                  </Typography>
                  <SecondaryText
                    label="Release Date"
                    value={movie.releaseDate.toString()}
                  />
                  <SecondaryText
                    label="Genres"
                    value={movie.genre.join(" / ")}
                  />
                  <SecondaryText
                    label="Rating"
                    value={
                      movie.totalRatings === 0
                        ? "- - -"
                        : `${
                            Number.isInteger(movie.averageRating)
                              ? movie.averageRating
                              : movie.averageRating.toFixed(2)
                          }%`
                    }
                  />
                  <SecondaryText
                    label="Description"
                    value={movie.description}
                  />
                </Box>
              </Grid>

              {/* Rating form */}
              <Grid size={12} marginTop="1rem">
                <Box width="90%">
                  <b>Rate this film:</b>
                  <RatingForm movieId={movie.id} />
                </Box>
              </Grid>
              {/* Comment form */}
              <Grid size={12} marginTop="6rem">
                <Box width="90%">
                  <CommentForm movieId={movie.id} />
                </Box>
              </Grid>
            </Grid>

            {/* Comment Section Below */}
            <Box width="100%" marginTop="1rem">
              <b>Commmets</b>
              <Comments movieId={movie.id} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default FilmView;
