import React, { Component } from 'react';
import styled from 'styled-components';
class Header extends Component {
  timeOutID = null;

  queryHandler = (value, handler) => {
    clearTimeout(this.timeOutID);
    this.timeOutID = setTimeout(() => {
      handler(value);
    }, 500);
  };

  render() {
    return (
      <StyledHeader>
        <StyledTitle>Have Fun</StyledTitle>
        <StyledInput>
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Search events"
            onKeyUp={e => this.queryHandler(e.target.value, this.props.handler)}
          />
        </StyledInput>
      </StyledHeader>
    );
  }
}

export default Header;

const StyledHeader = styled.header`
  background-color: #7828b4;
  padding: 0.5rem 6rem;
  text-align: left;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledTitle = styled.h1`
  font-weight: 900;
  margin: 0;
  margin-left: 3rem;
  display: inline-block;
  font-size: 4rem;
`;

const StyledInput = styled.div`
  display: inline-block;
  margin-left: 8.6rem;
  color: white;
  font-size: 1.5rem;
  padding-bottom: 0.1rem;
  border-bottom: 1px solid white;
  & > input {
    color: white;
    user-select: none;
    outline: none;
    font-size: 1.5rem;
    width: 23rem;
    padding-left: 1.25rem;
    background: transparent;
    border: none;
    font-weight: 100;
  }
  & > input::placeholder {
    font-style: italic;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 100;
  }
`;
