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
    // { label: "All", value: "all" },
    { label: "Off-Plan projects", value: "off-plan-projects" },
    { label: "Off-Plan Resale", value: "off-plan-resale" },
    { label: "Secondary ", value: "off-plan-secondary" },
    { label: "Land ", value: "off-plan-land" },
]

export const productTypeOptionFirstItems = [
    // { label: "All", value: "all" },
    { label: "Off-Plan Projects", value: "off-plan-projects",link:"off-plan-projects" },
    { label: "Off-Plan Resale", value: "resale" ,link:"off-plan-resale"},
    { label: "Secondary ", value: "secondary",link:"off-plan-secondary" },
    { label: "Land ", value: "land",link:"off-plan-land" },
]

export const propertyCategoryType = [
    // { label: "All", value: "all" },
    { label: "Off-Plan Projects", value: "off-plan-projects",link:"off-plan-projects" },
    { label: "Off-Plan Resale", value: "resale" ,link:"off-plan-resale"},
    { label: "Secondary ", value: "secondary",link:"off-plan-secondary" },
    { label: "Land ", value: "land",link:"off-plan-land" },
]

export const propertyTypeSecond = [
    { label: "All", value: "all" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
]

export const productTypeOptionLastItems = [
    { label: "All", value: "all" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
]


export const RECOMMENDED_LISTS = [
   
    {
      title: "Near Dubai",
      items: [
        "Ajman Properties",
        "Sharjah Properties",
        "Al Ain Properties",
      ],
    },


   
  ];






export const RECOMMENDED_LISTS_SECOND = [
   
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


export  const nationalities = [
  { value: '', label: 'Select your nationality' },
  { value: 'afghanistan', label: 'Afghanistan' },
  { value: 'albania', label: 'Albania' },
  { value: 'algeria', label: 'Algeria' },
  { value: 'american samoa', label: 'American Samoa' },
  { value: 'andorra', label: 'Andorra' },
  { value: 'angola', label: 'Angola' },
  { value: 'anguilla', label: 'Anguilla' },
  { value: 'antarctica', label: 'Antarctica' },
  { value: 'antigua and barbuda', label: 'Antigua and Barbuda' },
  { value: 'argentina', label: 'Argentina' },
  { value: 'armenia', label: 'Armenia' },
  { value: 'aruba', label: 'Aruba' },
  { value: 'australia', label: 'Australia' },
  { value: 'austria', label: 'Austria' },
  { value: 'azerbaijan', label: 'Azerbaijan' },
  { value: 'bahamas', label: 'Bahamas' },
  { value: 'bahrain', label: 'Bahrain' },
  { value: 'bangladesh', label: 'Bangladesh' },
  { value: 'barbados', label: 'Barbados' },
  { value: 'belarus', label: 'Belarus' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'belize', label: 'Belize' },
  { value: 'benin', label: 'Benin' },
  { value: 'bermuda', label: 'Bermuda' },
  { value: 'bhutan', label: 'Bhutan' },
  { value: 'bolivia', label: 'Bolivia' },
  { value: 'bosnia and herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'botswana', label: 'Botswana' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'brunei darussalam', label: 'Brunei Darussalam' },
  { value: 'bulgaria', label: 'Bulgaria' },
  { value: 'burkina faso', label: 'Burkina Faso' },
  { value: 'burundi', label: 'Burundi' },
  { value: 'cabo verde', label: 'Cabo Verde' },
  { value: 'cambodia', label: 'Cambodia' },
  { value: 'cameroon', label: 'Cameroon' },
  { value: 'canada', label: 'Canada' },
  { value: 'central african republic', label: 'Central African Republic' },
  { value: 'chad', label: 'Chad' },
  { value: 'chile', label: 'Chile' },
  { value: 'china', label: 'China' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'comoros', label: 'Comoros' },
  { value: 'congo', label: 'Congo' },
  { value: 'costa rica', label: 'Costa Rica' },
  { value: 'croatia', label: 'Croatia' },
  { value: 'cuba', label: 'Cuba' },
  { value: 'cyprus', label: 'Cyprus' },
  { value: 'czech republic', label: 'Czech Republic' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'djibouti', label: 'Djibouti' },
  { value: 'dominica', label: 'Dominica' },
  { value: 'dominican republic', label: 'Dominican Republic' },
  { value: 'ecuador', label: 'Ecuador' },
  { value: 'egypt', label: 'Egypt' },
  { value: 'el salvador', label: 'El Salvador' },
  { value: 'equatorial guinea', label: 'Equatorial Guinea' },
  { value: 'eritrea', label: 'Eritrea' },
  { value: 'estonia', label: 'Estonia' },
  { value: 'eswatini', label: 'Eswatini' },
  { value: 'ethiopia', label: 'Ethiopia' },
  { value: 'fiji', label: 'Fiji' },
  { value: 'finland', label: 'Finland' },
  { value: 'france', label: 'France' },
  { value: 'gabon', label: 'Gabon' },
  { value: 'gambia', label: 'Gambia' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'germany', label: 'Germany' },
  { value: 'ghana', label: 'Ghana' },
  { value: 'greece', label: 'Greece' },
  { value: 'greenland', label: 'Greenland' },
  { value: 'grenada', label: 'Grenada' },
  { value: 'guatemala', label: 'Guatemala' },
  { value: 'guinea', label: 'Guinea' },
  { value: 'guinea-bissau', label: 'Guinea-Bissau' },
  { value: 'guyana', label: 'Guyana' },
  { value: 'haiti', label: 'Haiti' },
  { value: 'honduras', label: 'Honduras' },
  { value: 'hungary', label: 'Hungary' },
  { value: 'iceland', label: 'Iceland' },
  { value: 'india', label: 'India' },
  { value: 'indonesia', label: 'Indonesia' },
  { value: 'iran', label: 'Iran' },
  { value: 'iraq', label: 'Iraq' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'israel', label: 'Israel' },
  { value: 'italy', label: 'Italy' },
  { value: 'jamaica', label: 'Jamaica' },
  { value: 'japan', label: 'Japan' },
  { value: 'jordan', label: 'Jordan' },
  { value: 'kazakhstan', label: 'Kazakhstan' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'kiribati', label: 'Kiribati' },
  { value: 'kuwait', label: 'Kuwait' },
  { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'laos', label: 'Laos' },
  { value: 'latvia', label: 'Latvia' },
  { value: 'lebanon', label: 'Lebanon' },
  { value: 'lesotho', label: 'Lesotho' },
  { value: 'liberia', label: 'Liberia' },
  { value: 'libya', label: 'Libya' },
  { value: 'liechtenstein', label: 'Liechtenstein' },
  { value: 'lithuania', label: 'Lithuania' },
  { value: 'luxembourg', label: 'Luxembourg' }
];

export const propertyType = [
    {
        value:'',
        label:"Choose Property Type"
    },
   {
                    id: 1,
                    value: "villa",
                    label: "Villa",
                },
                {
                    id: 2,
                    value: "apartment",
                    label: "Apartment"
                },
                {
                    id: 3,
                    value: "penthouse",
                    label: "Penthouse"
                },
                {
                    id: 4,
                    value: "townhouse",
                    label: "Townhouse"
                },
                  {
                    id: 5,
                    value: "officespace",
                    label: "Office Space",
                },
                {
                    id: 5,
                    value: "shops",
                    label: "Shops"
                },
                {
                    id: 7,
                    value: "warehouse",
                    label: "Ware House"
                },
]