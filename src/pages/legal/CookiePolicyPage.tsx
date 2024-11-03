import React from 'react';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Cookie Policy
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device
              when you visit our website. They help us provide you with a better experience
              by remembering your preferences and how you use our site.
            </p>
          </section>

          <section className="mb-8">
            <h2>How We Use Cookies</h2>
            <p>We use cookies for:</p>
            <ul>
              <li>Essential website functionality</li>
              <li>Remembering your preferences</li>
              <li>Analyzing website traffic</li>
              <li>Personalizing your experience</li>
            </ul>
          </section>

          {/* Additional sections... */}
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage; 
