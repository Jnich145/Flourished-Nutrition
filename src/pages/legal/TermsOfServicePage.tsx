import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Terms of Service
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Flourished Nutrition's services, you agree to be bound
              by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2>2. Service Description</h2>
            <p>
              Flourished Nutrition provides personalized meal planning and delivery services.
              We reserve the right to modify or discontinue any aspect of our service at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Notify us of any unauthorized use</li>
              <li>Use the service in compliance with all applicable laws</li>
            </ul>
          </section>

          {/* Additional sections... */}
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 
