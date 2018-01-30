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

  renderQuery() {
    if(this.props.query) {
      return (
        <Tag key={'query'} text={this.props.query} onClick={() => this.props.resetQuery()}/>
      )
    }
  }

  renderStartDateTag({from, to}) {
    if(!from || !to) return
    return (
      <Tag key={'start_date'}
          text={`Vanaf: ${from.slice(0, 10)}, Tot: ${to.slice(0, 10)}`}
          onClick={() => this.props.updateFilters({to, from}, 'start_date')}/>
    )
  }

  renderClassificationTag({terms = []}) {
    return terms.map((tag, i) => {
		    return (
		        <Tag key={i}
              text={tag}
              onClick={() => this.props.updateFilters(tag, 'classification')}/>
        )
    })
  }

  renderTags() {
    return ['start_date', 'classification']
      .filter(filter => this.props.filters[filter])
      .map(filter => {
        switch(filter) {
          case 'start_date':
            return this.renderStartDateTag(this.props.filters[filter]);
          case 'classification':
            return this.renderClassificationTag(this.props.filters[filter])
        }
      })
  }

  render() {
    const loader = <div key={0}>Laden...</div>;
    return (
      <div className='outerContainer'>
      <Container>
        <div className='c-documents'>
          <div className='c-selectedFilters'>
            {this.renderQuery()}
            {this.renderTags()}
          </div>
          <div className='c-documentList'>
            <InfiniteScroll
              useWindow={false}
              hasMore={this.props.hasMoreDocs}
              pageStart={1}
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
  hasMoreDocs: false,
  query: '',
  resetQuery: () => {},
}

export default Documents
