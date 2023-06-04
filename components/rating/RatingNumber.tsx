import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const Wrapper = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  width: 70%;
  height: 70%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RatingNumber: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
