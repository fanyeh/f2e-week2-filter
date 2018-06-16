import React, { Component } from 'react';
import styled from 'styled-components';
import Event from './Event';
class Events extends Component {
  getCategoryTag = id => {
    const { categories } = this.props;
    const category = categories.filter(category => category.id === id)[0];
    if (category) {
      return category.name;
    }
  };

  getSubCategoryTag = id => {
    if (id) {
      const { subCategories } = this.props;
      const subCategory = subCategories[id];
      return subCategory ? subCategories[id] : null;
    }
    return null;
  };

  getTags = event => {
    return [this.getCategoryTag(event.category_id), this.getSubCategoryTag(event.subcategory_id)];
  };

  render() {
    const { events, totalEvents, tags } = this.props;
    return (
      <EventSection>
        <h1>
          Showing <Counter>{totalEvents} </Counter>results by...
        </h1>
        {tags.map((tag, index) => (
          <TagLabel key={index}>
            {tag}
            <i className="far fa-times-circle" />
          </TagLabel>
        ))}
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

const TagLabel = styled.label`
  background: none;
  color: #9013fe;
  border-radius: 9999px;
  border: 1px solid #9013fe;
  padding: 0.25rem 1rem;
  margin-right: 0.75rem;
  text-transform: capitalize;
  font-style: italic;
  & > i {
    margin-left: 0.75rem;
  }
`;

const Counter = styled.span`
  color: #9013fe;
`;
