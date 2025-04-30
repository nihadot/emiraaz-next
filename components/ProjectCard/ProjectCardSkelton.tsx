import Skeleton from "../Skeleton/Skeleton";

function ProjectCardSkelton() {


    return (
        <div className="flex w-full flex-col lg:flex-row gap-8">
            <Skeleton
                className="relative h-[290px] animate-pulse p-4  rounded-md flex  bg-slate-100 lg:w-[350px]"

                rounded=""
            />

            <div className="flex flex-1 flex-col w-full gap-3">

        
                <Skeleton
                    className="relative  animate-pulse h-[40px]  rounded flex  bg-slate-100 w-full"

                    rounded=""
                />
                <Skeleton
                    className="relative animate-pulse h-[40px]  rounded flex  bg-slate-100 w-full"

                    rounded=""
                />
                <Skeleton
                    className="relative animate-pulse h-[40px]  rounded flex  bg-slate-100 w-full"

                    rounded=""
                />

              
                <Skeleton
                    className="relative h-[80px] animate-pulse  rounded flex  bg-slate-100 w-full"
                    rounded=""
                />


                <div className="flex  h-[40px] gap-2">
                    <Skeleton
                        className="relative animate-pulse p-4 h-[40px] rounded flex  bg-slate-100 w-full"
                        rounded=""
                    />
                    <Skeleton

                        className="relative animate-pulse p-4 h-[40px] rounded flex  bg-slate-100 w-full"

                        rounded=""
                    />
                </div>

            </div>


        </div>
    );
}

export default ProjectCardSkelton;
