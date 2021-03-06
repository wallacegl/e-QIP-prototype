import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { ForeignBusinessPoliticalValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, Field,
         Text, Textarea, Country, DateRange } from '../../../Form'

export default class Political extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignPolitical = this.updateHasForeignPolitical.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignPolitical: this.props.HasForeignPolitical,
      ...queue
    })
  }

  updateHasForeignPolitical (values) {
    this.update({
      HasForeignPolitical: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = item || {}
    const dates = DateSummary(obj.Dates)
    const pos = (obj.Position || {}).value || ''
    const country = (obj.Country || {}).value || ''
    const text = country.length ? `${pos} (${country})` : pos

    return Summary({
      type: i18n.t('foreign.business.political.collection.summary.item'),
      index: index,
      left: text,
      right: dates,
      placeholder: i18n.m('foreign.business.political.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-political">
        <Branch name="has_foreign_political"
                label={i18n.t('foreign.business.political.heading.title')}
                labelSize="h3"
                value={this.props.HasForeignPolitical}
                warning={true}
                onUpdate={this.updateHasForeignPolitical}
                onError={this.handleError}>
        </Branch>

        <Show when={this.props.HasForeignPolitical === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.business.political.collection.summary.title')}
                     appendTitle={i18n.t('foreign.business.political.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.business.political.collection.append')}>
            <Field title={i18n.t('foreign.business.political.heading.position')}
                   adjustFor="text">
              <Text name="Position"
                    className="foreign-business-political-position"
                    bind={true}
                    />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.dates')}
                   help="foreign.business.political.help.dates"
                   adjustFor="daterange">
              <DateRange name="Dates"
                         className="foreign-business-political-dates"
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.country')}
                   adjustFor="country">
              <Country name="Country"
                       className="foreign-business-political-country"
                       bind={true}
                       />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.reason')}
                   adjustFor="textarea">
              <Textarea name="Reason"
                        className="foreign-business-political-reason"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('foreign.business.political.heading.eligibility')}
                   adjustFor="text">
              <Text name="Eligibility"
                    className="foreign-business-political-eligibility"
                    bind={true}
                    />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Political.defaultProps = {
  name: 'Political',
  HasForeignPolitical: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/political',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBusinessPoliticalValidator(state, props).isValid()
  },
  defaultState: true
}
