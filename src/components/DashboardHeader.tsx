import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, User, Sparkles, MessageSquareText, Code2, X, Camera, Key, Plus, Trash2, Clock, Shield, ChevronLeft, Crown } from 'lucide-react';

type HeaderView = 'none' | 'menu' | 'profile' | 'devOptions';

interface DashboardHeaderProps {
  onLogout: () => void;
  onNavigateHome?: () => void;
}

const mockApiKeys = [
  { id: 1, name: 'Production Key', key: 'ea_live_***...k9F2', created: '2026-01-15', expires: '2026-07-15', active: true },
  { id: 2, name: 'Test Key', key: 'ea_test_***...m3A1', created: '2026-03-01', expires: '2026-06-01', active: true },
];

const menuItems = [
  { label: 'Home (Hub)', icon: Home, gradient: 'from-violet-400 to-purple-600' },
  { label: 'Profile', icon: User, gradient: 'from-fuchsia-400 to-purple-600' },
  { label: 'AI Models', icon: Sparkles, gradient: 'from-purple-400 to-indigo-600' },
  { label: 'Feedback', icon: MessageSquareText, gradient: 'from-violet-400 to-fuchsia-600' },
  { label: 'Developer Options', icon: Code2, gradient: 'from-purple-400 to-pink-600' },
];

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onLogout, onNavigateHome }) => {
  const [view, setView] = useState<HeaderView>('none');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState(mockApiKeys);

  const isMenuOpen = view !== 'none';

  const handleMenuAction = (action: string) => {
    if (action === 'profile') setView('profile');
    else if (action === 'devOptions') setView('devOptions');
    else if (action === 'home') {
      setView('none');
      onNavigateHome?.();
    } else {
      setView('none');
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePic(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateKey = () => {
    const newKey = {
      id: Date.now(),
      name: `Key ${apiKeys.length + 1}`,
      key: `ea_live_***...${Math.random().toString(36).slice(-4)}`,
      created: new Date().toISOString().split('T')[0],
      expires: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
      active: true,
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const revokeKey = (id: number) => {
    setApiKeys(apiKeys.map(k => k.id === id ? { ...k, active: false } : k));
  };

  const removeKey = (id: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <>
      {/* Premium Glass Header */}
      <header 
        className="flex justify-between items-center py-3 px-4 sm:px-6 relative z-20 border-b border-purple-500/20"
        style={{
          background: 'linear-gradient(180deg, rgba(88,28,135,0.4) 0%, rgba(15,23,42,0.8) 100%)',
          backdropFilter: 'blur(20px) saturate(150%)',
          boxShadow: '0 4px 30px rgba(147,51,234,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div className="flex items-center gap-3">
          {/* Animated Purple Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView(view === 'menu' ? 'none' : 'menu')}
            className="relative w-10 h-10 rounded-full cursor-pointer overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #6d28d9 100%)',
              boxShadow: '0 0 20px rgba(168,85,247,0.6), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 opacity-50 blur-sm" />
            
            {profilePic ? (
              <img src={profilePic} alt="DP" className="w-full h-full object-cover relative z-10" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-white text-sm relative z-10 drop-shadow-lg">
                EA
              </div>
            )}
          </motion.div>
          
          <div className="flex flex-col">
            <span className="font-bold tracking-wide text-white text-lg sm:text-xl drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Dashboard
            </span>
            <span className="text-[10px] text-purple-300 font-medium tracking-wider uppercase">Premium Member</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Wallet Address Pill */}
          <div 
            className="px-4 py-1.5 rounded-full flex items-center gap-2 border border-purple-400/30"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(124,58,237,0.1) 100%)',
              boxShadow: '0 0 15px rgba(168,85,247,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,1)]" />
            <span className="text-xs font-bold text-purple-100 tracking-wide font-mono">0x1A4...B9F2</span>
          </div>

          {/* Animated Hamburger */}
          <button
            onClick={() => setView(isMenuOpen ? 'none' : 'menu')}
            className="relative p-2 z-50 rounded-lg hover:bg-purple-500/20 transition-colors"
          >
            <div className="space-y-1.5 transition-all duration-300 w-6">
              <motion.div 
                animate={{ 
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 8 : 0
                }}
                className={`h-[2px] rounded-full bg-gradient-to-r from-purple-300 to-fuchsia-300 ${isMenuOpen ? 'w-6' : 'w-6'}`}
                style={{ boxShadow: isMenuOpen ? '0 0 10px rgba(216,180,254,0.8)' : 'none' }}
              />
              <motion.div 
                animate={{ opacity: isMenuOpen ? 0 : 1, x: isMenuOpen ? 20 : 0 }}
                className="w-6 h-[2px] rounded-full bg-gradient-to-r from-purple-300 to-fuchsia-300"
              />
              <motion.div 
                animate={{ 
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -8 : 0,
                  width: isMenuOpen ? 24 : 16
                }}
                className="h-[2px] rounded-full bg-gradient-to-r from-purple-300 to-fuchsia-300 ml-auto"
                style={{ boxShadow: isMenuOpen ? '0 0 10px rgba(216,180,254,0.8)' : 'none' }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Premium Purple Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-purple-950/40 backdrop-blur-md z-30"
            onClick={() => setView('none')}
            style={{
              background: 'radial-gradient(circle at top right, rgba(147,51,234,0.3) 0%, rgba(0,0,0,0.8) 70%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Royal Slide-out Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 sm:w-96 z-40 overflow-y-auto scrollbar-hide"
            style={{
              background: 'linear-gradient(180deg, rgba(88,28,135,0.95) 0%, rgba(15,23,42,0.98) 50%, rgba(2,6,23,1) 100%)',
              backdropFilter: 'blur(30px)',
              borderLeft: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '-20px 0 50px rgba(147,51,234,0.3)'
            }}
          >
            {/* Ambient Glow Top */}
            <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-[100px]" />
              <div className="absolute top-20 left-10 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative p-6 pt-24">
              {/* Back Button for Sub-menus */}
              {view !== 'menu' && (
                <motion.button 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setView('menu')}
                  className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-6 group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-bold tracking-wide">BACK</span>
                </motion.button>
              )}

              {/* Main Menu View */}
              {view === 'menu' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Crown className="w-5 h-5 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200 font-bold tracking-[0.2em] text-xs uppercase">
                      Main Menu
                    </p>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </div>

                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleMenuAction(item.label.toLowerCase().includes('profile') ? 'profile' : item.label.toLowerCase().includes('dev') ? 'devOptions' : 'home')}
                      className="group relative flex items-center gap-4 p-4 rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(168,85,247,0.1)'
                      }}
                    >
                      {/* Hover Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Icon Container */}
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(124,58,237,0.1) 100%)`,
                          border: '1px solid rgba(168,85,247,0.2)',
                          boxShadow: '0 0 20px rgba(168,85,247,0.1)'
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 transition-opacity`} />
                        <item.icon className="w-5 h-5 text-purple-200 relative z-10 group-hover:text-white transition-colors" />
                      </div>

                      <span className="font-bold text-purple-100 group-hover:text-white transition-colors">{item.label}</span>
                      
                      {/* Arrow indicator */}
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                        </div>
                      </div>
                    </motion.button>
                  ))}

                  {/* Disconnect Section */}
                  <div className="mt-8 pt-6 border-t border-purple-500/20">
                    <button 
                      onClick={onLogout} 
                      className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-300 hover:text-red-200 transition-all hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <X className="w-5 h-5" />
                      </div>
                      <span className="font-bold">Disconnect Wallet</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Profile View */}
              {view === 'profile' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col items-center gap-4">
                    {/* Large Animated Avatar */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-xl opacity-50 animate-pulse" />
                      <div 
                        className="w-28 h-28 rounded-full relative overflow-hidden border-2 border-purple-400/50"
                        style={{
                          background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                          boxShadow: '0 0 40px rgba(168,85,247,0.5)'
                        }}
                      >
                        {profilePic ? (
                          <img src={profilePic} alt="DP" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white drop-shadow-lg">
                            EA
                          </div>
                        )}
                      </div>
                      
                      {/* Camera Button */}
                      <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer border-2 border-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:scale-110 transition-transform">
                        <Camera className="w-5 h-5 text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                      </label>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">e-Akhuwat User</h3>
                      <p className="text-sm font-mono text-purple-300 mt-1">0x1A4...B9F2</p>
                      <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
                        <Crown className="w-3 h-3 text-purple-300" />
                        <span className="text-xs font-bold text-purple-200">Level 2 VIP</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Referrals', value: '24', icon: User },
                      { label: 'Joined', value: 'Jan 2026', icon: Clock },
                    ].map((stat) => (
                      <div 
                        key={stat.label}
                        className="p-4 rounded-2xl border border-purple-500/20"
                        style={{
                          background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(124,58,237,0.05) 100%)'
                        }}
                      >
                        <stat.icon className="w-4 h-4 text-purple-400 mb-2" />
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-purple-300 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Developer Options View */}
              {view === 'devOptions' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                      <span className="font-bold text-purple-100">API Keys</span>
                    </div>
                    <button 
                      onClick={generateKey} 
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105"
                    >
                      <Plus className="w-3 h-3" /> Generate New
                    </button>
                  </div>

                  <div className="space-y-3">
                    {apiKeys.map((k, index) => {
                      const daysLeft = Math.ceil((new Date(k.expires).getTime() - Date.now()) / 86400000);
                      const isExpiring = daysLeft <= 30;
                      
                      return (
                        <motion.div 
                          key={k.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-2xl border border-purple-500/20 relative overflow-hidden group"
                          style={{
                            background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(124,58,237,0.03) 100%)'
                          }}
                        >
                          {/* Glow effect for active */}
                          {k.active && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                          )}
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-purple-100">{k.name}</span>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${k.active ? 'bg-purple-500/20 text-purple-300 border-purple-400/30' : 'bg-red-500/10 text-red-300 border-red-400/20'}`}>
                              {k.active ? 'Active' : 'Revoked'}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-black/30 border border-purple-500/10">
                            <Key className="w-3 h-3 text-purple-400" />
                            <p className="text-xs font-mono text-purple-200">{k.key}</p>
                          </div>
                          
                          <div className="flex items-center gap-1 text-[11px] text-purple-400 mb-3">
                            <Clock className="w-3 h-3" />
                            <span className={isExpiring ? 'text-orange-300 font-bold' : ''}>
                              Expires: {k.expires} {isExpiring && `(${daysLeft}d left)`}
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            {k.active && (
                              <button 
                                onClick={() => revokeKey(k.id)} 
                                className="flex-1 py-2 rounded-lg text-xs font-bold text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 transition-colors border border-transparent hover:border-orange-500/20"
                              >
                                Revoke
                              </button>
                            )}
                            <button 
                              onClick={() => removeKey(k.id)} 
                              className="flex-1 py-2 rounded-lg text-xs font-bold text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardHeader;
