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
        <div className='flex border rounded max-w-[350px] w-full p-4 gap-1 border-[#DEDEDE] bg-white'>
            <div className="flex gap-0 w-full flex-col">
                <p className='text-lg  font-normal font-poppins pb-1 capitalize'>{item.title}</p>
                <p className='text-sm font-normal font-poppins pb-1 capitalize text-black/60 line-clamp-3'>{item.description}</p>

                <div className="w-full h-[1px] bg-black/10 my-2"></div>
                <div className="flex items-center">
                    <Image src={item.image?.secure_url || ''} width={180} height={140} className='w-[180px] h-[140px] p-4 object-contain' alt="" />
                    <button onClick={()=>handleNavigateClick()} className='bg-black h-10 rounded-md text-white px-6 hover:bg-black/60 py-2 text-sm font-normal'>More Details</button>
                </div>

            </div>
        </div>
    )
}

export default AdsCard