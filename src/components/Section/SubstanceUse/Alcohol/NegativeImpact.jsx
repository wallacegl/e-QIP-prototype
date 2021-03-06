import React from 'react'
import { i18n } from '../../../../config'
import { DateRange, ValidationElement, Field, Textarea, DateControl } from '../../../Form'

export default class NegativeImpact extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateOccurred = this.updateOccurred.bind(this)
    this.updateCircumstances = this.updateCircumstances.bind(this)
    this.updateNegativeImpact = this.updateNegativeImpact.bind(this)
    this.updateUsed = this.updateUsed.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        Occurred: this.props.Occurred,
        Circumstances: this.props.Circumstances,
        NegativeImpact: this.props.NegativeImpact,
        Used: this.props.Used,
        ...updateValues
      })
    }
  }

  updateOccurred (values) {
    this.update({Occurred: values})
  }

  updateCircumstances (values) {
    this.update({Circumstances: values})
  }

  updateNegativeImpact (values) {
    this.update({NegativeImpact: values})
  }

  updateUsed (values) {
    this.update({Used: values})
  }

  render () {
    return (
      <div className="negative-impact">
        <Field title={i18n.t('substance.alcohol.negativeImpact.heading.occurred')}
               help={'substance.alcohol.negativeImpact.help.occurred'}
               adjustFor="labels">
          <DateControl name="Occurred"
                       className="occurred"
                       {...this.props.Occurred}
                       label={i18n.t('substance.alcohol.negativeImpact.label.occurred')}
                       hideDay={true}
                       onUpdate={this.updateOccurred}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('substance.alcohol.negativeImpact.heading.circumstances')}
               adjustFor="labels">
          <Field>
            <Textarea name="Circumstances"
                      className="circumstances"
                      {...this.props.Circumstances}
                      label={i18n.t('substance.alcohol.negativeImpact.label.circumstances')}
                      onUpdate={this.updateCircumstances}
                      onError={this.props.onError}
                      />
          </Field>
          <Field>
            <Textarea name="NegativeImpact"
                      className="negative-impact-explanation"
                      {...this.props.NegativeImpact}
                      label={i18n.t('substance.alcohol.negativeImpact.label.negativeImpact')}
                      onUpdate={this.updateNegativeImpact}
                      onError={this.props.onError}
                      />
          </Field>
        </Field>
        <Field title={i18n.t('substance.alcohol.negativeImpact.heading.used')}
               help={'substance.alcohol.negativeImpact.help.used'}
               adjustFor="daterange">
          <DateRange name="Used"
                     className="used"
                     {...this.props.Used}
                     onUpdate={this.updateUsed}
                     onError={this.props.onError}
                     />
        </Field>
      </div>
    )
  }
}

NegativeImpact.defaultProps = {
  onError: (value, arr) => { return arr }
}
