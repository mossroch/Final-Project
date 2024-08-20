// src/components/TestimonialsGrid.tsx
import React from "react";
import TestimonialCard from "./TestimonialCard";
import "./TestimonialGridCSS.css";

const TestimonialsGrid: React.FC = () => {
  return (
    <div className="testimonials-grid">
      <TestimonialCard
        quote="After practicing for 14 years in both the United States and Australia, high quality documentation is something I feel passionate about..."
        author="Sian Smale"
        authorImage="path/to/sian-smale.jpg"
      />
      <TestimonialCard
        quote="PatientNotes has significantly changed the detail and accuracy with which I can document. It allows me to spend more time on tasks beyond admin..."
        author="Sarah Yule"
        authorImage="path/to/sarah-yule.jpg"
        designation="physica"
      />
      <TestimonialCard
        quote="As a practicing Musculoskeletal Physiotherapist for over forty years, I believe this innovation has improved the ease and thoroughness of my clinical assessment..."
        author="Greg Collis-Brown"
        authorImage="path/to/greg-collis-brown.jpg"
      />
      <TestimonialCard
        quote="I find that my patients really value the patient summary I provide, I always hear that 'no other Physio has done this for them before'..."
        author="Matthew Anderson"
        authorImage="path/to/matthew-anderson.jpg"
      />
      <TestimonialCard
        quote="One feature that I particularly like is the ability to verbally conduct the assessment..."
        author="Trish Edwards"
        authorImage="path/to/trish-edwards.jpg"
      />
    </div>
  );
};

export default TestimonialsGrid;
