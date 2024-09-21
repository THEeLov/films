import { useUserProfile } from '../hooks/useUser'; // Replace with your user profile fetching hook
import { Avatar, Typography, Box, LinearProgress, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfile = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: userProfile, isLoading, isError } = useUserProfile(id);

  if (isLoading) return <LinearProgress />;
  if (isError) {
    navigate("/");
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: 2, 
        backgroundColor: theme.palette.primary.main
      }}
    >
      <Avatar 
        sx={{ 
          width: 200, 
          height: 200, 
          bgcolor: 'grey.300' 
        }} 
        alt={userProfile?.displayName || 'User'}
      >
        {userProfile?.profilePicUrl ? (
          <img src={userProfile.profilePicUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          <PersonIcon style={{ fontSize: 50 }} />
        )}
      </Avatar>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {userProfile?.displayName || 'Anonymous User'}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {userProfile?.email}
      </Typography>

      <Typography variant="h4" component="h3" fontWeight="bold">
        Rated movies:
      </Typography>
    </Box>
  );
};

export default UserProfile;