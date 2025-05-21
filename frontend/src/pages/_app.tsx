import NextApp, { AppContext } from "next/app";
import { ThemeProvider } from "@emotion/react";
import parser from "ua-parser-js";
import AOS from "aos";
import "aos/dist/aos.css";
import { IAppPropsWithLayout } from "@/types/IAppPropsWithLayout";
import { createCustomTheme } from "@/styles/theme";
import "@/styles/reset.scss";
import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import { UserType } from "@/types/UserType";

type CustomAppProps = {
  deviceType: "mobile" | "desktop";
}

const App = ({ Component, pageProps, deviceType }: IAppPropsWithLayout & CustomAppProps) => {

  const pageLayout = Component.getLayout ?? ((page) => page);

  const theme = createCustomTheme({ deviceType });

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    AOS.init({
      disable: window.innerWidth < 1023,
      duration: 300,
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 25, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true, // whether elements should animate out while scrolling past them
      anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    });
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        {
          pageLayout(<Component {...pageProps} />)
        }
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const deviceType = parser(context.ctx.req?.headers["user-agent"]).device.type || "dekstop" as ("mobile" | "desktop");

  const nextAppProps = await NextApp.getInitialProps(context);

  return {
    ...nextAppProps,
    deviceType,
  };
};

export default App;