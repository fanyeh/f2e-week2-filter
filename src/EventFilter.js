import { Component } from 'react';
import { getCategories, getSubCategories, searchEventsWith } from './api';

class EventFilter extends Component {
  state = {
    events: [],
    pagination: { page_count: 0 },
    categories: [],
    subCategories: {},
    loading: true,
  };

  filter = {
    checkedCategories: [],
    price: '',
    date: {
      start: null,
      end: null,
    },
  };

  async componentDidMount() {
    this.init();
  }

  /**
   * Handlers
   */

  init = async () => {
    const subCategories = await getSubCategories();
    const categories = await getCategories();
    const { events, pagination } = await searchEventsWith(this.filter);
    this.setState({ categories, subCategories, events, pagination, loading: false });
  };

  priceHandler = e => {
    this.filter.price = e.target.value;
    this.filterEvent();
  };

  categoryHandler = e => {
    const { checkedCategories } = this.filter;
    const categoryID = e.target.value;
    const indexOfID = checkedCategories.indexOf(categoryID);
    indexOfID > -1 ? checkedCategories.splice(indexOfID, 1) : checkedCategories.push(categoryID);
    this.filter.checkedCategories = checkedCategories;
    this.filterEvent();
  };

  dateHandler = ({ startDate, endDate }) => {
    this.filter.date.start = startDate ? startDate : null;
    this.filter.date.end = endDate ? startDate : null;
    this.filterEvent();
  };

  filterEvent = async () => {
    const { events, pagination } = await searchEventsWith(this.filter);
    this.setState({ events, pagination });
  };

  childProps = () => {
    return {
      ...this.state,
      handlers: {
        priceHandler: this.priceHandler,
        categoryHandler: this.categoryHandler,
        dateHandler: this.dateHandler,
      },
      dates: {
        start: this.filter.startDate,
        end: this.filter.endDate,
      },
    };
  };

  render() {
    return this.state.loading ? null : this.props.children(this.childProps());
  }
}

export default EventFilter;
