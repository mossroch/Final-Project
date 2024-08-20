import React from "react";
import "./TestimonialCardCSS.css";

interface TestimonialCardProps {
  quote: string;
  author: string;
  authorImage: string;
  designation?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  authorImage,
  designation,
}) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-quote">“{quote}”</p>
      <div className="testimonial-author">
        <img src={authorImage} alt={author} className="author-image" />
        <div>
          <h4 className="author-name">{author}</h4>
          {designation && <p className="author-designation">{designation}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
