import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  //declaring hooks
  const { id } = useParams();
  const history = useHistory();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  //UseEffect hooks
  useEffect(() => {
    fetchSingleProduct(url + id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    error && setTimeout(() => history.push("/"), 3000);
    // eslint-disable-next-line
  }, [error]);

  //Component return
  if (loading) return <Loading></Loading>;
  if (error) return <Error></Error>;
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images}></ProductImages>
          <section className="content">
            <Info
              info={{
                name,
                price,
                description,
                stock,
                sku,
                company,
                stars,
                reviews,
              }}
            />
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

//Info components
const Info = ({
  info: { name, price, description, stock, sku, company, stars, reviews },
}) => {
  return (
    <>
      <h2>{name}</h2>
      <Stars stars={stars} reviews={reviews}></Stars>
      <h5 className="price">{formatPrice(price)}</h5>
      <p className="desc">{description} </p>
      <p className="info">
        <span>Available : </span>
        {stock > 0 ? "In stock" : "out of stock"}
      </p>
      <p className="info">
        <span>SKU : </span>
        {sku}
      </p>
      <p className="info">
        <span>Brand : </span>
        {company}
      </p>
    </>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
