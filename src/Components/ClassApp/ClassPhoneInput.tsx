import { Component, createRef } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { createOnChangeHandlerPhone } from "../../utils/create-onchange-handler";

type TClassPhoneInputProps = {
  phone: string[];
  setPhone: (v: string[]) => void;
  show: boolean;
  errorMessage: string;
};

export class ClassPhoneInput extends Component<TClassPhoneInputProps> {
  render() {
    const inputIndices = [0, 1, 2, 3];
    const { phone, setPhone, show, errorMessage } = this.props;

    //Phone References:
    const phoneRefs = [
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
      createRef<HTMLInputElement>(),
    ];

    return (
      <>
        <div className="input-wrap" key={"class-phone-container"}>
          <label htmlFor="phone">Phone:</label>
          <div
            id="phone-input-wrap"
            className="phone-input-wrap"
            key={"class-phone-input-wrap"}
          >
            {inputIndices.map((index: number) => (
              <div key={`class-phone-input-${index}`} className="input-div">
                {index > 0 && "-"}
                <input
                  type="text"
                  id={`phone-input-${index + 1}`}
                  placeholder={index === 3 ? "5" : "55"}
                  value={phone[index]}
                  ref={phoneRefs[index]}
                  onChange={createOnChangeHandlerPhone({
                    i: index,
                    phoneRefs,
                    phone,
                    setPhone,
                  })}
                />
              </div>
            ))}
          </div>
        </div>

        <ErrorMessage message={errorMessage} show={show} />
      </>
    );
  }
}
