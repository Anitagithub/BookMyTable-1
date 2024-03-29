import React, { Component } from "react";
import FormInput from "./subComponents/formInput";
import "../components/css/restaurantRegistration.css";
import FormCheckbox from "./subComponents/formCheckbox";
import RegistrationSubForm from "./subComponents/registrationSubForm";
import RAdditionForm from "./subComponents/rAdditionForm";
class RestaurantRegistration extends Component {
  state = {
    data: {
      no_of_slots: "0",
      slots: [],
      average_cost_for_two: "",
      cuisines: [],
      establishment: [],
      features: [],
      location: {
        address: {
          line_1: "",
          line_2: ""
        },
        locality: "",
        city: "",
        locality_verbose: "",
        zipcode: ""
      },
      name: "",
      phone: {
        std: "",
        number: ""
      },
      tables: {
        size_eight: "",
        size_four: "",
        size_one: "",
        size_six: "",
        size_ten: "",
        size_two: ""
      },

      thumb: "",
      timings: "",
      opening_status: "",
      email: "",
      website: "",
      days: {
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
      }
    },
    errors: {},
    establishmentForm: "",
    cuisineForm: "",
    featureForm: "",
    noOfSlots: "",
    slotForm: {
      id: "",
      start: "",
      end: ""
    }
  };

  handleDeleteSlot = ({ currentTarget: btn }) => {
    let { data } = this.state;
    for (let i = 0; i < data.slots.length; i++) {
      if (data.slots[i].id === btn.id) {
        data.slots.splice(i, 1);
        break;
      }
    }
    this.setState({ data });
  };

  handleSlotFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    let newId = parseInt(this.state.data.no_of_slots) + 1;
    let newSlot = { ...this.state.slotForm };
    // console.log(" newID", newId);
    // console.log("sting newID", newId.toString());
    newSlot.id = newId.toString();
    let { data, slotForm } = this.state;
    // console.log(data);
    data.slots.push(newSlot);
    data.no_of_slots = newId;
    this.setState({ data });
    slotForm.id = "";
    slotForm.start = "";
    slotForm.end = "";
    this.setState({ slotForm });
    console.log(this.state);
    console.log("Slots Form submit");
  };

  handleSlotFormInputChange = ({ currentTarget: input }) => {
    // console.log("InputChange slot", input.name, input.value);
    let { slotForm } = this.state;
    slotForm[input.name] = input.value;
    this.setState({ slotForm });
    // console.log(this.state);
  };

  // THIS IS COMMING FROM THE ADDN FORM DELETE BUTTON
  handleDeleteOption = ({ currentTarget: btn }) => {
    let { data } = this.state;
    for (let i = 0; i < data[btn.dataset.datakey].length; i++) {
      if (data[btn.dataset.datakey][i] === btn.value) {
        data[btn.dataset.datakey].splice(i, 1);
        break;
      }
    }
    this.setState({ data });
  };

  // THIS IS COMMING FROM THE FORM ON SUBMIT ATTR
  handleAdditionFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    const { datakey } = target.dataset;
    let data = this.state.data;
    let newValue = this.state[target.name];
    if (!newValue) return;
    data[datakey].push(newValue);
    this.setState({ data });
    this.setState({ [target.name]: "" });
  };

  // THIS IS COMING FROM INPUT ON CHANGE ATTR
  handleAdditionFormInputChange = ({ currentTarget: input }) => {
    this.setState({ [input.name]: input.value });
  };

  handleInputChange = ({ currentTarget: input }) => {
    console.log(
      input.name,
      input.value,
      input.dataset.parent,
      input.dataset.gparent
    );
    let data = { ...this.state.data };
    if (input.dataset.gparent) {
      data[input.dataset.gparent][input.dataset.parent][input.name] =
        input.value;
    } else if (input.dataset.parent) {
      data[input.dataset.parent][input.name] = input.value;
    } else {
      data[input.name] = input.value;
    }
    this.setState({ data });
  };

  handleCheckboxChange = ({ currentTarget: checkbox }) => {
    console.log(
      "name " + checkbox.name,
      "\nch " + checkbox.checked,
      "\npa " + checkbox.dataset.parent,
      "\nga " + checkbox.dataset.gparent
    );
    let data = { ...this.state.data };
    if (checkbox.dataset.gparent) {
      data[checkbox.dataset.gparent][checkbox.dataset.parent][checkbox.name] =
        checkbox.checked;
    } else if (checkbox.dataset.parent) {
      data[checkbox.dataset.parent][checkbox.name] = checkbox.checked;
    } else {
      data[checkbox.name] = checkbox.checked;
    }
    this.setState({ data });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("submit form for registration", this.state.data);
  };

  render() {
    const renderBasicInfoForm = () => {
      return (
        <RegistrationSubForm title="Basic Information" xClass=" ">
          <FormInput
            label="NAME"
            value={this.state.data.name}
            onChange={this.handleInputChange}
            name="name"
            placeholder="Enter Restaurant's Name"
          />
          <FormInput
            label="CITY"
            value={this.state.data.location.city}
            name="city"
            data-parent="location"
            onChange={this.handleInputChange}
            placeholder="Enter Location City"
          />
          <div className="row">
            <div className="col-3">
              <FormInput
                label="STD"
                value={this.state.data.phone.std}
                onChange={this.handleInputChange}
                name="std"
                data-parent="phone"
                type="number"
                placeholder="Area Code..."
              />
            </div>
            <div className="col">
              <FormInput
                label="PHONE"
                value={this.state.data.phone.number}
                onChange={this.handleInputChange}
                name="number"
                data-parent="phone"
                placeholder="Phone"
                type="number"
              />
            </div>
          </div>
          <FormInput
            label="OPENING STATUS"
            value={this.state.data.opening_status}
            onChange={this.handleInputChange}
            name="opening_status"
            placeholder="Exisiting / Opening Soon"
          />
        </RegistrationSubForm>
      );
    };

    const renderLocationForm = () => {
      return (
        <RegistrationSubForm title="Location" xClass=" ">
          <FormInput
            label="ADDRESS LINE 1"
            value={this.state.data.location.address.line_1}
            onChange={this.handleInputChange}
            name="line_1"
            data-parent="address"
            data-gparent="location"
          />
          <FormInput
            label="ADDRESS LINE 2"
            value={this.state.data.location.address.line_2}
            onChange={this.handleInputChange}
            name="line_2"
            data-parent="address"
            data-gparent="location"
          />

          <div className="row">
            <div className="col-4">
              <FormInput
                label="LOCALITY"
                value={this.state.data.location.locality}
                onChange={this.handleInputChange}
                name="locality"
                data-parent="location"
              />
            </div>
            <div className="col">
              <FormInput
                label="LOCALITY IN DETAIL"
                value={this.state.data.location.locality_verbose}
                onChange={this.handleInputChange}
                name="locality_verbose"
                data-parent="location"
              />
            </div>
            <div className="col-2">
              <FormInput
                label="ZIPCODE"
                value={this.state.data.location.zipcode}
                onChange={this.handleInputChange}
                name="zipcode"
                data-parent="location"
                type="number"
              />
            </div>
          </div>

          <RAdditionForm
            onSubmit={this.handleAdditionFormSubmit}
            datakey="establishment"
            formname="establishmentForm"
            inputname="establishmentForm"
            label="ESTABLISHMENT TYPE"
            placeholder="Bar / Pub / Family Restaurant"
            value={this.state.establishmentForm}
            onChange={this.handleAdditionFormInputChange}
            displayItems={this.state.data.establishment}
            onDelete={this.handleDeleteOption}
          />
        </RegistrationSubForm>
      );
    };

    const renderCharacteristicForm = () => {
      return (
        <RegistrationSubForm title="Characteristics" xClass=" ">
          <div className="row">
            <div className="col-4">
              <FormInput
                label="COST FOR TWO"
                value={this.state.data.average_cost_for_two}
                onChange={this.handleInputChange}
                name="average_cost_for_two"
                type="number"
              />
            </div>
            <div className="col" />
          </div>

          <RAdditionForm
            onSubmit={this.handleAdditionFormSubmit}
            datakey="cuisines"
            formname="cuisineForm"
            inputname="cuisineForm"
            label="CUISINES AVAILABLE"
            placeholder="North Indian / Thai / Chinese"
            value={this.state.cuisineForm}
            onChange={this.handleAdditionFormInputChange}
            displayItems={this.state.data.cuisines}
            onDelete={this.handleDeleteOption}
          />

          <RAdditionForm
            label="FEATURES AVAILABLE"
            placeholder="CASH / CARD / AC"
            datakey="features"
            formname="featureForm"
            inputname="featureForm"
            value={this.state.featureForm}
            displayItems={this.state.data.features}
            onSubmit={this.handleAdditionFormSubmit}
            onChange={this.handleAdditionFormInputChange}
            onDelete={this.handleDeleteOption}
          />
        </RegistrationSubForm>
      );
    };

    const renderCapacityForm = () => {
      return (
        <RegistrationSubForm title="Capacity" xClass="capacity">
          <small
            className="text text-muted"
            style={{ textTransform: "captialize !important" }}
          >
            FULL HOUSE
          </small>
          <div className="row">
            <div className="col-6">
              <table>
                <tbody>
                  <tr>
                    <td className="header">1</td>
                    <td className="data">
                      <FormInput
                        value={this.state.data.tables.size_one}
                        onChange={this.handleInputChange}
                        name="size_one"
                        data-parent="tables"
                        type="number"
                        min="0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="header">2</td>
                    <td className="data">
                      <FormInput
                        value={this.state.data.tables.size_two}
                        onChange={this.handleInputChange}
                        name="size_two"
                        data-parent="tables"
                        type="number"
                        min="0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="header">4</td>
                    <td className="data">
                      <FormInput
                        value={this.state.data.tables.size_four}
                        onChange={this.handleInputChange}
                        name="size_four"
                        data-parent="tables"
                        type="number"
                        min="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6">
              <table>
                <tbody>
                  <tr>
                    <td className="header">6</td>
                    <td className="data">
                      <FormInput
                        value={this.state.data.tables.size_six}
                        onChange={this.handleInputChange}
                        name="size_six"
                        data-parent="tables"
                        type="number"
                        min="0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="header">10</td>
                    <td className="data">
                      <FormInput
                        value={this.state.data.tables.size_ten}
                        onChange={this.handleInputChange}
                        name="size_ten"
                        data-parent="tables"
                        type="number"
                        min="0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="header">8</td>
                    <td className="data">
                      <FormInput
                        value={this.state.data.tables.size_eight}
                        onChange={this.handleInputChange}
                        name="size_eight"
                        data-parent="tables"
                        type="number"
                        min="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </RegistrationSubForm>
      );
    };

    const renderSlotForm = () => {
      return (
        <RegistrationSubForm title="Slots Available" xClass="slots">
          <div className="row">
            <div className="col">
              <div className="daysCheckboxDiv">
                <FormCheckbox
                  label="Monday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Monday}
                  name="Monday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Tuesday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Tuesday}
                  name="Tuesday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Wednesday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Wednesday}
                  name="Wednesday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Thursday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Thursday}
                  name="Thursday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Friday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Friday}
                  name="Friday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Saturday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Saturday}
                  name="Saturday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
                <FormCheckbox
                  label="Sunday"
                  xClass="d-inline dayCheckbox"
                  checked={this.state.data.days.Sunday}
                  name="Sunday"
                  data-parent="days"
                  onChange={this.handleCheckboxChange}
                />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          <div className="row">
            <div className="col">
              <form
                onSubmit={this.handleSlotFormSubmit}
                data-datakey="slots"
                name="slotForm"
              >
                <div className="row">
                  <div className="col-4">
                    <FormInput
                      label="START"
                      name="start"
                      value={this.state.slotForm.start}
                      onChange={this.handleSlotFormInputChange}
                      type="time"
                    />
                  </div>
                  <div className="col-4">
                    <FormInput
                      label="END"
                      type="Time"
                      name="end"
                      value={this.state.slotForm.end}
                      onChange={this.handleSlotFormInputChange}
                    />
                  </div>
                  <div className="col">
                    <FormInput label="&nbsp;" value="ADD" type="submit" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/*--------------------------------------------------------------------------- */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ---------------------------*/}

          <div className="row">
            <div className="col">
              <div className="slotsDisplay">
                {this.state.data.slots.map(slot => {
                  return (
                    <span className="badge badge-danger">
                      <button
                        className="btn btn-sm btn-danger"
                        type="button"
                        onClick={this.handleDeleteSlot}
                        id={slot.id}
                      >
                        {slot.start}&nbsp;-&nbsp;{slot.end}&nbsp;
                        <i className="fa fa-times" aria-hidden="true" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
          {/* ------------------------------------------------------------------------------------------------------ */}
        </RegistrationSubForm>
      );
    };

    const renderContactInfo = () => {
      return (
        <RegistrationSubForm title="Contact Info" xClass="contactInfo">
          <div className="row">
            <div className="col-6">
              <FormInput
                label="RESTAURANT EMAIL"
                value={this.state.data.email}
                onChange={this.handleInputChange}
                name="email"
                type="email"
              />
            </div>
            <div className="col-6">
              <FormInput
                label="RESTAURANT WEBSITE"
                value={this.state.data.website}
                onChange={this.handleInputChange}
                name="website"
              />
            </div>
          </div>
        </RegistrationSubForm>
      );
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="restaurantRegistrationDiv">
              <small className="form-text text-muted">
                Welcome to BookMyTable.com
              </small>
              <h4>Add your Restaurant</h4>
              <form onSubmit={this.handleSubmit}>
                {renderBasicInfoForm()}
                {renderLocationForm()}
                {renderCharacteristicForm()}
                {renderCapacityForm()}
                {renderSlotForm()}
                {renderContactInfo()}
                <button
                  type="submit"
                  style={{ width: "100%", marginTop: "20px" }}
                  className="btn btn-success"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-4">
            <small className="form-text text-muted">Happy to have you!</small>
            <h4>HELP!</h4>
            <div className="registrationInstructions">
              <strong> How it works</strong>
              <br />
              <ul>
                <li>
                  If you are the owner of a restaurant, or a representative, let
                  us know using this form.
                </li>
                <li>
                  Once you send the information to us, our awesome content team
                  will verify it. To help speed up the process, please provide a
                  contact number or email address.
                </li>
                <li>
                  That's it! Once verified the listing will start appearing
                  on&nbsp;<strong>BookMyTable.com</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantRegistration;
