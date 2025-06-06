import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Mail, Zap, Shield, Terminal } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

const AuthInterface: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus first field when switching modes
    setTimeout(() => {
      if (isLogin) {
        emailRef.current?.focus();
      } else {
        usernameRef.current?.focus();
      }
    }, 300);
  }, [isLogin]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call
    setTimeout(() => {
      if (isLogin) {
        if (formData.email && formData.password) {
          setSuccess('Welcome back, Operator');
        } else {
          setError('ERROR: Invalid credentials detected');
        }
      } else {
        if (formData.username && formData.email && formData.password && formData.confirmPassword) {
          if (formData.password === formData.confirmPassword) {
            setSuccess('Identity forged successfully');
          } else {
            setError('ERROR: Password confirmation mismatch');
          }
        } else {
          setError('ERROR: All fields required for identity creation');
        }
      }
      setIsLoading(false);
    }, 2000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', username: '' });
    setError('');
    setSuccess('');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -20 : 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1] 
      }
    },
    exit: { 
      opacity: 0, 
      x: isLogin ? 20 : -20,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "reverse" as const 
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-matter-900 carbon-texture flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vivid-purple opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Floating Revenant Sigil */}
      <div className="absolute top-8 right-8 opacity-15">
        <Zap className="h-16 w-16 text-blood-red" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Container */}
        <div className="glassmorphism-auth rounded-lg p-8 relative overflow-hidden">
          {/* Scanning Line Effect */}
          <div className="scanline-auth"></div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Shield className="h-8 w-8 text-blood-red mr-2" />
              <h1 className="font-sans font-bold text-2xl tracking-wider glow-text-red">
                REVENANT
              </h1>
            </motion.div>
            
            <motion.p
              className="text-gray-400 font-mono text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isLogin ? 'SYSTEM ACCESS PORTAL' : 'IDENTITY FORGE PROTOCOL'}
            </motion.p>
          </div>

          {/* Mode Toggle */}
          <div className="flex mb-6 bg-dark-matter-700 rounded-lg p-1">
            <button
              onClick={() => !isLogin && toggleMode()}
              className={`flex-1 py-2 px-4 rounded-md font-mono text-sm transition-all duration-300 ${
                isLogin 
                  ? 'bg-electric-blue text-dark-matter-900 glow-border-blue' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => isLogin && toggleMode()}
              className={`flex-1 py-2 px-4 rounded-md font-mono text-sm transition-all duration-300 ${
                !isLogin 
                  ? 'bg-vivid-purple text-white glow-border-purple' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              REGISTER
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'register'}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Username (Register only) */}
              {!isLogin && (
                <div className="relative">
                  <div className={`
                    flex items-center border rounded-md transition-all duration-300
                    ${focusedField === 'username' 
                      ? 'border-vivid-purple shadow-neon-purple' 
                      : 'border-gray-700'
                    }
                  `}>
                    <span className="text-vivid-purple pl-3 font-mono">></span>
                    <User className="h-4 w-4 text-gray-500 ml-2" />
                    <input
                      ref={usernameRef}
                      type="text"
                      value={formData.username || ''}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="operator_designation"
                      className="bg-transparent py-3 px-3 w-full focus:outline-none font-mono text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <div className={`
                  flex items-center border rounded-md transition-all duration-300
                  ${focusedField === 'email' 
                    ? 'border-electric-blue shadow-neon-blue' 
                    : 'border-gray-700'
                  }
                `}>
                  <span className="text-electric-blue pl-3 font-mono">></span>
                  <Mail className="h-4 w-4 text-gray-500 ml-2" />
                  <input
                    ref={emailRef}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="neural_link@revenant.sys"
                    className="bg-transparent py-3 px-3 w-full focus:outline-none font-mono text-white placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <div className={`
                  flex items-center border rounded-md transition-all duration-300
                  ${focusedField === 'password' 
                    ? 'border-electric-blue shadow-neon-blue' 
                    : 'border-gray-700'
                  }
                `}>
                  <span className="text-electric-blue pl-3 font-mono">></span>
                  <Lock className="h-4 w-4 text-gray-500 ml-2" />
                  <input
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="encryption_key"
                    className="bg-transparent py-3 px-3 w-full focus:outline-none font-mono text-white placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-3 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Register only) */}
              {!isLogin && (
                <div className="relative">
                  <div className={`
                    flex items-center border rounded-md transition-all duration-300
                    ${focusedField === 'confirmPassword' 
                      ? 'border-vivid-purple shadow-neon-purple' 
                      : 'border-gray-700'
                    }
                  `}>
                    <span className="text-vivid-purple pl-3 font-mono">></span>
                    <Lock className="h-4 w-4 text-gray-500 ml-2" />
                    <input
                      ref={confirmPasswordRef}
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword || ''}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="confirm_encryption"
                      className="bg-transparent py-3 px-3 w-full focus:outline-none font-mono text-white placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="pr-3 text-gray-500 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Error/Success Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-blood-red bg-opacity-20 border border-blood-red rounded-md p-3"
                  >
                    <div className="flex items-center">
                      <Terminal className="h-4 w-4 text-blood-red mr-2" />
                      <span className="font-mono text-sm text-blood-red">{error}</span>
                    </div>
                  </motion.div>
                )}
                
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-neon-green bg-opacity-20 border border-neon-green rounded-md p-3"
                  >
                    <div className="flex items-center">
                      <Terminal className="h-4 w-4 text-neon-green mr-2" />
                      <span className="font-mono text-sm text-neon-green">{success}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                variants={pulseVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-3 px-6 rounded-md font-mono font-medium tracking-wider
                  transition-all duration-300 relative overflow-hidden
                  ${isLogin 
                    ? 'bg-electric-blue hover:bg-electric-blue text-dark-matter-900 glow-border-blue' 
                    : 'bg-vivid-purple hover:bg-vivid-purple text-white glow-border-purple'
                  }
                  ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent mr-2" />
                    PROCESSING...
                  </div>
                ) : (
                  isLogin ? 'INITIATE ACCESS' : 'FORGE NEW IDENTITY'
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-500 font-mono text-xs">
              REVENANT v4.1 • SECURE NEURAL INTERFACE
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthInterface;