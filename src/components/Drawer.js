import React from 'react'

import '../styles/drawer.css'
import document from '../images/document.svg'
import '../styles/button.css'

class Drawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeHam: false,
      activeDrawer: false,
    }
  }

  handleOnClick() {
    this.setState({activeHam: !this.state.activeHam})
    this.setState({activeDrawer: !this.state.activeDrawer})
  }

  render() {

  let classDrawer = 'c-drawer'
  let className = 'hamburger'
  if(this.state.activeHam === true && this.state.activeDrawer === true) {
    className += ' is-active'
    classDrawer += ' active'
  }

  return (
      <div className={classDrawer} onClick={this.handleOnClick.bind(this)}>
          <img className='c-drawer--icon' src={document} alt="document icon" />
          <span className='c-drawer--text'>{this.props.text}</span>
          <div className={className}>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
      </div>
  )
  }
}

Drawer.defaultProps = {
  text: 'Documents',
}

export default Drawer
