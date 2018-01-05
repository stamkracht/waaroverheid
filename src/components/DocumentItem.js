import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import Button from './Button'
import '../styles/documentItem.css'

class DocumentItem extends Component {
  constructor(props) {
    super(props)

    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.numTags = Math.floor((Math.random() * 10) + 1)

    this.state = {
      showDetails: false,
      showReporting: false,
    }
  }

  toggleDropdown = () => {
    this.setState({showDetails: !this.state.showDetails})
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

  handleOutsideClick(e) {
    if (!this.flagMenu.contains(e.target)) {
      this.toggleReporting()
    }
  }

  renderDetails = () => {
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
            <div ref={node => { this.flagMenu = node }}>
              <button className='c-details--rating' onClick={this.toggleReporting}>
                <Icon icon='flag' width='20' height='20'/>
              </button>
              <div>
                {this.state.showReporting && this.renderReporting()}
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  renderReporting = () => {
    return (
      <div className='c-flagDropdown'>
        <div className='c-flagDropdown--header'>
          <h3>Report the document:</h3>
          <div onClick={this.toggleReporting}>
            <Icon icon='close' width='20' height='20'/>
          </div>
        </div>
      </div>
    )
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
      <div className='c-documents--content' onClick={this.toggleDropdown}>
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
          <button className='c-documents--dropdown' onClick={this.toggleDropdown}>
            <Icon icon='arrow' />
          </button>
        </Container>
        {this.state.showDetails && this.renderDetails()}
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
