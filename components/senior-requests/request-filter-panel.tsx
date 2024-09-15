"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";


function RequestFilterPanel() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(filters: Record<string, any>) {
    const params = new URLSearchParams(searchParams);

    // TODO:
    // if (term) {
    //   params.set("query", term);
    // } else {
    //   params.delete("query");
    // }

    replace(`${pathname}?${params.toString()}`);
  }

  return <>TBD Filtry</>;
}

export default RequestFilterPanel;
