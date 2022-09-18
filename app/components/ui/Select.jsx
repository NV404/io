import { useState } from "react";

import { Listbox } from "@headlessui/react";

import Button from "./Button";

import Selector from "./../icons/Selector";

export default function Select({
  id,
  name,
  options = [],
  defaultOption,
  onChange,
  disabled = false,
  ...otherProps
}) {
  const [value, setValue] = useState(defaultOption.value);

  return (
    <Listbox
      id={id}
      name={name}
      value={value}
      type="button"
      onChange={function (value) {
        setValue(value);
        onChange?.(value);
      }}
      disabled={disabled}
      {...otherProps}
    >
      <div className="flex-1 relative">
        <Listbox.Button
          as={Button}
          className="relative whitespace-nowrap w-full flex flex-row items-center justify-between gap-2"
          ghost
        >
          <span>
            {
              options.find(function (_option) {
                return _option.value === value;
              })?.label
            }
          </span>
          <Selector size={16} />
        </Listbox.Button>
        <Listbox.Options className="whitespace-nowrap absolute z-10 w-full mt-2 bg-neutral-900 border border-neutral-800 rounded-md divide-y divide-dashed divide-neutral-800 focus:outline-none">
          {options.map(function (_option) {
            return (
              <Listbox.Option
                value={_option.value}
                className={function ({ active, selected }) {
                  return [
                    "relative w-full px-3 py-1 font-medium text-sm rounded-md",
                    active ? "bg-neutral-800" : "",
                    selected ? "text-blue-500" : "",
                  ].join(" ");
                }}
                key={_option.value}
              >
                {_option.label}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
