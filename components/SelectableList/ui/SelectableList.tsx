'use client';

import { motion } from "framer-motion";
import { useSelectableList } from "../logic/useSelectableList";
import { TfiArrowTopRight } from "react-icons/tfi";

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
            className="flex items-center gap-3 py-3 border-b border-gray-200 text-left"
          >
            <motion.span
              animate={{ opacity: isActive ? 1 : 0.6 }}
              className="text-[14px] gap-3 flex justify-center items-center font-poppins text-gray-700 font-normal"
            >
              <div className="">
                <TfiArrowTopRight size={20}/>
              </div>
               {item.label} {item.count ? `(${item.count})` : ""}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
