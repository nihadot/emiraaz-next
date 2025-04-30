export type ImageItem = {
    asset_id: string;
    secure_url: string;
    url: string;
    public_id: string;
};


export type ProjectType =
| "commercial-residential"
| "project-commercial"
| "project-residential"
| "resale-commercial"
| "resale-residential"
| "secondary-residential"
| "land-commercial"
| "land-residential"
| "secondary-commercial";
