import React, { FC, useState } from "react";
import styles from "./Select.module.css";

type Props = {
  options: { label: string; value: string }[];
  onSelect: (selectedValue: string) => void;
  value: string;
};

export const Select: FC<Props> = ({ options, onSelect, value }) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChangeValue}
      className={styles.select}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={styles.option}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
