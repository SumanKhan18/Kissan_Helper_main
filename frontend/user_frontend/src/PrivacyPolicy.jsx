import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-lg p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
              <p>We collect information to provide better services to our users and improve their farming experience:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Account information when you register</li>
                <li>Usage data to improve our services</li>
                <li>Farming-related data for personalized recommendations</li>
                <li>Device and location information for regional customization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
              <p>Your information helps us provide and improve our services:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Personalize your farming recommendations</li>
                <li>Improve our agricultural analysis algorithms</li>
                <li>Communicate important updates and features</li>
                <li>Ensure the security of your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
              <p>We implement strict security measures to protect your data:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Encryption of sensitive information</li>
                <li>Regular security audits and updates</li>
                <li>Secure data storage and transmission</li>
                <li>Access controls and monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
              <p>You have control over your data:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Access your personal information</li>
                <li>Request data correction or deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
              <p>If you have any questions about our privacy policy, please contact us at:</p>
              <p className="mt-2">privacy@kissanhelper.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}