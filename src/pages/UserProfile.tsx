import { useUserProfile, useUserRatedFilms } from "../hooks/useUser"; // Replace with your user profile fetching hook
import {
  Avatar,
  Typography,
  Box,
  LinearProgress,
  useTheme,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useParams } from "react-router-dom";
import UserMovieCard from "../components/cards/UserMovieCard";
import SecondaryText from "../components/SecondaryText";
import { convertDateToString } from "../utils/convertDateToString";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../contexts/AuthProvider";

const UserProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  const {
    data: userProfile,
    isLoading: loadingProfileInfo,
    isError: profileError,
  } = useUserProfile(id);
  const { data: usersRatedFilms, isLoading: loadingUsersFilms } =
    useUserRatedFilms(id);

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
        padding: "2rem",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box maxWidth="1024px" width="100%" marginTop="1rem">
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="1rem"
        >
          <Box display="flex" gap="2rem" flexWrap="wrap">
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

            <Box display="flex" flexDirection="column">
              <Typography
                variant="h3"
                sx={{ marginTop: 2 }}
                color="white"
                fontWeight="bold"
              >
                {userProfile?.displayName || "Unknown User"}
              </Typography>
              <SecondaryText label="Email" value={userProfile!.email} />
              <SecondaryText
                label="Joined"
                value={convertDateToString(userProfile!.createdAt)}
              />
            </Box>
          </Box>
          {currentUser?.uid === id && (
            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  marginTop: 2,
                }}
              >
                Edit Profile
                <EditIcon sx={{ marginLeft: "0.5rem" }} />
              </Button>
            </Box>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap="1rem" marginTop="6rem">
          <Typography
            variant="h4"
            component="h3"
            fontWeight="bold"
            color={theme.palette.secondary.main}
            width="100%"
          >
            Rated Films
          </Typography>

          {usersRatedFilms && usersRatedFilms.length === 0 ? (
            <Typography variant="body2" color="white" fontSize="1rem">
              No rated films yet.
            </Typography>
          ) : (
            <Box
              display="flex"
              gap="2rem"
              flexWrap="wrap"
              maxWidth="1024px"
              justifyContent="center"
            >
              {usersRatedFilms &&
                usersRatedFilms.map((movie) => <UserMovieCard movie={movie} />)}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
