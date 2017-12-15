import React, { Component } from 'react'

import Container from './Container'
import '../styles/documents.css'
import DocumentItem from './DocumentItem'
import SearchBox from './SearchBox'

class Documents extends Component {
  render() {
    return (
      <div className='outerContainer'>
      <Container>
        <div className='c-documents'>
          <SearchBox />
          <DocumentItem />
          <DocumentItem />
        </div>
      </Container>
    </div>
    )
  }
}

export default Documents
