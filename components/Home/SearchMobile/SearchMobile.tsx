import { useState } from "react";
import SearchMobileUI from "./SearchMobileUI";

export default function SearchMobile({ searchBlackIcon, filterBlackIcon }: {
    searchBlackIcon: any;
    filterBlackIcon: any;
}) {
  const [value, setValue] = useState("");

  const onFilterClick = () => {};
  const onChange = (v: string) => setValue(v);

  return (
    <SearchMobileUI
      value={value}
      onChange={onChange}
      onFilterClick={onFilterClick}
      searchIcon={searchBlackIcon}
      filterIcon={filterBlackIcon}
    />
  );
}
