import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, DateControl, Text, Textarea, Field } from '../../../Form'

export default class Procedure extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateOffenses = this.updateOffenses.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateCourt = this.updateCourt.bind(this)
    this.updateOutcome = this.updateOutcome.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Date: this.props.Date,
      Offenses: this.props.Offenses,
      Name: this.props.Name,
      Court: this.props.Court,
      Outcome: this.props.Outcome,
      ...queue
    })
  }

  updateDate (value) {
    this.update({
      Date: value
    })
  }

  updateOffenses (value) {
    this.update({
      Offenses: value
    })
  }

  updateName (value) {
    this.update({
      Name: value
    })
  }

  updateCourt (value) {
    this.update({
      Court: value
    })
  }

  updateOutcome (value) {
    this.update({
      Outcome: value
    })
  }

  render () {
    return (
      <div className="disciplinary-procedure">
        <Field title={i18n.t('military.disciplinary.heading.date')}
               help="military.disciplinary.help.date"
               adjustFor="labels"
               shrink={true}>
          <DateControl name="Date"
                       {...this.props.Date}
                       className="procedure-date"
                       hideDay={true}
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('military.disciplinary.heading.offenses')}>
          <Textarea name="Offenses"
                    {...this.props.Offenses}
                    className="procedure-offenses"
                    onUpdate={this.updateOffenses}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('military.disciplinary.heading.name')}
               adjustFor="p">
          <Text name="Name"
                {...this.props.Name}
                label={i18n.m('military.disciplinary.label.name')}
                className="procedure-name"
                maxlength="100"
                onUpdate={this.updateName}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('military.disciplinary.heading.court')}
               adjustFor="p">
          <Textarea name="Court"
                    {...this.props.Court}
                    label={i18n.t('military.disciplinary.label.court')}
                    className="procedure-court"
                    onUpdate={this.updateCourt}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('military.disciplinary.heading.outcome')}
               adjustFor="labels">
          <Text name="Outcome"
                {...this.props.Outcome}
                label={i18n.t('military.disciplinary.label.outcome')}
                className="procedure-outcome"
                maxlength="100"
                onUpdate={this.updateOutcome}
                onError={this.props.onError}
                />
        </Field>
      </div>
    )
  }
}

Procedure.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
