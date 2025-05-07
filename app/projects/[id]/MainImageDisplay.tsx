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

        <div className="relative w-full h-[228px] sm:h-[489px] rounded-md overflow-hidden">
            { mainImage ?  <Image src={mainImage} alt="Main image" fill className="object-cover rounded-md" /> : 
            <div className="w-full h-full bg-[#F5F5F5] rounded-md flex items-center justify-center"/>
            }
        </div>

    </>
);


export default MainImageDisplay