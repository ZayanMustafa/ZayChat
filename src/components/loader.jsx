import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Loader = () => {
    const [loadingText, setLoadingText] = useState(true);
    const [textVisible, setTextVisible] = useState(true); // New state for hiding text
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const firstTimer = setTimeout(() => {
            setLoadingText('Loading coming...');
            setTextVisible(false); 
        }, 4000);

        const secondTimer = setTimeout(() => {
            setLoading(false); 
        }, 3000);

        return () => {
            clearTimeout(firstTimer);
            clearTimeout(secondTimer);
        };
    }, []);

    if (!loading) {
        return null;
    }

    return (
        <StyledWrapper>
            {textVisible && (
                <div className="loading-text">Internet to ata rahy ga<br/>tum bhee atay rehna! 👀</div>
            )}
            <div className="loading-comming">Chalow a gaya internet<br/> 😊 </div>
            <div className="loading">
                <span />
                <span />
                <span />
                <span />
                <span />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  background-color: lightgray; 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Arial', sans-serif;

  .loading-text {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    animation: fadeIn 1s ease-out;

    /* Add shadow for a cool effect */
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  .loading-comming {
    font-size: 20px;
    font-weight: 600;
    color: #4CAF50;
    text-align: center;
    margin-bottom: 30px;
    opacity: 0;
    animation: fadeInUp 1.5s ease-out 2s forwards;

    /* Add some visual flair */
    font-style: italic;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }

  .loading {
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --first-color: #4c86f9;
    --second-color: rgb(81, 209, 86);
    --third-color: rgb(228, 190, 76);
    --fourth-color: #f6bb02;
    --fifth-color: #2196f3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    gap: 6px;
    height: 100px;
  }

  .loading span {
    width: 4px;
    height: 50px;
    background: var(--first-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;
  }

  .loading span:nth-child(2) {
    background: var(--second-color);
    animation-delay: -0.8s;
  }

  .loading span:nth-child(3) {
    background: var(--third-color);
    animation-delay: -0.7s;
  }

  .loading span:nth-child(4) {
    background: var(--fourth-color);
    animation-delay: -0.6s;
  }

  .loading span:nth-child(5) {
    background: var(--fifth-color);
    animation-delay: -0.5s;
  }

  @keyframes scale {
    0%, 40%, 100% {
      transform: scaleY(0.05);
    }

    20% {
      transform: scaleY(1);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Loader;
