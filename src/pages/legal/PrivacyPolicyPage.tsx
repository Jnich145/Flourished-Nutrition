import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Privacy Policy
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Dietary preferences and restrictions</li>
              <li>Health goals and nutritional requirements</li>
              <li>Payment information</li>
              <li>Delivery address</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Process and deliver your orders</li>
              <li>Personalize your meal recommendations</li>
              <li>Communicate with you about our services</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </section>

          {/* Additional sections... */}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 
