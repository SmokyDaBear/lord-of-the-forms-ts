import { useRef, useState } from "react";
import { UserInformation } from "../../types";

import { isEmailValid } from "../../utils/validations";
import { FunctionalFormInput } from "./FunctionalFormInput";
import { createOnChangeHandler } from "../../utils/create-onchange-handler";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";
import { allCities } from "../../utils/all-cities";
import { capitalize } from "../../utils/transformations";
import errorMessages from "../../Db/errorMessages";

type TFunctionalFormProps = {
  setUserData: React.Dispatch<React.SetStateAction<UserInformation | null>>;
};

export const FunctionalForm = ({ setUserData }: TFunctionalFormProps) => {
  //States:
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState(["", "", "", ""]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Refs:
  const phoneRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  //Form Validation:
  const validator = {
    firstName: /^[a-z | \s]{2,}$/i.test(firstName),
    lastName: /^[a-z | \s]{2,}$/i.test(lastName),
    email: isEmailValid(email),
    city: allCities.filter((cityName) => cityName === city).length === 1,
    phone: /^\d{7}$/.test(phone.join("")),
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitted(true);
    e.preventDefault();
    const badVals: string[] = [];
    Object.entries(validator).forEach(([key, val]) => {
      if (!val) {
        badVals.push(String(key));
      }
    });
    if (badVals.length) {
      alert("Bad Data Input: " + badVals.map(capitalize).join(", "));
      return;
    }
    setUserData({
      firstName,
      lastName,
      email,
      city,
      phone: phone.join(""),
    });
  };
  return (
    <form onSubmit={onFormSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalFormInput
        label={"First-Name"}
        errorMessage={errorMessages.firstNameErrorMessage}
        show={!validator.firstName && isSubmitted}
        props={{
          placeholder: "Bilbo",
          value: firstName,
          type: "text",
          onChange: createOnChangeHandler({
            cb: setFirstName,
            options: ["capitalize", "no-digits"],
          }),
        }}
      />

      {/* last name input */}
      <FunctionalFormInput
        label="Last-Name"
        errorMessage={errorMessages.lastNameErrorMessage}
        show={!validator.lastName && isSubmitted}
        props={{
          placeholder: "Baggins",
          value: lastName,
          type: "text",
          onChange: createOnChangeHandler({
            cb: setLastName,
            options: ["capitalize", "no-digits"],
          }),
        }}
      />

      {/* Email Input */}
      <FunctionalFormInput
        label="Email"
        errorMessage={errorMessages.emailErrorMessage}
        show={!validator.email && isSubmitted}
        props={{
          placeholder: "bilbo-baggins@adventurehobbits.net",
          value: email,
          type: "email",
          onChange: createOnChangeHandler({ cb: setEmail }),
        }}
      />

      {/* City Input */}
      <FunctionalFormInput
        label="City"
        show={!validator.city && isSubmitted}
        errorMessage={errorMessages.cityErrorMessage}
        props={{
          placeholder: "Hobbiton",
          type: "text",
          list: "cities",
          value: city,
          onChange: createOnChangeHandler({
            cb: setCity,
            options: ["no-digits"],
          }),
        }}
      />

      <FunctionalPhoneInput
        phoneRefs={phoneRefs}
        phone={phone}
        setPhone={setPhone}
        show={!validator.phone && isSubmitted}
        errorMessage={errorMessages.phoneNumberErrorMessage}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
