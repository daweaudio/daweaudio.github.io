import React from 'react';
import {
  X, Zap, Users, Shield, Music
} from 'lucide-react';

const About = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <span className="text-2xl font-bold text-gray-900">Dawe Audio</span>
              </div>
            </div>
            <button
              onClick={onBack}
              className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Back to Store
            </button>
          </div>
        </div>
      </header>

      {/* About Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Dawe Audio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering the future of music production with innovative plugin technology
          </p>
        </div>

        {/* Company Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2018 by a team of passionate audio engineers and music producers,
              Dawe Audio emerged from a simple vision: to democratize professional-grade
              audio processing tools for creators worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              What started as late-night coding sessions in a small studio has evolved into
              a global community of over 50,000 musicians, producers, and audio professionals
              who rely on our plugins for their creative work.
            </p>
            <p className="text-gray-600">
              Today, we continue to push the boundaries of digital audio processing,
              combining cutting-edge DSP algorithms with intuitive user interfaces.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-purple-200">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold">25+</div>
                <div className="text-purple-200">Award-Winning Plugins</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100+</div>
                <div className="text-purple-200">Countries Reached</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-lg p-8 mb-16 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To empower creators with professional-grade audio tools that inspire
                creativity and elevate artistic expression. We believe that exceptional
                sound quality should be accessible to everyone, regardless of budget or experience level.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading innovator in audio plugin technology, setting new
                standards for sound quality, user experience, and creative possibilities
                in music production worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">DA</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">David Anderson</h4>
              <p className="text-purple-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">20+ years in audio engineering, former Waves Audio senior developer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">SW</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Sarah Wilson</h4>
              <p className="text-purple-600 font-medium mb-2">Head of DSP Development</p>
              <p className="text-gray-600 text-sm">PhD in Digital Signal Processing, pioneering AI-driven audio algorithms</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">MC</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Mike Chen</h4>
              <p className="text-purple-600 font-medium mb-2">Creative Director</p>
              <p className="text-gray-600 text-sm">Grammy-nominated producer, specialized in electronic and orchestral music</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-100 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">Constantly pushing boundaries in audio technology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600 text-sm">Building a supportive ecosystem for creators</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality</h4>
              <p className="text-gray-600 text-sm">Uncompromising standards in every product</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Creativity</h4>
              <p className="text-gray-600 text-sm">Empowering artistic expression through technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;