import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class County extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `county.${err.code}`,
        valid: err.valid,
        uid: err.uid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render () {
    return (
      <Text name={this.props.name}
            label={this.props.label}
            placeholder={this.props.placeholder}
            minlength="2"
            maxlength="100"
            required="true"
            className={this.props.className}
            value={this.state.value}
            onChange={this.handleChange}
            onError={this.handleError}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            />
    )
  }
}

County.defaultProps = {
  name: 'county',
  value: '',
  onError: (value, arr) => { return arr }
}

County.errors = []
