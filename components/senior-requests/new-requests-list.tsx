import * as React from "react";

import DynamicList from "components/dynamic-list/dynamic-list";
import { ISeniorRequest } from "types/seniorRequest";

type Props = {
  requests: Array<ISeniorRequest>;
};

async function NewRequestsList({ requests }: Props) {
  return (
    <div style={{ flex: "1 1 auto" }}>
      <DynamicList items={requests} />
    </div>
  );
}

export default NewRequestsList;
