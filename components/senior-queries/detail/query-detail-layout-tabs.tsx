"use client";

import { Tabs, Tab, ThemeProvider } from "@mui/material";
import { mobileAppTabsTheme } from "components/theme/theme";
import { QUERY_CHANGES_TAB, QUERY_DETAIL_TAB } from "helper/consts";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ScrollToElement from "./scroll-to-element";

function QueryDetailLayoutTabs() {
  const pathname = usePathname();
  const pathnameWithoutTab = pathname?.split("/").slice(0, -1).join("/");
  const [selectedTab, setSelectedTab] = useState(
    pathname?.split("/").at(-1)! ?? QUERY_DETAIL_TAB
  );

  const router = useRouter();

  function handleRouting(_: React.SyntheticEvent, newValue: string) {
    setSelectedTab(newValue);
    router.replace(`${pathnameWithoutTab}/${newValue}`);
  }

  return (
    <ThemeProvider theme={mobileAppTabsTheme}>
      <ScrollToElement elementId="tabs" offset={120} />
      <Tabs
        value={selectedTab}
        centered
        id="tabs"
        role="navigation"
        variant="fullWidth"
        textColor="primary"
        onChange={handleRouting}
        TabIndicatorProps={{
          sx: {
            height: 0.025,
          },
        }}
      >
        <Tab
          label="Detail dotazu"
          sx={{
            textTransform: "none",
            fontSize: "18px",
            fontWeight: "normal",
            color: "#AAAAAA",
            fontFamily: "var(--font-roboto-condensed), Roboto",
          }}
          value={QUERY_DETAIL_TAB}
        />
        <Tab
          label="Historie změn"
          sx={{
            textTransform: "none",
            fontWeight: "normal",
            fontSize: "18px",
            color: "#AAAAAA",
            fontFamily: "var(--font-roboto-condensed), Roboto",
          }}
          value={QUERY_CHANGES_TAB}
        />
      </Tabs>
    </ThemeProvider>
  );
}

export default QueryDetailLayoutTabs;
