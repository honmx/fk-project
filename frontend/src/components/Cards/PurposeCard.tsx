import { FC, ReactNode } from "react";
import { Box, BoxProps, Paper, Typography } from "@mui/material";

interface Props extends BoxProps {
  count?: string;
  children: ReactNode;
}

const PurposeCard: FC<Props> = ({ count, children, ...restProps }) => {
  return (
    <Box {...restProps} sx={{
      position: "relative",
      maxWidth: {
        smallPhone: "none",
        smallTablet: "250px"
      }
    }}>
      {
        count &&
        <Box sx={{
          position: "relative",
          top: "30px",
          right: {
            smallPhone: "13px",
            laptop: "25px"
          }
        }}>
          <Typography
            fontSize={{
              smallPhone: 40,
              tablet: 50,
            }}
            fontWeight={700}
            color="sheet.main"
            sx={{
              textShadow: "0 0 2px #000"
            }}
          >
            {count}
          </Typography>
        </Box>
      }
      <Paper sx={{
        padding: "15px 40px"
      }}>
        <Typography
          fontSize={{
            middlePhone: 16,
            tablet: 20,
          }}
          fontWeight={300}
          lineHeight={1}
          textAlign="center"
        >
          {children}
        </Typography>
      </Paper>
    </Box>
  )
};

export default PurposeCard;
