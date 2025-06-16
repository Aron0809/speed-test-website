const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Agreement to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            By accessing and using SpeedPulse ("the Service"), you agree to be bound by these Terms of Service ("Terms"). 
            If you do not agree to these Terms, please do not use our Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Description of Service</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            SpeedPulse provides internet speed testing services that measure your connection's:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Download speed</li>
            <li>Upload speed</li>
            <li>Ping latency</li>
            <li>Connection quality metrics</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our service is provided "as is" and is intended for personal and commercial use in accordance with these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Acceptable Use</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You agree to use our Service responsibly and in compliance with all applicable laws. You must not:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Use the Service for any unlawful purpose or in violation of any local, state, national, or international law</li>
            <li>Attempt to interfere with, compromise, or disrupt the Service or its servers</li>
            <li>Use automated scripts or bots to abuse the testing service</li>
            <li>Attempt to reverse engineer or extract the source code of our Service</li>
            <li>Use the Service to transmit harmful, threatening, or inappropriate content</li>
            <li>Overload our servers with excessive testing requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Test Accuracy and Limitations</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            While we strive to provide accurate speed test results, several factors may affect accuracy:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>Network congestion and traffic</li>
            <li>Device performance and capabilities</li>
            <li>Browser limitations and settings</li>
            <li>Geographic distance to test servers</li>
            <li>Internet service provider throttling or limitations</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Test results are provided for informational purposes only and should not be considered as guaranteed 
            performance metrics or used as the sole basis for technical or business decisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property of 
            SpeedPulse and its licensors. The Service is protected by copyright, trademark, and other laws. 
            Our trademarks and trade dress may not be used without our prior written consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Data and Privacy</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
            to understand our practices regarding the collection and use of your information.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            By using our Service, you acknowledge that we may collect and use technical data and related information, 
            including but not limited to technical information about your device, system, and performance data to improve our Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Service Availability</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We strive to maintain high service availability, but we do not guarantee that:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
            <li>The Service will be available at all times without interruption</li>
            <li>The Service will be error-free or completely secure</li>
            <li>Any errors or defects will be corrected immediately</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Disclaimer of Warranties</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, 
            INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR REQUIREMENTS, BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            IN NO EVENT SHALL SPEEDPULSE, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, 
            DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Indemnification</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You agree to defend, indemnify, and hold harmless SpeedPulse and its licensee and licensors, and their employees, 
            contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, 
            liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Termination</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
            including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibent text-gray-900 dark:text-white mb-4">Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
            we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions. 
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-900 dark:text-white font-medium">SpeedPulse Legal Team</p>
            <p className="text-gray-600 dark:text-gray-300">Email: legal@speedpulse.com</p>
            <p className="text-gray-600 dark:text-gray-300">Address: [Your Business Address]</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService; 