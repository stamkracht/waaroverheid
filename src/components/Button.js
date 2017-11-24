import React from 'react'

import Container from './Container'
import '../styles/button.css'
import document from '../images/document.svg'


class Button extends React.Component {

  renderIcon() {
    if ( this.props.icon ) {
      let className = `c-button--icon ${this.props.iconPosition}`
      return (
        <img className={className} src={document} alt="document" />
      )
    }
  }

  render() {
    return (
      <div className='c-button'>
        <Container>
          <div className='c-button--text'>{this.props.text}</div>
          {this.renderIcon()}
        </Container>
      </div>
    )
  }
}

Button.defaultProps = {
  text: 'Click me',
  icon: '',
  iconPosition: 'right',
}

export default Button;
