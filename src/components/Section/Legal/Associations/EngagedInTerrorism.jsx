import React from 'react'
import { i18n } from '../../../../config'
import SubsectionElement from '../../SubsectionElement'
import { LegalAssociationsEngagedValidator } from '../../../../validators'
import { Summary, DateSummary } from '../../../Summary'
import { Accordion, Branch, Show, Field, DateRange, Textarea } from '../../../Form'

export default class EngagedInTerrorism extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasEngaged: this.props.HasEngaged,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateBranch (values) {
    this.update({
      HasEngaged: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = item || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.engaged.collection.item'),
      index: index,
      left: details,
      right: dates,
      placeholder: i18n.m('legal.associations.engaged.collection.unknown')
    })
  }

  render () {
    return (
      <div className="legal-associations-engaged">
        <Branch name="has_engaged"
                label={i18n.t('legal.associations.engaged.heading.title')}
                labelSize="h3"
                className="legal-associations-engaged-has-engaged"
                value={this.props.HasEngaged}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateBranch}>
        </Branch>

        <Show when={this.props.HasEngaged === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('legal.associations.engaged.collection.description')}
                     appendTitle={i18n.t('legal.associations.engaged.collection.appendTitle')}
                     appendLabel={i18n.t('legal.associations.engaged.collection.appendLabel')}>
            <Field title={i18n.t('legal.associations.engaged.heading.reasons')}
                   help="legal.associations.engaged.help.reasons"
                   adjustFor="textarea">
              <Textarea name="Reasons"
                        className="legal-associations-engaged-reasons"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('legal.associations.engaged.heading.dates')}
                   help="legal.associations.engaged.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="legal-associations-engaged-dates"
                         bind={true}
                         />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

EngagedInTerrorism.defaultProps = {
  name: 'engaged',
  HasEngaged: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'legal',
  subsection: 'associations/engaged-in-terrorism',
  dispatch: () => {},
  validator: (state, props) => {
    return new LegalAssociationsEngagedValidator(state, props).isValid()
  }
}
