import React from "react";
import "./PillarsSection.css";

const pillarsData = [
  {
    title: "Customer Focus",
    description: "We prioritize customer needs and deliver exceptional service at every step.",
    icon: "💡",
  },
  {
    title: "Innovation",
    description: "We embrace creativity and push boundaries to create better solutions.",
    icon: "🚀",
  },
  {
    title: "Integrity",
    description: "We act honestly and uphold strong ethical standards in all our actions.",
    icon: "🤝",
  },
  {
    title: "Excellence",
    description: "We strive for perfection and continuous improvement in everything we do.",
    icon: "🌟",
  },
];

const PillarsSection = () => {
  return (
    <section className="pillars-section">
      <h2 className="section-title">Our 4 Pillars</h2>
      <div className="pillars-container">
        {pillarsData.map((pillar, index) => (
          <div className="pillar-card" key={index}>
            <div className="pillar-icon">{pillar.icon}</div>
            <h3 className="pillar-title">{pillar.title}</h3>
            <p className="pillar-description">{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PillarsSection;
