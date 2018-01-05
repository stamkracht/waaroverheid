import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import Button from './Button'
import Reporting from './Reporting'
import '../styles/documentItem.css'

class DocumentItem extends Component {

  constructor(props) {
    super(props)

    this.numTags = Math.floor((Math.random() * 10) + 1)

    this.state = {
      active: true,
    }
  }

  toggleDocument() {
    this.setState({active: !this.state.active})
  }

  toggleReporting = () => {
    this.setState({showReporting: !this.state.showReporting}, () => {
      if (this.state.showReporting) {
        document.addEventListener('mousedown', this.handleOutsideClick, false)
      } else {
        document.removeEventListener('mousedown', this.handleOutsideClick, false)
      }
    })
  }

  renderDetails = () => {
    if ( this.state.active ) {
      return (
        <div className='c-details'>
          <Container shadow={true}>
            <div className='c-details--content'>
              <div className='c-details--text'>
                <h3>{this.props.docDetails}</h3>
                <h3>{this.props.docDetails}</h3>
              </div>
              <div className='c-details--snippets'>
                <p>'{this.props.snippet}'</p>
              </div>
              <Reporting />
            </div>
          </Container>
        </div>
      )
    }
  }

  renderTags = () => {
    return Array.apply(null, new Array(this.numTags)).map((e, i) => {
      return (
        <div key={i}>
          <Button text={`Tag ${i+1}`} />
        </div>
      )
    })
  }

  renderDocumentItem = () => {
    return (
      <div className='c-documents--content'
        onClick={this.toggleDocument.bind(this)}>
        <Icon icon='file' iconPosition='left' width='50' height='50'/>
        <div className='c-documents--text'>
          <h2>{this.props.fileTitle}</h2>
          <h3>{this.props.fileDate}, {this.props.fileType}</h3>
        </div>
        <div className='c-documents--tag'>
          {this.renderTags()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='c-documents--item'>
        <Container shadow={true}>
          {this.renderDocumentItem()}
          <button className='c-documents--dropdown'
            onClick={this.toggleDocument.bind(this)}>
            <Icon icon='arrow' />
          </button>
        </Container>
        {this.renderDetails()}
      </div>
    )
  }
}

DocumentItem.defaultProps = {
  fileTitle: 'Document title',
  fileDate: 'Document date',
  fileType: 'Document type',
  tags: [],
  docDetails: 'Document details',
  snippet: 'Snippet'
}

export default DocumentItem
