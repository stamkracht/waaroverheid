import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import Button from './Button'
import '../styles/documents.css'

class DocumentItem extends Component {
  render() {
    return (
          <Container shadow={true}>
              <div className='document-details'>
              <Icon icon='file' iconPosition='left' width='50' height='50'/>
            <div className='c-documents--text'>
              <h2>Busbaan Vleuterweide</h2>
              <h3>9 sep. 2014, Agendapunt</h3>
            </div>
            <div className='tag-container'>
              <div><Button shadow={true} text='Oudenoord'/></div>
              <div><Button shadow={true} text='Kaatstraat'/></div>
            </div>
          </div>
            <Icon icon='arrow' />
          </Container>
    )
  }
}

export default DocumentItem
