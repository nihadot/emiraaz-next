
interface DyanmicField {
    id: string;
    name: string;
    value: string;
}
export type AllRentalIncomeItems = {
    emirateDetails: {
        name: string,
        _id: string
    },
    cityDetails: {
        name: string,
        _id: string
    },
    villas: string[];
    apartments: string[];
    townhouses: string[];
    _id: string;
}
