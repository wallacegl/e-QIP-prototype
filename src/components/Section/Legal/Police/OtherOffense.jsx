import React from 'react'
import { i18n } from '../../../../config'
import Sentence from './Sentence'
import { ValidationElement, Branch, Show, Location, DateControl,
         Textarea, Text, RadioGroup, Radio, Field, Svg } from '../../../Form'

export default class OtherOffense extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDate = this.updateDate.bind(this)
    this.updateDescription = this.updateDescription.bind(this)
    this.updateInvolvedViolence = this.updateInvolvedViolence.bind(this)
    this.updateInvolvedFirearms = this.updateInvolvedFirearms.bind(this)
    this.updateInvolvedSubstances = this.updateInvolvedSubstances.bind(this)
    this.updateCourtName = this.updateCourtName.bind(this)
    this.updateCourtAddress = this.updateCourtAddress.bind(this)
    this.updateChargeType = this.updateChargeType.bind(this)
    this.updateCourtCharge = this.updateCourtCharge.bind(this)
    this.updateCourtOutcome = this.updateCourtOutcome.bind(this)
    this.updateCourtDate = this.updateCourtDate.bind(this)
    this.updateWasSentenced = this.updateWasSentenced.bind(this)
    this.updateSentence = this.updateSentence.bind(this)
    this.updateAwaitingTrial = this.updateAwaitingTrial.bind(this)
    this.updateAwaitingTrialExplanation = this.updateAwaitingTrialExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Date: this.props.Date,
      Description: this.props.Description,
      InvolvedViolence: this.props.InvolvedViolence,
      InvolvedFirearms: this.props.InvolvedFirearms,
      InvolvedSubstances: this.props.InvolvedSubstances,
      CourtName: this.props.CourtName,
      CourtAddress: this.props.CourtAddress,
      CourtCharge: this.props.CourtCharge,
      CourtOutcome: this.props.CourtOutcome,
      CourtDate: this.props.CourtDate,
      ChargeType: this.props.ChargeType,
      WasSentenced: this.props.WasSentenced,
      Sentence: this.props.Sentence,
      AwaitingTrial: this.props.AwaitingTrial,
      AwaitingTrialExplanation: this.props.AwaitingTrialExplanation,
      ...queue
    })
  }

  updateDate (values) {
    this.update({
      Date: values
    })
  }

  updateDescription (values) {
    this.update({
      Description: values
    })
  }

  updateInvolvedViolence (value, event) {
    this.update({
      InvolvedViolence: value
    })
  }

  updateInvolvedFirearms (value, event) {
    this.update({
      InvolvedFirearms: value
    })
  }

  updateInvolvedSubstances (value, event) {
    this.update({
      InvolvedSubstances: value
    })
  }

  updateCourtName (value) {
    this.update({
      CourtName: value
    })
  }

  updateCourtAddress (value) {
    this.update({
      CourtAddress: value
    })
  }

  updateChargeType (event) {
    this.update({
      ChargeType: event.target.value
    })
  }

  updateCourtCharge (value) {
    this.update({
      CourtCharge: value
    })
  }

  updateCourtOutcome (value) {
    this.update({
      CourtOutcome: value
    })
  }

  updateCourtDate (value) {
    this.update({
      CourtDate: value
    })
  }

  updateWasSentenced (value, event) {
    this.update({
      WasSentenced: value
    })
  }

  updateSentence (value, event) {
    this.update({
      Sentence: value
    })
  }

  updateAwaitingTrial (values) {
    this.update({
      AwaitingTrial: values
    })
  }

  updateAwaitingTrialExplanation (values) {
    this.update({
      AwaitingTrialExplanation: values
    })
  }

  render () {
    return (
      <div className="offense">
        <Field title={i18n.t('legal.police.heading.date')}
               help="legal.police.help.date"
               adjustFor="labels"
               shrink={true}>
          <DateControl name="Date"
                       {...this.props.Date}
                       className="offense-date"
                       onUpdate={this.updateDate}
                       onError={this.props.onError}
                       />
        </Field>

        <Field title={i18n.t('legal.police.heading.description')}
               help="legal.police.help.description">
          <Textarea name="Description"
                    {...this.props.Description}
                    className="offense-description"
                    onUpdate={this.updateDescription}
                    onError={this.props.onError}
                    />
        </Field>

        <h3>{i18n.t('legal.police.heading.involvement')}</h3>
        <Branch name="involved_violence"
                className="offense-violence"
                value={this.props.InvolvedViolence}
                onUpdate={this.updateInvolvedViolence}
                onError={this.props.onError}>
          {i18n.m('legal.police.label.violence')}
        </Branch>

        <Branch name="involved_firearms"
                className="offense-firearms"
                value={this.props.InvolvedFirearms}
                onUpdate={this.updateInvolvedFirearms}
                onError={this.props.onError}>
          {i18n.m('legal.police.label.firearms')}
        </Branch>

        <Branch name="involved_substances"
                className="offense-substances"
                value={this.props.InvolvedSubstances}
                onUpdate={this.updateInvolvedSubstances}
                onError={this.props.onError}>
          {i18n.m('legal.police.label.substances')}
        </Branch>

        <Field title={i18n.t('legal.police.heading.courtname')}
               adjustFor="labels">
          <Text name="CourtName"
                {...this.props.CourtName}
                label={i18n.t('legal.police.label.courtname')}
                className="offense-courtname"
                onUpdate={this.updateCourtName}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('legal.police.heading.courtaddress')}
               help="legal.police.help.courtaddress"
               adjustFor="address"
               shrink={true}>
          <Location name="CourtAddress"
                    {...this.props.CourtAddress}
                    label={i18n.t('legal.police.label.address')}
                    className="offense-courtaddress"
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateCourtAddress}
                    onError={this.props.onError}
                    />
        </Field>

        <h3>{i18n.t('legal.police.heading.chargedetails')}</h3>
        {i18n.m('legal.police.para.chargedetails')}

        <Field title={i18n.t('legal.police.heading.chargeType')}
               titleSize="h4"
               adjustFor="buttons">
          <RadioGroup className="offense-chargetype option-list"
                      selectedValue={this.props.ChargeType}>
            <Radio name="charge-felony"
                   className="charge-felony"
                   label={i18n.t('legal.police.label.felony')}
                   value="Felony"
                   onChange={this.updateChargeType}
                   onError={this.props.onError}
                   />
            <Radio name="charge-misdemeanor"
                   className="charge-misdemeanor"
                   label={i18n.t('legal.police.label.misdemeanor')}
                   value="Misdemeanor"
                   onChange={this.updateChargeType}
                   onError={this.props.onError}
                   />
            <Radio name="charge-other"
                   className="charge-other"
                   label={i18n.t('legal.police.label.other')}
                   value="Other"
                   onChange={this.updateChargeType}
                   onError={this.props.onError}
                   />
          </RadioGroup>

          <Text name="CourtCharge"
                {...this.props.CourtCharge}
                label={i18n.t('legal.police.label.courtcharge')}
                className="offense-courtcharge"
                onUpdate={this.updateCourtCharge}
                onError={this.props.onError}
                />
          <Text name="CourtOutcome"
                {...this.props.CourtOutcome}
                label={i18n.t('legal.police.label.courtoutcome')}
                className="offense-courtoutcome"
                onUpdate={this.updateCourtOutcome}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('legal.police.heading.courtdate')}
               titleSize="h4"
               help="legal.police.help.courtdate"
               adjustFor="labels"
               shrink={true}>
          <DateControl name="CourtDate"
                       {...this.props.CourtDate}
                       hideDay={true}
                       className="offense-courtdate"
                       onUpdate={this.updateCourtDate}
                       onError={this.props.onError}
                       />
        </Field>

        <h3>{i18n.t('legal.police.heading.otherOffenseSentenced')}</h3>
        <Branch name="was_sentenced"
                className="offense-sentenced"
                value={this.props.WasSentenced}
                onUpdate={this.updateWasSentenced}
                onError={this.props.onError}>
        </Branch>

        <Show when={this.props.WasSentenced === 'Yes'}>
          <div>
            <Field title={i18n.t('legal.police.heading.needmore')}
                   className="more title">
              <Svg src="/img/date-down-arrow.svg" className="more arrow" />
            </Field>
            <Sentence name="Sentence"
                      {...this.props.Sentence}
                      onError={this.props.onError}
                      onUpdate={this.updateSentence}
                      />
          </div>
        </Show>
        <Show when={this.props.WasSentenced === 'No'}>
          <div>
            <Branch name="awaiting_trial"
                    label={i18n.t('legal.police.heading.awaitingTrial')}
                    labelSize="h4"
                    className="awaiting-trial"
                    value={this.props.AwaitingTrial}
                    onError={this.props.onError}
                    onUpdate={this.updateAwaitingTrial}>
            </Branch>
            <Field title={i18n.t('legal.police.heading.awaitingTrialExplanation')}
                   titleSize="label"
                   adjustFor="labels">
              <Textarea className="awaiting-trial-explanation"
                        {...this.props.AwaitingTrialExplanation}
                        name="awaiting_trial_explanation"
                        onError={this.props.onError}
                        onUpdate={this.updateAwaitingTrialExplanation} />
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

OtherOffense.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
