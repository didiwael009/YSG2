import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CALENDLY_URL } from "@/lib/constants";

const TeardownCTA = ({
  title,
  body,
  button,
}: {
  title: string;
  body: string;
  button: string;
}) => (
  <section className="rounded-[30px] bg-[#11111f] px-6 py-10 text-center text-white shadow-[0_28px_80px_rgba(7,7,17,0.22)] md:px-11">
    <span className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.09em] text-primary">
      Next step
    </span>
    <h2 className="mb-3 mt-0 font-display text-[31px] font-bold leading-[1.02] text-white md:text-[40px]">
      {title}
    </h2>
    <p className="mx-auto mb-6 max-w-[520px] text-base leading-[1.65] text-[#d0cad9]">{body}</p>
    <Button variant="hero" size="lg" asChild>
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
        {button}
        <ArrowRight className="ml-1 h-4 w-4" />
      </a>
    </Button>
  </section>
);

export default TeardownCTA;
