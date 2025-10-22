import { Component, ComponentProps } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type TClassFormInputProps = {
  label: string;
  errorMessage: string;
  show: boolean;
  properties: ComponentProps<"input">;
};

export class ClassFormInput extends Component<TClassFormInputProps> {
  render() {
    const { label, errorMessage, show, properties } = this.props;
    return (
      <>
        <div className="input-wrap">
          <label>{label}:</label>
          <input key={label} {...properties} />
        </div>
        <ErrorMessage message={errorMessage} show={show} />
      </>
    );
  }
}
