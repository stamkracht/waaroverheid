import React from 'react'

import Icon from './Icon'

import '../styles/drawer.css'
import '../styles/button.css'
import Documents from './Documents'

class Drawer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      activeDrawer: false,
    }
  }

  handleOnClick() {
    this.setState({
      activeDrawer: !this.state.activeDrawer,
    })
  }

  renderHeaderContent() {
    if(this.state.activeDrawer === false) {
      return (
        <div>
          <Icon icon='file' iconPosition='left' />
          <span className='c-drawer--text'> {this.props.text} </span>
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
    return (
      <Documents />
    )
  }

  render() {
    return (
      <div className={`${this.state.activeDrawer ? 'c-drawer active' : 'c-drawer'}`}>
        {this.renderHeader()}
        {this.state.activeDrawer && this.renderDocuments()}
      </div>
    )
  }
}

Drawer.defaultProps = {
  text: 'Documents',
}

export default Drawer
