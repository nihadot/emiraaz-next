import SearchMobileUIBottomSheet from "./SearchMobileUIBottomSheet";

export default function SearchMobileBottomSheet({ value, onChange,placeholder }: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return <SearchMobileUIBottomSheet
  placeholder={placeholder}
   value={value} onChange={onChange} />;
}
