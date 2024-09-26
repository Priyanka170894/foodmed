

const AboutPage = () => {
  return (
    <>
    
      {/* About Section */}
      <section className="about">
        <div className="container">
          <h1>About FoodMedin</h1>
          <p>
            At FoodMedin, we believe in promoting health and well-being through wholesome nutrition.
            Our mission is to connect you with the best foods tailored to support your health conditions
            and well-being. Whether you are looking to prevent disease, support recovery, or simply live a
            healthier lifestyle, FoodMedin is here for you.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            To empower individuals to make healthier food choices by providing personalized grocery
            recommendations based on their health needs.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="row">
            <div className="col-4">
              <img src="/images/team1.jpg" alt="Team Member 1" />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="col-4">
              <img src="/images/team2.jpg" alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>Chief Nutritionist</p>
            </div>
            <div className="col-4">
              <img src="/images/team3.jpg" alt="Team Member 3" />
              <h3>Mike Johnson</h3>
              <p>Head of Technology</p>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default AboutPage;
