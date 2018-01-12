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
    let text = `${this.props.numberDoc} document${this.props.numberDoc > 1 ? 's' : ''} found in ${this.props.area}`
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
      return <Documents service={this.props.service} num={this.props.numberDoc} />
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
}

export default Drawer
