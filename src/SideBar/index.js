import React, { Component } from 'react';
import Categories from './Categories';
import Price from './Price';
import styled from 'styled-components';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react-datepicker.css';
class SideBar extends Component {
  state = { focusedInput: null, startDate: null, endDate: null };

  changeHandler = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
    this.props.handlers.dateHandler({ startDate, endDate });
  };

  render() {
    const { handlers, categories, checkedCategories } = this.props;
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <SideBarSection>
        <Wrapper>
          <DateHeader>Date</DateHeader>
          <DateRangePicker
            startDate={startDate}
            startDateId="eventStart"
            endDate={endDate}
            endDateId="eventEnd"
            onDatesChange={this.changeHandler}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
          <Price handler={handlers.priceHandler} />
          <Categories
            categories={categories}
            handler={handlers.categoryHandler}
            checkedCategories={checkedCategories}
          />
        </Wrapper>
      </SideBarSection>
    );
  }
}

export default SideBar;

const SideBarSection = styled.section`
  width: 25%;
  flex-shrink: 0;
  text-align: left;
`;

const Wrapper = styled.div`
  background-color: #ebebeb;
  padding: 0 2.5rem 1.5rem 2.5rem;
`;

const DateHeader = styled.h1`
  padding-top: 1.5rem;
  margin: 0;
  margin-bottom: 1.5rem;
`;
