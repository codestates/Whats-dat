import React from "react";
import { AlignContainer, ColumnBox } from "./responsiveContainer.style";
import Container from "../../atoms/container/container";
import theme from "../../../styles/Theme";

const responsiveContainer = ({ children }) => {
  return (
    <Container isFull>
      <AlignContainer maxWidth={Number(theme.size.containerMaxWidth)}>
        <ColumnBox
          bgColor="lightBg"
          radius="rounded2Xl"
          padding="xxl"
          boxShadow="shadowXl"
        >
          {children}
        </ColumnBox>
      </AlignContainer>
    </Container>
  );
};

export default responsiveContainer;
