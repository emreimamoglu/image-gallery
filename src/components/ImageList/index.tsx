import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  CircularProgress,
  Pagination,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useImageContext } from "../../contexts/images";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Image } from "../../types";
import DisplayModal from "../DisplayModal";
import { useState } from "react";

export default function TitlebarImageList() {
  const { images, loading, page, setPage } = useImageContext();

  const isDesktop = useMediaQuery("(min-width:1080px)");
  const isTablet = useMediaQuery("(min-width:768px)");
  const isMobile = useMediaQuery("(min-width:320px)");

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const cols = isDesktop ? 6 : isTablet ? 3 : isMobile ? 1 : 1;

  const handleImageClick = (item: Image) => {
    setSelectedImage(item);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <section id="image-list" style={{ width: "100%", height: "100%" }}>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography variant="h4" component="h4" color="primary">
            Loading...
          </Typography>
          <CircularProgress />
        </div>
      ) : images.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImageList
            sx={{ width: "100%", height: "100%", padding: "3rem" }}
            cols={cols}
            gap={8}
          >
            {images.map((item) => (
              <ImageListItem
                key={item.id}
                sx={{ position: "relative" }}
                onClick={() => handleImageClick(item)}
              >
                <div
                  style={{
                    position: "absolute",
                    right: ".5rem",
                    top: ".5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 8px",
                    borderRadius: "16px",
                    background: "#FFF",
                  }}
                >
                  <FavoriteIcon sx={{ width: "1rem" }} />
                  <Typography component={"span"} fontSize={".75rem"}>
                    {item.likes}
                  </Typography>
                </div>
                <img src={item.previewURL} alt={item.tags} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              marginInlineEnd: "3rem",
              marginBlockEnd: "3rem",
            }}
          >
            <Pagination count={10} page={page} onChange={handleChange} />
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <SentimentDissatisfiedIcon
            sx={{ width: "5rem", height: "5rem" }}
            color="primary"
          />
          <Typography variant="h4" component="h4" color="primary">
            No Images Found
          </Typography>
        </div>
      )}
      {selectedImage && (
        <DisplayModal
          handleClose={handleClose}
          open={modalOpen}
          image={selectedImage}
        />
      )}
    </section>
  );
}
