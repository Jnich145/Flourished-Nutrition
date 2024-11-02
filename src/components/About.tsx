import React from 'react';
import { Heart, Users, Leaf, Award, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="card h-full p-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  bio: string;
  socialLinks?: SocialLinks;
  delay?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role, bio, socialLinks, delay = 0 }) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="card overflow-hidden">
        <div className="aspect-w-3 aspect-h-4">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-emerald-600 font-medium mb-3">{role}</p>
          <p className="text-gray-600 mb-4">{bio}</p>
          {socialLinks && (
            <div className="flex space-x-4">
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="text-gray-400 hover:text-emerald-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className="text-gray-400 hover:text-emerald-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} className="text-gray-400 hover:text-emerald-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { ref: missionRef, isInView: missionIsInView } = useInView({ threshold: 0.2 });

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion for Health",
      description: "We're driven by our passion to help people live healthier, more vibrant lives through proper nutrition.",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable Practices",
      description: "Our commitment to sustainability extends from ingredient sourcing to eco-friendly packaging.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Focus",
      description: "We believe in building strong communities through healthy eating and nutritional education.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality First",
      description: "We never compromise on quality, using only the finest ingredients in every meal we prepare.",
    },
  ];

  const founder = {
    image: "/founder.jpg",
    name: "Brianna Nichols",
    role: "Founder & CEO",
    bio: "With a passion for nutrition and wellness, Brianna founded Flourished to make healthy eating accessible and enjoyable for everyone. Her vision combines culinary excellence with nutritional science to create meals that nourish both body and soul.",
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com"
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={missionRef}
          className={`text-center mb-16 transform transition-all duration-700 ${
            missionIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            At Flourished, we believe that everyone deserves access to nutritious, 
            delicious meals that fuel their body and mind. Our mission is to make 
            healthy eating effortless and enjoyable, one meal at a time.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="section-title text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} delay={index * 200} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-title text-center mb-12">Meet Our Founder</h2>
          <div className="max-w-lg mx-auto">
            <TeamMember {...founder} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;