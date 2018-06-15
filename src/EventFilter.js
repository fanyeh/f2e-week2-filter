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

  init = async () => {
    const subCategories = await getSubCategories();
    const categories = await getCategories();
    const { events, pagination } = await searchEventsWith(this.filter);
    this.setState({ categories, subCategories, events, pagination, loading: false });
  };

  /**
   * Handlers
   */

  priceHandler = value => {
    this.filter.price = value;
    this.filterEvent();
  };

  categoryHandler = id => {
    const { checkedCategories } = this.filter;
    const indexOfID = checkedCategories.indexOf(id);
    indexOfID > -1 ? checkedCategories.splice(indexOfID, 1) : checkedCategories.push(id);
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
