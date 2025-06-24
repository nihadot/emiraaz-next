
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
    villas: DyanmicField[];
    apartments: DyanmicField[];
    townhouses: DyanmicField[];
    _id: string;
}
