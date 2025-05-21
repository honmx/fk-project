/* eslint-disable no-unused-vars */
import { Link, createTheme } from "@mui/material";
import { Noto_Sans } from "next/font/google";
import NextLink, { LinkProps } from "next/link";
import { Ref, forwardRef } from "react";
import parser from "ua-parser-js";
import mediaQuery from "css-mediaquery";
import Image from "next/image";
import emptyCheckBoxIcon from "@/assets/empty checkbox icon.svg";
import checkedCheckBoxIcon from "@/assets/checked checkbox icon.svg";
import emptyRadioIcon from "@/assets/empty radio icon.svg";

const font = Noto_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

declare module "@mui/material/styles" {

  interface PaletteColor {
    background?: string;
    borderHover?: string;
  }

  interface SimplePaletteColorOptions {
    background?: string;
    borderHover?: string;
  }

  interface Palette {
    typography: Palette["primary"];
    glassy: Palette["primary"];
    sheet: Palette["primary"];
    input: Palette["primary"];
  }

  interface PaletteOptions {
    typography: PaletteOptions["primary"];
    glassy: PaletteOptions["primary"];
    sheet: PaletteOptions["primary"];
    input: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    typography: true;
    glassy: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    white: true;
    black: true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    sm: false,
    md: false,
    lg: false,
    xl: false,
    smallPhone: true,
    middlePhone: true,
    largePhone: true,
    smallTablet: true,
    tablet: true,
    laptop: true,
    desktop: true,
    largeDesktop: true,
    container: true,
  }
}

interface ICreateThemeProps {
  deviceType: "mobile" | "desktop";
}

export const createCustomTheme = ({ deviceType }: ICreateThemeProps) => {

  const globalTheme = createTheme({
    typography: {
      fontFamily: font.style.fontFamily,
    },
    shape: {
      borderRadius: 5
    },
  });

  const paletteTheme = createTheme({
    palette: {
      // general colors
      primary: {
        main: "#478DE0",
        dark: "#4483CD",
        light: "#ff0000",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#CCCCCC",
        dark: "#BFBFBF",
        light: "#EFEFEF",
        contrastText: "#FFFFFF",
      },
      error: {
        main: "#FF0000"
      },
      success: {
        main: "#77DD77",
      },
      // custom colors
      glassy: {
        main: "#F8F8F888",
        dark: "#CFCFCF88",
        contrastText: "#FFFFFF"
      },
      typography: {
        main: "#0075FF",
        dark: "#000000",
        light: "#FFFFFF",
      },
      sheet: {
        main: "#F8F8F8",
        dark: "",
      },
      input: {
        main: "",
        background: "#F0F0F0",
        borderHover: "#CCCCCC"
      },
    }
  });

  const breakpointsTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        smallPhone: 320,
        middlePhone: 375,
        largePhone: 425,
        smallTablet: 600,
        tablet: 768,
        laptop: 1024,
        desktop: 1440,
        largeDesktop: 1920,
        container: 900
      }
    },
  });

  const theme = createTheme({
    ...globalTheme,
    palette: paletteTheme.palette,
    breakpoints: breakpointsTheme.breakpoints,
    components: {
      // HOOKS
      MuiUseMediaQuery: {
        defaultProps: {
          ssrMatchMedia: (query) => ({
            matches: mediaQuery.match(query, {
              // The estimated CSS width of the browser.
              width: deviceType === "mobile" ? "0px" : "1024px",
            }),
          })
        }
      },
      // WIDGETS
      MuiContainer: {
        variants: [
          {
            props: { disableGutters: true },
            style: {
              paddingInline: 0
            }
          }
        ],
        defaultProps: {
          maxWidth: "container"
        },
        styleOverrides: {
          root: {
            paddingInline: 15,
          }
        }
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            "@media screen and (min-width: 900px)": {
              maxWidth: "none"
            }
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            padding: 0,
            backgroundColor: "#FFFFFF88",
            backdropFilter: "blur(7px)",
            boxShadow: "none",
            borderBottom: "1px solid #DDDDDD"
          },
        }
      },
      // ENTITIES
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            boxShadow: "none",
            "&::before": {
              display: "none",
            },
            "&:not(:last-child)": {
              borderBottom: "1px solid #BBBBBB"
            }
          }
        }
      },
      MuiAccordionSummary: {
        styleOverrides: {
          content: {
            margin: "20px 0",
          },
          expandIconWrapper: {
            marginLeft: "10px",
            minWidth: "15px",
            "&.Mui-expanded": {
              transform: "rotate(-45deg)"
            },
            "& img": {
              width: "15px",
              height: "15px",
            }
          }
        }
      },
      MuiModal: {
        styleOverrides: {
          backdrop: {
            transition: "all 0.15s ease !important"
          }
        }
      },
      MuiPaper: {
        defaultProps: {
          elevation: 7
        },
        styleOverrides: {
          root: {
            overflow: "hidden",
          }
        }
      },
      // UI COMPONENTS
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginInline: 4,
          },
          label: {
            fontSize: 14
          }
        }
      },
      MuiCheckbox: {
        defaultProps: {
          checkedIcon: <Image src={checkedCheckBoxIcon} alt="checked checkbox" width={18} height={18} />,
          icon: <Image src={emptyCheckBoxIcon} alt="empty checkbox" width={18} height={18} />
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                backgroundColor: paletteTheme.palette.input.background,
                borderColor: "transparent",
                transition: "all 0.15s ease"
              },
              "& input": {
                fontWeight: 300,
                zIndex: 2,
              },
              "&:hover fieldset": {
                borderColor: paletteTheme.palette.input.borderHover,
              },
              "&.Mui-focused fieldset": {
                borderColor: paletteTheme.palette.primary.main,
              },
              "&.Mui-error fieldset": {
                borderColor: paletteTheme.palette.error.main
              }
            },
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 300
          }
        }
      },
      MuiSelect: {
        defaultProps: {
          MenuProps: {
            sx: {
              "& .MuiList-root": {
                overflow: "auto",
                maxHeight: 200,
                padding: 0,
              },
              "& .MuiMenuItem-root": {
                padding: 1,
                minHeight: 20,
                fontWeight: 300
              }
            }
          }
        },
        styleOverrides: {
          select: {
            paddingTop: 10,
            paddingBottom: 10,
            fontWeight: 300,
          },
          icon: {
            transition: "all 0.15s ease",
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            padding: "10px 30px",
            transition: "all 0.15s ease",
            "&:hover": {
              boxShadow: "none",
            }
          }
        },
        variants: [
          {
            props: { color: "primary" },
            style: {
              backgroundColor: paletteTheme.palette.primary.main,
              color: paletteTheme.palette.typography.light,
              "&:hover": {
                backgroundColor: paletteTheme.palette.primary.dark,
                color: paletteTheme.palette.typography.light
              }
            }
          },
          {
            props: { color: "secondary" },
            style: {
              backgroundColor: paletteTheme.palette.secondary.main,
              color: paletteTheme.palette.typography.light,
              "&:hover": {
                backgroundColor: paletteTheme.palette.secondary.dark,
                color: paletteTheme.palette.typography.light
              }
            }
          },
          {
            props: { color: "glassy" },
            style: {
              backgroundColor: paletteTheme.palette.glassy.main,
              color: paletteTheme.palette.typography.light,
              "&:hover": {
                backgroundColor: paletteTheme.palette.glassy.dark,
                color: paletteTheme.palette.typography.light
              }
            }
          }
        ]
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            aspectRatio: 1,
            filter: "brightness(10%) invert(1)",
            "img": {
              transition: "all 0.15s ease",
            },
            "@media (hover: hover)": {
              "&:hover": {
                backgroundColor: "transparent",
                filter: "brightness(0) invert(1)"
              }
            }
          }
        },
        variants: [
          {
            props: { color: "black" },
            style: {
              filter: "brightness(0) invert(0)",
              transition: "all 0.15s ease",
              "@media (hover: hover)": {
                "&:hover": {
                  filter: "invert(35%) sepia(78%) saturate(4713%) hue-rotate(203deg) brightness(102%) contrast(109%) !important"
                }
              }
            }
          }
        ]
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            transition: "all 0.15s ease",
            "&:hover": {
              color: paletteTheme.palette.typography.main
            }
          }
        }
      },
      MuiLink: {
        defaultProps: {
          component: forwardRef<HTMLAnchorElement, LinkProps>(function LinkBehaviour(props, ref) {
            return <NextLink  {...props} ref={ref} />
          })
        },
        styleOverrides: {
          root: {
            display: "flex",
            alignItems: "center",
            fontFamily: font.style.fontFamily,
            fontWeight: 300,
            color: paletteTheme.palette.typography.dark,
            transition: "all 0.15s ease",
            "&:hover": {
              color: paletteTheme.palette.typography.main
            }
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            lineHeight: 1.1,
            fontWeight: 300
          }
        }
      }
    }
  });

  return theme;
}