import React from 'react'


class Municipalities extends React.Component {

  renderList() {
    return this.props.list.map(item => {
      return <div key={item.code}>{item.name}</div>
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
