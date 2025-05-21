import { useEffect, useRef, useState } from "react"

export const useHover = () => {
  const hoverRef = useRef<HTMLDivElement | HTMLButtonElement>(null);

  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseOver = () => {
      if (!hoverRef.current) return;

      setIsHover(true);
    }

    const handleMouseOut = () => {
      if (!hoverRef.current) return;

      setIsHover(false);
    }

    hoverRef.current?.addEventListener("mouseover", handleMouseOver);
    hoverRef.current?.addEventListener("mouseout", handleMouseOut);

    return () => {
      hoverRef.current?.removeEventListener("mouseover", handleMouseOver);
      hoverRef.current?.removeEventListener("mouseout", handleMouseOut);
    }
  }, []);

  return { hoverRef, isHover, setIsHover }
}