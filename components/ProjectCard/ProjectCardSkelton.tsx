import Skeleton from "../Skeleton/Skeleton";

function ProjectCardSkelton() {


    return (
        <div className="flex w-full h-[410px] mb-4 sm:mb-0 sm:h-[260px] flex-col lg:flex-row gap-2">
            <Skeleton
                className="relative h-[200px] sm:h-[260px] animate-pulse p-4  rounded-md flex  bg-slate-100 lg:w-[350px]"

                rounded=""
            />

            <div className="flex flex-1 flex-col w-full gap-1">

        
                <Skeleton
                    className="relative  animate-pulse h-[30px]  rounded flex  bg-slate-100 w-full"

                    rounded=""
                />
                <Skeleton
                    className="relative animate-pulse h-[30px]  rounded flex  bg-slate-100 w-full"

                    rounded=""
                />
                <Skeleton
                    className="relative animate-pulse h-[30px]  rounded flex  bg-slate-100 w-full"

                    rounded=""
                />

              
                <Skeleton
                    className="relative h-[30px] animate-pulse  rounded flex  bg-slate-100 w-full"
                    rounded=""
                />

                   <Skeleton
                    className="relative h-[30px] animate-pulse  rounded flex  bg-slate-100 w-full"
                    rounded=""
                />


         <Skeleton
                    className="relative h-[30px] animate-pulse  rounded flex  bg-slate-100 w-full"
                    rounded=""
                />


                <div className="flex  h-[53px] gap-2">
                    <Skeleton
                        className="relative animate-pulse p-4 h-full rounded flex  bg-slate-100 w-full"
                        rounded=""
                    />
                    <Skeleton

                        className="relative animate-pulse p-4 h-full rounded flex  bg-slate-100 w-full"

                        rounded=""
                    />
                </div>

            </div>


        </div>
    );
}

export default ProjectCardSkelton;
