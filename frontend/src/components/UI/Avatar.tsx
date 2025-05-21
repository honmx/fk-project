import { CSSProperties, FC } from "react";
import userPhoto from "@/assets/user.jpg";
import Image from "next/image";

interface Props {
  photo: string | null;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

const Avatar: FC<Props> = ({ photo, width, height, style }) => {

  return (
    <Image
      src={photo || userPhoto}
      alt="user photo"
      width={width || 60}
      height={height || 60}
      style={{ aspectRatio: 1, objectFit: "cover", borderRadius: 5, ...style }}
    />
  )
};

export default Avatar;