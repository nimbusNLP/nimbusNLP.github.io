import Member from "./Member";
const Team = () => {
  return (
    <>
    <section className="sectionB bg-gradient-to-t from-[#FFB703] to-[#FFB803]" id="team">
      <article className="max-w-6xl mx-auto flex flex-col justify-center gap-8 py-20 px-6">
        <h2 className="lp-para text-center text-5xl tracking-wide font-bold text-[#55C2DA] mb-6">Team Nimbus</h2>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 mx-auto">
          <Member
            name="JD Fortune"
            title="Software Engineer"
            image="/img/team/jd.jpeg"
            location="Austin, TX"
            personalWebsite=""
            github="https://github.com/JDFortune"
            linkedin="https://www.linkedin.com/in/jon-david-fortune-4263201b2/"
            email="jondfortune@gmail.com"
          />
          <Member
            name="Richard LoRicco"
            title="Software Engineer"
            image="/img/team/richard.jpeg"
            location="New Haven, CT"
            personalWebsite=""
            github="https://github.com/RichardLoRicco"
            linkedin="https://www.linkedin.com/in/richard-loricco-esq/"
            email="rtlo9962@gmail.com"
          />
          <Member
            name="Chelsea O'Connor"
            title="Software Engineer"
            image="/img/team/chelsea.jpeg"
            location="Austin, TX"
            personalWebsite=""
            github="https://github.com/Chelsoconn"
            linkedin="https://www.linkedin.com/in/chelsea-o-connor-4226a89a/"
            email="chelseaaoconnor1@gmail.com"
          />
          <Member
            name="Satya Patel"
            title="Software Engineer"
            image="/img/team/satya.jpeg"
            location="Jersey City, NJ"
            personalWebsite=""
            github="https://github.com/satyapatel293"
            linkedin="https://www.linkedin.com/in/satya-patel-434646236/"
            email="satyapatel293@gmail.com"
          />
        </div>
      </article>   
    </section>
    
    </>
  );
};

export default Team;