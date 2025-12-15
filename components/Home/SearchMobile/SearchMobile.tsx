import { useEffect, useMemo, useState } from "react";
import SearchMobileUI from "./SearchMobileUI";
import FilterBottomSheet from "@/components/BottomSheetWrapper/FilterBottomSheet";
import { useBottomSheet } from "@/components/BottomSheetWrapper/useBottomSheet";
import SectionTitle from "@/components/atom/SectionTitle/SectionTitle";
import SegmentToggleUI from "@/components/SegmentToggle/ui/SegmentToggleUI";
import { useSegmentToggle } from "@/components/SegmentToggle/logic/useSegmentToggle";
import ToggleChipsUI from "@/components/ToggleChips/ui/ToggleChipsUI";
import ToggleChips from "@/components/ToggleChips/ToggleChips";
import CompletionToggle from "@/components/CompletionToggle/CompletionToggle";
import Subtitle from "@/components/atom/Subtitle/Subtitle";
import HandoverSelector from "@/components/HandoverSelector/HandoverSelector";
import PriceRange from "@/components/PriceRange/PriceRange";
import { CompletionTypes, propertyCategoryStatus, propertyCategoryType, propertyCategoryTypes } from "@/data";
import SqftRange from "@/components/SqftRange/SqftRange";
import { useDispatch } from "react-redux";
import { handlePropertyCategoryStatus, handlePropertyCategoryType, setBath, setBeds, setCompletion, setDiscount, setFurnishType, setHandover, setPaymentPlan, setSearchTerm } from "@/redux/filters/filterSlice";
import { debounce } from "@/utils/debounce";

export default function SearchMobile({ searchBlackIcon, filterBlackIcon }: {
  searchBlackIcon: any;
  filterBlackIcon: any;
}) {
  const dispatch = useDispatch();
  const sheet = useBottomSheet();


  const [value, setValue] = useState("");

  const debouncedDispatch = useMemo(
    () => debounce((v: string) => dispatch(setSearchTerm(v)), 400),
    [dispatch]
  );

  const onChange = (v: string) => {
    setValue(v);
    debouncedDispatch(v);
  };

  useEffect(() => {
    return () => debouncedDispatch.cancel();
  }, [debouncedDispatch]);

  const onFilterClick = () => {
    sheet.toggle();
  };

  const { selected, toggle } = useSegmentToggle("residential");

  const handleSelect = (value: string) => {
    toggle(value);
    dispatch(handlePropertyCategoryStatus(value));
  };


  return (
    <>
      <SearchMobileUI
        value={value}
        onChange={onChange}
        onFilterClick={onFilterClick}
        searchIcon={searchBlackIcon}
        filterIcon={filterBlackIcon}
      />

      <FilterBottomSheet isOpen={sheet.isOpen} onClose={sheet.close}>

        <div className="flex flex-col gap-3">

          <SectionTitle text="Filters" />

          <SegmentToggleUI
            options={propertyCategoryStatus.filter((item: any) => item.value !== 'all')}
            selected={selected}
            onSelect={handleSelect}
          />

          <ToggleChips
            chips={propertyCategoryTypes}
            defaultValue={propertyCategoryTypes[0].value}
            onChange={(e) => {
              if (!e) return;
              dispatch(handlePropertyCategoryType(e))
            }}
          />

          <div className="">
            <Subtitle text="Completion" />


            <ToggleChips
              chips={CompletionTypes}
              defaultValue={CompletionTypes[0].value}
              onChange={(v) => {
                if (!v) return;
                dispatch(setCompletion(v))
              }}
            />
          </div>

          <div className="mb-3">

            <Subtitle text="Handover" />

            <HandoverSelector
              defaultYear={2025}
              defaultQuarter="Q2"
              onChange={(y, q) => {
                if (!y || !q) return;
                dispatch(setHandover({ year: y, qtr: q }))
              }}
            />
          </div>

          <CompletionToggle
            title="Payment Plan"
            options={[
              { label: "On Handover", value: "on-handover" },
              { label: "Post Handover", value: "post-handover" },
            ]}
            defaultValue="onHandover"
            onChange={(v) => {
              if (!v) return;
              dispatch(setPaymentPlan(v))
            }}
          />

          <PriceRange

          />

          <div className="pt-2">

            <SqftRange maxSqft={5000} />
          </div>


          <div className="">
            <Subtitle text="No of Beds" />


            <ToggleChips
              chips={[
                {
                  value: "studio",
                  label: "Studio",
                },
                {
                  value: "1",
                  label: "1",
                },
                {
                  value: "2",
                  label: "2",
                },
                {
                  value: "3",
                  label: "3",
                },
                {
                  value: "4",
                  label: "4",
                },
                {
                  value: "5",
                  label: "5",
                },
                {
                  value: "6",
                  label: "6",
                },
                {
                  value: "7",
                  label: "7+",
                },

              ]}
              // defaultValue={}
              onChange={(v) => {
                if (!v) return;
                dispatch(setBeds(v))
              }}
            />
          </div>


          <div className="">
            <Subtitle text="No of Beds" />


            <ToggleChips
              chips={[
                {
                  value: "studio",
                  label: "Studio",
                },
                {
                  value: "1",
                  label: "1",
                },
                {
                  value: "2",
                  label: "2",
                },
                {
                  value: "3",
                  label: "3",
                },
                {
                  value: "4",
                  label: "4",
                },
                {
                  value: "5",
                  label: "5",
                },
                {
                  value: "6",
                  label: "6+",
                },


              ]}
              // defaultValue={}
              onChange={(v) => {
                if (!v) return;
                dispatch(setBath(v))
              }}
            />
          </div>


          <div className="">
            <Subtitle text="Furnish Type" />


            <CompletionToggle
              options={[

                {
                  value: "fully-furnished",
                  label: "Fully Furnished",
                },
                {
                  value: "semi-furnished",
                  label: "Semi Furnished",
                },
                {
                  value: "un-furnishing",
                  label: "Un Furnished",
                },

              ]}
              // defaultValue={}
              onChange={(v) => {
                if (!v) return;
                dispatch(setFurnishType(v))
              }}
            />
          </div>


          <div className="">
            <Subtitle text="Discount" />


            <CompletionToggle
              options={[

                {
                  value: "with-discount",
                  label: "With Discount",

                },
                {
                  value: "without-discount",
                  label: "Without Discount",


                },

              ]}
              // defaultValue={}
              onChange={(v) => {
                if (!v) return
                dispatch(setDiscount(v))
              }}
            />
          </div>



        </div>


      </FilterBottomSheet>
    </>
  );
}
