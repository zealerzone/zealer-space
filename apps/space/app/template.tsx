import { MotionMain } from "@ui/index";

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionMain
      variants={variants}
      initial="hidden"
      animate="enter"
      className="h-cover flex-col"
      transition={{ type: "linear", delay: 0.1, duration: 0.2 }}
    >
      {children}
    </MotionMain>
  );
};

export default Template;
