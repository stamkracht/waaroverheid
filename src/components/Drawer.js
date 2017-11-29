import React from 'react'

import '../styles/drawer.css'
import document from '../images/document.svg'
import '../styles/button.css'

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
          <img className='c-drawer--icon' src={document} alt="document icon" />
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

  render() {
    return (
      <div className={`${this.state.activeDrawer ? 'c-drawer active' : 'c-drawer'}`}>
        {this.renderHeader()}
      </div>
    )
  }
}

Drawer.defaultProps = {
  text: 'Documents',
}

export default Drawer
