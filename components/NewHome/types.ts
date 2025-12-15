import { CityNames } from "@/redux/cities/types";
import { EmirateNames } from "@/redux/emirates/types";
import { CountItem } from "@/redux/news/newsApi";
import { PortraitBanner } from "@/redux/portraitBannerAd/types";
import { AllProjectsItems } from "@/redux/project/types";
import { AllSmallVideoItems } from "@/redux/smallVideo/types";
import { Pagination } from "@/utils/types";

export interface HomePageProps {
    emiratesData: EmirateNames[];
    urls?: string[];
    allCounts: CountItem;
    initialCities: CityNames[];
    videoAds: AllSmallVideoItems[];
    initialData: {
        data: AllProjectsItems[];
        pagination: Pagination;
    };
    portraitBanners: PortraitBanner[];
    siteMap: any[];
    content: object;
    initialValues: {
        emirate: string;
        cities: string[];
        propertyCategoryType: string;
        propertyCategoryStatus: string;
        propertyType?: string;
        completionType?: string;
        qtr?: string;
        year: number | '';
        paymentPlan?: string;
        furnishied?: string;
        discount?: string;
    };
}
