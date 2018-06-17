import React, { Component } from 'react';
import styled from 'styled-components';
const priceItems = [
  { name: 'Free & Paid', value: '' },
  { name: 'Free', value: 'free' },
  { name: 'Paid', value: 'paid' },
];

class Price extends Component {
  state = { toggle: false, current: 0 };

  clickHandler = e => {
    const index = e.target.id;
    const selectedValue = priceItems[index].value;
    this.props.handler(selectedValue);
    this.setState({ current: index * 1, toggle: false });
  };

  toggle = () => {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  };

  render() {
    const { toggle, current } = this.state;
    return (
      <div>
        <h1>Price</h1>
        <div>
          <CustomSelect onClick={this.toggle} onBlur={this.toggle}>
            {priceItems[current].name}
            <i className="fas fa-sort" />
          </CustomSelect>

          {toggle && (
            <StyledList onClick={this.clickHandler}>
              {priceItems.map((item, index) => (
                <ListItem key={item.name} id={index}>
                  {current === index && <i className="fas fa-check" />}

                  {item.name}
                </ListItem>
              ))}
            </StyledList>
          )}
        </div>
      </div>
    );
  }
}

export default Price;

const CustomSelect = styled.button`
  padding: 0 0.7rem;
  font-size: 1rem;
  width: 234px;
  height: 48px;
  background-color: white;
  color: black;
  position: relative;
  cursor: pointer;
  outline: none;
  border: 1px solid #dbdbdb;
  text-align: left;
  box-sizing: border-box;
  & > i {
    float: right;
  }
`;

const StyledList = styled.ul`
  box-sizing: border-box;
  position: absolute;
  padding: 0;
  margin: 0;
  background-color: white;
  width: 13.75rem;
  color: black;
  padding: 0 0.7rem;
  z-index: 5;
`;

const ListItem = styled.li`
  padding-left: 1.5rem;
  position: relative;
  list-style: none;
  line-height: 2.5rem;
  user-select: none;
  cursor: pointer;

  & > i {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
