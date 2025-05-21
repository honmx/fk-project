import { useEffect, useRef, useState } from "react";

export const useCarouselScroll = () => {

  const carouselRef = useRef<HTMLDivElement>(null);

  const [isAbleToScrollLeft, setIsAbleToScrollLeft] = useState<boolean>(false);
  const [isAbleToScrollRight, setIsAbleToScrollRight] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;

      carouselRef.current?.scrollLeft > 5
        ? setIsAbleToScrollLeft(true)
        : setIsAbleToScrollLeft(false);

      carouselRef.current?.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 5
        ? setIsAbleToScrollRight(false)
        : setIsAbleToScrollRight(true);
    }

    carouselRef.current?.addEventListener("scroll", handleScroll);

    return () => carouselRef.current?.removeEventListener("scroll", handleScroll)
  }, [carouselRef.current?.scrollLeft]);

  return {
    carouselRef,
    isAbleToScrollLeft,
    isAbleToScrollRight
  }
}