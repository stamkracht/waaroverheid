import React from 'react'

class ArrowIcon extends React.Component {
  render() {
    return (
      <svg
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
        <path d='m24.958675,10.48748l-0.93366,-0.93366l-9.02497,9.02505l-9.02507,-9.02505l-0.93365,0.93366l9.95872,9.9587l9.95863,-9.9587z'/>
      </svg>
    )
  }
}

ArrowIcon.defaultProps = {
  width: 30,
  height: 30,
  color: 'black',
}

export default ArrowIcon
