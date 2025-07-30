import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { FiShield, FiCheckCircle } from "react-icons/fi";

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
};

export type Header62Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header62 = (props: Header62Props) => {
  const { tagline, heading, description, buttons } = {
    ...Header62Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-xl text-center mx-auto">
        <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{heading}</h1>
        <p className="md:text-md">{description}</p>
        <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button key={index} {...button}>
              {button.title}
            </Button>
          ))}
        </div>
        {/* 14-day shield - JEDAN RED ISPOD BUTTONA */}
        <div className="flex items-center justify-center my-10 text-gray-500 text-sm">
          <FiShield className="text-teal-400 mr-1" size={18} />
          14-day money-back option
        </div>
        {/* Stats - SLEDEĆI RED */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-2">
          <StatItem text="<0.3s avg speed" />
          <StatItem text="125M+ IPs" />
          <StatItem text="99.99% uptime" />
          <StatItem text="195+ locations" />
          <StatItem text="#1 response time" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ text }: { text: string }) => (
  <span className="flex items-center text-base">
    <FiCheckCircle className="text-purple-500 mr-2" size={22} />
    {text}
  </span>
);

export const Header62Defaults: Props = {
  tagline: "",
  heading: "",
  description: "New name, even better web data solutions.",
  buttons: [
    {
      title: "Sign up with email",
    },
    {
      title: "Sign up with Google",
      variant: "secondary",
    },
  ],
};

export default Header62;
