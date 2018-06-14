import React, { Component } from 'react';
import { getCategories, getSubCategories } from './api';
import styled from 'styled-components';
import Event from './Event';
import EventFilter from './EventFilter';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import './App.css';
import 'react-dates/lib/css/_datepicker.css';
import './react-datepicker.css';

class App extends Component {
  state = {
    categories: [],
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  subCategories = {};

  componentDidMount() {
    this.setCategories();
    this.setSubCategories();
  }

  /**
   * Settings
   */

  setCategories = async () => {
    const response = await getCategories();
    const { categories } = response.data;
    this.setState({ categories: categories });
  };

  setSubCategories = async () => {
    const response = await getSubCategories();
    const { subcategories } = response.data;
    subcategories.forEach(subCategory => {
      this.subCategories[subCategory.id] = subCategory.name;
    });
  };

  dateHandler = ({ startDate, endDate }, filterHandler) => {
    filterHandler({ startDate, endDate });
    this.setState({ startDate, endDate });
  };

  /**
   * Render
   */

  render() {
    const { categories } = this.state;
    return (
      <EventFilter>
        {filter => {
          return (
            <div className="App">
              <StyledHeader>
                <div>search input</div>
              </StyledHeader>

              <StyledMain>
                <SectionSideBar>
                  {/* DatePicker */}
                  <SideBarWrapper>
                    <DateRangePicker
                      startDate={this.state.startDate}
                      startDateId="eventStart"
                      endDate={this.state.endDate}
                      endDateId="eventEnd"
                      onDatesChange={dates => this.dateHandler(dates, filter.dateHandler)}
                      focusedInput={this.state.focusedInput}
                      onFocusChange={focusedInput => this.setState({ focusedInput })}
                    />

                    {/* Price */}
                    <div>
                      <label htmlFor="">Price</label>
                      <select onChange={filter.priceHandler}>
                        <option value="">Free & Paid</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                    {/* Categories */}
                    <div>
                      {categories.map(category => (
                        <div key={category.id}>
                          <input
                            type="checkbox"
                            onChange={filter.categoryHandler}
                            value={category.id}
                          />
                          <label>{category.short_name}</label>
                        </div>
                      ))}
                    </div>
                  </SideBarWrapper>
                </SectionSideBar>
                <SectionEvent>
                  {/* Events */}
                  {filter.events.map(event => (
                    <Event
                      key={event.id}
                      event={event}
                      categories={this.state.categories}
                      subCategories={this.subCategories}
                    />
                  ))}
                </SectionEvent>
              </StyledMain>

              {/* Pagination */}
              <div>PageCount: {filter.pagination.page_count} pages</div>
            </div>
          );
        }}
      </EventFilter>
    );
  }
}

export default App;

const StyledHeader = styled.header`
  height: 5.75rem;
  background-color: #7828b4;
`;

const StyledMain = styled.main`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;

const SectionSideBar = styled.section`
  width: 25%;
  flex-shrink: 0;
  /* border: 1px solid black; */
  text-align: left;
`;

const SideBarWrapper = styled.div`
  background-color: #ebebeb;
`;

const SectionEvent = styled.section`
  text-align: left;
  padding: 0 2.5rem;
`;
