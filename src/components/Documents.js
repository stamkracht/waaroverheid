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
    return this.props.facets.types.buckets.concat(this.props.facets.classification.buckets).map((type, i) => {
          return (
            <Tag key={i}
              text={type.key}
              onClick={() => this.handleOnClick(type)}
            />
          )        
    })
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
  }
}

export default Documents
