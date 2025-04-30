import { useState } from 'react';

export const useFilters = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  
  // Filters
  const [citiesValue, setCitiesValue] = useState<string[]>([]);
  const [developersValue, setDevelopersValue] = useState<string[]>([]);
  const [facilitiesAmenities, setFacilitiesAmenities] = useState<string[]>([]);
  const [propertyTypeValue, setPropertyTypeValue] = useState("");
  const [propertyTypeSecondValue, setPropertyTypeSecondValue] = useState("");
  const [emirate, setEmirate] = useState("");
  const [completionType, setCompletionType] = useState("");
  const [handoverDate, setHandoverDate] = useState<{ year: number | '', quarter: string | '' }>();
  const [projectType, setProjectType] = useState<string | null>(null);
  const [paymentPlanValue, setPaymentPlanValue] = useState<{ label?: string, value?: string }>();
  const [furnishTypeValue, setFurnishTypeValue] = useState("");
  const [discount, setDiscount] = useState("");

  const resetAllFilters = () => {
    setSearch("");
    setCitiesValue([]);
    setDevelopersValue([]);
    setFacilitiesAmenities([]);
    setPropertyTypeValue("");
    setPropertyTypeSecondValue("");
    setEmirate("");
    setCompletionType("");
    setHandoverDate({ year: '', quarter: '' });
    setProjectType(null);
    setPaymentPlanValue(undefined);
    setFurnishTypeValue("");
    setDiscount("");
    setPage(1);
  };

  return {
    page,
    setPage,
    search,
    setSearch,
    citiesValue,
    setCitiesValue,
    developersValue,
    setDevelopersValue,
    facilitiesAmenities,
    setFacilitiesAmenities,
    propertyTypeValue,
    setPropertyTypeValue,
    propertyTypeSecondValue,
    setPropertyTypeSecondValue,
    emirate,
    setEmirate,
    completionType,
    setCompletionType,
    handoverDate,
    setHandoverDate,
    projectType,
    setProjectType,
    paymentPlanValue,
    setPaymentPlanValue,
    furnishTypeValue,
    setFurnishTypeValue,
    discount,
    setDiscount,
    resetAllFilters
  };
};