import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import '../styles/documents.css'

class Documents extends Component {
  render() {
    return (
      <Container shadow={true}>
        <div className='c-documents'>
          <div>
            <Icon icon='file' iconPosition='left' width='50' height='50'/>
            <div className='c-documents--text'>
              <h1>Hey</h1>
              <h2>Hey there</h2>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default Documents
