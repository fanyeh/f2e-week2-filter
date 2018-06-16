import { Component } from 'react';
import { getCategories, getSubCategories, searchEventsWith } from './api';

class EventFilter extends Component {
  state = {
    events: [],
    pagination: {},
    categories: [],
    subCategories: {},
    loading: true,
    currentPage: 1,
    eventsPerPage: 3,
  };

  filter = {
    checkedCategories: [],
    price: '',
    startDate: null,
    endDate: null,
    query: '',
    country: 'taiwan',
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
  queryHandler = value => {
    this.filter.query = value;
    this.filterEvent();
  };

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
    this.filter.startDate = startDate ? startDate : null;
    this.filter.endDate = endDate ? endDate : null;
    this.filterEvent();
  };

  pageHandler = currentPage => {
    this.setState({ currentPage });
  };

  eventsByPage = () => {
    const { events, eventsPerPage, currentPage } = this.state;
    const start = eventsPerPage * (currentPage - 1);
    const end = start + eventsPerPage;
    return events.slice(start, end);
  };

  filterEvent = async () => {
    const { events, pagination } = await searchEventsWith(this.filter);
    this.setState({ events, pagination, currentPage: 1 });
  };

  getCategoryTag = id => {
    const { categories } = this.state;
    return this.filter.checkedCategories.map(categoryID => {
      return categories.filter(category => category.id === categoryID)[0].name;
    });
  };

  childProps = () => {
    const priceTag = this.filter.price === '' ? 'free & paid' : this.filter.price;
    const { loading, pagination, events, eventsPerPage, ...props } = this.state;
    return {
      ...props,
      eventsPerPage,
      events: this.eventsByPage(),
      totalEvents: pagination.object_count,
      pageCount: Math.ceil(pagination.object_count / eventsPerPage),
      handlers: {
        priceHandler: this.priceHandler,
        categoryHandler: this.categoryHandler,
        dateHandler: this.dateHandler,
        queryHandler: this.queryHandler,
        pageHandler: this.pageHandler,
      },
      tags: [priceTag, ...this.getCategoryTag()],
    };
  };

  render() {
    return this.state.loading ? null : this.props.children(this.childProps());
  }
}

export default EventFilter;
