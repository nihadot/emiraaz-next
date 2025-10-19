'use client'
import Container from "@/components/atom/Container/Container";
import SectionDivider from "@/components/atom/SectionDivider/SectionDivider";
import SpaceWrapper from "@/components/atom/SpaceWrapper/SpaceWrapper";
import PrimaryButton from "@/components/Buttons";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function NotFound() {

  const router = useRouter();
  return (
    <main>
      <Header />

    <SectionDivider
                    containerClassName="mt-[10.5px] mb-[12px]"
                    lineClassName="h-[1px] w-full bg-[#DEDEDE]"
                />
      <Container>

        <div className="max-w-[600px] flex flex-col justify-center items-center w-full m-auto py-24">

          <div className="text-[#FF1645] mt-[20px] text-center m-auto bg-[#FF16451A] w-fit px-4 py-2 font-poppins  font-medium  text-[11px] sm:text-[13.5px] rounded-[5px]">
            404 Error
          </div>

          <p className="font-poppins pt-[15px] text-[30px] sm:text-[37.5px] font-medium text-black text-center">Page Not Found</p>
          <SpaceWrapper
            className="pt-[15px]"
          >

            <Paragraph
              content="We’re sorry, but the page you’re looking for doesn’t exist or may have been moved. It’s possible that the URL was entered incorrectly or the page has been removed from our website."
            />
          </SpaceWrapper>

          <PrimaryButton
            onClick={() => router.push('/')}
            className="bg-[#FF1645] mt-[15px] rounded-[5px] text-white "
          >
            <label htmlFor="" className="text-[14px[ sm:text-[18px] font-poppins font-medium">Back to Homepage</label>
          </PrimaryButton>
        </div>

      </Container>

      <Footer />
    </main>

  );
}




function Paragraph({
  content,
  className
}: {
  content: string,
  className?: string
}) {
  return (
    <p className={clsx('font-poppins font-normal text-[10.5px] sm:text-[12px] text-black', className)}>
      {content}
    </p>
  )
}
