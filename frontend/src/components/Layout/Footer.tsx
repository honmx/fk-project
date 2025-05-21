import { FC } from "react";
import { Box, BoxProps, Container, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/footykids-logo-1.svg";
import { footerLinks } from "@/data/footerLinks";

interface Props extends BoxProps {

}

const Footer: FC<Props> = ({ ...restProps }) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "typography.light",
        paddingTop: "10px",
        paddingBottom: "10px",
        zIndex: 100,
      }}
      {...restProps}
    >
      <Container maxWidth={false} sx={{
        display: "grid",
        gridTemplateAreas: {
          smallPhone: `
            "a d"
            "b c"
          `,
          largePhone: `
            "a b c"
          `
        },
        alignItems: "center",
        gap: 2,
      }}>
        <Box sx={{ gridArea: "a" }}>
          <Link href="/">
            <Image src={logo} alt="logo" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>
        </Box>
        <Box sx={{ gridArea: "b", justifySelf: { smallPhone: "start", tablet: "auto" } }}>
          <Stack direction="row" spacing={1} sx={{
            justifyContent: "center",
            alignItems: "center"
          }}>
            {
              footerLinks.map(link => (
                <Link key={link.alt} href={link.href} target="_blank">
                  <IconButton size="medium" color="white">
                    <Image src={link.src} alt={link.alt} />
                  </IconButton>
                </Link>
              ))
            }
          </Stack>
        </Box>
        <Box sx={{ gridArea: "c", justifySelf: "end" }}>
          <Typography fontSize={16} fontWeight={300}>2023</Typography>
        </Box>
      </Container>
    </Box>
  )
};

export default Footer;
