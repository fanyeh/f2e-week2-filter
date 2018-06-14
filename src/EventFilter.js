import { Component } from 'react';
import moment from 'moment';
import { searchEventsWith } from './api';

class EventFilter extends Component {
  state = {
    data: {},
  };

  filter = {
    categories: [],
    price: '',
    date: {
      start: '',
      end: '',
    },
  };

  componentDidMount() {
    this.filterEvent();
  }

  /**
   * Handlers
   */

  priceHandler = e => {
    this.filter.price = e.target.value;
    this.filterEvent();
  };

  categoryHandler = e => {
    const { categories } = this.filter;
    const categoryID = e.target.value;
    const indexOfID = categories.indexOf(categoryID);
    indexOfID > -1 ? categories.splice(indexOfID, 1) : categories.push(categoryID);
    this.filter.categories = categories;
    this.filterEvent();
  };

  dateHandler = ({ startDate, endDate }) => {
    this.filter.date.start = startDate ? this.convertUTC(startDate) : '';
    this.filter.date.end = endDate ? this.convertUTC(endDate) : '';
    this.filterEvent();
  };

  filterEvent = async () => {
    const response = await searchEventsWith(this.filter);
    this.setState({ data: response.data });
  };

  convertUTC = date => {
    return moment.utc(date).format();
  };

  childProps = () => {
    const { events, pagination } = this.state.data;
    return {
      events: events ? events : [],
      pagination: pagination ? pagination : { page_count: 0 },
      priceHandler: this.priceHandler,
      categoryHandler: this.categoryHandler,
      dateHandler: this.dateHandler,
    };
  };

  render() {
    return this.props.children(this.childProps());
  }
}

export default EventFilter;
