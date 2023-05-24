import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isSelected: boolean;
  onClick: () => void;
}>;

const StyledButton = styled.button<{ isSelected: boolean }>`
  padding: 10px;
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${({ isSelected }) => (isSelected ? "#48D1CC" : "#EFF0F6")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  &&:before {
    content: "";
    position: absolute;
    width: 80%;
    height: 80%;
    border-radius: 100%;
    background-color: #eff0f6;
    transition: all 0.2s ease-in-out;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 6px;
    width: 3rem;
    height: 3rem;
  }
`;

const CenteredChildren = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RatingButton: React.FC<Props> = ({
  isSelected,
  onClick,
  children,
}) => {
  return (
    <StyledButton isSelected={isSelected} onClick={onClick} type="button">
      <CenteredChildren>{children}</CenteredChildren>
    </StyledButton>
  );
};
