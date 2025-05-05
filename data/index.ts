export const PropertyTypes: { count:number,value: string; label: string }[] = [
    {
        value: "all",
        label: "All",
        count:10,

    },{
        value: "villa",
        label: "Villa",
        count:10,

    },
    {
        value: "apartment",
        label: "Apartment",
        count:10,

    },
    {
        value: "penthouse",
        label: "Penthouse",
        count:10,

    },
    {
        value: "townhouse",
        label: "Townhouse",
        count:10,

    }
]


export const DiscountType: { count?:number,value: string; label: string }[] = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "with-discount",
        label: "With Discount",
        count:10,
    },
    {
        value: "without-discount",
        label: "Without Discount",
        count:10,

    },
]


export const CompletionTypes: { value: string; label: string }[] = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "just-launched",
        label: "Just Launched",
    },
    {
        value: "under-construction",
        label: "Under Construction"
    },
    {
        value: "ready",
        label: "Ready"
    },
]


export const FurnishTypes: { value: string; label: string }[] = [
    {
        value: "all",
        label: "All",
    }, {
        value: "fully-furnished",
        label: "Fully Furnished",
    },
    {
        value: "semi-furnished",
        label: "Semi Furnished"
    },
    {
        value: "un-furnishing",
        label: "UnFurnished"
    },
]


export const PaymentPlan: { count?: number, value: string; label: string }[] = [
   
    {
        value: "all",
        label: "All",
        }, {
        value: "on-handover",
        label: "On Handover",
        count: 20,
    },
    {
        value: "post-handover",
        label: "Post Handover",
        count: 10,
    },
]




export const propertyTypeFirst = [
    { label: "Off-Plan projects", value: "off-plan-projects" },
    { label: "Off-Plan Resale", value: "off-plan-resale" },
    { label: "Secondary ", value: "off-plan-secondary" },
    { label: "Land ", value: "off-plan-land" },
]

export const propertyTypeSecond = [
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
]


export const RECOMMENDED_LISTS = [
    {
      title: "Recommended Searches",
      items: [
        "Studio Properties For Sale in Dubai",
        "1 Bedroom Properties For Sale in Dubai",
        "2 Bedroom Properties For Sale in Dubai",
        "3 Bedroom Properties For Sale in Dubai",
        "4 Bedroom Properties For Sale in Dubai",
        "5 Bedroom Properties For Sale in Dubai",
        "6 Bedroom Properties For Sale in Dubai",
      ],
    },
    {
      title: "Near Dubai",
      items: [
        "Ajman Properties",
        "Sharjah Properties",
        "Al Ain Properties",
      ],
    },


    {
        title: "Useful Links",
        items: [
          "Offplan Resale Projects in Dubai",
        ],
      },
  ];