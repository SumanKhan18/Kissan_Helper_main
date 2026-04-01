'use client';

import { useState } from 'react';
import Link from 'next/link';
import ChatInterface from './ChatInterface';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface QuickQuestions {
  [key: string]: string[];
}

interface QuickQuestionEvent extends CustomEvent {
  detail: string;
}

export default function ChatPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  const categories: Category[] = [
    { id: 'general', name: 'General Questions', icon: 'ri-question-line' },
    { id: 'crops', name: 'Crops & Plants', icon: 'ri-seedling-line' },
    { id: 'livestock', name: 'Livestock', icon: 'ri-bear-smile-line' },
    { id: 'weather', name: 'Weather & Season', icon: 'ri-cloud-line' },
    { id: 'pest', name: 'Pests & Diseases', icon: 'ri-bug-line' },
    { id: 'equipment', name: 'Equipment & Tools', icon: 'ri-tools-line' },
  ];

  const quickQuestions: QuickQuestions = {
    general: [
      'When should I start planning my next season?',
      'How do I improve soil quality?',
      'What government schemes are available for farmers?',
    ],
    crops: [
      'When is the best time to plant tomatoes?',
      'What fertilizer should I use for wheat?',
      'How much water does rice need daily?',
    ],
    livestock: [
      "What's the right feed schedule for dairy cows?",
      'How do I vaccinate my chickens?',
      'What are signs of healthy goats?',
    ],
    weather: [
      'Will it rain this week in my area?',
      'Is this good weather for harvesting?',
      'How does monsoon affect crop growth?',
    ],
    pest: [
      'How do I treat leaf curl disease in mango trees?',
      "What's eating my corn plants?",
      'Natural ways to control aphids?',
    ],
    equipment: [
      'How do I maintain my tractor?',
      'Which irrigation system is best for me?',
      'When to replace farming tools?',
    ],
  };

  const handleCategoryChange = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  const handleQuickQuestion = (question: string): void => {
    const event: QuickQuestionEvent = new CustomEvent('quickQuestion', {
      detail: question,
    }) as QuickQuestionEvent;
    window.dispatchEvent(event);
  };

  const getCategoryButtonClasses = (categoryId: string): string => {
    return `w-full text-left px-3 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
      selectedCategory === categoryId
        ? 'bg-green-100 text-green-700'
        : 'hover:bg-gray-100 text-gray-700'
    }`;
  };

  const getCurrentQuestions = (): string[] => {
    return quickQuestions[selectedCategory] || [];
  };

  const renderCategoryButton = (category: Category) => (
    <button
      key={category.id}
      onClick={() => handleCategoryChange(category.id)}
      className={getCategoryButtonClasses(category.id)}
      aria-pressed={selectedCategory === category.id}
    >
      <div className="w-5 h-5 inline-flex items-center justify-center mr-2">
        <i className={`${category.icon} text-sm`} aria-hidden="true"></i>
      </div>
      {category.name}
    </button>
  );

  const renderQuickQuestion = (question: string, index: number) => (
    <button
      key={`${selectedCategory}-${index}`}
      className="w-full text-left text-sm text-gray-600 hover:text-green-600 p-2 rounded hover:bg-green-50 transition-colors cursor-pointer"
      onClick={() => handleQuickQuestion(question)}
      aria-label={`Ask: ${question}`}
    >
      {question}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center cursor-pointer"
              aria-label="FarmAssist Home"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-plant-line text-2xl text-green-600" aria-hidden="true"></i>
              </div>
              <span className="ml-2 text-xl font-bold text-green-800 font-pacifico">
                FarmAssist
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8" role="navigation">
              <Link
                href="/weather"
                className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer"
              >
                Weather
              </Link>
              <Link
                href="/crops"
                className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer"
              >
                Crop Guide
              </Link>
              <Link
                href="/livestock"
                className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer"
              >
                Livestock
              </Link>
              <Link
                href="/marketplace"
                className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer"
              >
                Marketplace
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Question Categories</h3>
              <div className="space-y-2" role="tablist">
                {categories.map(renderCategoryButton)}
              </div>
            </div>

            {/* Quick Questions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Questions</h3>
              <div className="space-y-3">
                {getCurrentQuestions().map(renderQuickQuestion)}
              </div>
            </div>
          </aside>

          {/* Chat Interface */}
          <section className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <header className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Ask Your AI Farming Assistant
                </h1>
                <p className="text-gray-600">
                  Ask questions in simple English about crops, livestock, weather, or any
                  farming topic.{' '}
                  <span className="text-green-600 font-medium">
                    Powered by Google Gemini AI
                  </span>
                </p>
              </header>
              <ChatInterface />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
