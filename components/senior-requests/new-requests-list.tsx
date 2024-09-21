import * as React from "react";

import DynamicList from "components/dynamic-list/dynamic-list";
import { SeniorRequest } from "types/seniorRequest";

type Props = {
  requests: Array<SeniorRequest>;
};

async function NewRequestsList({ requests }: Props) {
  return (
    <div style={{ flex: "1 1 auto" }}>
      <DynamicList items={requests} />
    </div>
  );
}

export default NewRequestsList;
