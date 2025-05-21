import { Link, LinkProps } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

interface Props extends LinkProps {
  changeImgColorOnHover?: boolean;
  changeImgColorOnActiveLink?: boolean;
}

const CustomLink: FC<Props> = ({ href, changeImgColorOnActiveLink = true, changeImgColorOnHover = false, ...restProps }) => {

  const router = useRouter();

  const { sx, ...propsWithoutSx } = restProps;

  return (
    <Link
      sx={{
        cursor: "pointer",
        ...sx,
        "& img": {
          transition: "all 0.15s ease",
          filter: (
            router.pathname === "/" && href === "/"
            || href !== "/" && router.pathname.includes(href as string)
          ) && changeImgColorOnActiveLink
            ? "invert(29%) sepia(41%) saturate(4358%) hue-rotate(203deg) brightness(103%) contrast(106%) !important"
            : "none !important",
        },
        "&:hover img": {
          filter: changeImgColorOnHover ? "invert(29%) sepia(41%) saturate(4358%) hue-rotate(203deg) brightness(103%) contrast(106%) !important" : "none"
        }
      }}
      color={
        router.pathname === "/" && href === "/"
        || href !== "/" && router.pathname.includes(href as string)
          ? "typography.main"
          : "typography.dark"} href={href} {...propsWithoutSx}
    />
  )
};

export default CustomLink;
