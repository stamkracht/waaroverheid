import React from 'react'

import Container from './Container'
import '../styles/button.css'
import document from '../images/document.svg'


class Button extends React.Component {
  renderIcon() {
    if(this.props.icon) {
      return <img src={document} className='c-button--icon' alt="document" />
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
}

export default Button;
