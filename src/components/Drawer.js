import React from 'react'

import Documents from './Documents'
import Icon from './Icon'
import { classNames } from '../utilities/class'

import '../styles/drawer.css'


class Drawer extends React.Component {

  handleOnClick() {
    this.props.toggle()
  }

  renderHeaderContent() {
    let text = `${this.props.numberDoc} document${this.props.numberDoc > 1 || this.props.numberDoc === 0 ? 's' : ''} found in ${this.props.area}`
    if ( !this.props.active ) {
      return (
        <div>
          <Icon icon='file' iconPosition='left' />
          <span className='c-drawer--text'>
            {text}
          </span>
        </div>
      )
    } else {
      return (
        <div>
          <h1 className='c-drawer--title'>
            {text}
          </h1>
        </div>
      )
    }
  }

  renderHamburger() {
    return (
      <div className={classNames('c-hamburger', {'active': this.props.active})}>
        <span className='line' />
        <span className='line' />
        <span className='line' />
      </div>
    )
  }

  renderHeader() {
    return (
      <div className='c-drawer--header' onClick={this.handleOnClick.bind(this)}>
        {this.renderHeaderContent()}
        {this.renderHamburger()}
      </div>
    )
  }

  renderDocuments = () => {
    if(this.props.active) {
      if(this.props.numberDoc === 0) {
        return (
          <div className='c-emptyContent'>
            <h2>No documents to show</h2>
            <ul>
            <li><h3>Try navigating to a different municipality</h3></li>
            <li><h3>Sign up for alerts</h3></li>
            </ul>
          </div>
        )
      }
      else {
        return <Documents
          service={this.props.service}
          num={this.props.numberDoc}
          facets={this.props.facets}
          documents={this.props.documents}
          filters={this.props.filters}
          updateFilters={this.props.updateFilters}
          resetQuery={this.props.resetQuery}
          query={this.props.query}/>
      }
    }
  }

  render() {
    return (
      <div className={classNames('c-drawer', {'active': this.props.active})}>
        {this.renderHeader()}
        {this.renderDocuments()}
      </div>
    )
  }
}

Drawer.defaultProps = {
  active: false,
  numberDoc: 0,
  area: 'selected area',
  toggle: undefined,
  service: {},
  documents: [],
  facets: {
    classification: { buckets: [] }
  },
  filters: {},
  updateFilters: () => {},
  resetQuery: () => {},
}

export default Drawer
