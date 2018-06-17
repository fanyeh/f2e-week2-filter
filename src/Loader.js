import React from 'react';
import styled from 'styled-components';
const Loader = () => {
  return (
    <Wrapper className="loader">
      <Spinner className="spinner">
        <i className="fas fa-spinner fa-pulse" />
      </Spinner>
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  z-index: 999;
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > i {
    color: #7828b4;
    font-size: 3rem;
  }
`;
