import React, { Component } from 'react';
import styled from 'styled-components';
const priceItems = [
  { name: 'Free & Paid', value: '' },
  { name: 'Free', value: 'free' },
  { name: 'Paid', value: 'paid' },
];

class Price extends Component {
  state = { toggle: false, current: 0 };

  componentDidMount() {
    window.addEventListener('click', this.close);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  clickHandler = e => {
    const index = e.target.id;
    const selectedValue = priceItems[index].value;
    this.props.handler(selectedValue);
    this.setState({ current: index * 1, toggle: false });
    e.stopPropagation();
  };

  close = () => {
    this.setState({ toggle: false });
  };

  toggle = e => {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
    e.stopPropagation();
  };

  render() {
    const { toggle, current } = this.state;
    return (
      <div>
        <h1>Price</h1>
        <div>
          <CustomSelect onClick={this.toggle}>
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

const CustomSelect = styled.div`
  padding: 0 0.7rem;
  font-size: 1rem;
  width: 234px;
  line-height: 48px;
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
    line-height: 48px;
  }
`;

const StyledList = styled.ul`
  box-sizing: border-box;
  position: absolute;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid #dbdbdb;
  width: 234px;
  color: black;
  z-index: 5;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #dbdbdb;
  padding-left: 2.2rem;
  position: relative;
  list-style: none;
  line-height: 48px;
  cursor: pointer;
  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: #9013fe;
    color: white;
  }

  & > i {
    position: absolute;
    left: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;
