import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import { useCarouselScroll } from "@/hooks/useCarouselScroll";
import leftArrow from "@/assets/left arrow.svg";
import rightArrow from "@/assets/right arrow.svg";
import { useHover } from "@/hooks/useHover";
import { useResize } from "@/hooks/useResize";

interface Props extends PropsWithChildren {

}

const Carousel: FC<Props> = ({ children }) => {

  const isTablet = useResize("laptop");

  const { carouselRef, isAbleToScrollLeft, isAbleToScrollRight } = useCarouselScroll();
  const { hoverRef, isHover } = useHover();

  const handleLeftClick = () => {
    carouselRef.current?.scrollTo({
      left: carouselRef.current.scrollLeft - carouselRef.current.clientWidth + 50,
      behavior: "smooth"
    });
  }

  const handleRightClick = () => {
    carouselRef.current?.scrollTo({
      left: carouselRef.current.scrollLeft + carouselRef.current.clientWidth - 50,
      behavior: "smooth"
    });
  }

  return (
    <Box
      ref={hoverRef}
      sx={{ position: "relative" }}
    >
      {
        !isTablet &&
        <Button
          sx={{
            opacity: isAbleToScrollLeft && isHover ? "1" : "0",
            position: "absolute",
            top: "50%",
            left: "5px",
            transform: "translateY(-50%)",
            minWidth: "15px",
            backgroundColor: "#00000099",
            backdropFilter: "blur(5px)",
            padding: "45px 15px",
            borderRadius: "5px",
            transition: "all 0.15s ease",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#000000AA"
            }
          }}
          onClick={handleLeftClick}
        >
          <Image src={leftArrow} alt="left arrow" width={10} height={10} />
        </Button>
      }
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          position: "relative",
          overflow: "auto",
          padding: "20px 15px",
          "&>*:not(:last-child)": {
            marginRight: 3
          },
          "&::-webkit-scrollbar": {
            display: "none"
          }
        }}
      >
        {children}
      </Box>
      {
        !isTablet &&
        <Button
          sx={{
            opacity: isAbleToScrollRight && isHover ? "1" : "0",
            position: "absolute",
            top: "50%",
            right: "5px",
            transform: "translateY(-50%)",
            minWidth: "15px",
            backgroundColor: "#00000099",
            backdropFilter: "blur(5px)",
            padding: "45px 15px",
            borderRadius: "5px",
            transition: "all 0.15s ease",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#000000AA"
            }
          }}
          onClick={handleRightClick}
        >
          <Image src={rightArrow} alt="left arrow" width={10} height={10} />
        </Button>
      }
    </Box>
  )
};

export default Carousel;
