export type AllRentalIncomeItems = {
    emirateDetails: {
        name: string,
        _id: string
    },
    cityDetails: {
        name: string,
        _id: string
    },
    townHouseThreeBedroom?: number;
    townHouseFourBedroom?: number;
    townHouseFiveBedroom?: number;

    villaFourBedroom?: number;
    villaFiveBedroom?: number;
    villaSixBedroom?: number;
    villaSevenBedroom?: number;

    apartmentStudio?: number;
    apartment2Bedroom?: number;
    apartment3Bedroom?: number;
    apartment4Bedroom?: number;
    apartment5Bedroom?: number;
    _id: string;
}
