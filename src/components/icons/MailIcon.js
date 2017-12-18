import React from 'react'

class MailIcon extends React.Component {
  render() {
    return (
      <svg viewBox="0 0 30 30"
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
        <path fill="none" d="M-1-1h32v32H-1z"/>
        <path stroke="null" d="M27.30726 24.56583H2.69709l8.7654-8.7698L15 18.50301l3.54-2.70887 8.76727 8.77169zm.84575-.84528V8.43808l-8.65509 6.62303 8.65509 8.65944zm-26.30602.00437V8.43808l8.65756 6.62492L1.847 23.72492zM28.15301 6.93347v-1.4993H1.84699v1.4993L15 17.01769l13.15301-10.0842z"/>
      </svg>
    )
  }
}

MailIcon.defaultProps = {
  width: 30,
  height: 30,
  color: 'black',
}

export default MailIcon
