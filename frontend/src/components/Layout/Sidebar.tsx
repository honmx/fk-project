import { FC, RefObject, useContext, useEffect, useState } from "react";
import { Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material";
import leftArrow from "../../assets/left arrow.svg";
import rightArrow from "../../assets/right arrow.svg";
import userPhoto from "../../assets/user.jpg";
import logout from "../../assets/logout icon.svg";
import Image from "next/image";
import { useHover } from "@/hooks/useHover";
import { AuthContext } from "@/contexts/authContext";
import CustomLink from "../UI/CustomLink";
import { userLinks } from "@/data/userLinks";
import { coachLinks } from "@/data/coachLinks";
import { useResize } from "@/hooks/useResize";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import authService from "@/services/authService";
import Avatar from "../UI/Avatar";

interface Props {

}

const Sidebar: FC<Props> = ({ }) => {

  const { isLoading, user } = useCheckAuth({});
  const isTablet = useResize("tablet");
  const isLaptop = useResize("laptop");
  const { hoverRef, isHover } = useHover();
  const { setUser } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDrawerClick = () => {
    setIsOpen(prev => !prev);
  }

  const handleLogoutClick = async () => {
    await authService.logout();
    setUser(null);
  }

  if (isLoading || !user) return null;

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Box sx={{ position: "fixed !important", height: "100%", zIndex: 100 }}>
        <Drawer
          anchor="left"
          variant={isTablet ? "persistent" : "permanent"}
          open={isOpen}
          sx={{
            height: "100%",
            marginRight: "15px",
            transition: "all 0.15s ease",
            position: "static !important",
            "&>div": {
              position: "static !important"
            }
          }}
        >
          <Box sx={{ padding: "0 5px", height: "100%", }}>
            <List sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              "& .MuiListItem-root:not(:last-child)": {
                paddingBottom: "15px",
              }
            }}>
              <ListItem>
                <CustomLink href="/account" changeImgColorOnActiveLink={false}>
                  <Avatar
                    photo={user.photo}
                    width={50}
                    height={50}
                  />
                  {/* <Image
                    src={user?.photo || userPhoto}
                    alt="user"
                    width={50}
                    height={50}
                    style={{
                      maxWidth: "47px",
                      aspectRatio: 1,
                      objectFit: "cover",
                      borderRadius: 5
                    }}
                  /> */}
                  <Typography sx={{
                    fontSize: isOpen ? 16 : 0,
                    opacity: isOpen ? 1 : 0,
                    marginLeft: isOpen ? 1 : 0,
                    transition: "font-size 0.15s ease",
                  }}
                  >
                    {user?.name.split(" ").slice(0, 2).join(" ")}
                  </Typography>
                </CustomLink>
              </ListItem>
              {
                (user?.type === "coach" ? coachLinks : userLinks).map(item => (
                  <ListItem key={item.alt}>
                    <CustomLink href={item.href} changeImgColorOnHover sx={{ width: "100%" }}>
                      <Box sx={{
                        width: "47px",
                        display: "flex",
                        justifyContent: "center",
                      }}>
                        <Image
                          src={item.icon}
                          alt={item.alt}
                          style={{
                            maxWidth: "30px",
                            width: "100%"
                          }}
                        />
                      </Box>
                      <Typography sx={{
                        fontSize: isOpen ? 16 : 0,
                        opacity: isOpen ? 1 : 0,
                        marginLeft: isOpen ? 1 : 0,
                        transition: "font-size 0.15s ease"
                      }}
                      >
                        {item.text}
                      </Typography>
                    </CustomLink>
                  </ListItem>
                ))
              }
              {
                isLaptop &&
                <ListItem>
                  <IconButton
                    color="black"
                    disableRipple
                    onClick={handleLogoutClick}
                    sx={{ aspectRatio: 0, padding: 0 }}
                  >
                    <Box sx={{
                      width: "47px",
                      display: "flex",
                      justifyContent: "center",
                    }}>
                      <Image
                        src={logout}
                        alt="logout"
                        style={{
                          maxWidth: "30px",
                          width: "100%"
                        }}
                      />
                    </Box>
                    <Typography sx={{
                      fontSize: isOpen ? 16 : 0,
                      opacity: isOpen ? 1 : 0,
                      marginLeft: isOpen ? 1 : 0,
                      transition: "font-size 0.15s ease",
                      color: "typography.dark"
                    }}
                    >
                      Выйти
                    </Typography>
                  </IconButton>
                </ListItem>
              }
            </List>
          </Box>
        </Drawer>
        <button
          ref={hoverRef as RefObject<HTMLButtonElement>}
          onClick={handleOpenDrawerClick}
          style={{
            position: isTablet && !isOpen ? "fixed" : "absolute",
            left: isTablet && !isOpen ? "9px" : "calc(100% - 15px)",
            top: isTablet && !isOpen ? "110px" : "40px",
            transform: "translate(-50%, -50%)",
            backgroundColor: isHover ? "#F8F8F8" : "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: isOpen ? "30px" : "40px",
            width: isOpen ? "30px" : "20px",
            border: "1px solid #DDD",
            borderRadius: "3px",
            transition: "width 0.15s ease"
          }}
        >
          <Image
            src={isOpen ? leftArrow : rightArrow}
            alt="arrow"
            style={{
              filter: "invert(0.5)",
              width: "9px",
              height: "9px",
            }}
          />
        </button>
      </Box>
    </Box>
  )
};

export default Sidebar;