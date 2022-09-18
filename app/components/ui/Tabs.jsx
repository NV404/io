import { Fragment, useState } from "react";

import { Tab } from "@headlessui/react";

import { DISABLED_STYLES, FOCUS_STYLES } from "../constants";
import Button from "./Button";

export default function Tabs({
  data = [], // [{ label: "Home", content: null, buttonProps = {} }, ...]
  defaultPageID = 0,
  ...otherProps
}) {
  return (
    <Tab.Group>
      <div className="flex flex-col items-stretch justify-start gap-4">
        <Tab.List className="flex flex-row items-stretch justify-start gap-2">
          {data.map(function (page, i) {
            return (
              <Tab as={Fragment} key={i}>
                {({ selected }) => (
                  <Button ghost={!selected} {...(page?.buttonProps || {})}>
                    {page.label}
                  </Button>
                )}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels>
          {data.map(function (page, i) {
            return <Tab.Panel key={i}>{page.content}</Tab.Panel>;
          })}
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
}
