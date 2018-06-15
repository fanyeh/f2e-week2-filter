import React, { Component } from 'react';
import styled from 'styled-components';
import Events from './Events';
import SideBar from './SideBar';
import Header from './Header';
import EventFilter from './EventFilter';
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
                pagination={filter.pagination}
                categories={filter.categories}
                subCategories={filter.subCategories}
                tags={filter.tags}
              />
            </StyledMain>
          </div>
        )}
      </EventFilter>
    );
  }
}

export default App;

const StyledMain = styled.main`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;
