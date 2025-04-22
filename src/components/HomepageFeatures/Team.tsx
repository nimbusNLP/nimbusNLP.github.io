import Member from "./Member";
const Team = () => {
  return (
    <>
    <section className="sectionB bg-gradient-to-t from-[#FFB703] to-[#FFB703]" id="team">
      <article className="max-w-6xl mx-auto flex flex-col justify-center gap-8 py-20 px-6">
        <h2 className="lp-para text-center text-5xl tracking-wide font-bold text-[#55C2DA] mb-6">Team Nimbus</h2>
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 mx-auto">
          <Member
            name="Chelsea O'Connor"
            title="Software Engineer"
            image="/img/nimbusMain.png"
            location="Austin, TX"
            personalWebsite=""
            github="https://github.com/archzedzenrun"
            linkedin="https://www.linkedin.com/in/cruz-hernandez-968778314/"
            email="cmhernandezdev@gmail.com"
          />
          <Member
            name="Satya Patel"
            title="Software Engineer"
            image="/img/nimbusMain.png"
            location="Jersey City, NJ"
            personalWebsite=""
            github="https://github.com/nickperry12"
            linkedin="https://www.linkedin.com/in/nick-perry-9b86b2318/"
            email="nick.perry604@gmail.com"
          />
          <Member
            name="JD Fortune"
            title="Software Engineer"
            image="/img/nimbusMain.png"
            location="Austin, TX"
            personalWebsite=""
            github="https://github.com/jeffbbz"
            linkedin="https://www.linkedin.com/in/paco-michelson-29702b1b5/"
            email="paco.michelson@gmail.com"
          />
          <Member
            name="Richard LoRicco"
            title="Software Engineer"
            image="/img/nimbusMain.png"
            location="New Haven, CT"
            personalWebsite=""
            github="https://github.com/ekim1009"
            linkedin="https://www.linkedin.com/in/esther-kim-189787b0/"
            email="esther.kim0910@gmail.com"
          />
        </div>
        {/* <img className="cactus" src="../../img/cactus_cursor2.png"/> */}
      </article>   
    </section>
    
    </>
  );
};

export default Team;