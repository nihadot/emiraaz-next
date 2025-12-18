type SectionTitleProps = {
  text: string;
};

export default function SectionTitle({ text }: SectionTitleProps) {
  return (
    <h2 className="text-base font-poppins font-semibold text-black">
      {text}
    </h2>
  );
}
