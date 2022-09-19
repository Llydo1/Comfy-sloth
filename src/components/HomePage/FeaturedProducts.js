import React from "react";
import { useProductsContext } from "../../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "../MultiplePage/Error";
import { Loading } from "../index";
import Product from "../MultiplePage/Product";

const FeaturedProducts = () => {
  const {
    featured_products: products,
    products_loading: loading,
    products_error: error,
  } = useProductsContext();
  if (loading) return <Loading></Loading>;
  if (error) return <Error></Error>;

  console.log(products);
  return (
    <Wrapper className="setion">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center featured">
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
