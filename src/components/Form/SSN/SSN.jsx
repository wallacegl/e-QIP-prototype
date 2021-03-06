import React from 'react'
import { i18n } from '../../../config'
import { api } from '../../../services/api'
import ValidationElement from '../ValidationElement'
import Field from '../Field'
import Text from '../Text'
import Checkbox from '../Checkbox'
import Show from '../Show'

export default class SSN extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateFirst = this.updateFirst.bind(this)
    this.updateMiddle = this.updateMiddle.bind(this)
    this.updateLast = this.updateLast.bind(this)
    this.updateNotApplicable = this.updateNotApplicable.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleErrorFirst = this.handleErrorFirst.bind(this)
    this.handleErrorMiddle = this.handleErrorMiddle.bind(this)
    this.handleErrorLast = this.handleErrorLast.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      first: this.props.first,
      middle: this.props.middle,
      last: this.props.last,
      notApplicable: this.props.notApplicable,
      ...queue
    })
  }

  updateFirst (values) {
    this.update({
      first: values.value
    })
  }

  updateMiddle (values) {
    this.update({
      middle: values.value
    })
  }

  updateLast (values) {
    this.update({
      last: values.value
    })
  }

  updateNotApplicable (values) {
    this.update({
      notApplicable: values.checked
    })
  }

  handleErrorFirst (value, arr) {
    return this.handleError('first', value, arr)
  }

  handleErrorMiddle (value, arr) {
    return this.handleError('middle', value, arr)
  }

  handleErrorLast (value, arr) {
    return this.handleError('last', value, arr)
  }

  handleError (code, value, arr) {
    arr = (arr || []).map(err => {
      return {
        code: `ssn.${code}.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr)
  }

  render () {
    const klass = `ssn ${this.props.className || ''}`.trim()

    return (
      <div className={klass}>
        <Text name="first"
              ref="first"
              className="first eapp-short-input"
              placeholder={i18n.t('identification.ssn.placeholder.first')}
              maxlength="3"
              pattern="^[0-9]{3}$"
              clipboard={false}
              value={this.props.first}
              disabled={this.props.notApplicable}
              onUpdate={this.updateFirst}
              onError={this.handleErrorFirst}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              tabNext={() => { this.props.tab(this.refs.middle.refs.text.refs.input) }}
          />
          <Text name="middle"
                ref="middle"
                className="middle eapp-short-input"
                placeholder={i18n.t('identification.ssn.placeholder.middle')}
                maxlength="2"
                pattern="^[0-9]{2}$"
                clipboard={false}
                value={this.props.middle}
                disabled={this.props.notApplicable}
                onUpdate={this.updateMiddle}
                onError={this.handleErrorMiddle}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                tabBack={() => { this.props.tab(this.refs.first.refs.text.refs.input) }}
            tabNext={() => { this.props.tab(this.refs.last.refs.text.refs.input) }}
            />
            <Text name="last"
                  ref="last"
                  className="last eapp-short-input"
                  placeholder={i18n.t('identification.ssn.placeholder.last')}
                  maxlength="4"
                  pattern="^[0-9]{4}$"
                  clipboard={false}
                  value={this.props.last}
                  disabled={this.props.notApplicable}
                  onUpdate={this.updateLast}
                  onError={this.handleErrorLast}
                  onFocus={this.props.onFocus}
                  onBlur={this.props.onBlur}
                  tabBack={() => { this.props.tab(this.refs.middle.refs.text.refs.input) }}
              />
              <Show when={!this.props.hideNotApplicable}>
                <div className="flags">
                  <Checkbox name="notApplicable"
                            label={i18n.t('identification.ssn.label.notApplicable')}
                            className="not-applicable"
                            ref="notApplicable"
                            toggle="false"
                            value={this.props.notApplicable}
                            checked={this.props.notApplicable}
                            onUpdate={this.updateNotApplicable}
                            onError={this.handleError}
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            />
                </div>
              </Show>
      </div>
    )
  }
}

SSN.defaultProps = {
  value: '',
  first: '',
  middle: '',
  last: '',
  hideNotApplicable: false,
  notApplicable: false,
  focus: false,
  error: false,
  valid: false,
  tab: (input) => { input.focus() },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}

SSN.errors = []
