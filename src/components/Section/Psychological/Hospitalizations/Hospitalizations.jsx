import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { HospitalizationsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Hospitalization from './Hospitalization'

export default class Hospitalizations extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHospitalized = this.updateHospitalized.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      Hospitalized: this.props.Hospitalized,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHospitalized (values) {
    this.update({
      Hospitalized: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).Hospitalization || {}
    const treatmentDate = (o.TreatmentDate || {})
    const date = DateSummary(treatmentDate)
    const facility = (o.Facility || {}).value || ''
    const type = i18n.t('psychological.hospitalization.collection.itemType')

    return Summary({
      type: i18n.t('psychological.hospitalization.collection.itemType'),
      index: index,
      left: facility,
      right: date,
      placeholder: i18n.m('psychological.hospitalization.collection.summary')
    })
  }

  render () {
    return (
      <div className="hospitalizations">
        <h2>{i18n.t('psychological.heading.hospitalization')}</h2>
        <Branch name="hospitalized"
                value={this.props.Hospitalized}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateHospitalized}>
        </Branch>

        <Show when={this.props.Hospitalized === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('psychological.hospitalization.collection.description')}
                     appendTitle={i18n.t('psychological.hospitalization.collection.appendTitle')}
                     appendLabel={i18n.t('psychological.hospitalization.collection.appendLabel')}>
            <Hospitalization name="Hospitalization"
                             ApplicantBirthDate={this.props.ApplicantBirthDate}
                             bind={true}
                             />
          </Accordion>

        </Show>
      </div>
    )
  }
}

Hospitalizations.defaultProps = {
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'hospitalizations',
  dispatch: () => {},
  validator: (state, props) => {
    return new HospitalizationsValidator(props, props).isValid()
  }
}
