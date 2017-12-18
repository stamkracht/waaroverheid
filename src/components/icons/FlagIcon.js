import React from 'react'

class FlagIcon extends React.Component {
  render() {
    return (
      <svg viewBox='0 0 30 30'
        fill={this.props.color}
        width={`${this.props.width}px`}
        height={`${this.props.height}px`}>
        <path fill="none" d="M-1-1h32v32H-1z"/>
        <path stroke="null" d="M24.72362 4.63448c-.56974-.23612-1.22479-.10512-1.66047.33057-1.92553 1.924-5.05908 1.92552-6.98613 0-3.11528-3.11223-8.18046-3.11223-11.2942 0-.2864.28486-.44635.67332-.44635 1.07701v19.8037c0 .8409.68094 1.52337 1.52336 1.52337s1.52336-.68247 1.52336-1.52337V18.9099c1.9362-1.5188 4.75441-1.38778 6.5398.39607 3.11527 3.11223 8.18197 3.11223 11.2942 0 .28639-.28639.44634-.67332.44634-1.07701V6.04205c0-.61696-.3717-1.17146-.93991-1.40758z"/>
      </svg>
    )
  }
}

FlagIcon.defaultProps = {
  width: 30,
  height: 30,
  color: 'black',
}

export default FlagIcon
