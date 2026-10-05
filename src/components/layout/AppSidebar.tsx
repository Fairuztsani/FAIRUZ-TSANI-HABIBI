import React from 'react';
import { RoleAkun } from '../../types/mitraPerpanjangan.ts';
import { AtrBpnLogo } from '../common/AtrBpnLogo.tsx';
import {
  LayoutDashboard,
  User,
  Award,
  CalendarClock,
  History,
  Bell,
  HelpCircle,
  LogOut,
  X,
  FileCheck2,
  CheckSquare,
  FileText,
  Megaphone,
  BarChart3,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface AppSidebarProps {
  currentRole: RoleAkun;
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  unreadNotifCount: number;
  pendingVerificationCount: number;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  unreadNotifCount,
  pendingVerificationCount
}) => {
  // Menu definition for Surveyor Berlisensi (SB) sesuai Bagian 3 brief user
  const sbMenuItems = [
    { id: 'sb-beranda', label: 'Beranda', icon: LayoutDashboard },
    { id: 'sb-profil', label: 'Profil Saya', icon: User },
    { id: 'sb-lisensi', label: 'Lisensi Saya', icon: Award },
    { 
      id: 'sb-perpanjangan', 
      label: 'Perpanjangan Lisensi', 
      icon: CalendarClock,
      badge: 'Aktif',
      badgeColor: 'bg-amber-400 text-slate-950'
    },
    { id: 'sb-riwayat', label: 'Riwayat Pengajuan', icon: History },
    { 
      id: 'notifikasi', 
      label: 'Notifikasi', 
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : null,
      badgeColor: 'bg-blue-500 text-white'
    },
    { id: 'sb-bantuan', label: 'Bantuan', icon: HelpCircle }
  ];

  // Menu definition for Panitia / Verifikator sesuai Bagian 10 brief user
  const panitiaMenuItems = [
    { id: 'panitia-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'panitia-pengajuan', 
      label: 'Pengajuan Perpanjangan', 
      icon: FileText,
      badge: pendingVerificationCount > 0 ? pendingVerificationCount : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    { id: 'panitia-verifikasi', label: 'Verifikasi Berkas', icon: CheckSquare },
    { id: 'panitia-sk', label: 'SK Lisensi', icon: FileCheck2 },
    { id: 'panitia-pengumuman', label: 'Pengumuman', icon: Megaphone },
    { id: 'panitia-riwayat', label: 'Riwayat Verifikasi', icon: History },
    { 
      id: 'notifikasi', 
      label: 'Notifikasi', 
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : null,
      badgeColor: 'bg-blue-500 text-white'
    }
  ];

  const menuItems = currentRole === 'SB' ? sbMenuItems : panitiaMenuItems;

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0d223f] text-slate-200 border-r border-[#1a365d] select-none">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-[#1a365d] flex items-center justify-between">
        <AtrBpnLogo size="md" variant="light" />
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Tutup Menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Role Indicator Banner */}
      <div className="px-5 py-2.5 bg-[#08172b] border-b border-[#162e4f] text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-200">
            {currentRole === 'SB' ? 'Mode Surveyor (SB)' : 'Mode Panitia Verifikator'}
          </span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-amber-300">
          SPPR
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {currentRole === 'SB' ? 'Menu Surveyor Berlisensi' : 'Menu Panitia / Verifikator'}
        </div>

        {menuItems.map((item) => {
          const isActive = currentPage === item.id || 
            (item.id === 'sb-riwayat' && currentPage === 'sb-detail-pengajuan') ||
            (item.id === 'panitia-pengajuan' && currentPage === 'panitia-verifikasi');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-[#163459]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && item.badge !== undefined && (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full tabular-nums ${
                    isActive ? 'bg-slate-950 text-amber-400' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Guideline Mini Card */}
      <div className="p-3 mx-3 mb-3 rounded-xl bg-[#142d50] border border-[#1e4273] text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
          <ShieldCheck size={14} />
          <span>Permen ATR/BPN No. 9/2026</span>
        </div>
        <p className="text-slate-300 text-[10px] leading-relaxed">
          Pedoman Pengangkatan & Perpanjangan Lisensi Surveyor Kadaster.
        </p>
      </div>

      {/* Footer Info & Logout */}
      <div className="p-4 border-t border-[#1a365d] bg-[#09182d] text-[11px] text-slate-400 flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-200">Aplikasi Mitra v3.2</p>
          <p className="text-[10px] text-slate-400">© 2026 Ditjen SPPR</p>
        </div>
        <button
          onClick={() => alert('Logout sesi Aplikasi Mitra.')}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
          title="Keluar (Logout)"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
