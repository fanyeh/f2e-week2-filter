import React, { Component } from 'react';
import styled from 'styled-components';
import Event from './Event';
class Events extends Component {
  getCategoryTag = id => {
    const { categories } = this.props;
    const category = categories.filter(category => category.id === id)[0];
    if (category) {
      return `#${category.name}`;
    }
  };

  getSubCategoryTag = id => {
    if (id) {
      const { subCategories } = this.props;
      const subCategory = subCategories[id];
      return subCategory ? `#${subCategories[id]}` : null;
    }
    return null;
  };

  getTags = event => {
    return [this.getCategoryTag(event.category_id), this.getSubCategoryTag(event.subcategory_id)];
  };

  render() {
    const { events } = this.props;
    return (
      <EventSection>
        {events.map(event => (
          <Event key={event.id} event={event} categoryTags={this.getTags(event)} />
        ))}
      </EventSection>
    );
  }
}

export default Events;

const EventSection = styled.section`
  text-align: left;
  padding: 0 2.5rem;
`;
