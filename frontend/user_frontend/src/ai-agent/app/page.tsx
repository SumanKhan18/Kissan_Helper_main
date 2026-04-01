
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-plant-line text-2xl text-green-600"></i>
              </div>
              <span className="ml-2 text-xl font-bold text-green-800 font-pacifico">FarmAssist</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/chat" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Ask Assistant</Link>
              <Link href="/weather" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Weather</Link>
              <Link href="/crops" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Crop Guide</Link>
              <Link href="/livestock" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Livestock</Link>
              <Link href="/marketplace" className="text-gray-700 hover:text-green-600 font-medium whitespace-nowrap cursor-pointer">Marketplace</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20green%20agricultural%20farmland%20with%20rolling%20hills%2C%20golden%20wheat%20fields%20swaying%20in%20the%20breeze%2C%20modern%20farming%20equipment%20in%20the%20distance%2C%20blue%20sky%20with%20white%20clouds%2C%20vibrant%20colors%2C%20professional%20photography%2C%20peaceful%20rural%20landscape%2C%20sustainable%20agriculture%20concept%2C%20high%20quality&width=1200&height=600&seq=hero-farm-1&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Smart Farming Assistant
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Get expert advice on crops, livestock, weather, and farming techniques. 
              From planting to harvest, we&apos;re here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer">
                Ask a Question
              </Link>
              <Link href="/crops" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer">
                Browse Crop Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Help Farmers Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple answers to your farming questions, weather updates, and practical guidance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/chat" className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full flex items-center justify-center">
                <i className="ri-question-answer-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Q&A</h3>
              <p className="text-gray-600">Ask questions in plain English and get practical farming advice</p>
            </Link>
            
            <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
              <Link href="/weather" className="block">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="ri-cloud-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">Weather Updates</h3>
                <p className="text-gray-600">Get local weather forecasts to plan your farming activities</p>
              </Link>
            </div>
            
            <Link href="/crops" className="text-center p-6 rounded-xl bg-yellow-50 hover:bg-yellow-100 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-600 rounded-full flex items-center justify-center">
                <i className="ri-seedling-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Crop Guidance</h3>
              <p className="text-gray-600">Learn about planting, fertilizing, and harvesting different crops</p>
            </Link>
            
            <Link href="/livestock" className="text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-600 rounded-full flex items-center justify-center">
                <i className="ri-bear-smile-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Livestock Care</h3>
              <p className="text-gray-600">Get advice on animal health, feeding, and breeding</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Farming Questions
            </h2>
            <p className="text-xl text-gray-600">
              See what other farmers are asking about
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              { 
                question: "When is the best time to plant tomatoes?",
                answer: "Plant tomatoes 2-3 weeks after the last frost when soil temperature reaches 60°F. Start seeds indoors 6-8 weeks before transplanting."
              },
              { 
                question: "What fertilizer should I use for wheat?",
                answer: "Use nitrogen-rich fertilizer at planting (10-10-10) and side-dress with urea during tillering stage. Apply 80-120 lbs nitrogen per acre."
              },
              { 
                question: "How do I treat leaf curl disease in mango trees?",
                answer: "Remove affected leaves immediately, spray copper fungicide every 15 days, ensure proper drainage, and avoid overhead watering."
              },
              { 
                question: "What&apos;s the right feed schedule for dairy cows?",
                answer: "Feed 3 times daily: morning (6 AM), afternoon (1 PM), evening (6 PM). Provide 2-3% of body weight in dry matter daily."
              },
              { 
                question: "How do I set up a drip irrigation system?",
                answer: "Install main line, add pressure regulators, connect drip lines with emitters spaced 12-18 inches apart. Test water pressure first."
              },
              { 
                question: "Which crops are best for my soil type?",
                answer: "Sandy soil: carrots, radishes, potatoes. Clay soil: broccoli, beans, cabbage. Loamy soil: tomatoes, corn, lettuce."
              },
              { 
                question: "How often should I water my vegetable garden?",
                answer: "Water deeply 2-3 times per week rather than daily shallow watering. Check soil moisture 2 inches deep before watering."
              },
              { 
                question: "What&apos;s the best way to control aphids naturally?",
                answer: "Spray neem oil solution, introduce ladybugs, plant companion crops like marigolds, or use insecticidal soap spray."
              },
              { 
                question: "When should I harvest my corn?",
                answer: "Harvest when silks turn brown and kernels are plump. Press a kernel - milky juice means itapos;s ready, clear juice means wait."
              },
              { 
                question: "How do I improve clay soil for farming?",
                answer: "Add compost, aged manure, and coarse sand. Plant cover crops like clover. Avoid working clay soil when wet."
              },
              { 
                question: "What vaccines do chickens need?",
                answer: "Marek&apos;s disease (day 1), Newcastle disease (14-21 days), infectious bronchitis, and fowl pox. Consult local vet for schedule."
              },
              { 
                question: "How much space do goats need?",
                answer: "Minimum 200 sq ft per goat in dry lot, plus 1/4 to 1/2 acre pasture per goat depending on grass quality and climate."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-chat-3-line text-green-600"></i>
                  </div>
                  <p className="ml-3 text-gray-700 font-medium">{item.question}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 flex items-center justify-center mt-1">
                      <i className="ri-robot-line text-green-600"></i>
                    </div>
                    <p className="ml-2 text-sm text-gray-700">{item.answer}</p>
                  </div>
                </div>
                <Link href="/chat" className="text-green-600 font-medium hover:text-green-700 cursor-pointer">
                  Ask More Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Improve Your Farm?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who are already using FarmAssist to grow better crops and raise healthier livestock
          </p>
          <Link href="/chat" className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer">
            Start Asking Questions
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-plant-line text-2xl text-green-400"></i>
                </div>
                <span className="ml-2 text-xl font-bold font-pacifico">FarmAssist</span>
              </div>
              <p className="text-gray-400">Your smart farming companion for better harvests and healthier livestock.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/chat" className="hover:text-white cursor-pointer">Ask Assistant</Link></li>
                <li><Link href="/weather" className="hover:text-white cursor-pointer">Weather Updates</Link></li>
                <li><Link href="/crops" className="hover:text-white cursor-pointer">Crop Guide</Link></li>
                <li><Link href="/livestock" className="hover:text-white cursor-pointer">Livestock Care</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white cursor-pointer">Marketplace</Link></li>
                <li><a className="hover:text-white cursor-pointer">Government Schemes</a></li>
                <li><a className="hover:text-white cursor-pointer">Training Videos</a></li>
                <li><a className="hover:text-white cursor-pointer">Expert Connect</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a className="hover:text-white cursor-pointer">Help Center</a></li>
                <li><a className="hover:text-white cursor-pointer">Contact Us</a></li>
                <li><a className="hover:text-white cursor-pointer">Community Forum</a></li>
                <li><a className="hover:text-white cursor-pointer">Language Settings</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FarmAssist. Helping farmers grow better.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
