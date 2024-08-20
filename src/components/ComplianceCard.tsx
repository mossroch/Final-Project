import React from "react";
import "./ComplianceCardStyles.css";

interface ComplianceCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const ComplianceCard: React.FC<ComplianceCardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="compliance-card">
      <img src={imageSrc} alt={title} className="compliance-card-image" />
      <h3 className="compliance-card-title">{title}</h3>
      <p className="compliance-card-description">{description}</p>
      <a href={buttonLink} className="compliance-card-button">
        {buttonText}
      </a>
    </div>
  );
};

export default ComplianceCard;
