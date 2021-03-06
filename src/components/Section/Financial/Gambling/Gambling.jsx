import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { GamblingValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion, DateRange, Currency, Textarea, Field } from '../../../Form'

export default class Gambling extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      List: props.List,
      ListBranch: props.ListBranch,
      HasGamblingDebt: props.HasGamblingDebt
    }

    this.myDispatch = this.myDispatch.bind(this)
    this.summary = this.summary.bind(this)
  }

  /**
   * Updates triggered by the branching component.
   */
  onUpdate (val, event) {
    this.setState({ HasGamblingDebt: val }, () => {
      this.myDispatch({
        items: val === 'Yes' ? this.state.List : [],
        branch: ''
      })
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  myDispatch (values) {
    this.setState({ List: values.items, ListBranch: values.branch }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          List: this.state.List,
          ListBranch: this.state.ListBranch,
          HasGamblingDebt: this.state.HasGamblingDebt
        })
      }
    })
  }

  /**
   * Takes a value such as "1000" and converts it to "1,000".
   */
  fancyNumber (value) {
    const n = new window.Number(value)
    return n.toLocaleString()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const dates = DateSummary(item.Dates)
    const losses = item.Losses && item.Losses.value
        ? `$${this.fancyNumber(item.Losses.value)}`
        : ''

    return Summary({
      type: i18n.t('financial.gambling.collection.summary.debt'),
      index: index,
      left: losses,
      right: dates,
      placeholder: i18n.m('financial.gambling.collection.summary.unknownlosses')
    })
  }

  render () {
    return (
      <div className="gambling">
        <Branch name="has_gamblingdebt"
                className="has-gambling-debt"
                value={this.state.HasGamblingDebt}
                warning={true}
                onUpdate={this.onUpdate.bind(this)}
                onError={this.handleError}>
        </Branch>
        <Show when={this.state.HasGamblingDebt === 'Yes'}>
          <Accordion items={this.state.List}
                     defaultState={this.props.defaultState}
                     branch={this.state.ListBranch}
                     onUpdate={this.myDispatch}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('financial.gambling.collection.summary.title')}
                     appendLabel={i18n.t('financial.gambling.collection.append')}
                     appendTitle={i18n.t('financial.gambling.collection.appendTitle')}>
            <Field title={i18n.t('financial.gambling.heading.dates')}
                   adjustFor="daterange">
              <DateRange name="Dates"
                         label={i18n.t('financial.gambling.label.dates')}
                         bind={true}
                         />
            </Field>

            <Field title={i18n.t('financial.gambling.heading.losses')}>
              <Currency name="Losses"
                        className="losses"
                        placeholder={i18n.t('financial.gambling.placeholder.losses')}
                        min="1"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.gambling.heading.description')}
                   help="financial.gambling.help.description">
              <Textarea name="Description"
                        className="description"
                        bind={true}
                        />
            </Field>

            <Field title={i18n.t('financial.gambling.heading.actions')}
                   help="financial.gambling.help.actions">
              <Textarea name="Actions"
                        className="actions"
                        bind={true}
                        />
            </Field>
          </Accordion>
        </Show>
      </div>
    )
  }
}

Gambling.defaultProps = {
  List: [],
  ListBranch: '',
  HasGamblingDebt: '',
  onError: (value, arr) => { return arr },
  section: 'financial',
  subsection: 'gambling',
  dispatch: () => {},
  validator: (state, props) => {
    return new GamblingValidator(state, props).isValid()
  },
  defaultState: true
}
