import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import Button from './Button'
import '../styles/documents.css'

class DocumentItem extends Component {
  render() {
    return (
        <div>
            <Container shadow={true}>
              <div className='document-details'>
                <Icon icon='file' iconPosition='left' width='50' height='50'/>
                <div className='c-documents--text'>
                  <h2 onClick={this.toggleDropdown}>{this.props.fileTitle}</h2>
                <h3>{this.props.fileDate}, {this.props.fileType}</h3>
                </div>
              <div className='tag-container'>
                <div><Button shadow={true} text={this.props.tag}/></div>
                <div><Button shadow={true} text={this.props.tag}/></div>
              </div>
            </div>
          </Container>
        </div>
    )
  }
}

DocumentItem.defaultProps = {
  fileTitle: 'Document title',
  fileDate: 'Document date',
  fileType: 'Document type',
  tag: 'Tag',
}

export default DocumentItem
