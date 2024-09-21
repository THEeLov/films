import { useUserProfile, useUserRatedFilms } from "../hooks/useUser"; // Replace with your user profile fetching hook
import {
  Avatar,
  Typography,
  Box,
  LinearProgress,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import UserMovieCard from "../components/cards/UserMovieCard";

const UserProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: userProfile,
    isLoading: loadingProfileInfo,
    isError: profileError,
  } = useUserProfile(id);
  const {
    data: usersRatedFilms,
    isLoading: loadingUsersFilms,
  } = useUserRatedFilms(id);

  if (loadingProfileInfo || loadingUsersFilms) return <LinearProgress />;
  if (profileError) {
    navigate("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Avatar
        sx={{
          width: 200,
          height: 200,
          bgcolor: "grey.300",
        }}
        alt={userProfile?.displayName || "User"}
      >
        {userProfile?.profilePicUrl ? (
          <img
            src={userProfile.profilePicUrl}
            alt="Profile"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        ) : (
          <PersonIcon style={{ fontSize: 50 }} />
        )}
      </Avatar>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {userProfile?.displayName || "Anonymous User"}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {userProfile?.email}
      </Typography>

      <Box display="flex" flexDirection="column" gap="1rem" maxWidth="1024px" width="100%">
        <Typography
          variant="h4"
          component="h3"
          fontWeight="bold"
          color="#faaf00"
          width="100%"
        >
          Rated Films
        </Typography>
        
        {usersRatedFilms && usersRatedFilms.length === 0 ? (
          <Typography variant="body2" color="white" fontSize="1rem">
            No rated films yet.
          </Typography>
        ) : (
          <Box display="flex" gap="2rem" flexWrap="wrap" maxWidth="1024px" justifyContent="center">
            {usersRatedFilms &&
              usersRatedFilms.map((movie) => <UserMovieCard movie={movie} />)}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
