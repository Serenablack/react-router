import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return {
    type,
    value,
    onChangeHandler,
  };
};
