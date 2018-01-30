import React from 'react'

import Container from './Container'
import Icon from './Icon'
import { classNames } from '../utilities/class'

import '../styles/button.css'

const Text = ({text, textAlign, loading}) => (
  <div className={`c-button--text ${textAlign}`}>
    {loading ? 'Laden...' : text}
  </div>
);
 
const Button = ({
  text,
  icon,
  iconPosition,
  iconDirection,
  textAlign,
  flat,
  onClick,
  disabled,
  loading,
  active,
}) => {
  let classes = classNames('c-button', {
    disabled,
    loading,
    active,
    flat,
  });

  return (
    <Container shadow={!flat}>
      <div className={classes} onClick={onClick}>
        {text && <Text
          loading={loading}
          textAlign={textAlign}
          text={text}/>}
       {!loading && <Icon
          icon={icon}
          iconPosition={iconPosition}
          iconDirection={iconDirection} />}
      </div>
    </Container>) 
}

Button.defaultProps = {
  text: 'Button',
  icon: '',
  iconPosition: 'right',
  iconDirection: '',
  textAlign: 'center',
  flat: false,
  onClick: undefined,
  disabled: false,
  loading: false,
  active: false,
}

export default Button
