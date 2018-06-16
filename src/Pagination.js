import React, { Component } from 'react';
import styled from 'styled-components';

class Pagination extends Component {
  static defaultProps = {
    minPageBtns: 7,
    eventsPerPage: 5,
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.setPageBtns(),
    };
    this.numOfPageBtns = this.state.pageBtns.length;
    this.midIndex = Math.floor(this.state.pageBtns.length / 2);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pageCount !== this.props.pageCount) {
      this.setState({ ...this.setPageBtns() });
    }
  }

  setPageBtns = () => {
    let pageBtns = [];
    let showBothEndBtn = true;
    let start, end;
    const { pageCount, minPageBtns } = this.props;

    if (minPageBtns < pageCount) {
      start = 2;
      end = minPageBtns;
    } else {
      start = 1;
      end = pageCount + 1;
      showBothEndBtn = false;
    }
    for (let i = start; i < end; i++) {
      pageBtns.push(i);
    }
    return { pageBtns, showBothEndBtn };
  };

  clickHandler = e => {
    let page = e.target.value * 1;
    const { pageCount, handler } = this.props;

    handler(page);
    if (this.state.showBothEndBtn) {
      if (page < this.midIndex * 2) {
        page = this.midIndex * 2;
      } else if (page > pageCount - this.midIndex - 1) {
        page = pageCount - this.midIndex - 1;
      }
      this.updatePageBtns(page);
    }
  };

  updatePageBtns = midPage => {
    let newPageBtns = [];
    let pageStart = midPage - this.midIndex;
    for (let i = 0; i < this.numOfPageBtns; i++) {
      newPageBtns.push(pageStart + i);
    }
    this.setState({ pageBtns: newPageBtns });
  };

  nextPageHandler = () => {
    const { currentPage, eventsPerPage, handler } = this.props;
    if (currentPage > eventsPerPage) {
      const { pageBtns } = this.state;
      const firstPage = pageBtns.shift();
      pageBtns.push(firstPage + this.numOfPageBtns);
      this.setState({ pageBtns });
    }
    handler(currentPage + 1);
  };

  prevPageHandler = () => {
    const { currentPage, eventsPerPage, handler, pageCount } = this.props;
    if (currentPage <= pageCount - eventsPerPage) {
      const { pageBtns } = this.state;
      const lastPage = pageBtns.pop();
      pageBtns.unshift(lastPage - this.numOfPageBtns);
      this.setState({ pageBtns });
    }
    handler(currentPage - 1);
  };

  showMore = type => {
    if (!this.state.showBothEndBtn) {
      return false;
    }
    const { pageBtns } = this.state;
    return type === 'prev'
      ? pageBtns[0] !== 2
      : pageBtns[pageBtns.length - 1] !== this.props.pageCount - 1;
  };

  render() {
    const { pageBtns, showBothEndBtn } = this.state;
    const { currentPage, pageCount } = this.props;
    return (
      <Wrapper>
        {this.showMore('prev') && (
          <PageButton onClick={this.prevPageHandler}>
            <i className="fas fa-angle-double-left" />
          </PageButton>
        )}

        {showBothEndBtn && (
          <PageButton value="1" onClick={this.clickHandler} select={currentPage === 1}>
            1
          </PageButton>
        )}

        {this.showMore('prev') && <StyleLabel htmlFor="">...</StyleLabel>}

        {pageBtns.map((page, index) => (
          <PageButton
            value={page}
            key={`page-${page}`}
            onClick={this.clickHandler}
            select={currentPage === page}
          >
            {page}
          </PageButton>
        ))}

        {this.showMore('next') && <StyleLabel htmlFor="">...</StyleLabel>}

        {showBothEndBtn && (
          <PageButton
            value={pageCount}
            onClick={this.clickHandler}
            select={currentPage === pageCount}
          >
            {pageCount}
          </PageButton>
        )}

        {this.showMore('next') && (
          <PageButton onClick={this.nextPageHandler}>
            <i className="fas fa-angle-double-right" />
          </PageButton>
        )}
      </Wrapper>
    );
  }
}

export default Pagination;

const Wrapper = styled.div`
  display: inline-block;
`;

const PageButton = styled.button`
  background-color: ${props => (props.select ? '#9013FE' : 'white')};
  color: ${props => (props.select ? 'white' : '#9013FE')};
  outline: none;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 1px;
`;

const StyleLabel = styled.label`
  margin: 0 0.5rem;
`;
