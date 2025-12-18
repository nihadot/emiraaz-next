'use client';

import { motion } from "framer-motion";
import { useSelectableList } from "../logic/useSelectableList";
import { TfiArrowTopRight } from "react-icons/tfi";
import clsx from "clsx";

type SelectableItem = {
  value: string;
  label: string;
  count?: number;
  slug:string;
};

type Props = {
  items: {
    value: string;
    label: string;
    count?: number;
    slug:string;
  }[];

onChange?: (item: SelectableItem | null) => void;};

export default function SelectableList({ items, onChange }: Props) {
  const { selectedId, sortedItems, actions } = useSelectableList(items);

const handleClick = (item: {
  value: string;
  label: string;
  count?: number;
  slug:string;
}) => {
  const isSame = selectedId === item.value;

  // if already selected → unselect
  const newValue = isSame ? null : item;

  actions.toggle(item.value); // pass only ID
  onChange?.(newValue);
};

  return (
    <div className="flex flex-col w-full">
      {sortedItems.map((item) => {
const isActive = selectedId === item.value;

        return (
          <motion.button
            key={item.value}
            layout
            whileTap={{ scale: 0.97 }}
            onClick={() => handleClick(item)}
            className="flex items-center gap-3 py-3.5 border-b border-[#DFDFDF] text-left"
          >
            <motion.span
              className={clsx("text-sm gap-3 flex justify-center items-center font-poppins  ", isActive ? "font-normal text-black" : "font-normal text-[#767676]")}
            >
              <div className="">
                <TfiArrowTopRight
                color={isActive ? "black" : "#767676"}
                size={18}/>
              </div>
               {item.label} {item.count ? `(${item.count})` : ""}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
