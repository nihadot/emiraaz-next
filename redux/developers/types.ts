import { ImageType } from "@/utils/types";

export type AllDevelopersItems = {
    _id: string;
    slug: string;
    name: string;
    username: string;
    year?: string;
    priority?: string;
    image?: ImageType;
    emiratesDetails: {
        _id: string;
        name: string;
    }
}

