import React from "react";
import ComplianceCard from "./ComplianceCard";
import "./ComplianceCardStyles.css";
import hipaaImage from "../assets/hipaa.svg";
import gdprImage from "../assets/gdpr.svg";
import ausPrivacyImage from "../assets/ausprivacy.svg";

const ComplianceSection: React.FC = () => {
  return (
    <section className="compliance-section">
      <h2 className="compliance-section-title">
        Ensure the security and compliance of your healthcare practice
      </h2>
      <p className="compliance-section-subtitle">
        PatientNotes prioritizes the security and confidentiality of your
        patients' data. Our platform meets the highest standards for AI
        applications in medical clinics and hospitals.
      </p>
      <div className="compliance-cards-container">
        <ComplianceCard
          imageSrc={hipaaImage}
          title="HIPAA compliance"
          description="We meet all HIPAA requirements to ensure the confidentiality and security of Protected Health Information (PHI)."
          buttonText="Understand how PatientNotes complies with HIPAA"
          buttonLink="/hipaa-compliance"
        />
        <ComplianceCard
          imageSrc={gdprImage}
          title="GDPR compliance"
          description="We follow the data regulations established by the GDPR, UK GDPR, and UK Data Protection Act to ensure the privacy and security of personal data for individuals within the EU and UK."
          buttonText="Read about how PatientNotes complies with GDPR"
          buttonLink="/gdpr-compliance"
        />
        <ComplianceCard
          imageSrc={ausPrivacyImage}
          title="Australian Privacy Act 1998"
          description="PatientNotes is fully compliant with the Australian Privacy Act 1998 and the Australian Privacy Principles."
          buttonText="Understand how PatientNotes complies with the Australian Privacy Principles"
          buttonLink="/aus-privacy-compliance"
        />
      </div>
    </section>
  );
};

export default ComplianceSection;
