"use client";

import { Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const QUERY_DETAIL_TAB = "detail";
const QUERY_CHANGES_TAB = "zmeny";

function QueryDetailLayoutTabs() {
  const pathname = usePathname();

  const pathnameWithoutTab = pathname?.split("/").slice(0, -1).join("/");

  return (
    <Tabs
      value={pathname?.split("/").at(-1)}
      centered
      role="navigation"
      variant="fullWidth"
      textColor="secondary"
      indicatorColor="secondary"
      // onChange={(e, newValue) => setSelectedTab(newValue)}
    >
      <Tab
        label="Detail dotazu"
        value={QUERY_DETAIL_TAB}
        href={`${pathnameWithoutTab}/${QUERY_DETAIL_TAB}`}
        component={Link}
      />
      <Tab
        label="Historie změn"
        value={QUERY_CHANGES_TAB}
        href={`${pathnameWithoutTab}/${QUERY_CHANGES_TAB}`}
        component={Link}
      />
    </Tabs>
  );
}

export default QueryDetailLayoutTabs;
