import React from 'react';

interface SlideProps {
  id: string;
  isActive: boolean;
  children: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ id, isActive, children }) => {
  return (
    <section className={`slide ${isActive ? 'active' : ''}`} id={id}>
      <div className="slide-content">
        {children}
      </div>
    </section>
  );
};

export default Slide;
