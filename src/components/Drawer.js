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

  render() {

    return (
      <div className={`${this.state.activeDrawer ? 'c-drawer active' : 'c-drawer'}`}>
        <div className='c-drawer--header' onClick={this.handleOnClick.bind(this)}>
            <img className='c-drawer--icon' src={document} alt="document icon" />
            <span className='c-drawer--text'>{this.props.text}</span>
            <div className={`${this.state.activeDrawer ? 'c-hamburger active' : 'c-hamburger'}`}>
              <span className='line'></span>
              <span className='line'></span>
              <span className='line'></span>
            </div>
        </div>
      </div>
    )
  }
}

Drawer.defaultProps = {
  text: 'Documents',
}

export default Drawer
