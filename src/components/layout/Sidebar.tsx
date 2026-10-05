import React from 'react';
import { PageType } from '../../types/index.ts';
import { AtrBpnLogo } from '../common/AtrBpnLogo.tsx';
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  CalendarClock,
  Bell,
  BarChart3,
  Settings,
  X,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  pendingVerificationCount: number;
  expiringCount: number;
  unreadNotifCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
  pendingVerificationCount,
  expiringCount,
  unreadNotifCount
}) => {
  const menuItems = [
    {
      id: 'dashboard' as PageType,
      label: 'Beranda',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'surveyors' as PageType,
      label: 'Surveyor Berlisensi',
      icon: Users,
      badge: null
    },
    {
      id: 'permohonan' as PageType,
      label: 'Permohonan',
      icon: FileText,
      badge: null
    },
    {
      id: 'verifikasi' as PageType,
      label: 'Verifikasi',
      icon: CheckSquare,
      badge: pendingVerificationCount > 0 ? pendingVerificationCount : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'perpanjangan' as PageType,
      label: 'Perpanjangan Lisensi',
      icon: CalendarClock,
      badge: expiringCount > 0 ? expiringCount : null,
      badgeColor: 'bg-orange-500 text-white'
    },
    {
      id: 'notifikasi' as PageType,
      label: 'Notifikasi',
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : null,
      badgeColor: 'bg-blue-500 text-white'
    },
    {
      id: 'laporan' as PageType,
      label: 'Laporan',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'pengaturan' as PageType,
      label: 'Pengaturan',
      icon: Settings,
      badge: null
    }
  ];

  const handleMenuClick = (page: PageType) => {
    onNavigate(page);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0d223f] text-slate-200 border-r border-[#1a365d] select-none">
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-[#1a365d] flex items-center justify-between">
        <AtrBpnLogo size="md" variant="light" />
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Tutup Menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Division Subtitle Banner */}
      <div className="px-5 py-2.5 bg-[#0a1b32]/80 border-b border-[#162e4f] text-[11px] text-slate-400 flex items-center justify-between">
        <span className="font-medium tracking-tight">Ditjen SPPR</span>
        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Aktif
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Menu Utama
        </div>

        {menuItems.map((item) => {
          const isActive = currentPage === item.id || (currentPage === 'surveyor-detail' && item.id === 'surveyors');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-[#163459]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && (
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums ${
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

      {/* Regulatory Quick Card */}
      <div className="p-3 mx-3 mb-3 rounded-lg bg-[#142d50] border border-[#1e4273] text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
          <ShieldAlert size={14} />
          <span>Permen ATR/BPN 9/2026</span>
        </div>
        <p className="text-slate-300 text-[10px] leading-relaxed">
          Pedoman Surveyor Berlisensi & KJSB di Lingkungan Kementerian ATR/BPN.
        </p>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#1a365d] bg-[#09182d] text-[11px] text-slate-400 flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-200">v2.4.0 SPPR</p>
          <p className="text-[10px] text-slate-400">© 2026 Kementerian ATR/BPN</p>
        </div>
        <a
          href="https://atrbpn.go.id"
          target="_blank"
          rel="noreferrer"
          className="text-slate-400 hover:text-amber-400 transition-colors p-1"
          title="Portal Resmi ATR/BPN"
        >
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed 260px) */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Responsive Slide-over) */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
