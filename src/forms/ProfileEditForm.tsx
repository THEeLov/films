import { useForm } from "react-hook-form";
import { userEditSchema } from "../validationSchemas/userForms";
import { UserEditSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Zoom,
} from "@mui/material";
import useImagePreview from "../hooks/useImagePreview";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useUserEdit } from "../hooks/useUser";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

const ProfileEditForm = ({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
  });

  const { imagePreview, handleImageChange } = useImagePreview();
  const { mutateAsync: editProfile, isPending } = useUserEdit();

  const onSubmit = async (data: UserEditSchema) => {
    try {
      await editProfile(data);
      handleClose();
    }
    catch (error) {
      alert("Something went wrong please try again later.")
      console.error("Error editing profile: ", error);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          padding="1rem"
          gap="1rem"
        >
          <TextField
            type="text"
            {...register("displayName")}
            variant="outlined"
            label="Username"
          >
            Username
          </TextField>

          {imagePreview && (
            <Box component="img" src={imagePreview} alt="preview" width="200" />
          )}

          <TextField
            type="file"
            {...register("profilePic")}
            variant="outlined"
            onChange={handleImageChange}
          >
            Profile Picture
          </TextField>

          <Button
            type="submit"
            variant="outlined"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Edit Profile
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditForm;
