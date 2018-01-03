import React from 'react'

import Documents from './Documents'
import Icon from './Icon'

import '../styles/drawer.css'
import '../styles/button.css'


class Drawer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeDrawer: false,
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  handleKeyDown(event) {
    if ( event.keyCode === 27 ) {
      this.setState({activeDrawer: false})
    }
  }

  handleOnClick() {
    this.setState({
      activeDrawer: !this.state.activeDrawer,
    })
  }

  renderHeaderContent() {
    let text = `${this.props.numberDoc} document${this.props.numberDoc > 1 ? 's' : ''} found in ${this.props.area}`
    if ( this.state.activeDrawer === false ) {
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
      <div className={`${this.state.activeDrawer ? 'c-hamburger active' : 'c-hamburger'}`}>
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
      <div className={`${this.state.activeDrawer ? 'c-drawer active' : 'c-drawer'}`}>
        {this.renderHeader()}
        {this.state.activeDrawer && <Documents />}
      </div>
    )
  }
}

Drawer.defaultProps = {
  numberDoc: 0,
  area: 'selected area',
}

export default Drawer
