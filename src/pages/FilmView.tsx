import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Box, useTheme, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SecondaryText from "../components/common/SecondaryText";
import CommentForm from "../forms/CommentForm";
import Comments from "../components/comments/Comments";
import RatingForm from "../forms/RatingForm";
import { useFilm } from "../hooks/useFilms";

const FilmView = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Get movie id from the URL params and fetch with custom hook
  const { id } = useParams<{ id: string }>();
  const { data: movie, isLoading, error } = useFilm(id);

  // User try to go to film that doesnt exist
  if (error) {
    navigate("/");
  }

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
      {isLoading && <CircularProgress color="error" />}

      {movie && (
        <>
          <Box component="div" sx={{ flexGrow: 1, marginTop: "4rem" }}>
            <Grid container spacing={2}>
              {/* Movie Image Section */}
              <Grid size={{ lg: 5, sm: 7 }}>
                <Box
                  sx={{
                    width: "300px",
                    height: "350px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={movie.imageUrl}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid>

              {/* Movie Info Section */}
              <Grid size={{ lg: 7, sm: 5 }}>
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
                        : `${Math.round(movie.averageRating)}%`
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
