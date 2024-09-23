import { Box, CardContent, Typography, Avatar, Skeleton } from "@mui/material";
import { format } from "date-fns";
import { Comment } from "../../types";
import PersonIcon from '@mui/icons-material/Person';
import { useUserProfile } from "../../hooks/useUser";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CommentCard = ({ commentInfo }: { commentInfo: Comment }) => {
  const { data: userInfo, isLoading } = useUserProfile(commentInfo.userId);

  let formattedDate = "Unknown date";

  try {
    formattedDate = format(commentInfo.date.toDate(), "MMMM dd, yyyy HH:mm");
  } catch (error) {
    console.error("Error formatting date: ", error);
  }

  // Default values
  const displayName = isLoading
    ? "Loading..."
    : userInfo?.displayName || "Unknown User";
  const avatarSrc = isLoading ? "" : userInfo?.profilePicUrl || "";

  return (
    <Box sx={{ borderRadius: "0px", backgroundColor: "inherit", mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" gap="1rem">
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ display: isLoading ? "block" : "none" }}
          />
          <Avatar
            sx={{
              bgcolor: "grey.300",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"

            }}
            src={avatarSrc}
            alt={displayName}
          >
            {!avatarSrc && !isLoading && <PersonIcon />}
          </Avatar>
          <Box flex="1">
            <Skeleton 
              variant="text"
              width="40%"
              sx={{ display: isLoading ? "block" : "none" }}
            />
            <Typography
              variant="caption"
              color="black"
              sx={{ display: isLoading ? "none" : "block", color: "white"}}
              component={Link}
              to={`/user/${commentInfo.userId}`}
            >
              {displayName}
            </Typography>
            <Skeleton
              variant="text"
              width="60%"
              sx={{ display: isLoading ? "block" : "none" }}
            />
            <Typography
              variant="body1"
              gutterBottom
              sx={{ display: isLoading ? "none" : "block", marginTop:"0.5rem" }}
            >
              {commentInfo.comment}
            </Typography>
            <Typography
              variant="caption"
              color="grey"
              sx={{ display: isLoading ? "none" : "block" }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default CommentCard;
