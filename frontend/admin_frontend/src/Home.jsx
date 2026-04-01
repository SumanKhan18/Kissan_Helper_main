import React from 'react';
import { ArrowRight, Users, Shield, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Galaxy from './block/Galaxy';
import LightRays from './block/LightRays';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Efficiently manage all your users with advanced admin tools',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security with role-based access control',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Zap,
      title: 'Real-time Analytics',
      description: 'Get insights with live data and comprehensive reporting',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: TrendingUp,
      title: 'Growth Tracking',
      description: 'Monitor your platform growth with detailed metrics',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Page Content */}
      <div className="relative z-10 mb-5">
        {/* LightRay Background */}
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-in fade-in-50 slide-in-from-bottom-10 duration-1000">
              <h1 className="text-6xl font-bold text-white mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                  KissanHelper
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Powerful admin dashboard for managing your agricultural platform with
                advanced analytics, user management, and real-time monitoring capabilities.
              </p>
            </div>

            <div className="animate-in fade-in-50 slide-in-from-bottom-50 duration-1000 delay-1000">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate(user ? '/layout' : '/Login')}
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Admin Features</h2>
            <p className="text-slate-300 text-lg">
              Everything you need to manage your agricultural platform effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all transform hover:scale-105 hover:shadow-2xl animate-in fade-in-50 slide-in-from-bottom-10 duration-1000"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section (optional) */}
        {/*
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '10K+', label: 'Active Users', color: 'from-blue-500 to-blue-600' },
              { number: '95%', label: 'Uptime', color: 'from-green-500 to-green-600' },
              { number: '24/7', label: 'Support', color: 'from-purple-500 to-purple-600' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 animate-in fade-in-50 slide-in-from-bottom-10 duration-1000"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-slate-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Home;
