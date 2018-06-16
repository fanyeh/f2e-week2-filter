import React, { Component } from 'react';
import styled from 'styled-components';
import Events from './Events';
import SideBar from './SideBar';
import Header from './Header';
import EventFilter from './EventFilter';
import Pagination from './Pagination';
import './App.css';

class App extends Component {
  render() {
    return (
      <EventFilter>
        {filter => (
          <div className="App">
            <Header handler={filter.handlers.queryHandler} />
            <StyledMain>
              <SideBar
                handlers={filter.handlers}
                dates={filter.dates}
                categories={filter.categories}
              />
              <Events
                events={filter.events}
                totalEvents={filter.totalEvents}
                categories={filter.categories}
                subCategories={filter.subCategories}
                tags={filter.tags}
              />
            </StyledMain>
            <StyledFooter>
              <Pagination
                pageCount={filter.pageCount}
                itemsPerPage={filter.eventsPerPage}
                currentPage={filter.currentPage}
                handler={filter.handlers.pageHandler}
              />
            </StyledFooter>
          </div>
        )}
      </EventFilter>
    );
  }
}

export default App;

const StyledMain = styled.main`
  display: flex;
  margin: 0 auto;
  padding: 0 5.5rem;
`;

const StyledFooter = styled.div`
  text-align: right;
  margin: 0 auto;
  padding: 1.5rem 8rem 1.5rem 0rem;
`;
