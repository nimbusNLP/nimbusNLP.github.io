import Team from "./Team";
import FadeInSection from "./FadeInSection";

const Section0 = () => {
  return (
    <div className="max-w-full mx-auto flex flex-wrap md:flex-nowrap justify-center gap-5 py-8 2xl:px-48 lg:py-20 px-8 bg-gray-200 sectionA place-items-center">
      <div className="w-full sm:w-[100%] md:w-[90%] 2xl:w-[85%] block">
        <img
          src="/img/highLevelArch.png"
          alt="Change Data Capture using the outbox pattern"
        />
      </div>
      <div className="text-center md:w-[60%]">
        <h1 className="text-[#55C2DA] text-4xl md:text-[4rem] font-medium tracking-tight leading-tight md:leading-[52px] mt-0 text-right">
          Why Nimbus?
        </h1>
        <p className="text-[#003049] text-2xl tracking-wide mt-6 mb-2 text-right font-normal pl-[150px]">
          NLP models don’t create value until they’re deployed. Nimbus bridges
          the gap between training and production with a seamless, CLI-driven
          experience.
        </p>
      </div>
    </div>
  );
};

const Section1 = () => {
  return (
    <div className="max-w-full mx-auto flex flex-wrap md:flex-nowrap justify-start py-8 gap-5 2xl:px-48 lg:py-20 px-8 items-center">
      <div className="text-center py-0">
        <h1 className="text-[#55C2DA] text-left text-4xl md:text-[4rem] font-medium tracking-tight leading-tight md:leading-[52px] mt-0">
        Simplified CLI interface
        </h1>
        <p className="text-[#003049] text-2xl tracking-wide mt-6 mb-2 text-left font-normal max-w-[1200px] pr-[200px]">
        Install, configure, deploy, and test—all from your terminal. No extra dashboards, no boilerplate code.
        </p>
      </div>
      <div className="w-full sm:w-[80%] md:w-[60%] block">
        <img
          src="/img/FinalShortenedFullDeployment.gif"
          alt="Tumbleweed Roll Clip"
          className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
        />
      </div>
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="max-w-full mx-auto flex flex-wrap md:flex-nowrap justify-center gap-5 py-8 2xl:px-48 lg:py-20 bg-gray-200 px-8 sectionA place-items-center">
      <div className="w-full sm:w-[100%] md:w-[90%] 2xl:w-[85%] block">
        <img src="/img/APIChart.png" alt="API chart image" />
      </div>
      <div className="text-center md:w-[60%]">
        <h1 className="text-[#55C2DA] text-4xl md:text-[4rem] font-medium tracking-tight leading-tight md:leading-[52px] mt-0 text-right">
         Local Model to Cloud Endpoint
        </h1>
        <p className="text-[#003049] text-2xl tracking-wide mt-6 mb-2 text-right font-normal pl-[50px]">
          Nimbus automates deployment using AWS CDK and Dockerized Lambda, turning your models into secure, scalable API endpoints with just a few CLI commands—no DevOps expertise required.
        </p>
      </div>
    </div>
  );
};

export default function HomepageFeatures(): JSX.Element {
  return (
    <div className="flex flex-col homePage_main">
      <FadeInSection fadeDistance={350}>
        <Section0 />
      </FadeInSection>
      <FadeInSection fadeDistance={350}>
        <Section1 />
      </FadeInSection>
      <FadeInSection fadeDistance={350}>
        <Section2 />
      </FadeInSection>
      <FadeInSection fadeDistance={350}>
        <Team />
      </FadeInSection>
    </div>
  );
}
