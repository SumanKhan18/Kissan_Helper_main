import React from 'react';
import styled from 'styled-components';
import us from "../assets/us.jpg"

const Card1 = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="card">
          {/* Front of the card with image */}
          <div className="front">
            <img
              src={us}
              alt="KissanHelper Team"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          {/* Back of the card */}
          <div className="back">
            <p className="back-heading">Back card</p>
            <p>Follow Us For More</p>
          </div>
        </div>
      </div>
    </StyledWrapper>

  );
}

const StyledWrapper = styled.div`
  .container {
    width: 390px;
    height: 550px;
    perspective: 900px;
  }

  .card {
    height: 100%;
    width: 100%;
    background-color: aliceblue;
    position: relative;
    transition: transform 1500ms;
    transform-style: preserve-3d;
    border-radius: 2rem;
  }

  .container:hover > .card {
    cursor: pointer;
    transform: rotateY(180deg) rotateZ(180deg);
  }

  .front, .back {
    height: 100%;
    width: 100%;
    border-radius: 2rem;
    position: absolute;
    box-shadow: 0 0 10px 2px rgba(50, 50, 50, 2.5);
    backface-visibility: hidden;
    color: aliceblue;
    background: linear-gradient(-135deg, 
  #F80A4A, #0AA4F8);
  }

  .front, .back {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .back {
    transform: rotateY(180deg) rotateZ(180deg);
  }

  .back-heading, .front-heading {
    font-size: 28px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
  }`;

export default Card1;
