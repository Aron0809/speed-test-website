const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When you use our speed testing service, we may collect the following information:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Network performance data (download speed, upload speed, ping, jitter)</li>
            <li>IP address and approximate location</li>
            <li>Internet Service Provider (ISP) information</li>
            <li>Device and browser information</li>
            <li>Test timestamps and frequency</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>To provide accurate speed test results</li>
            <li>To improve our testing methodology and accuracy</li>
            <li>To generate aggregate statistics and reports</li>
            <li>To optimize our service performance</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Storage and Security</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We implement appropriate technical and organizational measures to protect your data:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Data is encrypted in transit and at rest</li>
            <li>Test results are stored locally in your browser when possible</li>
            <li>We do not store personally identifiable information unnecessarily</li>
            <li>Regular security audits and updates are performed</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cookies and Tracking</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our website uses cookies and similar technologies to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Remember your preferences and settings</li>
            <li>Analyze website usage and performance</li>
            <li>Provide personalized content and recommendations</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may use third-party services for analytics and performance monitoring. These services have their own privacy policies:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Google Analytics (for usage statistics)</li>
            <li>Content Delivery Networks (for improved performance)</li>
            <li>Cloud hosting providers (for service infrastructure)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You have the following rights regarding your data:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Right to access your personal data</li>
            <li>Right to rectify inaccurate data</li>
            <li>Right to erase your data</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Retention</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We retain your data only as long as necessary for the purposes outlined in this policy:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Test history: Stored locally in your browser</li>
            <li>Aggregate statistics: Retained indefinitely in anonymized form</li>
            <li>Server logs: Automatically deleted after 90 days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Posting the updated policy on our website</li>
            <li>Updating the "Last updated" date</li>
            <li>Providing notice for significant changes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-900 dark:text-white font-medium">SpeedPulse Privacy Team</p>
            <p className="text-gray-600 dark:text-gray-300">Email: privacy@speedpulse.com</p>
            <p className="text-gray-600 dark:text-gray-300">Address: [Your Business Address]</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 