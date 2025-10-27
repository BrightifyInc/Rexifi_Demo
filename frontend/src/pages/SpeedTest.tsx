import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiDownload, FiUpload, FiZap, FiClock, FiShare2, FiRefreshCw, FiAward, FiServer } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import RexifiFooter from '../components/Footer';
import type { ReactElement } from 'react';

interface ColorMap {
  blue: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
  purple: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
  green: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
  orange: {
    bg: string;
    text: string;
    border: string;
    hover: string;
    gradient: string;
    solid: string;
  };
}

interface SpeedRange {
  min: number;
  color: keyof ColorMap;
  label: string;
}

interface SpeedRanges {
  excellent: SpeedRange;
  good: SpeedRange;
  fair: SpeedRange;
  poor: SpeedRange;
}

interface TestResult {
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  server: string;
  isp: string;
  timestamp: Date | null;
}

interface SpeedGuideItem {
  icon: ReactElement;
  title: string;
  description: string;
  good: string;
  color: keyof ColorMap;
}

const SpeedTestPage = () => {
  const [testStatus, setTestStatus] = useState<'ready' | 'testing' | 'complete'>('ready');
  const [testPhase, setTestPhase] = useState<string>('');
  const [progress, setProgress] = useState(0);

  const [results, setResults] = useState<TestResult>({
    download: 0,
    upload: 0,
    ping: 0,
    jitter: 0,
    server: 'Lagos, Nigeria',
    isp: 'Rexifi Networks',
    timestamp: null
  });
  const [history, setHistory] = useState<TestResult[]>([]);

  const colorMap: ColorMap = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/20",
      hover: "hover:border-blue-400",
      gradient: "from-blue-500/20 to-blue-600/10",
      solid: "bg-blue-500"
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
      hover: "hover:border-purple-400",
      gradient: "from-purple-500/20 to-purple-600/10",
      solid: "bg-purple-500"
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      border: "border-green-500/20",
      hover: "hover:border-green-400",
      gradient: "from-green-500/20 to-green-600/10",
      solid: "bg-green-500"
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      border: "border-orange-500/20",
      hover: "hover:border-orange-400",
      gradient: "from-orange-500/20 to-orange-600/10",
      solid: "bg-orange-500"
    }
  };

  const speedRanges: SpeedRanges = {
    excellent: { min: 50, color: 'green', label: 'Excellent' },
    good: { min: 25, color: 'blue', label: 'Good' },
    fair: { min: 10, color: 'orange', label: 'Fair' },
    poor: { min: 0, color: 'orange', label: 'Poor' }
  };

  const getSpeedQuality = (speed: number): SpeedRange => {
    if (speed >= speedRanges.excellent.min) return speedRanges.excellent;
    if (speed >= speedRanges.good.min) return speedRanges.good;
    if (speed >= speedRanges.fair.min) return speedRanges.fair;
    return speedRanges.poor;
  };

  const startSpeedTest = () => {
    setTestStatus('testing');
    setProgress(0);
    setTestPhase('ping');

    // Simulate ping test
    setTimeout(() => {
      setTestPhase('download');
      simulateDownloadTest();
    }, 1500);
  };

  const simulateDownloadTest = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 5;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTestPhase('upload');
        simulateUploadTest();
      }
    }, 100);
  };

  const simulateUploadTest = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 4;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(interval);
        completeTest();
      }
    }, 100);
  };

  const completeTest = () => {
    const newResults: TestResult = {
      download: Math.random() * 100 + 20, // 20-120 Mbps
      upload: Math.random() * 50 + 10,   // 10-60 Mbps
      ping: Math.random() * 30 + 5,      // 5-35 ms
      jitter: Math.random() * 5 + 1,     // 1-6 ms
      server: 'Lagos, Nigeria',
      isp: 'Rexifi Networks',
      timestamp: new Date()
    };

    setResults(newResults);
    setTestStatus('complete');

    // Add to history
    setHistory(prev => [newResults, ...prev.slice(0, 4)]);
  };

  const resetTest = () => {
    setTestStatus('ready');
    setProgress(0);
    setTestPhase('');
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Internet Speed Test Results',
        text: `Download: ${results.download.toFixed(1)} Mbps, Upload: ${results.upload.toFixed(1)} Mbps, Ping: ${results.ping.toFixed(1)} ms`
      });
    } else {
      navigator.clipboard.writeText(`My internet speed: ${results.download.toFixed(1)} Mbps download, ${results.upload.toFixed(1)} Mbps upload, ${results.ping.toFixed(1)} ms ping`);
      alert('Results copied to clipboard!');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const speedGuideItems: SpeedGuideItem[] = [
    {
      icon: <FiDownload className="w-8 h-8" />,
      title: "Download Speed",
      description: "How fast you can receive data from the internet. Affects streaming, browsing, and downloading.",
      good: "25+ Mbps",
      color: "blue"
    },
    {
      icon: <FiUpload className="w-8 h-8" />,
      title: "Upload Speed",
      description: "How fast you can send data to the internet. Important for video calls, gaming, and cloud backups.",
      good: "10+ Mbps",
      color: "green"
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Ping & Latency",
      description: "Response time between your device and the server. Crucial for gaming and real-time applications.",
      good: "< 30 ms",
      color: "purple"
    }
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-950">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center"
            >
              <motion.span
                variants={itemVariants}
                className="inline-block rounded-full bg-gray-800/50 px-6 py-3 text-sm text-gray-300 mb-6 border border-gray-700/50"
              >
                ⚡ INTERNET SPEED TEST
              </motion.span>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              >
                Test Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Internet Speed</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Measure your download, upload speeds and ping in real-time. 
                Discover your true internet performance with our advanced testing technology.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Speed Test Interface */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Test Container */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border-2 border-gray-700/50 shadow-2xl"
              >
                {/* Test Status Header */}
                <div className="text-center mb-8">
                  <motion.h2
                    variants={itemVariants}
                    className="text-3xl font-bold text-white mb-4"
                  >
                    {testStatus === 'ready' && 'Ready to Test Your Speed'}
                    {testStatus === 'testing' && 'Testing Your Connection...'}
                    {testStatus === 'complete' && 'Test Complete!'}
                  </motion.h2>
                  
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-400"
                  >
                    {testStatus === 'ready' && 'Click start to measure your internet performance'}
                    {testStatus === 'testing' && `Measuring ${testPhase} speed...`}
                    {testStatus === 'complete' && 'Your results are ready!'}
                  </motion.p>
                </div>

                {/* Speed Gauge */}
                <div className="relative mb-8">
                  <div className="relative w-64 h-64 mx-auto">
                    {/* Outer Ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-700"
                      />
                      
                      {/* Progress Ring */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * progress) / 100}
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <AnimatePresence mode="wait">
                        {testStatus === 'ready' && (
                          <motion.div
                            key="ready"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="text-center"
                          >
                            <FiZap className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white">Ready</div>
                          </motion.div>
                        )}

                        {testStatus === 'testing' && (
                          <motion.div
                            key="testing"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="text-center"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <FiRefreshCw className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                            </motion.div>
                            <div className="text-xl font-bold text-white capitalize">{testPhase}</div>
                            <div className="text-3xl font-bold text-white">{progress.toFixed(0)}%</div>
                          </motion.div>
                        )}

                        {testStatus === 'complete' && (
                          <motion.div
                            key="complete"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center"
                          >
                            <FiAward className="w-12 h-12 text-green-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white">
                              {results.download.toFixed(1)}
                              <span className="text-sm text-gray-400"> Mbps</span>
                            </div>
                            <div className="text-sm text-gray-400">Download</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center mb-8">
                  <AnimatePresence mode="wait">
                    {testStatus === 'ready' && (
                      <motion.button
                        key="start"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startSpeedTest}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        <FiPlay className="inline w-5 h-5 mr-2" />
                        Start Speed Test
                      </motion.button>
                    )}

                    {testStatus === 'testing' && (
                      <motion.button
                        key="testing-btn"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="bg-gray-700 text-gray-300 px-12 py-4 rounded-2xl font-semibold text-lg cursor-not-allowed"
                        disabled
                      >
                        Testing in Progress...
                      </motion.button>
                    )}

                    {testStatus === 'complete' && (
                      <motion.div
                        key="complete-actions"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex gap-4 justify-center"
                      >
                        <button
                          onClick={resetTest}
                          className="bg-gray-700 text-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-600 transition-colors"
                        >
                          <FiRefreshCw className="inline w-5 h-5 mr-2" />
                          Test Again
                        </button>
                        <button
                          onClick={shareResults}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
                        >
                          <FiShare2 className="inline w-5 h-5 mr-2" />
                          Share Results
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Results Display */}
                <AnimatePresence>
                  {testStatus === 'complete' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Download Speed */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-center p-6 bg-white/5 rounded-2xl border border-gray-700/50"
                        >
                          <FiDownload className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                          <div className="text-3xl font-bold text-white mb-1">
                            {results.download.toFixed(1)}
                            <span className="text-sm text-gray-400"> Mbps</span>
                          </div>
                          <div className="text-gray-400">Download</div>
                          <div className={`text-sm font-semibold mt-2 ${colorMap[getSpeedQuality(results.download).color].text}`}>
                            {getSpeedQuality(results.download).label}
                          </div>
                        </motion.div>

                        {/* Upload Speed */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-center p-6 bg-white/5 rounded-2xl border border-gray-700/50"
                        >
                          <FiUpload className="w-8 h-8 text-green-400 mx-auto mb-3" />
                          <div className="text-3xl font-bold text-white mb-1">
                            {results.upload.toFixed(1)}
                            <span className="text-sm text-gray-400"> Mbps</span>
                          </div>
                          <div className="text-gray-400">Upload</div>
                          <div className={`text-sm font-semibold mt-2 ${colorMap[getSpeedQuality(results.upload).color].text}`}>
                            {getSpeedQuality(results.upload).label}
                          </div>
                        </motion.div>

                        {/* Ping & Jitter */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-center p-6 bg-white/5 rounded-2xl border border-gray-700/50"
                        >
                          <FiClock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                          <div className="text-3xl font-bold text-white mb-1">
                            {results.ping.toFixed(1)}
                            <span className="text-sm text-gray-400"> ms</span>
                          </div>
                          <div className="text-gray-400">Ping</div>
                          <div className="text-sm text-gray-300 mt-2">
                            Jitter: {results.jitter.toFixed(1)} ms
                          </div>
                        </motion.div>
                      </div>

                      {/* Server Info */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 rounded-2xl p-4 border border-gray-700/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FiServer className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="text-white font-semibold">{results.server}</div>
                              <div className="text-gray-400 text-sm">{results.isp}</div>
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm">
                            {results.timestamp?.toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Test History */}
              {history.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={containerVariants}
                  className="mt-12"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Recent Tests</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {history.map((test, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 bg-white/5 rounded-2xl border border-gray-700/50"
                      >
                        <div className="text-lg font-bold text-white">
                          {test.download.toFixed(0)}
                          <span className="text-xs text-gray-400"> Mbps</span>
                        </div>
                        <div className="text-gray-400 text-sm">Download</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {test.timestamp?.toLocaleTimeString()}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Speed Guide Section */}
        <section className="py-20 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Understanding Your <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Speed Results</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {speedGuideItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${colorMap[item.color].border}`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorMap[item.color].bg} mb-4`}>
                    <div className={colorMap[item.color].text}>
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className={`text-sm font-semibold ${colorMap[item.color].text}`}>
                    Good: {item.good}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <RexifiFooter />
    </>
  );
};

export default SpeedTestPage;