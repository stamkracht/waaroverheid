import React from 'react'


class Municipalities extends React.Component {

  renderList() {
    return this.props.list.map((item, i) => {
      return <div key={i}>{item}</div>
    })
  }

  render() {
    return (
      <div className='c-municipalities'>
        {this.renderList()}
      </div>
    )
  }
}

Municipalities.defaultProps = {
  list: [],
}

export default Municipalities
