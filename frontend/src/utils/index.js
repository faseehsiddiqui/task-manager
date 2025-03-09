import moment from "moment";
import { useState, useEffect } from "react";

export const formatDate = (dateString) => {
  return moment(dateString).format("DD MMM YYYY, hh:mm A");
};

export const formatFieldName = (field) => {
  const formattedField = field.replace(/([a-z])([A-Z])/g, "$1 $2");
  return formattedField;
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup the timeout when the value changes
    };
  }, [value, delay]);

  return debouncedValue;
};
