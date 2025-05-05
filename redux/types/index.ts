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


export enum FolderName {
    Developer = "developer",
    Agent = "agent",
    VideoThumbnail = "video-thumbnail",
    Video = "video",
    OpenHouse = "open-house",
    Projects = "projects",
    Layouts = "layouts",
    QrCode = "qr-code",
    DesktopImage = "desktop-image",
    SmallVideo = "small-video",
    MobileImage = "mobile-image",
    Thumbnail = "thumbnail",
    Users = "user",
    
}
