import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ tabs, setSelected, children, defaultSelectedIndex = 0 }) => {
  return (
    <div className='w-full px-1 sm:px-0'>
      <Tab.Group defaultIndex={defaultSelectedIndex}>
        <Tab.List className='flex p-1 space-x-6 rounded-xl' role="tablist">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 transition-colors duration-200",

                  selected
                    ? "text-orange-700 border-b-2 border-orange-600"
                    : "text-gray-800 hover:text-orange-800"
                )
              }
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${index}`}
              id={`tab-${index}`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='w-full mt-2'>
          {React.Children.map(children, (child, index) => (
            <Tab.Panel
              key={index}
              role="tabpanel"
              id={`panel-${index}`}
              aria-labelledby={`tab-${index}`}
              className='p-4'
            >
              {child}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
  setSelected: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  defaultSelectedIndex: PropTypes.number,
};

export default Tabs;