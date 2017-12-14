import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import Button from './Button'
import '../styles/documents.css'

class DocumentItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
    }
  }


  toggleDropdown = () => {
    this.setState({show: !this.state.show})
  }

  renderDetails = () => {
    return (
      <div className='c-details'>
        <Container shadow={true}>
          <div className='c-details--content'>
            <div className='c-details--text'>
              <h3>Document details</h3>
              <h3>Document details</h3>
            </div>
            <div className='c-details--snippets'>
              <p>'Snippets'</p>
            </div>
            <div className='c-details--rating'>
              <Icon icon='like' />
              <Icon icon='dislike' />
            </div>
          </div>
        </Container>
      </div>
    )
  }

  renderDocumentItem = () => {
    return (
      <div className='c-documents--content'>
        <Icon icon='file' iconPosition='left' width='50' height='50'/>
        <div className='c-documents--text'>
          <h2 onClick={this.toggleDropdown}>{this.props.fileTitle}</h2>
          <h3>{this.props.fileDate}, {this.props.fileType}</h3>
        </div>
        <div className='c-documents--tag'>
          <div><Button shadow={true} text={this.props.tag}/></div>
          <div><Button shadow={true} text={this.props.tag}/></div>
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
            {this.state.show && this.renderDetails()}
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
