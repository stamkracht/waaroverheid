import React, { Component } from 'react'

import Container from './Container'
import '../styles/documents.css'
import DocumentItem from './DocumentItem'
import Tag from './Tag'

class Documents extends Component {

  constructor(props) {
    super(props)

    this.state = {
      update: false,
    }
  }

  handleOnClick(item) {
    item.active = !item.active;
    this.setState({update: !this.state.update})
  }

  renderDocumentItems() {
    return this.props.documents.map((document, i) => <DocumentItem key={i} document={document} />)
  }

  renderTags() {
    return Object.keys(this.props.filters).map(filterName =>
      this.props.filters[filterName].map(tag => {
          return (
            <Tag key={tag.key}
              text={tag.key}
              onClick={() => this.handleOnClick(tag)}
            />
          )
        }))
  }

  render() {
    return (
      <div className='outerContainer'>
      <Container>
        <div className='c-documents'>
          <div className='c-selectedFilters'>
            {this.renderTags()}
          </div>
          <div className='c-documentList'>
            {this.renderDocumentItems()}
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
    types: { buckets: [] },
    classification: { buckets: [] }
  },
  filters: {},
}

export default Documents
