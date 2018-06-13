import React, { Component } from 'react';
import './App.css';
import { getCategories, searchEventsWith, getSubCategories } from './api';
import styled from 'styled-components';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react-datepicker.css';
import Event from './Event';

class App extends Component {
  state = {
    categories: [],
    events: [],
    pageCount: 1,
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  selectedCategories = [];
  subCategories = {};
  filter = {
    categories: [],
    price: '',
    date: {
      start: '',
      end: '',
    },
  };

  componentDidMount() {
    this.updateEvents();
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

  /**
   * Retrieve events
   */

  updateEvents = async () => {
    const response = await searchEventsWith(this.filter);
    const { events, pagination } = response.data;
    this.setState({ events: events, pageCount: pagination.page_count });
  };

  /**
   * Handlers
   */

  priceHandler = e => {
    this.filter.price = e.target.value;
    this.updateEvents();
  };

  categoryHandler = e => {
    const categoryID = e.target.value;
    const indexOfID = this.selectedCategories.indexOf(categoryID);
    indexOfID > -1
      ? this.selectedCategories.splice(indexOfID, 1)
      : this.selectedCategories.push(categoryID);

    this.filter.categories = this.selectedCategories;
    this.updateEvents();
  };

  dateHandler = ({ startDate, endDate }) => {
    if (startDate) {
      this.filter.date.start = moment.utc(startDate).format();
    }

    if (endDate) {
      this.filter.date.end = moment.utc(endDate).format();
    }
    this.updateEvents();
    this.setState({ startDate, endDate });
  };

  /**
   * Render
   */

  render() {
    const { categories, events, pageCount } = this.state;
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
                onDatesChange={this.dateHandler}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
              />

              {/* Price */}
              <div>
                <label htmlFor="">Price</label>
                <select onChange={this.priceHandler}>
                  <option value="">Free & Paid</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              {/* Categories */}
              <div>
                {categories.map(category => (
                  <div key={category.id}>
                    <input type="checkbox" onChange={this.categoryHandler} value={category.id} />
                    <label>{category.short_name}</label>
                  </div>
                ))}
              </div>
            </SideBarWrapper>
          </SectionSideBar>
          <SectionEvent>
            {/* Events */}
            {events.map(event => (
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
        <div>PageCount: {pageCount} pages</div>
      </div>
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
