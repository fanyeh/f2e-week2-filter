import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { getVenue } from './api';

class Event extends Component {
  state = { city: '' };

  componentDidMount() {
    this.setVenue();
  }

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
      if (subCategory) {
        return `#${subCategories[id]}`;
      }
      return null;
    }
  };

  getTags = event => {
    return [this.getCategoryTag(event.category_id), this.getSubCategoryTag(event.subcategory_id)];
  };

  setVenue = async () => {
    const { venue_id } = this.props.event;
    const response = await getVenue(venue_id);
    const { address } = response.data;
    this.setState({ city: address.city });
  };

  formattedDate = ({ start, end }) => {
    const startDate = moment(start.local).format('YYYY/MM/DD');
    const startTime = moment(start.local).format('HH:mm');
    const endDate = moment(end.local).format('YYYY/MM/DD');
    const endTime = moment(end.local).format('HH:mm');

    if (startDate === endDate) {
      return `${startDate} ${startTime} - ${endTime}`;
    }
    return `${startDate} ${startTime} - ${endDate} ${endTime}`;
  };

  render() {
    const { event } = this.props;
    return (
      <Wrapper>
        {event.logo && <StyledImage src={event.logo.url} alt="" />}
        <Content>
          <Title>{event.name.text}</Title>
          <Description>{event.description.text}</Description>
          <TagWrapper>
            {this.getTags(event).map((tag, index) => {
              return tag ? <TagLabel key={index}>{tag}</TagLabel> : null;
            })}
          </TagWrapper>
          <div>
            {this.state.city && (
              <StyledLabel htmlFor="">
                <i className="fas fa-map-marker-alt" />
                {this.state.city}
              </StyledLabel>
            )}

            <StyledLabel htmlFor="">
              <i className="far fa-calendar-alt" />
              {this.formattedDate(event)}
            </StyledLabel>
            <StyledLink href={event.url} target="_blank">
              More Info
            </StyledLink>
          </div>
        </Content>
      </Wrapper>
    );
  }
}

export default Event;

const Wrapper = styled.div`
  display: flex;
  /* height: 16.75rem; */
  margin-top: 1.5rem;
`;

const Content = styled.div`
  padding: 1.5rem 1.25rem;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Description = styled.p`
  height: 4.5rem;
  word-break: break-all;
  overflow: hidden;
  line-height: 1.5rem;
  flex-shrink: 0;
`;

const StyledImage = styled.img`
  max-height: 100%;
`;

const StyledLabel = styled.label`
  color: #9b9b9b;
  margin-right: 1.25rem;
  & > i {
    color: black;
    padding-right: 0.5rem;
  }
`;

const TagWrapper = styled.div`
  margin-bottom: 1rem;
`;

const TagLabel = styled.label`
  background-color: #d7d7d7;
  color: white;
  border-radius: 9999px;
  padding: 0.15rem 0.75rem;
  margin-right: 0.75rem;
`;

const StyledLink = styled.a`
  color: #9013fe;
  text-decoration: none;
  float: right;
  letter-spacing: 0.1rem;
  font-weight: 900;
  font-size: 14px;
`;
