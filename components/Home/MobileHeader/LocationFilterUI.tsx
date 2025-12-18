'use client';

import SectionTitle from "@/components/atom/SectionTitle/SectionTitle";
import DetectLocationButton from "@/components/DetectLocationButton/ui/DetectLocationButton";
import SearchMobileBottomSheet from "../SearchMobile/SearchMobileBottomSheet";
import SelectableChips from "@/components/SelectableChips/ui/SelectableChips";
import SelectableList from "@/components/SelectableList/ui/SelectableList";
import CitySkeleton from "./CitySkeleton";
import { useDispatch } from "react-redux";
import { setCity } from "@/redux/filters/filterSlice";
import { IoCloseOutline } from "react-icons/io5";

export default function LocationFilterUI({
    emirateOptions,
    logic,
    onClose,
}: {
    emirateOptions: any[];
    logic: {
        selectedEmirate: string | null;
        emirateCities: any;
        isLoading: boolean;
        localLoading: boolean;
        handleEmirateSelect: (v: string | null) => void;

        searchTerm: string;
        handleSearch: (v: string) => void;
        isSearching: boolean;
    };
    onClose?: () => void;
}) {

    const dispatch = useDispatch();

    return (
        <div className=" overflow-auto h-full ">
            <div className="flex justify-between pb-3">
                <SectionTitle text="Location" />
                <div className=""
                onClick={onClose}
                >
                    <IoCloseOutline
                    size={26}
                    />
                </div>
            </div>
            <DetectLocationButton onDetect={() => console.log("detecting...")} />

            <div className="pt-3">
                <SearchMobileBottomSheet
                    placeholder="Search emirate, city"
                    value={logic.searchTerm}
                    onChange={logic.handleSearch}

                />
            </div>

            <div className="pt-3">
                {/* emirate buttons */}
                <SelectableChips
                    options={emirateOptions}
                    defaultValue={logic.selectedEmirate}
                    onChange={logic.handleEmirateSelect}
                />
            </div>

            {/* scrollable cities */}
            <div className="h-full max-h-[380px] flex-1 overflow-y-auto  mt-3">
                {(logic.isLoading || logic.localLoading) && (
                    <>
                        <CitySkeleton />
                        <CitySkeleton />
                        <CitySkeleton />
                        <CitySkeleton />
                        <CitySkeleton />
                        <CitySkeleton />
                        <CitySkeleton />
                        <CitySkeleton />
                    </>
                )}

                {!logic.isLoading &&
                    !logic.localLoading &&
                    logic.emirateCities && (
                        <SelectableList
                            items={logic.emirateCities.data.map((i: any) => ({
                                value: i._id,
                                label: i.name,
                                count: i.count,
                                slug: i.slug,
                            }))}
                            onChange={(item) => {
                                if (!item) return;            // item = null when unselected
                                dispatch(setCity(item)); // only pass ID to redux
                            }}
                        />
                    )}
            </div>
        </div>
    );
}
