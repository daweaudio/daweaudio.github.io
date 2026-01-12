import React, { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, X, Check, Star, Cpu, Download, Users, Shield,
  Zap, Music, Headphones, Volume2, Play, ChevronRight, Menu,
  AudioLines, Settings, Layers, BarChart3, Sliders, Minimize2,
  Radio, Clock, User, Eye, EyeOff, Mail, Lock
} from 'lucide-react';
import About from './About';
import Login from './Login';
import Profile from './Profile';
import { authUtils } from './services/api';
import './styles.css'; // Import the CSS file

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 用于管理下拉菜单延迟关闭的timer
  const dropdownTimerRef = useRef(null);

  // 检查用户认证状态
  useEffect(() => {
    const checkAuthStatus = () => {
      const isAuth = authUtils.isAuthenticated();
      const user = authUtils.getCurrentUser();
      setIsAuthenticated(isAuth);
      setCurrentUser(user);
    };

    checkAuthStatus();
  }, []);

  // 处理认证成功
  const handleAuthSuccess = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  // 处理用户信息更新
  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  // 处理登出
  const handleLogout = () => {
    authUtils.clearAuth();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // Product Data
  const plugins = [
    {
      id: 1,
      name: 'Synth Master Pro',
      category: 'synthesizer',
      price: 199,
      rating: 4.8,
      reviews: 324,
      description: 'Powerful analog synthesizer with endless sound design possibilities',
      features: ['500+ Presets', 'Dual Layer Architecture', 'MPE Support'],
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'Reverb Space',
      category: 'effect',
      price: 89,
      rating: 4.9,
      reviews: 567,
      description: 'Professional reverb processor for creating perfect spatial depth',
      features: ['Real Space Simulation', '50+ Presets', 'CPU Optimized'],
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      name: 'Beat Maker Studio',
      category: 'drums',
      price: 149,
      rating: 4.7,
      reviews: 892,
      description: 'Professional drum machine plugin for creating powerful beats',
      features: ['1000+ Samples', 'Step Sequencer', 'MIDI Learn'],
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      name: 'Vocal Enhance AI',
      category: 'vocal',
      price: 299,
      rating: 5.0,
      reviews: 156,
      description: 'AI-powered vocal processor for professional sound',
      features: ['AI Enhancement', 'Auto-Tune', 'Harmony Generator'],
      image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 5,
      name: 'Bass Station X',
      category: 'bass',
      price: 129,
      rating: 4.6,
      reviews: 445,
      description: 'Deep and powerful bass synthesizer',
      features: ['Analog Modeling', 'Sidechain Compression', 'Vintage Mode'],
      image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 6,
      name: 'Master Limiter Pro',
      category: 'mastering',
      price: 179,
      rating: 4.9,
      reviews: 721,
      description: 'Mastering limiter for making your music louder',
      features: ['Transparent Limiting', 'Stereo Enhancement', 'A/B Compare'],
      image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];

  // Category Data
  const categories = [
    { id: 'all', name: 'All', icon: Music },
    { id: 'analyzer', name: 'Analyzer', icon: BarChart3 },
    { id: 'eq', name: 'EQ', icon: Sliders },
    { id: 'compressor', name: 'Compressor', icon: Minimize2 },
    { id: 'limiter', name: 'Limiter', icon: Shield },
    { id: 'reverb', name: 'Reverb', icon: Radio },
    { id: 'delay', name: 'Delay', icon: Clock }
  ];

  const filteredPlugins = activeCategory === 'all' 
    ? plugins 
    : plugins.filter(p => p.category === activeCategory);

  const addToCart = (plugin) => {
    // 检查用户是否已登录
    if (!isAuthenticated) {
      // 未登录时，打开购物车侧边栏显示登录提示
      setCartOpen(true);
      return;
    }

    const existing = cart.find(item => item.id === plugin.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === plugin.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...plugin, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      const headerHeight = 64; // header高度 (h-16 = 64px)
      const elementPosition = productsSection.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showAboutPage ? (
        <About onBack={() => setShowAboutPage(false)} />
      ) : showLoginPage ? (
        <Login
          onBack={() => setShowLoginPage(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      ) : showProfilePage ? (
        <Profile
          onBack={() => setShowProfilePage(false)}
          currentUser={currentUser}
          onUserUpdate={handleUserUpdate}
        />
      ) : (
      <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <span className="text-2xl font-bold text-gray-900">Dawe Audio</span>
              </div>
              <nav className="hidden md:ml-10 md:flex space-x-8">
                <div
                  className="relative"
                  onMouseEnter={() => {
                    // 清除任何现有的关闭timer
                    if (dropdownTimerRef.current) {
                      clearTimeout(dropdownTimerRef.current);
                    }
                    setProductsDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    // 设置延迟关闭，让用户有时间移动到下拉菜单
                    dropdownTimerRef.current = setTimeout(() => {
                      setProductsDropdownOpen(false);
                    }, 300);
                  }}
                >
                  <a
                    href="#"
                    className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-1 py-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    Products
                    <ChevronRight className={`w-4 h-4 transform transition-transform ${productsDropdownOpen ? 'rotate-90' : 'rotate-0'}`} />
                  </a>

                  {/* Dropdown Menu */}
                  {productsDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      onMouseEnter={() => {
                        // 进入菜单时清除关闭timer
                        if (dropdownTimerRef.current) {
                          clearTimeout(dropdownTimerRef.current);
                        }
                        setProductsDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        // 离开菜单时立即关闭
                        setProductsDropdownOpen(false);
                      }}
                    >
                      {categories.filter(cat => cat.id !== 'all').map(category => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={category.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCategory(category.id);
                              scrollToProducts();
                              setProductsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-purple-600"
                          >
                            <Icon className="w-4 h-4" />
                            {category.name}
                          </button>
                        );
                      })}
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCategory('all');
                          scrollToProducts();
                          setProductsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-gray-700 hover:text-purple-600 font-medium"
                      >
                        <Music className="w-4 h-4" />
                        View All Products
                      </button>
                    </div>
                  )}
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToBottom();
                  }}
                  className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                >
                  Support
                </a>
                {/* <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAboutPage(true);
                  }}
                  className="text-gray-700 hover:text-purple-600 transition-colors py-2"
                >
                  About
                </a> */}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button
                    onClick={() => setShowProfilePage(true)}
                    className="flex items-center gap-2 p-2 text-gray-700 hover:text-purple-600 transition-colors"
                    title={`Hello, ${currentUser?.name} - Click to view profile`}
                  >
                    <User className="w-6 h-6" />
                    <span className="hidden md:block text-sm font-medium">
                      {currentUser?.name}
                    </span>
                  </button>
                  {/* 用户下拉菜单 */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                      <p className="text-sm text-gray-500">{currentUser?.email}</p>
                    </div>
                    <button
                      onClick={() => setShowProfilePage(true)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginPage(true)}
                  className="p-2 text-gray-700 hover:text-purple-600 transition-colors"
                  title="Login / Register"
                >
                  <User className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-4 py-2 space-y-1">
            <a href="#" className="block py-2 text-gray-700">Products</a>
            <a href="#" className="block py-2 text-gray-700">Showcase</a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToBottom();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-gray-700"
            >
              Support
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowAboutPage(true);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-gray-700"
            >
              About
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center relative" style={{minHeight: '70vh'}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Music Production Plugins
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Unleash your creativity, craft perfect sounds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToProducts}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors btn-press"
              >
                Browse Products
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors btn-press">
                Free Trial
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated Sine Wave Divider - Based on wave.html implementation */}
        <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
          <svg
            className="waves-static"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              {/* Mathematical sine wave path - animated version */}
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="sine-layers">
              {/* Multiple layers for depth and animation effect */}
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="7"
                fill="#fff"
              />
            </g>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white flex items-center relative" style={{minHeight: '25vh', zIndex: 1}}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AudioLines className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">High Quality Audio</h3>
                <p className="text-gray-600 text-sm">32-bit floating point precision</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Settings className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Full Automation</h3>
                <p className="text-gray-600 text-sm">Complete DAW automation support</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Layers className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Universal Format</h3>
                <p className="text-gray-600 text-sm">VST3, AU, AAX compatibility</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Free Updates</h3>
                <p className="text-gray-600 text-sm">Continuous upgrades included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="products-section" className="pt-8 pb-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pt-4 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Plugins
          </h2>
          {filteredPlugins.length === 0 ? (
            <div
              className="flex items-center justify-center"
              style={{ height: 'calc(110vh - 400px)' }}
            >
              <p className="text-5xl md:text-6xl text-gray-400 font-bold">Not Available For Now</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlugins.map(plugin => (
              <div key={plugin.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow plugin-card">
                <div className="h-48 rounded-t-xl" style={{ background: plugin.image }}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{plugin.name}</h3>
                  <p className="text-gray-600 mb-4">{plugin.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(plugin.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {plugin.rating} ({plugin.reviews} reviews)
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {plugin.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${plugin.price}</span>
                    <button
                      onClick={() => addToCart(plugin)}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 btn-press ${
                        isAuthenticated
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-300 text-gray-600 hover:bg-gray-400 cursor-pointer'
                      }`}
                      title={isAuthenticated ? 'Add to Cart' : 'Please sign in to add items to cart'}
                    >
                      {isAuthenticated ? (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </>
                      ) : (
                        <>
                          <User className="w-4 h-4" />
                          Sign in to Buy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform z-50 ${
        cartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {!isAuthenticated ? (
            <div className="text-center py-8">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Please Sign In</h3>
              <p className="text-gray-500 mb-6">You need to sign in to add items to your cart and make purchases.</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  setShowLoginPage(true);
                }}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Sign In / Register
              </button>
            </div>
          ) : cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quantity: {item.quantity}</span>
                    <span className="font-semibold">${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {isAuthenticated && cart.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-purple-600">${getTotalPrice()}</span>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold btn-press">
              Checkout Now
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <span className="text-2xl font-bold">Dawe Audio</span>
              </div>
              <p className="text-gray-400">Professional music production plugin provider</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Analyzer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">EQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compressor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Limiter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <p className="text-gray-400 mb-4">Subscribe for latest product updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-500"
                />
                <button className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Dawe Audio. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </>
      )}
    </div>
  );
};

export default App;