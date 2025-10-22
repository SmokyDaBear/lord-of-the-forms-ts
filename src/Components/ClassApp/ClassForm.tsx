import { Component } from "react";
import { UserInformation } from "../../types";
import {
  checkOnlyLettersOrSpacesMinLengthTwo,
  isEmailValid,
  isValidCity,
  validatePhone,
} from "../../utils/validations";
import { ClassFormInput } from "./ClassFormInput";
import { createOnChangeHandler } from "../../utils/create-onchange-handler";
import { ClassPhoneInput } from "./ClassPhoneInput";
import { capitalize } from "../../utils/transformations";
import errorMessages from "../../Db/errorMessages";

type TClassFormProps = {
  setUser: (val: UserInformation) => void;
};
type TCLassFormState = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string[];
  isSubmitted: boolean;
};

type TFormValidatorProps = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  city: boolean;
  phone: boolean;
};

export class ClassForm extends Component<TClassFormProps, TCLassFormState> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
    isSubmitted: false,
  };

  //Submission Handler:
  submissionHandler = (
    e: React.FormEvent<HTMLFormElement>,
    validator: TFormValidatorProps
  ) => {
    this.setState({ isSubmitted: true });
    e.preventDefault();
    const badVals: string[] = [];
    Object.entries(validator).forEach(([key, value]) => {
      if (!value) badVals.push(String(key));
      return;
    });
    if (badVals.length) {
      alert("Bad Data Input: " + badVals.map(capitalize).join(", "));
      return;
    }
    const { firstName, lastName, email, phone, city } = this.state;

    this.props.setUser({
      firstName,
      lastName,
      email,
      phone: phone.join(""),
      city,
    });
  };

  render() {
    //State Values:
    const { isSubmitted, firstName, lastName, email, phone, city } = this.state;

    //Form Validation:
    const validator = {
      firstName: checkOnlyLettersOrSpacesMinLengthTwo(firstName),
      lastName: checkOnlyLettersOrSpacesMinLengthTwo(lastName),
      email: isEmailValid(email),
      city: isValidCity(city),
      phone: validatePhone(phone),
    };

    return (
      <form onSubmit={(e) => this.submissionHandler(e, validator)}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassFormInput
          label="First Name"
          errorMessage={errorMessages.firstNameErrorMessage}
          show={!validator.firstName && isSubmitted}
          properties={{
            placeholder: "Bilbo",
            value: firstName,
            type: "text",
            onChange: createOnChangeHandler({
              cb: (val: string) => this.setState({ firstName: val }),
              options: ["capitalize", "no-digits"],
            }),
          }}
        />
        {/* last name input */}
        <ClassFormInput
          label="Last Name"
          errorMessage={errorMessages.lastNameErrorMessage}
          show={!validator.lastName && isSubmitted}
          properties={{
            placeholder: "Baggins",
            value: lastName,
            type: "text",
            onChange: createOnChangeHandler({
              cb: (val: string) => this.setState({ lastName: val }),
              options: ["capitalize", "no-digits"],
            }),
          }}
        />

        {/* Email Input */}
        <ClassFormInput
          label="Email"
          show={!validator.email && isSubmitted}
          errorMessage={errorMessages.emailErrorMessage}
          properties={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: email,
            type: "email",
            onChange: createOnChangeHandler({
              cb: (val: string) => this.setState({ email: val }),
            }),
          }}
        />

        {/* City Input */}
        <ClassFormInput
          label="City"
          show={!validator.city && isSubmitted}
          errorMessage={errorMessages.cityErrorMessage}
          properties={{
            placeholder: "Hobbiton",
            value: city,
            type: "text",
            list: "cities",
            onChange: createOnChangeHandler({
              cb: (val: string) => this.setState({ city: val }),
              options: ["city-names"],
            }),
          }}
        />
        <ClassPhoneInput
          phone={phone}
          setPhone={(arr: string[]) => this.setState({ phone: arr })}
          show={!validator.phone && isSubmitted}
          key={"class-phone"}
          errorMessage={errorMessages.phoneNumberErrorMessage}
        />

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
