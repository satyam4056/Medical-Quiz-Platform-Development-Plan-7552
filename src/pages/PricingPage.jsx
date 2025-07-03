import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiX, FiStar, FiZap, FiCrown } = FiIcons;

const PricingPage = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with AI-powered quizzes',
      icon: FiStar,
      color: 'gray',
      features: [
        { text: '5 total quizzes (90-day auto-deletion)', included: true },
        { text: '20 AI-generated questions per month', included: true },
        { text: '5 copy-paste processings per month', included: true },
        { text: 'Basic explanations', included: true },
        { text: 'Last 30 days analytics', included: true },
        { text: 'Community quiz access', included: true },
        { text: 'Detailed medical explanations', included: false },
        { text: 'Unlimited quizzes', included: false },
        { text: 'Priority AI processing', included: false },
        { text: 'Exam-specific insights', included: false }
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$14.99',
      period: 'per month',
      description: 'For serious medical students preparing for exams',
      icon: FiZap,
      color: 'medical',
      features: [
        { text: '25 total quizzes (90-day auto-deletion)', included: true },
        { text: '100 AI-generated questions per month', included: true },
        { text: '30 copy-paste processings per month', included: true },
        { text: 'Detailed medical explanations with diagrams', included: true },
        { text: 'Complete analytics history', included: true },
        { text: 'Favorites feature (prevents auto-deletion)', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced performance tracking', included: true },
        { text: 'Unlimited quiz attempts', included: true },
        { text: 'Export quiz results', included: true }
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Pro Max',
      price: '$24.99',
      period: 'per month',
      description: 'Ultimate solution for medical professionals and serious aspirants',
      icon: FiCrown,
      color: 'purple',
      features: [
        { text: 'Unlimited quizzes (no auto-deletion)', included: true },
        { text: '300 AI-generated questions per month', included: true },
        { text: 'Unlimited copy-paste processing', included: true },
        { text: 'Advanced AI explanations with clinical context', included: true },
        { text: 'Predictive performance analytics', included: true },
        { text: 'Priority AI processing (faster responses)', included: true },
        { text: 'Exam-specific features (NEET/USMLE/PLAB)', included: true },
        { text: 'Custom study schedules', included: true },
        { text: 'Bulk quiz creation', included: true },
        { text: 'API access for integrations', included: true }
      ],
      cta: 'Go Pro Max',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'What happens to my quizzes after 90 days?',
      answer: 'Unpracticed quizzes are automatically deleted after 90 days to keep costs low. You\'ll receive warnings 7 days and 1 day before deletion. Favorited quizzes (Pro tier) are never deleted.'
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes! You can change your plan at any time. When upgrading, you get immediate access to new features. When downgrading, changes take effect at your next billing cycle.'
    },
    {
      question: 'What medical exams are supported?',
      answer: 'We support NEET-UG, NEET-PG, USMLE (Step 1, 2, 3), PLAB (Part 1, 2), KROK, and other medical licensing exams. Our AI is trained on medical curricula and exam patterns.'
    },
    {
      question: 'Is my study data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and follow strict privacy policies. Your study materials and quiz data are never shared with third parties.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! We offer special pricing for verified students. Contact our support team with your student ID for discount eligibility.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="text-center mb-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Choose Your Learning Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Unlock the full potential of AI-powered medical exam preparation
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                plan.popular 
                  ? 'border-medical-500 transform scale-105' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-medical-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.color === 'medical' ? 'bg-medical-100' :
                  plan.color === 'purple' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <SafeIcon 
                    icon={plan.icon} 
                    className={`w-8 h-8 ${
                      plan.color === 'medical' ? 'text-medical-600' :
                      plan.color === 'purple' ? 'text-purple-600' : 'text-gray-600'
                    }`} 
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <SafeIcon 
                      icon={feature.included ? FiCheck : FiX} 
                      className={`w-5 h-5 mr-3 mt-0.5 ${
                        feature.included ? 'text-green-500' : 'text-gray-400'
                      }`} 
                    />
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/auth"
                className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-medical-600 text-white hover:bg-medical-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our pricing and features
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-4"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Medical Studies?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of medical students who are already using AI to ace their exams
          </p>
          <Link
            to="/auth"
            className="bg-medical-600 text-white px-8 py-3 rounded-lg hover:bg-medical-700 transition-colors inline-block font-semibold"
          >
            Start Your Free Trial
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default PricingPage;