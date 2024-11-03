import React from 'react';
import { Heart, Users, Leaf, Award, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const AboutPage = () => {
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
    image: "/images/founder.jpg",
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Transforming lives through personalized nutrition and delicious, healthy meals.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={missionRef}
            className={`text-center mb-16 transform transition-all duration-700 ${
              missionIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              At Flourished, we believe that everyone deserves access to nutritious, 
              delicious meals that fuel their body and mind. Our mission is to make 
              healthy eating effortless and enjoyable, one meal at a time.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Founder Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">Meet Our Founder</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-full">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop";
                      }}
                    />
                  </div>
                </div>
                <div className="p-8 md:w-2/3">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{founder.name}</h3>
                  <p className="text-emerald-600 font-medium mb-4">{founder.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{founder.bio}</p>
                  <div className="flex space-x-4">
                    {Object.entries(founder.socialLinks).map(([platform, link]) => (
                      <a
                        key={platform}
                        href={link}
                        className="text-gray-400 hover:text-emerald-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                        {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                        {platform === 'instagram' && <Instagram className="w-5 h-5" />}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
