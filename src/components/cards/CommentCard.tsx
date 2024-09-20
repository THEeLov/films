import { Box, CardContent, Typography, Avatar } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

const CommentCard = ({ text, date }: { text: string; date: Timestamp }) => {
  let formattedDate = "Unknown date";

  try {
    formattedDate = format(date.toDate(), "MMMM dd, yyyy HH:mm");
  } catch (error) {
    console.error("Error formatting date: ", error);
  }

  return (
    <Box sx={{ borderRadius: "0px", backgroundColor: "inherit" }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" gap="1rem">
          <Avatar sx={{ bgcolor: "#ff6464", color: "#fff" }}>
            {/* Placeholder initial for the user */}U
          </Avatar>
          <Box flex="1">
            <Typography variant="body1" gutterBottom>
              {text}
            </Typography>
            <Typography variant="caption" color="grey">
              {formattedDate}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default CommentCard;
