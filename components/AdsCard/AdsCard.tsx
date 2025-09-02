import { AllProjectAdsCards } from '@/redux/projectAdsCard/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
    item: AllProjectAdsCards;
}

function AdsCard({ item }: Props) {

    const router = useRouter();


       const handleNavigateClick = () => {
            router.push(`/projects/${item.projectDetails?.slug}`);
        };
    
    

    return (
        <div className='flex border rounded-[3px] h-[226.5px] w-full p-[12px] gap-1 border-[#DEDEDE] bg-white'>
            <div className="flex gap-0 w-full flex-col">
                <p className='text-[15px] mb-[12.75px] font-bold font-poppins pb-1 capitalize'>{item.title}</p>
                <p className='text-[12px] font-normal font-poppins pb-1 capitalize text-black/60 line-clamp-3'>{item.description}</p>

                <div className="w-full h-[1px] bg-black/10 my-2"></div>
                <div className="flex flex-1 justify-between items-center ">
                    <div className="relative w-[84px] h-[58.5px]">
                    <Image src={item.image?.webp?.url || ''} fill  className=' w-full h-full object-contain' alt="" />
                    </div>
                    <button onClick={()=>handleNavigateClick()} className='bg-black text-nowrap text-center font-poppins rounded-[3.75px] text-white hover:bg-black/60 w-[132px] h-[31.5px] text-[14.25px] font-normal'>More Details</button>
                </div>

            </div>
        </div>
    )
}

export default AdsCard