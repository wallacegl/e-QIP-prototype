import React from 'react'
import { i18n } from '../../../../config'
import { HospitalizationValidator } from '../../../../validators'
import { Location, ValidationElement, Field, Text, Textarea, DateRange, RadioGroup, Radio, Show } from '../../../Form'

export default class Hospitalization extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateAdmission = this.updateAdmission.bind(this)
    this.updateTreatmentDate = this.updateTreatmentDate.bind(this)
    this.updateFacility = this.updateFacility.bind(this)
    this.updateFacilityAddress = this.updateFacilityAddress.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Admission: this.props.Admission,
      TreatmentDate: this.props.TreatmentDate,
      Facility: this.props.Facility,
      FacilityAddress: this.props.FacilityAddress,
      Explanation: this.props.Explanation,
      ...queue
    })
  }

  updateTreatmentDate (values) {
    this.update({
      TreatmentDate: values
    })
  }

  updateAdmission (values) {
    this.update({
      Admission: values.value
    })
  }

  updateFacility (values) {
    this.update({
      Facility: values
    })
  }

  updateFacilityAddress (values) {
    this.update({
      FacilityAddress: values
    })
  }

  updateExplanation (values) {
    this.update({
      Explanation: values
    })
  }

  render () {
    return (
      <div className="hospitalization">
        <Field title={i18n.t(`psychological.hospitalization.heading.admission`)}
               adjustFor="big-buttons">
          <RadioGroup className="admission" name="admission" selectedValue={this.props.Admission}>
            <Radio
              className="voluntary-option"
              value="Voluntary"
              onError={this.props.onError}
              onUpdate={this.updateAdmission}>
              <div className="voluntary">
                {i18n.t('psychological.hospitalization.label.voluntaryAdmission')}
              </div>
            </Radio>
            <Radio
              className="involuntary-option"
              value="Involuntary"
              onError={this.props.onError}
              onUpdate={this.updateAdmission}>
              <div className="involuntary">
                {i18n.t('psychological.hospitalization.label.involuntaryAdmission')}
              </div>
            </Radio>
          </RadioGroup>
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.explanation`)}>
          <Textarea name="Explanation"
                    className="explanation"
                    {...this.props.Explanation}
                    onUpdate={this.updateExplanation}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.treatment`)}
               help="psychological.hospitalization.help.treatment"
               adjustFor="daterange">
          <DateRange name="TreatmentDate"
                     {...this.props.TreatmentDate}
                     receiveProps={this.props.receiveProps}
                     onUpdate={this.updateTreatmentDate}
                     onError={this.props.onError}
                     minDate={this.props.ApplicantBirthDate}
                     prefix="hospitalization"
                     />
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.facility`)}
               help="psychological.hospitalization.help.facility">
          <Text name="Facility"
                className="facility"
                {...this.props.Facility}
                onUpdate={this.updateFacility}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t(`psychological.hospitalization.heading.address`)}
               help="psychological.hospitalization.help.address"
               adjustFor="address">
          <Location name="FacilityAddress"
                    {...this.props.FacilityAddress}
                    label={i18n.t(`psychological.hospitalization.label.address`)}
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateFacilityAddress}
                    onError={this.props.onError}
                    />
        </Field>
      </div>
    )
  }
}

Hospitalization.defaultProps = {
  Admission: { value: null },
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
