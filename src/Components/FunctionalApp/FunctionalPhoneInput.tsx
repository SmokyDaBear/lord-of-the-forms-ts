import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { createOnChangeHandlerPhone } from "../../utils/create-onchange-handler";
import { useRef } from "react";

type TFunctionalPhoneInputProps = {
  phone: string[];
  setPhone: (v: string[]) => void;
  show: boolean;
  errorMessage: string;
};

export function FunctionalPhoneInput({
  phone,
  setPhone,
  show,
  errorMessage,
}: TFunctionalPhoneInputProps) {
  const inputIndices = [0, 1, 2, 3];

  //Refs:
  const phoneRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  return (
    <>
      <div className="input-wrap" key={"functional-phone-container"}>
        <label htmlFor="phone">Phone:</label>
        <div
          id="phone-input-wrap"
          className="phone-input-wrap"
          key={"functional-phone-input-wrap"}
        >
          {inputIndices.map((index: number) => (
            <div key={`functional-phone-input-${index}`} className="input-div">
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
