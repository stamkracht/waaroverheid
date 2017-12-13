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
      <Container shadow={true}>
        <div>
          <h1>Document details</h1>
        </div>
      </Container>
    )
  }

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
            <button className='dropdown' onClick={this.toggleDropdown}>
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
