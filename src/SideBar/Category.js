import React, { Component } from 'react';
import styled from 'styled-components';

class Category extends Component {
  state = { checked: false };

  toggleCheck = e => {
    this.props.handler(e.target.value);
    this.setState(({ checked }) => ({ checked: !checked }));
  };

  render() {
    const { category } = this.props;
    const { checked } = this.state;
    return (
      <Wrapper>
        <StyledCheckbox
          type="checkbox"
          checked={checked}
          onChange={this.toggleCheck}
          id={category.id}
          value={category.id}
        />
        <StyledCheckmark htmlFor={category.id} />
        <CategoryName>{category.short_name}</CategoryName>
      </Wrapper>
    );
  }
}

export default Category;

const Wrapper = styled.div`
  position: relative;
`;

const CategoryName = styled.label`
  line-height: 1.5rem;
  vertical-align: top;
  margin-left: 0.5rem;
`;

const StyledCheckmark = styled.label`
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  background-color: white;
  border-radius: 3px;
  display: inline-block;
  /* margin-left: 2rem; */
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;
const StyledCheckbox = styled.input`
  position: absolute;
  display: none;
  margin-left: 2rem;
  margin-top: 1.5rem;

  &:checked ~ ${StyledCheckmark} {
    background-color: #7828b4;
  }
  &:checked ~ ${StyledCheckmark}:after {
    display: block;
  }
`;
