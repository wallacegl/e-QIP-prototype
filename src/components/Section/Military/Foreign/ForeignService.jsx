import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Branch, Show, Accordion, RadioGroup, Radio, DateRange, Text, Textarea, Field, Country } from '../../../Form'
import ForeignContact from './ForeignContact'
import { Summary, DateSummary, NameSummary } from '../../../Summary'

export default class ForeignService extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateOrganization = this.updateOrganization.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateCountry = this.updateCountry.bind(this)
    this.updateRank = this.updateRank.bind(this)
    this.updateDivision = this.updateDivision.bind(this)
    this.updateCircumstances = this.updateCircumstances.bind(this)
    this.updateReasonLeft = this.updateReasonLeft.bind(this)
    this.updateMaintainsContact = this.updateMaintainsContact.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Organization: this.props.Organization,
      Name: this.props.Name,
      Dates: this.props.Dates,
      Country: this.props.Country,
      Rank: this.props.Rank,
      Division: this.props.Division,
      Circumstances: this.props.Circumstances,
      ReasonLeft: this.props.ReasonLeft,
      MaintainsContact: this.props.MaintainsContact,
      List: this.props.List,
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateOrganization (event) {
    this.update({
      Organization: event.target.value
    })
  }

  updateName (value) {
    this.update({
      Name: value
    })
  }

  updateDates (value) {
    this.update({
      Dates: value
    })
  }

  updateCountry (value) {
    this.update({
      Country: value
    })
  }

  updateRank (value) {
    this.update({
      Rank: value
    })
  }

  updateDivision (value) {
    this.update({
      Division: value
    })
  }

  updateCircumstances (value) {
    this.update({
      Circumstances: value
    })
  }

  updateReasonLeft (value) {
    this.update({
      ReasonLeft: value
    })
  }

  updateMaintainsContact (value, event) {
    // If there is no history clear out any previously entered data
    this.update({
      MaintainsContact: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary (item, index) {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Dates)
    const name = NameSummary(itemProperties.Name)

    return Summary({
      type: i18n.t('military.foreign.collection.contacts.summary.item'),
      index: index,
      left: name,
      right: dates,
      placeholder: i18n.m('military.foreign.collection.contacts.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-service">
        <Field title={i18n.t('military.foreign.heading.organization')}
               adjustFor="big-buttons"
               shrink={true}>
          <RadioGroup className="organization option-list"
                      selectedValue={this.props.Organization}>
            <Radio name="organization-military"
                   className="organization-military"
                   label={i18n.m('military.foreign.label.organization.military')}
                   value="Military"
                   onChange={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-intelligence"
                   className="organization-intelligence"
                   label={i18n.m('military.foreign.label.organization.intelligence')}
                   value="Intelligence"
                   onChange={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-diplomatic"
                   className="organization-diplomatic"
                   label={i18n.m('military.foreign.label.organization.diplomatic')}
                   value="Diplomatic"
                   onChange={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-security"
                   className="organization-security"
                   label={i18n.m('military.foreign.label.organization.security')}
                   value="Security"
                   onChange={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-militia"
                   className="organization-militia"
                   label={i18n.m('military.foreign.label.organization.militia')}
                   value="Militia"
                   onChange={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-defense"
                   className="organization-defense"
                   label={i18n.m('military.foreign.label.organization.defense')}
                   value="Defense"
                   onChange={this.updateOrganization}
                   onError={this.props.onError}
                   />
            <Radio name="organization-other"
                   className="organization-other"
                   label={i18n.m('military.foreign.label.organization.other')}
                   value="Other"
                   onChange={this.updateOrganization}
                   onError={this.props.onError}
                   />
          </RadioGroup>
        </Field>

        <Field title={i18n.t('military.foreign.heading.name')}>
          <Text name="Name"
                {...this.props.Name}
                className="foreign-service-name"
                maxlength="100"
                onUpdate={this.updateName}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.dates')}
               help="military.foreign.help.dates"
               adjustFor="daterange"
               shrink={true}>
          <DateRange name="Dates"
                     className="foreign-service-dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('military.foreign.heading.country')}
               adjustFor="country">
          <Country name="Country"
                   {...this.props.Country}
                   className="foreign-service-country"
                   maxlength="100"
                   onUpdate={this.updateCountry}
                   onError={this.props.onError}
                   />
        </Field>

        <Field title={i18n.t('military.foreign.heading.rank')}>
          <Text name="Rank"
                {...this.props.Rank}
                className="foreign-service-rank"
                maxlength="100"
                onUpdate={this.updateRank}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.division')}>
          <Text name="Division"
                {...this.props.Division}
                className="foreign-service-division"
                maxlength="100"
                onUpdate={this.updateDivision}
                onError={this.props.onError}
                />
        </Field>

        <Field title={i18n.t('military.foreign.heading.circumstances')}>
          <Textarea name="Circumstances"
                    {...this.props.Circumstances}
                    className="foreign-service-circumstances"
                    maxlength="100"
                    onUpdate={this.updateCircumstances}
                    onError={this.props.onError}
                    />
        </Field>

        <Field title={i18n.t('military.foreign.heading.left')}>
          <Textarea name="ReasonLeft"
                    {...this.props.ReasonLeft}
                    className="foreign-service-left"
                    maxlength="100"
                    onUpdate={this.updateReasonLeft}
                    onError={this.props.onError}
                    />
        </Field>

        <h3>{i18n.t('military.foreign.heading.maintainscontact')}</h3>
        <Branch name="has_maintainscontact"
                className="maintainscontact"
                value={this.props.MaintainsContact}
                help="military.foreign.help.maintainscontact"
                onUpdate={this.updateMaintainsContact}
                onError={this.props.onError}>
        </Branch>

        <Show when={this.props.MaintainsContact === 'Yes'}>
          <div>
            <h2>{i18n.t('military.foreign.heading.contact.details')}</h2>
            {i18n.m('military.foreign.para.contact')}
            <Accordion className="foreign-contacts-collection"
                       items={this.props.List}
                       defaultState={this.props.defaultState}
                       branch={this.props.ListBranch}
                       onUpdate={this.updateList}
                       onError={this.props.onError}
                       summary={this.summary}
                       description={i18n.t('military.foreign.collection.contacts.summary.title')}
                       appendTitle={i18n.t('military.foreign.collection.contacts.appendTitle')}
                       appendLabel={i18n.t('military.foreign.collection.contacts.append')}>
              <ForeignContact name="Item"
                              bind={true}
                              />
            </Accordion>
          </div>
        </Show>
      </div>
    )
  }
}

ForeignService.defaultProps = {
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  defaultState: true
}
