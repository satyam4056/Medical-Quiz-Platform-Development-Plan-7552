import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useQuizStore } from '../../store/quizStore';

const { FiBrain, FiSettings, FiPlay } = FiIcons;

const AIQuizGenerator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: '',
    subtopic: '',
    difficulty: 'intermediate',
    questionCount: 10,
    examType: 'NEET-UG'
  });

  const { generateAIQuiz, isLoading } = useQuizStore();
  const navigate = useNavigate();

  const medicalTopics = [
    {
      name: 'Anatomy',
      subtopics: ['Human Anatomy', 'Cardiovascular System', 'Respiratory System', 'Nervous System', 'Muscular System']
    },
    {
      name: 'Physiology',
      subtopics: ['Cell Physiology', 'Cardiovascular Physiology', 'Respiratory Physiology', 'Renal Physiology', 'Endocrine System']
    },
    {
      name: 'Pharmacology',
      subtopics: ['Drug Mechanisms', 'Cardiovascular Drugs', 'Antibiotics', 'CNS Drugs', 'Drug Interactions']
    },
    {
      name: 'Pathology',
      subtopics: ['General Pathology', 'Systemic Pathology', 'Clinical Pathology', 'Immunopathology', 'Molecular Pathology']
    },
    {
      name: 'Microbiology',
      subtopics: ['Bacteriology', 'Virology', 'Mycology', 'Parasitology', 'Immunology']
    },
    {
      name: 'Biochemistry',
      subtopics: ['Protein Structure', 'Enzyme Kinetics', 'Metabolism', 'Molecular Biology', 'Clinical Biochemistry']
    }
  ];

  const examTypes = [
    { value: 'NEET-UG', label: 'NEET-UG (Undergraduate)' },
    { value: 'NEET-PG', label: 'NEET-PG (Postgraduate)' },
    { value: 'USMLE-Step1', label: 'USMLE Step 1' },
    { value: 'USMLE-Step2', label: 'USMLE Step 2' },
    { value: 'PLAB', label: 'PLAB (UK)' },
    { value: 'KROK', label: 'KROK (Ukraine)' }
  ];

  const difficulties = [
    { value: 'basic', label: 'Basic Concepts', description: 'Fundamental medical concepts' },
    { value: 'intermediate', label: 'Intermediate', description: 'Clinical application level' },
    { value: 'advanced', label: 'Advanced', description: 'Complex clinical scenarios' }
  ];

  const handleTopicSelect = (topic) => {
    setFormData(prev => ({ ...prev, topic, subtopic: '' }));
    setStep(2);
  };

  const handleSubtopicSelect = (subtopic) => {
    setFormData(prev => ({ ...prev, subtopic }));
    setStep(3);
  };

  const handleGenerate = async () => {
    try {
      const result = await generateAIQuiz(
        formData.subtopic || formData.topic,
        formData.difficulty,
        formData.questionCount
      );

      if (result.success) {
        toast.success('Quiz generated successfully!');
        navigate(`/quiz/${result.quiz.id}`);
      } else {
        toast.error(result.error || 'Failed to generate quiz');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select a Medical Topic
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicalTopics.map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => handleTopicSelect(topic.name)}
                  className="text-left p-4 border border-gray-200 rounded-lg hover:border-medical-500 hover:bg-medical-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-2">{topic.name}</h4>
                  <p className="text-sm text-gray-600">
                    {topic.subtopics.length} subtopics available
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        const currentTopic = medicalTopics.find(t => t.name === formData.topic);
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Choose {formData.topic} Subtopic
              </h3>
              <button
                onClick={() => setStep(1)}
                className="text-medical-600 hover:text-medical-700 text-sm"
              >
                Change Topic
              </button>
            </div>
            
            <button
              onClick={() => handleSubtopicSelect('Overall Topic')}
              className="w-full text-left p-4 border-2 border-medical-200 rounded-lg hover:border-medical-500 hover:bg-medical-50 transition-colors mb-4"
            >
              <h4 className="font-medium text-medical-600 mb-2">Overall {formData.topic}</h4>
              <p className="text-sm text-gray-600">
                Mixed questions covering all aspects of {formData.topic}
              </p>
            </button>

            <div className="grid grid-cols-1 gap-3">
              {currentTopic?.subtopics.map((subtopic) => (
                <button
                  key={subtopic}
                  onClick={() => handleSubtopicSelect(subtopic)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-medical-500 hover:bg-medical-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">{subtopic}</h4>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Quiz Configuration
              </h3>
              <button
                onClick={() => setStep(2)}
                className="text-medical-600 hover:text-medical-700 text-sm"
              >
                Change Subtopic
              </button>
            </div>

            <div className="bg-medical-50 border border-medical-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-medical-800 mb-2">Selected Topic</h4>
              <p className="text-medical-700">
                {formData.topic} → {formData.subtopic}
              </p>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Questions
              </label>
              <div className="flex space-x-3">
                {[5, 10, 15, 20, 25].map((count) => (
                  <button
                    key={count}
                    onClick={() => setFormData(prev => ({ ...prev, questionCount: count }))}
                    className={`px-4 py-2 rounded-lg border ${
                      formData.questionCount === count
                        ? 'border-medical-500 bg-medical-50 text-medical-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="space-y-3">
                {difficulties.map((diff) => (
                  <label key={diff.value} className="flex items-start">
                    <input
                      type="radio"
                      name="difficulty"
                      value={diff.value}
                      checked={formData.difficulty === diff.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="mt-1 text-medical-600 focus:ring-medical-500"
                    />
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">{diff.label}</div>
                      <div className="text-sm text-gray-600">{diff.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Exam Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Type
              </label>
              <select
                value={formData.examType}
                onChange={(e) => setFormData(prev => ({ ...prev, examType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500"
              >
                {examTypes.map((exam) => (
                  <option key={exam.value} value={exam.value}>
                    {exam.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-medical-600 text-white py-3 px-6 rounded-lg hover:bg-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating Quiz...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiBrain} className="w-5 h-5" />
                    <span>Generate Quiz with AI</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNum 
                ? 'bg-medical-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNum}
            </div>
            {stepNum < 3 && (
              <div className={`w-12 h-0.5 mx-2 ${
                step > stepNum ? 'bg-medical-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {renderStep()}
    </div>
  );
};

export default AIQuizGenerator;