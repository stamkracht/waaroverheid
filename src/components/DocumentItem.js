import React, { Component } from 'react'

import Container from './Container'
import Icon from './Icon'
import Button from './Button'
import '../styles/documentItem.css'

class DocumentItem extends Component {
  constructor(props) {
    super(props)

      this.toggleFlag = this.toggleFlag.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      show: false,
      showFlag: false,
    }
  }

  toggleDropdown = () => {
    this.setState({show: !this.state.show})
  }

  toggleFlag() {
    if (!this.state.showFlag) {
    document.addEventListener('click', this.handleOutsideClick, false);
  } else {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

    this.setState({showFlag: !this.state.showFlag})
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }

    this.toggleFlag();
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
            <div ref={node => { this.node = node; }}>
              <button className='c-details--rating' onClick={this.toggleFlag}>
                <Icon icon='flag' width='20' height='20'/>
              </button>
              <div>
                {this.state.showFlag && this.renderFlag()}
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  renderFlag = () => {
    return (
      <div className='c-flagDropdown'>
        <div className='c-flagDropdown--header'>
          <h3>Report the document:</h3>
          <div onClick={this.toggleFlag}>
            <Icon icon='close' width='20' height='20'/>
          </div>
        </div>
      </div>
    )
  }

  renderTags = () => {
    let tags = ['Tag 1', 'Tag 2', 'Tag 3']
    return tags.map((tag, id) => {
      return <div key={id}><Button shadow={true} text={tag} /></div>
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
            {this.state.show && this.renderDetails()}
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
