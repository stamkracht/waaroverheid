import React from 'react'

import '../styles/drawer.css'
import document from '../images/document.svg'
import '../styles/button.css'

class Drawer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeHam: false
    }
  }

  handleOnClick() {
    this.setState({activeHam: !this.state.activeHam})
  }

    // if(this.hamState === true) {
    //   this.hamState = false
    // else {
    //   this.hamState = true
    //   this.forceUpdate()
    // }

  render() {

  let className = 'hamburger'
  if(this.state.activeHam === true) {
    className += ' is-active'
  }

  return (
      <div className='c-drawer'>
          <img className='c-drawer--icon' src={document} alt="document icon" />
          <span className='c-drawer--text'>{this.props.text}</span>
          <div className={className} onClick={this.handleOnClick.bind(this)}>
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
