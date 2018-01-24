import React, { Component } from 'react'
import moment from 'moment'

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
      active: false,
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
    if ( this.state.active && this.props.document.description) {
      return (
        <div className='c-details'>
          <Container shadow={true}>
            <div className='c-details--content'>
              <div className='c-details--text'>
                <h3>{this.props.document.description}</h3>                
              </div>
              <div className='c-details--snippets'>
                <p>{this.props.document.snippet}</p>
              </div>
              <Reporting />
            </div>
          </Container>
        </div>
      )
    }
  }

  renderTags = () => {
    let maxTags = this.numTags;
    return Array.apply(null, new Array(this.numTags)).map((e, i) => {
      if(!this.state.active) {
        maxTags = 3;
      }
      return (
        <div key={i}>
          {i < maxTags &&
          <div>
            <Button text={`Tag ${i+1}`} />
          </div>}
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
          <h2>{this.props.document.name}</h2>
          <h3>{moment(this.props.document.start_date).format('DD-MM-YYYY')}</h3>
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
          {this.props.document.description ? <button className='c-documents--dropdown'
            onClick={this.toggleDocument.bind(this)}>
            <Icon icon='arrow' />
          </button> : ''}
        </Container>
        {this.renderDetails()}
      </div>
    )
  }
}

DocumentItem.defaultProps = {
  document: {}
}

export default DocumentItem
