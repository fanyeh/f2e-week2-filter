import React, { Component } from 'react';
import styled from 'styled-components';

const itemsCount = 30;
const itemPerPage = 5;
const pageCount = itemsCount / itemPerPage;

class Pagination extends Component {
  static defaultProps = {
    minPageBtns: 7,
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.setPageBtns(),
    };
    this.numOfPageBtns = this.state.pageBtns.length;
    this.midIndex = Math.floor(this.numOfPageBtns / 2);
  }

  setPageBtns = () => {
    let pageBtns = [];
    let showBothEndBtn = true;
    if (this.props.minPageBtns < pageCount) {
      for (let i = 2; i < this.props.minPageBtns; i++) {
        pageBtns.push(i);
      }
    } else {
      showBothEndBtn = false;
      for (let i = 1; i <= pageCount; i++) {
        pageBtns.push(i);
      }
    }
    return { pageBtns, showBothEndBtn };
  };

  clickHandler = e => {
    let page = e.target.value * 1;

    if (!this.state.showBothEndBtn) {
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
    const { pageBtns } = this.state;
    const firstPage = pageBtns.shift();
    pageBtns.push(firstPage + this.numOfPageBtns);
    this.setState({ pageBtns });
  };

  prevPageHandler = () => {
    const { pageBtns } = this.state;
    const lastPage = pageBtns.pop();
    pageBtns.unshift(lastPage - this.numOfPageBtns);
    this.setState({ pageBtns });
  };

  showMore = type => {
    if (!this.state.showBothEndBtn) {
      return false;
    }
    const { pageBtns } = this.state;
    return type === 'prev' ? pageBtns[0] !== 2 : pageBtns[pageBtns.length - 1] !== pageCount - 1;
  };

  render() {
    const { pageBtns, showBothEndBtn } = this.state;
    return (
      <Wrapper>
        {this.showMore('prev') && <button onClick={this.prevPageHandler}>Previous</button>}

        {showBothEndBtn && (
          <button value="1" onClick={this.clickHandler}>
            1
          </button>
        )}

        {this.showMore('prev') && <label htmlFor="">...</label>}

        {pageBtns.map((page, index) => (
          <button value={page} key={`page-${page}`} onClick={this.clickHandler}>
            {page}
          </button>
        ))}

        {this.showMore('next') && <label htmlFor="">...</label>}

        {showBothEndBtn && (
          <button value={pageCount} onClick={this.clickHandler}>
            {pageCount}
          </button>
        )}

        {this.showMore('next') && <button onClick={this.nextPageHandler}>Next</button>}
      </Wrapper>
    );
  }
}

export default Pagination;

const Wrapper = styled.div`
  display: inline-block;
`;
