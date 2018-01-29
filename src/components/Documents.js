import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller';

import Container from './Container'
import '../styles/documents.css'
import DocumentItem from './DocumentItem'
import Tag from './Tag'


class Documents extends Component {

  constructor (props) {
    super(props);
  }

  renderDocumentItems() {
    return this.props.documents.map((document, i) => <DocumentItem key={i} document={document} />)
  }

  renderTags() {
    return Object.keys(this.props.filters).map(filterName => {
      return this.props.filters[filterName].terms.map((tag, i) => {
          return (
            <Tag key={i}
              text={tag}
              onClick={() => this.props.updateFilters(tag, filterName)}
            />
          )
        })
      });
  }

  render() {
    const loader = <div key={0}>Loading...</div>;
    return (
      <div className='outerContainer'>
      <Container>
        <div className='c-documents'>
          <div className='c-selectedFilters'>
            {this.renderTags()}
          </div>
          <div className='c-documentList'>
            <InfiniteScroll
              useWindow={false}
              hasMore={this.props.hasMoreDocs} 
              pageStart={2}      
              initialLoad={true} 
              loader={loader}   
              loadMore={this.props.getMoreDocuments}>
              {this.renderDocumentItems()}
            </InfiniteScroll>
          </div>
        </div>
      </Container>
    </div>
    )
  }
}

Documents.defaultProps = {
  num: 0,
  facets: {
    classification: { buckets: [] }
  },
  filters: {},
  updateFilters: () => {},
  getMoreDocuments: () => {},
  hasMoreDocs: false
}

export default Documents
