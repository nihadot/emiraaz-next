import Image from "next/image";

const MainImageDisplay = ({
    mainImage
}: {
    mainImage: string,
    images: { secure_url: string }[],
    selectedIndex: number,
    onSelectImage: (index: number) => void
}) => (
    <>

        <div className="relative w-full h-[489px] rounded-md overflow-hidden">
            <Image src={mainImage} alt="Main image" fill className="object-cover rounded-md" />
        </div>

    </>
);


export default MainImageDisplay