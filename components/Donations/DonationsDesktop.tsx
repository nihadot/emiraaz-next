import Container from '@/components/atom/Container/Container';

export default function DonationsDesktop() {
  return (
    <Container>
      <section className="mt-20 mb-40">
        <div>
          <h1 className="font-poppins mt-[51px] text-center font-medium text-[37.5px]">
            Giving Back to the <span className="text-[#FF1645]">Community</span>
          </h1>

          <p className="mt-[16.5px] text-center text-[12px] font-poppins text-[#000]">
            At PropertySeller, we believe in making a positive impact.
            A portion of our earnings is dedicated to helping those in need.
          </p>
        </div>

        <div className="m-auto mt-[66px] rounded-[5px] border border-[#DEDEDE] max-w-[618px] h-[85.25px] flex justify-center items-center">
          <p className="font-poppins flex items-center gap-2 text-[18.75px]">
            Total Donations as of Now:
            <span className="text-[#FF1645] text-[33.75px]">AED *****</span>
          </p>
        </div>

        <div className="mt-[66px]">
          <p className="text-center text-[16px] font-poppins text-[#333]">
            Thank you for being part of our journey to create a better future!
          </p>
        </div>
      </section>
    </Container>
  );
}
