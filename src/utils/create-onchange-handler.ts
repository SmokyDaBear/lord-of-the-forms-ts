import React from "react";
import { TReactClickEvent } from "../types";
import { capitalize } from "./transformations";
import { filterCharacters } from "./validations";

//OnChangeHandlers:
type validOptions = "capitalize" | "no-digits" | "city-names";

export type TCreateOnChangeHandlerProps = {
  cb: (str: string) => void;
  options?: validOptions[];
};

export const createOnChangeHandler =
  (props: TCreateOnChangeHandlerProps) => (e: TReactClickEvent) => {
    const { cb, options } = props;
    let updateString = options?.includes("capitalize")
      ? capitalize(e.target.value)
      : e.target.value;
    if (options?.includes("no-digits")) {
      updateString = filterCharacters(updateString, /^[\p{Letter}\s]+$/iu);
    }
    if (options?.includes("city-names")) {
      updateString = filterCharacters(
        updateString,
        /^[\p{Letter}\s,'"()-]+$/iu
      );
    }

    cb(updateString);
  };

type TCreateOnChangeHandlerPhoneProps = {
  i: number;
  phoneRefs: React.MutableRefObject<HTMLInputElement | null>[];
  phone: string[];
  setPhone:
    | React.Dispatch<React.SetStateAction<string[]>>
    | ((val: string[]) => void);
};

export const createOnChangeHandlerPhone =
  (props: TCreateOnChangeHandlerPhoneProps) => (e: TReactClickEvent) => {
    const { i, phoneRefs, phone, setPhone } = props;
    if (!/^\d*$/.test(e.target.value)) return;
    const lastRef = phoneRefs[i - 1];
    const nextRef = phoneRefs[i + 1];
    const goNext = e.target.value.length >= 2 && nextRef?.current;
    const goBack = e.target.value.length === 0 && lastRef?.current;
    const newState = phone.map((input, phoneIndex) =>
      phoneIndex === i ? e.target.value : input
    );
    if (/^\d{8,}$/.test(newState.join(""))) return;
    setPhone(newState);
    if (goBack) lastRef.current?.focus();
    if (goNext) nextRef.current?.focus();
  };
