import React from 'react'
import { i18n } from '../../../../../config'
import { ValidationElement, Currency, Branch, Field, DateControl, Textarea, Radio, Country, RadioGroup, Show, Checkbox } from '../../../../Form'

export default class ContinuingBenefit extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBegan = this.updateBegan.bind(this)
    this.updateEnd = this.updateEnd.bind(this)
    this.updateFrequency = this.updateFrequency.bind(this)
    this.updateOtherFrequency = this.updateOtherFrequency.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.updateValueEstimated = this.updateValueEstimated.bind(this)
    this.updateReason = this.updateReason.bind(this)
    this.updateObligated = this.updateObligated.bind(this)
    this.updateObligatedExplanation = this.updateObligatedExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Began: this.props.Began,
      End: this.props.End,
      Frequency: this.props.Frequency,
      OtherFrequency: this.props.OtherFrequency,
      Country: this.props.Country,
      Value: this.props.Value,
      ValueEstimated: this.props.ValueEstimated,
      Reason: this.props.Reason,
      Obligated: this.props.Obligated,
      ObligatedExplanation: this.props.ObligatedExplanation,
      ...queue
    })
  }

  updateBegan (values) {
    this.update({
      Began: values
    })
  }

  updateEnd (values) {
    this.update({
      End: values
    })
  }

  updateFrequency (cb) {
    this.update({
      Frequency: cb.value
    })
  }

  updateOtherFrequency (values) {
    this.update({
      OtherFrequency: values
    })
  }

  updateCountry (values) {
    this.update({
      Country: values
    })
  }

  updateValue (values) {
    this.update({
      Value: values
    })
  }

  updateValueEstimated (cb) {
    this.update({
      ValueEstimated: cb.checked
    })
  }

  updateReason (values) {
    this.update({
      Reason: values
    })
  }

  updateObligated (values) {
    this.update({
      Obligated: values
    })
  }

  updateObligatedExplanation (values) {
    this.update({
      ObligatedExplanation: values
    })
  }

  render () {
    return (
      <div className="continuing-benefit">
        <Field title={i18n.t('foreign.activities.benefit.continuing.heading.began')}
               help={'foreign.activities.benefit.continuing.help.began'}
               adjustFor="labels">

          <DateControl name="Began"
                       className="began"
                       {...this.props.Began}
                       label={i18n.t('foreign.activities.benefit.continuing.label.began')}
                       onUpdate={this.updateBegan}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.continuing.heading.end')}
               help={'foreign.activities.benefit.continuing.help.end'}
               adjustFor="labels">

          <DateControl name="End"
                       className="end"
                       {...this.props.End}
                       label={i18n.t('foreign.activities.benefit.continuing.label.end')}
                       onUpdate={this.updateEnd}
                       maxDate={null}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.continuing.heading.frequency')}
               adjustFor="big-buttons">

          <RadioGroup className="frequency" selectedValue={this.props.Frequency}>
            <Radio name="benefit_frequency"
                   label={i18n.m('foreign.activities.benefit.continuing.label.frequency.annually')}
                   value="Annually"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="benefit_frequency"
                   label={i18n.m('foreign.activities.benefit.continuing.label.frequency.quarterly')}
                   value="Quarterly"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="benefit_frequency"
                   label={i18n.m('foreign.activities.benefit.continuing.label.frequency.monthly')}
                   value="Monthly"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="benefit_frequency"
                   label={i18n.m('foreign.activities.benefit.continuing.label.frequency.weekly')}
                   value="Weekly"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
            <Radio name="benefit_frequency"
                   label={i18n.m('foreign.activities.benefit.continuing.label.frequency.other')}
                   value="Other"
                   onUpdate={this.updateFrequency}
                   onError={this.props.onError}
                   />
          </RadioGroup>
          <Show when={this.props.Frequency === 'Other'}>
            <div>
              {i18n.m('foreign.activities.benefit.continuing.para.frequencyOther')}
              <Textarea name="OtherFrequency"
                        className="other-frequency"
                        {...this.props.OtherFrequency}
                        onUpdate={this.updateOtherFrequency}
                        onError={this.props.onError}
                        />
            </div>
          </Show>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.continuing.heading.country')}>
          <Country name="Country"
                   {...this.props.Country}
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.continuing.heading.value')}>
          <Currency name="Value"
                    className="value"
                    {...this.props.Value}
                    min="0"
                    onUpdate={this.updateValue}
                    onError={this.props.onError}
                    />
          <div className="flags">
            <Checkbox name="ValueEstimated"
                      label={i18n.t('foreign.activities.benefit.continuing.label.valueEstimated')}
                      toggle="false"
                      checked={this.props.ValueEstimated}
                      onUpdate={this.updateValueEstimated}
                      onError={this.props.onError}
                      />
          </div>
        </Field>

        <Field title={i18n.t('foreign.activities.benefit.continuing.heading.reason')}>
          <Textarea name="Reason"
                    className="reason"
                    {...this.props.Reason}
                    onUpdate={this.updateReason}
                    onError={this.props.onError}
                    />
        </Field>

        <Branch name="Obligated"
                className="obligated"
                label={i18n.t('foreign.activities.benefit.continuing.heading.obligated')}
                labelSize="h3"
                value={this.props.Obligated}
                onError={this.props.onError}
                onUpdate={this.updateObligated}>
        </Branch>

        <Show when={this.props.Obligated === 'Yes'}>
          <Textarea name="Explanation"
                    label={i18n.m('foreign.activities.benefit.continuing.label.obligatedExplanation')}
                    className="explanation"
                    {...this.props.ObligatedExplanation}
                    onUpdate={this.updateObligatedExplanation}
                    onError={this.props.onError}
                    />
        </Show>
      </div>
    )
  }
}

ContinuingBenefit.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
