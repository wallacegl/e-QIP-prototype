import React from 'react'
import { i18n } from '../../../../config'
import { Name, DateRange, Field, NotApplicable, Telephone, Email,
         Text, Location, Show, CheckboxGroup, Checkbox, Svg } from '../../../Form'

export default class Person extends React.Component {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDates = this.updateDates.bind(this)
    this.updateRank = this.updateRank.bind(this)
    this.updateRankNotApplicable = this.updateRankNotApplicable.bind(this)
    this.updateRelationship = this.updateRelationship.bind(this)
    this.updateRelationshipOther = this.updateRelationshipOther.bind(this)
    this.updateMobileTelephone = this.updateMobileTelephone.bind(this)
    this.updateOtherTelephone = this.updateOtherTelephone.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updateEmailNotApplicable = this.updateEmailNotApplicable.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Name: this.props.Name,
      Dates: this.props.Dates,
      Rank: this.props.Rank,
      RankNotApplicable: this.props.RankNotApplicable,
      Relationship: this.props.Relationship,
      RelationshipOther: this.props.RelationshipOther,
      MobileTelephone: this.props.MobileTelephone,
      OtherTelephone: this.props.OtherTelephone,
      Email: this.props.Email,
      EmailNotApplicable: this.props.EmailNotApplicable,
      Address: this.props.Address,
      ...queue
    })
  }

  updateName (values) {
    this.update({
      Name: values
    })
  }

  updateDates (values) {
    this.update({
      Dates: values
    })
  }

  updateRank (values) {
    this.update({
      Rank: values
    })
  }

  updateRankNotApplicable (values) {
    this.update({
      RankNotApplicable: values
    })
  }

  updateRelationship (event) {
    let relations = event.target.value
    let selected = [...this.props.Relationship]

    if (selected.includes(relations)) {
      // Remove the relationship if it was previously selected
      selected.splice(selected.indexOf(relations), 1)
    } else {
      // Add the new relationship
      selected.push(relations)
    }

    this.update({
      Relationship: selected
    })
  }

  updateRelationshipOther (values) {
    this.update({
      RelationshipOther: values
    })
  }

  updateMobileTelephone (values) {
    this.update({
      MobileTelephone: values
    })
  }

  updateOtherTelephone (values) {
    this.update({
      OtherTelephone: values
    })
  }

  updateEmail (values) {
    this.update({
      Email: values
    })
  }

  updateEmailNotApplicable (values) {
    this.update({
      EmailNotApplicable: values
    })
  }

  updateAddress (values) {
    this.update({
      Address: values
    })
  }

  render () {
    return (
      <div className="person">
        <Field title={i18n.t('relationships.people.person.heading.knownDates')}
               help="relationships.people.person.help.knownDates"
               adjustFor="daterange">
          <DateRange name="Dates"
                     className="known-dates"
                     {...this.props.Dates}
                     onUpdate={this.updateDates}
                     onError={this.props.onError}
                     />
        </Field>

        <h3>{i18n.t('relationships.people.person.heading.name')}</h3>
        <Name name="Name"
              className="name"
              {...this.props.Name}
              onUpdate={this.updateName}
              onError={this.props.onError}
              />

        <Field title={i18n.t('relationships.people.person.heading.rank')}
               >
          <NotApplicable name="RankNotApplicable"
                         className="rank-notapplicable"
                         {...this.props.RankNotApplicable}
                         label={i18n.t('relationships.people.person.label.rankNotApplicable')}
                         or={i18n.m('relationships.people.person.label.or')}
                         onError={this.props.onError}
                         onUpdate={this.updateRankNotApplicable}>
            <Text name="Rank"
                  className="rank"
                  {...this.props.Rank}
                  onUpdate={this.updateRank}
                  onError={this.props.onError}
                  />
          </NotApplicable>
        </Field>

        <Field title={i18n.t(`relationships.people.person.heading.relationship`)}
               className="relationships"
               adjustFor="labels">
          <label>{i18n.t(`relationships.people.person.label.relationship.title`)}</label>
          <CheckboxGroup className="relationship option-list eapp-extend-labels"
                         selectedValues={this.props.Relationship}>
            <Checkbox name="relationship-neighbor"
                      label={i18n.t(`relationships.people.person.label.relationship.neighbor`)}
                      value="Neighbor"
                      onError={this.props.onError}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon neighbor">
                <Svg src="/img/neighbor-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-friend"
                      label={i18n.t(`relationships.people.person.label.relationship.friend`)}
                      value="Friend"
                      onError={this.props.onError}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon friend">
                <Svg src="/img/friend-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-landlord"
                      label={i18n.t(`relationships.people.person.label.relationship.landlord`)}
                      value="Landlord"
                      onError={this.props.onError}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon landlord">
                <Svg src="/img/landlord-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-business"
                      label={i18n.t(`relationships.people.person.label.relationship.business`)}
                      value="Business"
                      onError={this.props.onError}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon business">
                <Svg src="/img/business-associate-icon.svg" />
              </div>
            </Checkbox>
            <Checkbox name="relationship-other"
                      label={i18n.t(`relationships.people.person.label.relationship.other`)}
                      value="Other"
                      onError={this.props.onError}
                      onChange={this.updateRelationship}>
              <div className="relationship-icon other">
                <Svg src="/img/other-icon.svg" />
              </div>
            </Checkbox>
          </CheckboxGroup>

          <Show when={this.props.Relationship.includes('Other')}>
            <Text name="RelationshipOther"
                  label={i18n.t(`relationships.people.person.label.relationship.explanation`)}
                  maxlength="100"
                  className="relationship-other"
                  {...this.props.RelationshipOther}
                  onUpdate={this.updateRelationshipOther}
                  onError={this.props.onError}
                  />
          </Show>
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.mobileTelephone')}
               className="mobile-telephone"
               adjustFor="telephone">
          <Telephone name="MobileTelephone"
                     {...this.props.MobileTelephone}
                     onUpdate={this.updateMobileTelephone}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.otherTelephone')}
               className="other-telephone"
               adjustFor="telephone">
          <Telephone name="OtherTelephone"
                     {...this.props.OtherTelephone}
                     onUpdate={this.updateOtherTelephone}
                     onError={this.props.onError}
                     />
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.email')}
               >
          <NotApplicable name="EmailNotApplicable"
                         className="email-notapplicable"
                         {...this.props.EmailNotApplicable}
                         label={i18n.t('relationships.people.person.label.emailNotApplicable')}
                         or={i18n.m('relationships.people.person.label.or')}
                         onError={this.props.onError}
                         onUpdate={this.updateEmailNotApplicable}>
            <Email name="Email"
                   className="email"
                   {...this.props.Email}
                   onUpdate={this.updateEmail}
                   onError={this.props.onError}
                   />
          </NotApplicable>
        </Field>

        <Field title={i18n.t('relationships.people.person.heading.address')}
               adjustFor="address"
               >
          <Location name="Address"
                    label={i18n.t('relationships.people.person.label.address')}
                    className="address"
                    {...this.props.Address}
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateAddress}
                    onError={this.props.onError}
                    />
        </Field>
      </div>
    )
  }
}

Person.defaultProps = {
  Relationship: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr }
}
