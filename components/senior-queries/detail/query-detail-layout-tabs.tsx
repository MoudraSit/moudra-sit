"use client";

import { Button, Tab, Tabs, ThemeProvider } from "@mui/material";
import { mobileAppTheme } from "components/theme/theme";
import { QUERY_CHANGES_TAB, QUERY_DETAIL_TAB } from "helper/consts";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ScrollToElement from "./scroll-to-element";

function QueryDetailLayoutTabs() {
  const pathname = usePathname();
  const pathnameWithoutTab = pathname?.split("/").slice(0, -1).join("/");
  const [selectedTab, setSelectedTab] = useState(pathname?.split("/").at(-1));

  const router = useRouter();

  function handleRouting(route: string) {
    // Do not remember switching between the 2 query detail tabs
    router.replace(route);
  }

  return (
    <ThemeProvider theme={mobileAppTheme}>
      <Tabs
        value={selectedTab}
        centered
        id="tabs"
        role="navigation"
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        onChange={(e, newValue) => setSelectedTab(newValue)}
      >
        {/* Making sure the focus is at the top when navigating from query-form (for instance) */}
        <ScrollToElement elementId="tabs" offset={120} />
        <Tab
          label="Detail dotazu"
          value={QUERY_DETAIL_TAB}
          onClick={() =>
            handleRouting(`${pathnameWithoutTab}/${QUERY_DETAIL_TAB}`)
          }
          component={Button}
        />
        <Tab
          label="Historie změn"
          value={QUERY_CHANGES_TAB}
          onClick={() =>
            handleRouting(`${pathnameWithoutTab}/${QUERY_CHANGES_TAB}`)
          }
          component={Button}
        />
      </Tabs>
    </ThemeProvider>
  );
}

export default QueryDetailLayoutTabs;
