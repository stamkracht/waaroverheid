import React from 'react'

import Documents from './Documents'
import Icon from './Icon'
import { classNames } from '../utilities/class'

import '../styles/drawer.css'


class Drawer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  handleKeyDown(event) {
    if ( event.keyCode === 27 ) {
      this.setState({active: false})
    }
  }

  handleOnClick() {
    this.setState({
      active: !this.state.active,
    })
  }

  renderHeaderContent() {
    let text = `${this.props.numberDoc} document${this.props.numberDoc > 1 ? 's' : ''} found in ${this.props.area}`
    if ( this.state.active === false ) {
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
      <div className={classNames('c-hamburger', {'active': this.state.active})}>
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
    return <Documents num={this.props.numberDoc} />
  }

  render() {
    return (
      <div className={classNames('c-drawer', {'active': this.state.active})}>
        {this.renderHeader()}
        {this.state.active && <Documents />}
      </div>
    )
  }
}

Drawer.defaultProps = {
  numberDoc: 0,
  area: 'selected area',
}

export default Drawer
