import React from 'react';
import { Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  image: string;
  delay?: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, image, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className={`card p-6 transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 mb-6">{content}</p>
      <div className="flex items-center gap-4">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { ref: sectionRef, isInView: sectionIsInView } = useInView({ threshold: 0.1 });

  const testimonials = [
    {
      content: "The meals are not only delicious but have helped me maintain a healthy lifestyle. The convenience of having nutritious meals delivered is incredible.",
      author: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
    {
      content: "As a busy professional, Flourished Nutrition has been a game-changer. The meals are fresh, portion-controlled, and absolutely delicious.",
      author: "Michael Chen",
      role: "Tech Executive",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    {
      content: "The variety and quality of meals are outstanding. It's made healthy eating effortless and enjoyable for my whole family.",
      author: "Emma Rodriguez",
      role: "Working Parent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className={`text-center mb-12 transition-all duration-700 ${
            sectionIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers 
            have to say about their Flourished Nutrition experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;