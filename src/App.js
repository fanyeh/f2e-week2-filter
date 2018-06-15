import React, { Component } from 'react';
import styled from 'styled-components';
import Events from './Events';
import SideBar from './SideBar';
import EventFilter from './EventFilter';
import './App.css';

class App extends Component {
  render() {
    return (
      <EventFilter>
        {filter => (
          <div className="App">
            <StyledHeader>
              <div>search input</div>
            </StyledHeader>

            <StyledMain>
              <SideBar
                handlers={filter.handlers}
                dates={filter.dates}
                categories={filter.categories}
              />
              <Events
                events={filter.events}
                categories={filter.categories}
                subCategories={filter.subCategories}
              />
            </StyledMain>

            {/* Pagination */}
            <div>PageCount: {filter.pagination.page_count} pages</div>
          </div>
        )}
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
