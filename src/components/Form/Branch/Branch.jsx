import React from 'react'
import { i18n } from '../../../config'
import { Field, Radio, RadioGroup } from '../../Form'

/**
 * Branch is a component that stores whether Yes/No options were selected. It contains a callback
 * function that can be used to be upated when a button is clicked. The button labels and values are
 * configurable by passing in the appropriate property which are defined in the Branch.defaultProps object.
 */
export default class Branch extends React.Component {
  constructor (props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate (values) {
    // If they answered "No" (or deselects "Yes" entirely) we need to
    // check if a confirmation is required.
    if ((values.value === this.props.noValue || values.value === '') && this.props.value === this.props.yesValue) {
      // When a `warning` should be displayed AND they do no approve the change then
      // set the old value back to "Yes".
      if (this.props.warning && window.confirm(this.props.confirmation) === false) {
        values.value = this.props.yesValue
      }
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(values.value)
    }
  }

  render () {
    const klass = `branch ${this.props.className || ''}`.trim()

    return (
      <Field title={this.props.label}
             titleSize={this.props.labelSize}
             className={klass}
             help={this.props.help}
             adjustFor={this.props.adjustFor}
             shrink={true}>
        <div className="content">
          {this.props.children}
        </div>
        <RadioGroup className="option-list branch" selectedValue={this.props.value}>
          <Radio name={this.props.name}
                 label={this.props.yesLabel}
                 value={this.props.yesValue}
                 className="yes"
                 onUpdate={this.handleUpdate}
                 onError={this.props.onError}
                 />
          <Radio name={this.props.name}
                 label={this.props.noLabel}
                 value={this.props.noValue}
                 className="no"
                 onUpdate={this.handleUpdate}
                 onError={this.props.onError}
                 />
        </RadioGroup>
      </Field>
    )
  }
}

// Default values for properties that are not specified
Branch.defaultProps = {
  yesLabel: i18n.t('branch.label.yes'),
  yesValue: i18n.t('branch.value.yes'),
  noLabel: i18n.t('branch.label.no'),
  noValue: i18n.t('branch.value.no'),
  labelSize: 'label',
  adjustFor: 'buttons',
  warning: false,
  confirmation: i18n.t('branch.confirmation'),
  value: '',
  onError: (value, arr) => { return arr }
}
