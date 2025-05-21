import { FC } from "react";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";
import ModalWrapper from "../Wrappers/ModalWrapper";
import { newsPhotosGridTemplateAreas } from "@/data/newsPhotosGridTemplateAreas";
import { IModalProps } from "@/types/IModalProps";
import { INews } from "@/types/INews";
import ModalItemWithScrollingContentWrapper from "../Wrappers/ModalItemWithScrollingContentWrapper";
import ModalItemHeightDeterminantWrapper from "../Wrappers/ModalItemHeightDeterminantWrapper";
import ModalContentDirectionDeterminant from "../Wrappers/ModalContentDirectionDeterminant";

interface Props extends IModalProps {
  news: INews;
}

const NewsModal: FC<Props> = ({ open, handleCloseClick, news, ...restProps }) => {

  return (
    <ModalWrapper open={open} handleCloseClick={handleCloseClick} {...restProps}>
      <ModalContentDirectionDeterminant>
        <ModalItemWithScrollingContentWrapper>
          <Stack spacing={2}>
            <Typography
              fontSize={{
                smallPhone: 18,
                tablet: 20
              }}
              fontWeight={400}
            >
              {news.title}
            </Typography>
            <Typography>{news.text}</Typography>
          </Stack>
        </ModalItemWithScrollingContentWrapper>
        <ModalItemHeightDeterminantWrapper>
          <Box sx={{
            display: "grid",
            gridTemplateAreas: newsPhotosGridTemplateAreas[3]
          }}>
            {
              new Array(4).fill(news.photos[0]).map((photo, i) => (
                // news.photos.map((photo, i) => (
                <Image
                  key={photo}
                  src={photo}
                  alt="news photo"
                  width={1080}
                  height={1080}
                  style={{
                    aspectRatio: 1,
                    objectFit: "cover",
                    gridArea: String.fromCodePoint(i + 97)
                  }}
                />
              ))
            }
          </Box>
        </ModalItemHeightDeterminantWrapper>
      </ModalContentDirectionDeterminant>
    </ModalWrapper>
  )
};

export default NewsModal;
