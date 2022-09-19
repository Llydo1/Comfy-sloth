import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
const CheckoutPage = () => {
  return (
    <main>
      <PageHero title="checkout"></PageHero>
      <Wrapper className="page">
        <h1>checkout</h1>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
