import React, { Component } from 'react'

import Container from './Container'
import '../styles/documents.css'
import DocumentItem from './DocumentItem'

class Documents extends Component {
  render() {
    return (
      <Container>
        <div className='c-documents'>
          <DocumentItem />
          <DocumentItem />
        </div>
      </Container>
    )
  }
}

export default Documents
