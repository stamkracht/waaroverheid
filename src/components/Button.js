import React from 'react'

import Container from './Container'
import '../styles/button.css'

class Button extends React.Component {


  render() {
    return (
      <div className='c-button'>
        <Container>
          {this.props.text}
        </Container>
      </div>
    )
  }
}

Button.defaultProps = {
  text: 'Click me',
}

export default Button;
