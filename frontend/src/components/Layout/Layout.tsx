import { FC, ReactElement, ReactNode } from "react";
import { Box, BoxProps } from "@mui/material";
import { useResize } from "@/hooks/useResize";

interface Props {
  renderHeader?: () => ReactElement;
  renderFooter?: () => ReactElement;
  renderSidebar?: () => ReactElement;
  children: ReactNode;
}

const Layout: FC<Props> = ({ renderHeader, renderSidebar, renderFooter, children }) => {

  const isTablet = useResize("tablet");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden", minHeight: "100vh" }}>
      {renderHeader && renderHeader()}
      <Box component="main" sx={{ flex: "1 1 0", display: "flex", width: "100vw", backgroundColor: "sheet.main", marginTop: "69.8px" }}>
        {renderSidebar && renderSidebar()}
        <Box sx={{ width: "100%", marginLeft: renderSidebar && !isTablet ? "105px" : "0px" }}>
          {children}
        </Box>
      </Box>
      {renderFooter && renderFooter()}
    </Box>
  )
};

export default Layout;
