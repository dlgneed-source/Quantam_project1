import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Share2,
  Clock,
  X,
  CheckCircle,
  BookOpen,
  Code2,
  Shield,
  Brain,
  BellRing,
  Trophy,
  Gift,
  BadgeCent,
  Sparkles,
  ShieldCheck,
  Flame,
  TimerReset,
  Star,
  ArrowLeft,
  User,
  Zap,
  Crown,
  Target,
  Network,
  Gem,
  Layers,
  Cpu,
  Wand2,
  Headphones,
  FileCode,
  Rocket,
  Check,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

// Page transition animations
const pageTransition = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: 'easeIn' } },
};

interface TreeNode {
  name: string;
  wallet: string;
  level: number;
  children: TreeNode[];
}

const referralTree: TreeNode = {
  name: 'You',
  wallet: '0x1A4...B9F2',
  level: 0,
  children: [
    {
      name: 'User A',
      wallet: '0x7B2...F1A3',
      level: 1,
      children: [
        { name: 'User D', wallet: '0x3C1...E4B2', level: 2, children: [] },
        { name: 'User E', wallet: '0x9F8...D2C1', level: 2, children: [] },
      ],
    },
    {
      name: 'User B',
      wallet: '0x5E6...A8D4',
      level: 1,
      children: [{ name: 'User F', wallet: '0x2D7...C5E3', level: 2, children: [] }],
    },
    {
      name: 'User C',
      wallet: '0x8A3...B7F6',
      level: 1,
      children: [],
    },
  ],
};

const recentTransactions = [
  { id: 1, type: 'Deposit', amount: '+$500.00', time: '2h ago', status: 'Completed' },
  { id: 2, type: 'Commission', amount: '+$24.50', time: '5h ago', status: 'Completed' },
  { id: 3, type: 'Withdrawal', amount: '-$200.00', time: '1d ago', status: 'Pending' },
  { id: 4, type: 'Referral Bonus', amount: '+$15.00', time: '2d ago', status: 'Completed' },
];

const planBadges = [
  { name: 'Plan 1', price: '$7', active: true, color: '#fbbf24' },
  { name: 'Plan 2', price: '$14', active: false, color: '#22d3ee' },
  { name: 'Plan 3', price: '$40', active: false, color: '#34d399' },
  { name: 'Plan 4', price: '$150', active: false, color: '#e879f9' },
];

// ============================================
// PREMIUM GLASS MORPHISM PLAN CARDS WITH BUBBLES AND FEATURES
// ============================================
const depositPlans = [
  {
    level: 1,
    name: 'Foundation',
    price: '$7',
    icon: BookOpen,
    subtitle: 'Core skills with a clean premium starter experience.',
    bubbles: [
      { icon: Cpu, text: '+25 AI Credits' },
      { icon: Zap, text: '25K AI Tokens' },
    ],
    features: ['HTML, CSS & JS', 'Python Hands-on', 'Linux Command Line'],
    // AMBER/GOLD Theme
    theme: {
      primary: '#fbbf24',
      secondary: '#f59e0b',
      glow: 'rgba(251, 191, 36, 0.5)',
      bgGlow: 'rgba(251, 191, 36, 0.15)',
      text: '#fef3c7',
    },
  },
  {
    level: 2,
    name: 'Pro Builder',
    price: '$14',
    icon: Code2,
    subtitle: 'Sharper workflow, cleaner execution, more control.',
    bubbles: [
      { icon: Cpu, text: '50 AI Credits' },
      { icon: Zap, text: '80K AI Tokens' },
    ],
    features: ['React.js & Tailwind CSS', 'SQL & DBMS', 'Git & GitHub'],
    // CYAN/BLUE Theme
    theme: {
      primary: '#22d3ee',
      secondary: '#0ea5e9',
      glow: 'rgba(34, 211, 238, 0.5)',
      bgGlow: 'rgba(34, 211, 238, 0.15)',
      text: '#cffafe',
    },
  },
  {
    level: 3,
    name: 'Cyber Elite',
    price: '$40',
    icon: Shield,
    subtitle: 'A stronger, sharper tier with executive energy.',
    bubbles: [
      { icon: Cpu, text: '100 AI Credits' },
      { icon: Zap, text: '120K AI Tokens' },
      { icon: Wand2, text: 'Adv. Tools' },
    ],
    features: ['Ethical Hacking', 'Network Analysis', 'Web App Security'],
    // EMERALD/GREEN Theme
    theme: {
      primary: '#34d399',
      secondary: '#10b981',
      glow: 'rgba(52, 211, 153, 0.5)',
      bgGlow: 'rgba(52, 211, 153, 0.15)',
      text: '#d1fae5',
    },
  },
  {
    level: 4,
    name: 'AI Mastery',
    price: '$150',
    icon: Brain,
    subtitle: 'Luxury-grade visual treatment with an AI-first identity.',
    bubbles: [
      { icon: Cpu, text: '250 AI Credits' },
      { icon: Zap, text: '300K AI Tokens' },
      { icon: Headphones, text: 'Priority Support' },
      { icon: FileCode, text: 'Daily Src + Dev Guide' },
    ],
    features: ['Data Analysis', 'Neural Networks', 'AI API Integration'],
    // FUCHSIA/PURPLE Theme
    theme: {
      primary: '#e879f9',
      secondary: '#a855f7',
      glow: 'rgba(232, 121, 249, 0.5)',
      bgGlow: 'rgba(232, 121, 249, 0.15)',
      text: '#fae8ff',
    },
  },
];

// ============================================
// PREMIUM POOL STATS DATA
// ============================================
const poolStats = [
  { 
    label: 'Leader Pool', 
    value: '$2,180', 
    subtext: 'Top performers',
    icon: Crown, 
    theme: {
      primary: '#fbbf24',
      glow: 'rgba(251, 191, 36, 0.4)',
      bgGlow: 'rgba(251, 191, 36, 0.12)',
    }
  },
  { 
    label: 'Reward Pool', 
    value: '$1,450', 
    subtext: 'Available rewards',
    icon: Gem, 
    theme: {
      primary: '#22d3ee',
      glow: 'rgba(34, 211, 238, 0.4)',
      bgGlow: 'rgba(34, 211, 238, 0.12)',
    }
  },
  { 
    label: 'Level 1 Comm.', 
    value: '$1,240', 
    subtext: 'Direct referrals',
    icon: BadgeCent, 
    theme: {
      primary: '#34d399',
      glow: 'rgba(52, 211, 153, 0.4)',
      bgGlow: 'rgba(52, 211, 153, 0.12)',
    }
  },
  { 
    label: 'Auto Filling Tree', 
    value: '142 Nodes', 
    subtext: 'Network growth',
    icon: Network, 
    theme: {
      primary: '#e879f9',
      glow: 'rgba(232, 121, 249, 0.4)',
      bgGlow: 'rgba(232, 121, 249, 0.12)',
    }
  },
];

const scheduleNotes = [
  { plan: 'Plan 1', cadence: 'Every 2 days' },
  { plan: 'Plan 2', cadence: 'Every 7 days' },
  { plan: 'Plan 3', cadence: 'Every 15 days' },
  { plan: 'Plan 4', cadence: 'Every 30 days' },
];

function getISTNow() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + 330 * 60000);
}

function getNextISTMidnight() {
  const istNow = getISTNow();
  const next = new Date(istNow);
  next.setHours(24, 0, 0, 0);
  const utcMs = next.getTime() - 330 * 60000;
  return new Date(utcMs);
}

function formatCountdown(ms: number) {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const CountdownPill: React.FC<{ label: string; targetDate: Date; compact?: boolean }> = ({
  label,
  targetDate,
  compact = false,
}) => {
  const [value, setValue] = useState('00:00:00');

  useEffect(() => {
    const tick = () => {
      setValue(formatCountdown(targetDate.getTime() - Date.now()));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [targetDate]);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 ${
        compact ? 'px-2.5 py-1.5 text-[10px]' : 'px-3 py-2 text-xs'
      } font-semibold text-slate-200`}
    >
      <TimerReset className={compact ? 'h-3.5 w-3.5 text-cyan-300' : 'h-4 w-4 text-cyan-300'} />
      <span className="text-slate-400">{label}</span>
      <span className="font-mono text-slate-200">{value}</span>
    </div>
  );
};

// ============================================
// PREMIUM TREE NODE ITEM
// ============================================
const TreeNodeItem: React.FC<{ node: TreeNode; depth?: number }> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(depth < 1);
  const hasChildren = node.children.length > 0;

  return (
    <div className={depth > 0 ? 'ml-4 border-l border-white/10 pl-3 sm:ml-6 sm:pl-4' : ''}>
      <motion.button
        onClick={() => hasChildren && setExpanded(!expanded)}
        whileHover={{ x: 4 }}
        className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-white/[0.05] sm:gap-3"
      >
        {hasChildren ? (
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </motion.div>
        ) : (
          <div className="flex h-4 w-4 items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold ${
            depth === 0 
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
              : 'bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          {node.name[0]}
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{node.name}</p>
          <p className="truncate font-mono text-[11px] text-slate-500">{node.wallet}</p>
        </div>

        {depth > 0 && (
          <span className="ml-auto rounded-full border border-white/10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-2.5 py-1 text-[10px] font-semibold text-cyan-300">
            L{node.level}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {node.children.map((child, i) => (
              <TreeNodeItem key={i} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// WITHDRAWAL MODAL
// ============================================
const WithdrawalModal: React.FC<{ isOpen: boolean; onClose: () => void; balance: number }> = ({ 
  isOpen, 
  onClose, 
  balance 
}) => {
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleWithdraw = () => {
    if (parseFloat(amount) > 0 && parseFloat(amount) <= balance) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAmount('');
        onClose();
      }, 4000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/40 via-cyan-500/40 to-emerald-500/40 blur-xl" />
            
            {/* Card */}
            <div 
              className="relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(16,185,129,0.05) 50%, rgba(0,0,0,0.3) 100%)',
                borderColor: 'rgba(6,182,212,0.3)',
                boxShadow: '0 8px 32px rgba(6,182,212,0.2)',
              }}
            >
              {/* Top line */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/40"
                  >
                    <Check className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold text-white">Withdrawal Initiated!</h3>
                  <p className="text-sm text-slate-300">
                    ${amount} will be credited instantly after blockchain reaches at height
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-400">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Processing on blockchain...
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                        <ArrowUpRight className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Withdraw</h3>
                        <p className="text-xs text-slate-400">Available: ${balance.toLocaleString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-400 transition hover:bg-white/20 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-4">
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                      Enter Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-10 py-4 text-2xl font-bold text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/50 focus:bg-white/10"
                      />
                      <button
                        onClick={() => setAmount(balance.toString())}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/30"
                      >
                        MAX
                      </button>
                    </div>
                  </div>

                  {/* Quick amounts */}
                  <div className="mb-6 flex gap-2">
                    {['100', '500', '1000', '2500'].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-medium text-slate-400 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                    <div className="flex items-start gap-2">
                      <Rocket className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <div>
                        <p className="text-xs font-medium text-emerald-300">Instant Withdrawal</p>
                        <p className="text-[10px] text-emerald-400/70">
                          Will credit instantly after blockchain reaches at height
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleWithdraw}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
                    className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Withdrawal
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================
// PREMIUM GLASS CARD COMPONENT WITH BUBBLES AND FEATURES
// ============================================
const PremiumPlanCard: React.FC<{ plan: typeof depositPlans[0]; index: number }> = ({ plan, index }) => {
  const PlanIcon = plan.icon;
  const { theme } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      {/* Animated Glow Background */}
      <div 
        className="absolute -inset-1 rounded-[2.5rem] opacity-60 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl"
        style={{ 
          background: `linear-gradient(135deg, ${theme.glow}, transparent 60%)`,
        }}
      />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{ background: theme.bgGlow }}
        animate={{ 
          y: [0, -15, 0], 
          x: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full opacity-30 blur-3xl"
        style={{ background: theme.bgGlow }}
        animate={{ 
          y: [0, 15, 0], 
          x: [0, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Main Card */}
      <div 
        className="relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-xl transition-all duration-500 sm:p-7"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.2) 100%)`,
          borderColor: `${theme.primary}30`,
          boxShadow: `0 8px 32px ${theme.glow}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${theme.bgGlow} 50%, transparent 60%)`,
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />

        {/* Top Accent Line */}
        <div 
          className="absolute inset-x-0 top-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.primary}, ${theme.secondary}, transparent)`,
          }}
        />

        {/* Sparkle Icons */}
        <motion.div
          className="absolute right-6 top-6"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4 opacity-50" style={{ color: theme.primary }} />
        </motion.div>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Icon Container with Glow */}
              <motion.div 
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${theme.bgGlow}, transparent)`,
                  boxShadow: `0 0 20px ${theme.glow}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  border: `1px solid ${theme.primary}40`,
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <PlanIcon className="h-6 w-6" style={{ color: theme.text }} />
              </motion.div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Tier {plan.level}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 max-w-[22rem] text-sm leading-6 text-slate-300/80">
                  {plan.subtitle}
                </p>
              </div>
            </div>

            {/* Premium Badge */}
            <span 
              className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm"
              style={{
                borderColor: `${theme.primary}40`,
                background: `${theme.bgGlow}`,
                color: theme.text,
              }}
            >
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" /> Premium
              </span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2 mb-5">
            <motion.p 
              className="text-5xl font-bold tracking-tight"
              style={{ 
                color: theme.text,
                textShadow: `0 0 30px ${theme.glow}`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
            >
              {plan.price}
            </motion.p>
            <span className="pb-2 text-sm font-medium text-slate-400">/mo</span>
          </div>

          {/* BUBBLES SECTION - Soap Bubble Style */}
          <div className="mb-5 flex flex-wrap gap-2">
            {plan.bubbles.map((bubble, i) => {
              const BubbleIcon = bubble.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="relative"
                >
                  {/* Bubble glow */}
                  <div 
                    className="absolute inset-0 rounded-full blur-md"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.primary}30, transparent)`,
                    }}
                  />
                  
                  {/* Main bubble */}
                  <div 
                    className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(255,255,255,0.2) 0%, 
                          rgba(255,255,255,0.08) 40%, 
                          rgba(200,230,255,0.1) 60%, 
                          rgba(255,255,255,0.05) 100%
                        )
                      `,
                      boxShadow: `
                        inset 0 1px 2px rgba(255,255,255,0.5),
                        inset 0 -1px 2px rgba(0,0,0,0.1),
                        0 2px 8px ${theme.glow}30,
                        0 0 15px ${theme.glow}20
                      `,
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}
                  >
                    {/* Highlight spot */}
                    <div 
                      className="absolute -top-0.5 left-2 h-1.5 w-2 rounded-full"
                      style={{
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                      }}
                    />
                    
                    {/* Secondary highlight */}
                    <div className="absolute bottom-0.5 right-2 h-0.5 w-1 rounded-full bg-white/50" />
                    
                    <BubbleIcon className="h-3 w-3" style={{ color: theme.primary }} />
                    <span className="text-[11px] font-medium text-slate-100">{bubble.text}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FEATURES SECTION */}
          <div className="mb-6 space-y-3">
            {plan.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 + 0.6 + i * 0.1, duration: 0.3 }}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
              >
                <div 
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${theme.bgGlow}` }}
                >
                  <CheckCircle className="h-4 w-4" style={{ color: theme.primary }} />
                </div>
                <span className="text-sm font-medium text-slate-200">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Deposit Button - Yellow/Gold */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group/btn relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-4 py-4 text-sm font-bold tracking-wide transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4), 0 0 0 1px rgba(251, 191, 36, 0.3)',
            }}
          >
            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
            
            <span className="relative z-10 flex items-center gap-2 text-slate-900">
              <ArrowDownLeft className="h-4 w-4" />
              Deposit {plan.price}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// PREMIUM POOL STAT CARD
// ============================================
const PremiumPoolCard: React.FC<{ stat: typeof poolStats[0]; index: number }> = ({ stat, index }) => {
  const Icon = stat.icon;
  const { theme } = stat;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div 
        className="absolute -inset-0.5 rounded-3xl opacity-0 blur-lg transition-all duration-300 group-hover:opacity-70"
        style={{ background: theme.glow }}
      />
      
      {/* Floating Orb */}
      <motion.div
        className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-30 blur-2xl"
        style={{ background: theme.bgGlow }}
        animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Card */}
      <div 
        className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.15) 100%)`,
          borderColor: `${theme.primary}25`,
          boxShadow: `0 4px 24px ${theme.glow}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }}
      >
        {/* Top Accent */}
        <div 
          className="absolute inset-x-0 top-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
          }}
        />

        {/* Shimmer on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${theme.bgGlow} 50%, transparent 60%)`,
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        />

        <div className="relative z-10">
          {/* Icon & Label */}
          <div className="mb-4 flex items-center gap-3">
            <motion.div 
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${theme.bgGlow}, transparent)`,
                border: `1px solid ${theme.primary}30`,
                boxShadow: `0 0 15px ${theme.glow}30`,
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Icon className="h-5 w-5" style={{ color: theme.primary }} />
            </motion.div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </p>
              <p className="text-[11px] text-slate-600">{stat.subtext}</p>
            </div>
          </div>

          {/* Value */}
          <motion.p 
            className="text-3xl font-bold tracking-tight"
            style={{ 
              color: theme.primary,
              textShadow: `0 0 20px ${theme.glow}`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
          >
            {stat.value}
          </motion.p>

          {/* Mini Progress Bar */}
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div 
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${theme.primary}, ${theme.primary}80)` }}
              initial={{ width: 0 }}
              animate={{ width: `${60 + index * 10}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// PREMIUM ACTIVE TIER BADGE
// ============================================
const PremiumTierBadge: React.FC<{ plan: typeof planBadges[0] }> = ({ plan }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer"
    >
      {/* Glow */}
      <div 
        className={`absolute -inset-0.5 rounded-full blur-md transition-opacity duration-300 ${plan.active ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'}`}
        style={{ background: plan.color }}
      />
      
      {/* Badge */}
      <div 
        className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-300 ${
          plan.active 
            ? '' 
            : 'border-white/10 bg-white/[0.03] text-slate-500 hover:border-white/20 hover:bg-white/[0.06]'
        }`}
        style={plan.active ? {
          borderColor: `${plan.color}50`,
          background: `linear-gradient(135deg, ${plan.color}15, ${plan.color}05)`,
          color: plan.color,
          boxShadow: `0 0 20px ${plan.color}30`,
        } : {}}
      >
        {plan.active && (
          <motion.span 
            className="flex h-2 w-2 rounded-full"
            style={{ background: plan.color, boxShadow: `0 0 8px ${plan.color}` }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <span>{plan.name}</span>
        <span className="text-[10px] opacity-70">{plan.price}</span>
      </div>
    </motion.div>
  );
};

// ============================================
// PREMIUM DAILY INCOME CARD
// ============================================
const PremiumDailyIncomeCard: React.FC<{ isSubscribed: boolean; onSubscribe: () => void }> = ({ isSubscribed, onSubscribe }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-3xl"
    >
      {/* Background Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 opacity-60 blur-xl" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Card */}
      <div 
        className="relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl sm:p-7"
        style={{
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.05) 50%, rgba(0,0,0,0.2) 100%)',
          borderColor: 'rgba(16,185,129,0.25)',
          boxShadow: '0 8px 32px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Top Gradient Line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400" />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(16,185,129,0.1) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1))',
                  border: '1px solid rgba(16,185,129,0.3)',
                  boxShadow: '0 0 20px rgba(16,185,129,0.3)',
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Gift className="h-6 w-6 text-emerald-300" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Daily Income Plan
                </p>
                <p className="text-sm text-slate-400">$10 subscription • Midnight distribution</p>
              </div>
            </div>

            <motion.button
              onClick={onSubscribe}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubscribed}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                isSubscribed 
                  ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300' 
                  : 'border-amber-500/30 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-[0_4px_20px_rgba(251,191,36,0.4)]'
              }`}
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="h-3.5 w-3.5" /> Active
                </>
              ) : (
                <>
                  <BellRing className="h-3.5 w-3.5" /> Subscribe $10
                </>
              )}
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all ${isSubscribed ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Today's Earning
              </p>
              <p className="text-3xl font-bold text-emerald-300">
                $86<span className="text-base text-emerald-300/60">.50</span>
              </p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400/70">
                <TrendingUp className="h-3 w-3" />
                <span>+12.4% from yesterday</span>
              </div>
            </div>
            
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Monthly Total
              </p>
              <p className="text-3xl font-bold text-slate-200">
                $2,595<span className="text-base text-slate-400">.00</span>
              </p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
                <Target className="h-3 w-3" />
                <span>Target: $3,000</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Monthly Progress</span>
              <span className="text-[10px] font-semibold text-emerald-300">86.5%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: '86.5%' }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-slate-400">
              <Layers className="h-3 w-3" /> Plan 1 excluded
            </span>
            <span className="flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-medium text-cyan-300">
              <Zap className="h-3 w-3" /> Plan 2+ eligible
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// PREMIUM REFERRAL TREE CARD - WITHOUT NODE A/B
// ============================================
const PremiumReferralCard: React.FC<{ refMode: 'Level 1' | 'Downline'; setRefMode: (m: 'Level 1' | 'Downline') => void }> = ({ refMode, setRefMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="group relative overflow-hidden rounded-3xl"
    >
      {/* Background Glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/15 via-violet-500/15 to-fuchsia-500/15 opacity-50 blur-xl" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/12 blur-3xl"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl"
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Card */}
      <div 
        className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl sm:p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(139,92,246,0.03) 50%, rgba(0,0,0,0.2) 100%)',
          borderColor: 'rgba(6,182,212,0.2)',
          boxShadow: '0 8px 32px rgba(6,182,212,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Top Line */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400" />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(6,182,212,0.08) 50%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
        />

        {/* Header */}
        <div className="relative z-10 mb-5 flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.1))',
                border: '1px solid rgba(6,182,212,0.3)',
                boxShadow: '0 0 20px rgba(6,182,212,0.25)',
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users className="h-5 w-5 text-cyan-300" />
            </motion.div>
            <div>
              <h2 className="text-base font-semibold text-slate-200">Referral Network</h2>
              <p className="text-xs text-slate-500">Your downline tree structure</p>
            </div>
          </div>

          {/* Live Badge */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            Live Updates
          </span>
        </div>

        {/* Controls - Only Level 1 / Full Tree */}
        <div className="relative z-10 mb-5">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1 w-fit">
            <button
              onClick={() => setRefMode('Level 1')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                refMode === 'Level 1' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Level 1
            </button>
            <button
              onClick={() => setRefMode('Downline')}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                refMode === 'Downline' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Full Tree
            </button>
          </div>
        </div>

        {/* Tree Content */}
        <div className="relative z-10 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <TreeNodeItem node={referralTree} />
        </div>

        {/* Stats Footer */}
        <div className="relative z-10 mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <p className="text-lg font-bold text-cyan-300">6</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Total</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <p className="text-lg font-bold text-violet-300">3</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Level 1</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <p className="text-lg font-bold text-fuchsia-300">3</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">Level 2</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'plans' | 'rewards' | 'subscribe'>('dashboard');
  
  const [showTransactions, setShowTransactions] = useState(false);
  const [isSalarySubscribed, setIsSalarySubscribed] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  const [refMode, setRefMode] = useState<'Level 1' | 'Downline'>('Level 1');

  const nextFlushout = useMemo(() => getNextISTMidnight(), []);

  const handleConfirmDailyIncome = () => {
    setIsSalarySubscribed(true);
    setActiveView('dashboard');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0a0a0f] pb-20 text-slate-200 scrollbar-hide">
      {/* Withdrawal Modal */}
      <WithdrawalModal 
        isOpen={showWithdrawModal} 
        onClose={() => setShowWithdrawModal(false)} 
        balance={4892.50}
      />

      <AnimatePresence mode="wait">
        
        {/* ======================= MAIN DASHBOARD VIEW ======================= */}
        {activeView === 'dashboard' && (
          <motion.div
            key="dashboard-view"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto flex max-w-6xl flex-col gap-4 p-4 sm:p-6 lg:p-8"
          >
            {/* Header */}
            <motion.div custom={0} variants={fadeUp} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-xs font-bold uppercase tracking-widest text-transparent">
                    Akhuwat Workspace
                  </p>
                  <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Welcome, User
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveView('plans')}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] sm:flex-none"
                >
                  <BookOpen className="h-4 w-4" /> Plans
                </button>
                <button
                  onClick={() => setActiveView('rewards')}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-6 py-2.5 text-sm font-semibold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition hover:bg-amber-500/20 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] sm:flex-none"
                >
                  <Trophy className="h-4 w-4" /> Rewards
                </button>
              </div>
            </motion.div>

            {/* TOTAL BALANCE CARD */}
            <motion.section custom={1} variants={fadeUp} className="relative mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[#1a1a2e]/90 p-5 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

              <motion.div
                aria-hidden="true"
                className="absolute left-[40%] top-0 h-full w-28 -translate-x-1/2 rotate-12 bg-gradient-to-b from-cyan-400/0 via-cyan-300/20 to-cyan-400/0 blur-2xl"
                animate={{ x: [0, 18, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative z-10 grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Wallet className="h-5 w-5 text-cyan-300" />
                      <span className="text-xs font-semibold uppercase tracking-[0.2em]">Total Balance</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                      <TrendingUp className="h-3.5 w-3.5" /> +12.4%
                    </div>
                  </div>

                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                      $4,892<span className="text-xl text-slate-400">.50</span>
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <button 
                      onClick={() => setShowWithdrawModal(true)}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-slate-200 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition hover:bg-blue-700"
                    >
                      <ArrowUpRight className="h-4 w-4" /> Withdraw
                    </button>

                    <button
                      onClick={() => setActiveView('plans')}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3 text-sm font-bold text-slate-900 shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition hover:from-amber-300 hover:to-amber-400"
                    >
                      <ArrowDownLeft className="h-4 w-4" /> Deposit
                    </button>

                    <button className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/15">
                      <Share2 className="h-4 w-4" /> Refer
                    </button>

                    <button
                      onClick={() => setShowTransactions(!showTransactions)}
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                    >
                      <Clock className="h-4 w-4" /> History
                    </button>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <CountdownPill label="Flushout" targetDate={nextFlushout} compact />
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                      <Flame className="h-3.5 w-3.5 text-amber-300" />
                      Web3 Rewards
                    </span>
                  </div>
                </div>

                <div className="grid gap-3">
                  <AnimatePresence mode="wait">
                    {showTransactions && (
                      <motion.div
                        key="history-panel"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md"
                      >
                        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                            <Clock className="h-4 w-4 text-cyan-300" /> Recent Transactions
                          </h2>
                          <button
                            onClick={() => setShowTransactions(false)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.6)] transition hover:bg-white/20"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {recentTransactions.map((tx) => (
                            <div
                              key={tx.id}
                              className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3"
                            >
                              <div>
                                <p className="text-sm font-medium text-slate-200">{tx.type}</p>
                                <p className="text-[11px] text-slate-400">{tx.time}</p>
                              </div>
                              <div className="text-right">
                                <p className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-emerald-300' : 'text-slate-200'}`}>
                                  {tx.amount}
                                </p>
                                <p
                                  className={`text-[11px] ${
                                    tx.status === 'Completed' ? 'text-emerald-300/80' : 'text-amber-300/80'
                                  }`}
                                >
                                  {tx.status}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-4 shadow-[0_0_25px_rgba(244,63,94,0.15)]">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-400">
                          Guaranteed flushout
                        </p>
                        <p className="text-sm text-rose-200/70">Timer and cadence overview</p>
                      </div>
                      <ShieldCheck className="h-5 w-5 text-rose-400" />
                    </div>

                    <CountdownPill label="Next flushout" targetDate={nextFlushout} />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {scheduleNotes.map((item) => (
                        <div
                          key={item.plan}
                          className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-300">
                            {item.plan}
                          </p>
                          <p className="mt-1 text-sm font-medium text-rose-100">{item.cadence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* PREMIUM DAILY INCOME CARD */}
            <motion.div custom={2} variants={fadeUp}>
              <PremiumDailyIncomeCard 
                isSubscribed={isSalarySubscribed} 
                onSubscribe={() => setActiveView('subscribe')} 
              />
            </motion.div>

            {/* PREMIUM ACTIVE TIERS */}
            <motion.div 
              custom={7} 
              variants={fadeUp} 
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-fuchsia-500/5" />
              <div className="relative z-10 flex flex-wrap items-center gap-3">
                <span className="mr-2 flex items-center gap-2 text-sm font-semibold text-slate-400">
                  <Layers className="h-4 w-4" /> Active Tiers:
                </span>
                {planBadges.map((plan) => (
                  <PremiumTierBadge key={plan.name} plan={plan} />
                ))}
              </div>
            </motion.div>

            {/* PREMIUM REFERRAL TREE CARD - WITHOUT NODE A/B */}
            <motion.div custom={8} variants={fadeUp}>
              <PremiumReferralCard 
                refMode={refMode} 
                setRefMode={setRefMode} 
              />
            </motion.div>
          </motion.div>
        )}

        {/* ======================= PLANS PAGE VIEW - PREMIUM GLASS CARDS WITH BUBBLES AND FEATURES ======================= */}
        {activeView === 'plans' && (
          <motion.div
            key="plans-view"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto flex max-w-5xl flex-col gap-5 p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-2 flex items-center gap-4 border-b border-white/5 pb-5">
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-slate-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-slate-200 sm:text-2xl">Select Investment Plan</h2>
                <p className="mt-1 text-sm text-slate-400">Exclusive premium tiers for your workspace.</p>
              </div>
            </div>

            <div className="mb-4 grid gap-3 md:grid-cols-2">
              <div 
                className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(17,24,39,0.8))',
                  borderColor: 'rgba(251,191,36,0.3)',
                  boxShadow: '0 8px 32px rgba(251,191,36,0.2)',
                }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="relative z-10 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-semibold text-slate-200">Daily Income Plan</p>
                </div>
                <p className="relative z-10 mt-2 text-3xl font-bold text-slate-200">
                  $10<span className="text-sm font-medium text-slate-400"> token subscription</span>
                </p>
                <p className="relative z-10 mt-2 text-sm leading-6 text-slate-400">
                  Auto-subscribed from Plan 2 onward. Plan 1 excluded, as per your notes.
                </p>
              </div>

              <div 
                className="relative overflow-hidden rounded-3xl border border-white/10 p-5 backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))',
                }}
              >
                <div className="absolute -left-8 -bottom-8 h-28 w-28 rounded-full bg-cyan-400/15 blur-3xl" />
                <p className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Flushout countdown
                </p>
                <div className="relative z-10 mt-3">
                  <CountdownPill label="Next" targetDate={nextFlushout} />
                </div>
                <p className="relative z-10 mt-3 text-sm text-slate-400">
                  Daily distribution happens at 12:00 midnight.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {depositPlans.map((plan, index) => (
                <PremiumPlanCard key={plan.level} plan={plan} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ======================= REWARDS PAGE VIEW - PREMIUM POOL STATS ======================= */}
        {activeView === 'rewards' && (
          <motion.div
            key="rewards-view"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto flex max-w-5xl flex-col gap-5 p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-2 flex items-center gap-4 border-b border-white/5 pb-5">
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-slate-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-slate-200 sm:text-2xl">Rewards & Network</h2>
                <p className="mt-1 text-sm text-slate-400">View pools, gift cards, and commissions.</p>
              </div>
            </div>

            {/* Premium Gift Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative overflow-hidden rounded-3xl md:w-2/3 lg:w-1/2"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/30 to-cyan-500/20 opacity-50 blur-xl" />
              <motion.div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div 
                className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05), rgba(0,0,0,0.2))',
                  borderColor: 'rgba(16,185,129,0.3)',
                  boxShadow: '0 8px 32px rgba(16,185,129,0.2)',
                }}
              >
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                      <Gift className="h-3.5 w-3.5" /> Reward Drop
                    </div>
                    <p className="text-sm font-semibold text-slate-200">Random gift card</p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/10">
                    <Star className="h-5 w-5 text-emerald-300" />
                  </div>
                </div>

                <div className="relative z-10 mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter Gift Code"
                    className="w-full rounded-xl border border-emerald-500/20 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-emerald-500/50"
                  />
                  <button className="whitespace-nowrap rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-400 hover:to-emerald-500">
                    Redeem
                  </button>
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between rounded-2xl border border-emerald-500/10 bg-white/[0.03] px-3 py-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-500/70">Next reward</p>
                    <p className="text-sm font-semibold text-slate-200">Auto release from total balance</p>
                  </div>
                  <CountdownPill label="In" targetDate={nextFlushout} compact />
                </div>
              </div>
            </motion.div>

            {/* PREMIUM POOL STATS GRID */}
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {poolStats.map((stat, i) => (
                <PremiumPoolCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ======================= SUBSCRIBE PAGE VIEW ======================= */}
        {activeView === 'subscribe' && (
          <motion.div
            key="subscribe-view"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mx-auto flex max-w-3xl flex-col gap-5 p-4 sm:p-6 lg:p-8"
          >
            <div className="mb-2 flex items-center gap-4 border-b border-white/5 pb-5">
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-slate-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-slate-200 sm:text-2xl">Daily Income Plan</h2>
                <p className="mt-1 text-sm text-slate-400">Separate subscription fee of $10, with midnight distribution.</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
              <div 
                className="relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(17,24,39,0.9))',
                  borderColor: 'rgba(251,191,36,0.25)',
                }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="relative z-10 flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-amber-400" />
                  <p className="font-semibold text-slate-200">Token Fee Subscription</p>
                </div>

                <p className="relative z-10 mt-4 text-5xl font-bold text-slate-200">
                  $10<span className="text-base font-medium text-slate-400"> / plan</span>
                </p>

                <p className="relative z-10 mt-3 text-sm leading-6 text-slate-400">
                  This plan activates after Plan 2 joining. It is separate from main joining fee
                  flows and stays limited to the daily income system.
                </p>

                <div className="relative z-10 mt-5 rounded-2xl border border-white/5 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Daily income distribution
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Distribution runs every day at <span className="font-semibold text-slate-200">12:00 midnight</span>.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Subscription summary
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5">
                    <span className="text-sm text-slate-400">Plan type</span>
                    <span className="text-sm font-semibold text-slate-200">Daily Income Plan</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5">
                    <span className="text-sm text-slate-400">Fee</span>
                    <span className="text-sm font-semibold text-slate-200">$10</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5">
                    <span className="text-sm text-slate-400">Status</span>
                    <span className="text-sm font-semibold text-amber-300">
                      {isSalarySubscribed ? 'Already subscribed' : 'Not subscribed'}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <CountdownPill label="Next release" targetDate={nextFlushout} />
                </div>

                <button
                  onClick={handleConfirmDailyIncome}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3.5 text-sm font-bold text-slate-900 shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition hover:from-amber-300 hover:to-amber-400"
                >
                  <ArrowDownLeft className="h-4 w-4" /> Deposit $10 & Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
