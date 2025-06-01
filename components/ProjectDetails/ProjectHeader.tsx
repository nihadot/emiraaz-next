import clsx from "clsx";

const ProjectHeader = ({  title,contentClassName }: { title?: string;contentClassName?: string }) => (
    <div className="">
      <h1 className={clsx("font-poppins",contentClassName)}>{title}</h1>
    </div>
  );


  export default ProjectHeader;