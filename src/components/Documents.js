import React, { Component } from 'react'

import Container from './Container'
import '../styles/documents.css'
import DocumentItem from './DocumentItem'
import SearchBox from './SearchBox'
import Tag from './Tag'

class Documents extends Component {
  constructor(props) {
    super(props)

  this.numFilters = Math.floor((Math.random() * 10) + 1);

  }

  renderDocumentItems() {
    return Array.apply(null, new Array(10)).map((e, i) => {
      return <DocumentItem key={i} fileTitle={`Document number ${i+1}`} />
    })
  }


  render() {
    return (
      <div className='outerContainer'>
      <Container>
        <div className='c-documents'>
          <div className='c-selectedFilters'>
            <Tag />
          </div>
          <SearchBox />
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
}

export default Documents
