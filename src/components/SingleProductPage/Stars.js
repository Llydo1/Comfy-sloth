import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {
  //render star
  const renderStars = () => {
    let starArray = Array(5);
    starArray.fill(<BsStarFill />, 0, Math.floor(stars));
    if (stars !== Math.floor(stars))
      starArray.fill(<BsStarHalf />, Math.floor(stars), Math.ceil(stars));
    starArray.fill(<BsStar />, Math.ceil(stars), 5);
    return starArray;
  };

  //return
  return (
    <Wrapper>
      <div className="stars">
        {renderStars().map((star, index) => {
          return <span key={index}>{star}</span>;
        })}
      </div>
      <p className="reviews">({reviews} customer reivews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
