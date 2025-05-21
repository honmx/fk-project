import { FC, useState } from "react";
import Image from "next/image";
import { Box, Container, IconButton } from "@mui/material";
import DarkForeground from "../UI/DarkForeground";
import videoPreviewPhoto from "@/assets/video-preview.jpg";
import playVideoBtn from "@/assets/play-video-btn.svg";
import { useResize } from "@/hooks/useResize";

interface Props {
  
}

const AboutUsVideo: FC<Props> = ({  }) => {

  const isSmallerTablet = useResize("tablet");

  const [isVideoActive, setIsVideoActive] = useState<boolean>(false);

  const handleStartVideoClick = () => {
    setIsVideoActive(true);
  }
  
  return (
    <Box data-aos="zoom-in" data-aos-duration="500">
        <Container maxWidth="desktop" disableGutters={isSmallerTablet}>
          {
            isVideoActive
              ? (
                <iframe
                  src="https://www.youtube.com/embed/7xJ7SEru57I?autoplay=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    width: "100%",
                    aspectRatio: 1.77,
                    borderRadius: isSmallerTablet ? 0 : "10px",
                  }}
                />
              ) : (
                <Box sx={{ borderRadius: { smallerPhone: 0, tablet: "10px" }, overflow: "hidden", position: "relative" }}>
                  <DarkForeground>
                    <Image
                      src={videoPreviewPhoto}
                      alt="video preview"
                      style={{
                        objectFit: "cover",
                        aspectRatio: 1.77,
                        filter: "grayscale(100%)"
                      }}
                    />
                  </DarkForeground>
                  <IconButton
                    sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    onClick={handleStartVideoClick}
                  >
                    <Image src={playVideoBtn} alt="play button" width={50} />
                  </IconButton>
                </Box>
              )
          }
        </Container>
      </Box>
  )
};

export default AboutUsVideo;
