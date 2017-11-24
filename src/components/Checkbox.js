import React from 'react'

import '../styles/checkbox.css'


class Checkbox extends React.Component {

  handleOnClick() {
    this.input.click()
  }

  render() {
    return (
      <div className="c-checkbox">
        <input type="checkbox"
          id={this.props.id}
          ref={(input) => {this.input = input}}
          checked={this.props.active}
          onChange={this.props.onChange}
        />
        <label htmlFor={this.props.id} />
        <span onClick={this.handleOnClick.bind(this)}>
          {this.props.label}
        </span>
      </div>
    )
  }
}

Checkbox.defaultProps = {
  id: '',
  label: '',
  active: false,
  onChange: undefined,
}

export default Checkbox
