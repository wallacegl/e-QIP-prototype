import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { ForeignTravelValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import TravelQuestions from './TravelQuestions'

export default class Travel extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignTravelOutside = this.updateHasForeignTravelOutside.bind(this)
    this.updateHasForeignTravelOfficial = this.updateHasForeignTravelOfficial.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      HasForeignTravelOutside: this.props.HasForeignTravelOutside,
      HasForeignTravelOfficial: this.props.HasForeignTravelOfficial,
      ...queue
    })
  }

  updateHasForeignTravelOutside (values) {
    this.update({
      HasForeignTravelOutside: values
    })
  }

  updateHasForeignTravelOfficial (values) {
    this.update({
      HasForeignTravelOfficial: values
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const date = DateSummary(obj.Dates)
    const country = (obj.Country || {}).value || ''

    return Summary({
      type: i18n.t('foreign.travel.collection.summary.item'),
      index: index,
      left: country,
      right: date,
      placeholder: i18n.m('foreign.travel.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-travel">
        <Branch label={i18n.t('foreign.travel.heading.outside')}
                labelSize="h3"
                name="has_foreign_travel_outside"
                className="foreign-travel-outside"
                value={this.props.HasForeignTravelOutside}
                warning={true}
                onUpdate={this.updateHasForeignTravelOutside}
                onError={this.handleError}>
        </Branch>

        <Branch label={i18n.t('foreign.travel.heading.official')}
                labelSize="h3"
                name="has_foreign_travel_official"
                className="foreign-travel-official"
                help="foreign.travel.help.official"
                value={this.props.HasForeignTravelOfficial}
                onUpdate={this.updateHasForeignTravelOfficial}
                onError={this.handleError}>
          {i18n.m('foreign.travel.para.personal')}
        </Branch>

        <Show when={this.props.HasForeignTravelOutside === 'Yes' && this.props.HasForeignTravelOfficial === 'No'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.travel.collection.summary.title')}
                     appendTitle={i18n.t('foreign.travel.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.travel.collection.append')}>
            <TravelQuestions name="Item" bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Travel.defaultProps = {
  name: 'Travel',
  HasForeignTravelOutside: '',
  HasForeignTravelOfficial: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'travel',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignTravelValidator(state, props).isValid()
  },
  defaultState: true
}
