import { FC, RefObject, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, ClickAwayListener, Container, Divider, IconButton, Link, List, ListItem, ListItemButton, Menu, MenuItem, MenuList, Paper, Popper, Stack, SwipeableDrawer, Typography } from "@mui/material";
import CustomLink from "../UI/CustomLink";
import { headerLinks } from "@/data/mainPageLinks";
import logo from "@/assets/footykids-logo-1.svg";
import logout from "@/assets/logout icon.svg";
import menu from "@/assets/menu icon.svg";
import arrowDown from "@/assets/arrow down.svg";
import { useResize } from "@/hooks/useResize";
import { useHover } from "@/hooks/useHover";
import Dropdown from "../UI/Dropdown";
import { useRouter } from "next/router";
import authService from "@/services/authService";
import { AuthContext } from "@/contexts/authContext";

interface Props {

}

const Header: FC<Props> = ({ }) => {

  const router = useRouter();

  const isLaptop = useResize("laptop");
  const { hoverRef, isHover } = useHover();
  const { user, setUser } = useContext(AuthContext);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleOpenDrawerClick = () => {
    setIsDrawerOpen(prev => !prev);
  }

  const handleLogoutClick = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppBar sx={{ paddingTop: 2, paddingBottom: 2, overflow: "visible" }}>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Box>
          <Link href="/">
            <Image src={logo} alt="FootyKids" />
          </Link>
        </Box>
        {
          isLaptop
            ? (
              <Box>
                <IconButton size="medium" color="black" onClick={handleOpenDrawerClick}>
                  <Image src={menu} alt="menu" />
                </IconButton>
                <SwipeableDrawer
                  open={isDrawerOpen}
                  anchor="right"
                  onOpen={handleOpenDrawerClick}
                  onClose={handleOpenDrawerClick}
                  sx={{
                    "& .MuiDrawer-paper": {
                      minWidth: "min(calc(100% - 60px), 300px)",
                    }
                  }}
                >
                  <Typography
                    component="h3"
                    textAlign="center"
                    fontSize="40px"
                    color="typography.dark"
                    padding="20px 0"
                  >
                    Меню
                  </Typography>
                  <Divider />
                  <List component="nav" onClick={handleOpenDrawerClick} sx={{ height: "100%" }}>
                    <Accordion disableGutters sx={{ borderBottom: "none !important" }}>
                      <AccordionSummary
                        onClick={(e) => e.stopPropagation()}
                        expandIcon={<Image src={arrowDown} alt="arrow" style={{ width: "10px", height: "10px", aspectRatio: 1 }} />}
                        sx={{
                          color: router.pathname === "/"
                            ? "typography.main"
                            : "",
                          "& img": {
                            filter: router.pathname === "/"
                              ? "invert(29%) sepia(41%) saturate(4358%) hue-rotate(203deg) brightness(103%) contrast(106%) !important"
                              : ""
                          },
                          "& .MuiAccordionSummary-content": {
                            flex: "0 0 0",
                          },
                          "& .MuiAccordionSummary-expandIconWrapper": {
                            minWidth: "10px"
                          },
                          "& .Mui-expanded.MuiAccordionSummary-expandIconWrapper": {
                            transform: "rotate(-180deg) !important",
                          }
                        }}
                      >
                        <Typography fontSize="22px">Главная</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {
                          headerLinks.map(link => (
                            <ListItemButton key={link.href} sx={{ justifyContent: "center", padding: "10px 0" }}>
                              <CustomLink
                                href={link.href}
                                fontSize="20px"
                              >
                                {link.text}
                              </CustomLink>
                            </ListItemButton>
                          ))
                        }
                      </AccordionDetails>
                    </Accordion>
                    <CustomLink
                      href="/account"
                      sx={{
                        marginTop: "10px",
                        fontSize: "22px",
                        justifyContent: "center"
                      }}
                    >
                      Личный кабинет
                    </CustomLink>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "40%",
                        translate: "0 -50%",
                        padding: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "5px",
                          height: "30px",
                          backgroundColor: "secondary.main",
                          borderRadius: "100vw",
                          cursor: "pointer"
                        }}
                      />
                    </Box>
                  </List>
                </SwipeableDrawer>
              </Box>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <Stack component="nav" direction="row" spacing={2}>
                  <Box ref={hoverRef} sx={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }}>
                    <CustomLink href="/" changeImgColorOnHover>
                      <Typography>Главная</Typography>
                      <Image
                        src={arrowDown}
                        alt="arrow"
                        style={{
                          transform: isHover ? "rotate(-180deg)" : "rotate(0deg)",
                          filter: "brightness(0) invert(0)",
                          transition: "all 0.2s ease !important",
                          width: "9px",
                          height: "9px",
                          marginLeft: "7px"
                        }}
                      />
                    </CustomLink>
                    <Dropdown open={isHover}>
                      {
                        headerLinks.map(link => (
                          <CustomLink key={link.href} href={link.href} sx={{ whiteSpace: "nowrap" }}>
                            <ListItemButton>{link.text}</ListItemButton>
                          </CustomLink>
                        ))
                      }
                    </Dropdown>
                  </Box>
                  <CustomLink href="/account">Личный кабинет</CustomLink>
                </Stack>
              </Box>
            )
        }
        {
          !isLaptop && user &&
          <IconButton color="black" onClick={handleLogoutClick}>
            <Image src={logout} alt="logout" style={{ width: "20px", height: "20px" }} />
          </IconButton>
        }
      </Container>
    </AppBar>
  )
};

export default Header;