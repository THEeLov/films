import { Box, CardContent, Typography, Avatar } from '@mui/material';
import { format } from 'date-fns';

const CommentCard = ({ text, date }: { text: string; date: string }) => {

  let formattedDate = format(new Date(), 'MMMM dd, yyyy HH:mm:ss');
  if (date) {
    formattedDate = format(new Date(date), 'MMMM dd, yyyy HH:mm:ss');
  }

  return (
    <Box sx={{borderRadius: '0px', backgroundColor: "inherit"  }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" gap="1rem">
          <Avatar sx={{ bgcolor: '#ff6464', color: '#fff' }}>

            {/* First letter of the name or a placeholder */}
            U
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