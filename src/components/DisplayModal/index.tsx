import { Modal, Box } from "@mui/material";
import { Image } from "../../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "80%",
  boxShadow: 24,
  border: "none",
  outline: "none",
};

type DisplayModalProps = {
  open: boolean;
  handleClose: () => void;
  image: Image;
};

const DisplayModal = ({ open, handleClose, image }: DisplayModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
    >
      <Box sx={style}>
        <img
          src={image.largeImageURL}
          alt={image.tags}
          style={{
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Modal>
  );
};

export default DisplayModal;
