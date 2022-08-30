import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChangeHandler,
    clear,
  };
};
