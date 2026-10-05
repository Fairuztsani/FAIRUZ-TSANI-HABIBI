import React from 'react';
import { RolePengguna } from '../../types/aplikasiMitra.ts';
import { AtrBpnLogo } from '../common/AtrBpnLogo.tsx';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  FileCheck,
  CheckCircle2,
  CalendarClock,
  Compass,
  Bell,
  Printer,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
  FileText,
  Megaphone,
  BarChart3,
  X,
  Building,
  Award
} from 'lucide-react';

interface UnifiedSidebarProps {
  currentRole: RolePengguna;
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  unreadNotifCount: number;
  pendingValidationCount: number;
  pendingPerpanjanganCount: number;
}

export const UnifiedSidebar: React.FC<UnifiedSidebarProps> = ({
  currentRole,
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
  unreadNotifCount,
  pendingValidationCount,
  pendingPerpanjanganCount
}) => {
  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className={`flex flex-col h-full bg-[#0c223f] text-slate-200 border-r border-[#1a385f] transition-all duration-300 select-none ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Brand Header */}
      <div className={`py-4 border-b border-[#1a385f] flex items-center justify-between ${
        isCollapsed ? 'px-3 justify-center' : 'px-5'
      }`}>
        {!isCollapsed ? (
          <AtrBpnLogo size="md" variant="light" />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">
            MITRA
          </div>
        )}

        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Role Indicator Banner */}
      <div className={`py-2 bg-[#08172c] border-b border-[#162e4f] text-[11px] flex items-center ${
        isCollapsed ? 'justify-center px-1' : 'justify-between px-5'
      }`}>
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-slate-300 truncate">
                {currentRole === 'SURVEYOR' ? 'Surveyor Berlisensi' : 'Panitia / Verifikator'}
              </span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-amber-300 font-bold">
              SPPR
            </span>
          </>
        ) : (
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 py-4 px-2.5 overflow-y-auto space-y-4">
        {currentRole === 'SURVEYOR' ? (
          /* =======================================================
             SURVEYOR BERLISENSI NAVIGATION (Section 3 Brief)
             ======================================================= */
          <>
            {/* BERANDA */}
            <div>
              <button
                onClick={() => handleItemClick('sb-beranda')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === 'sb-beranda'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                }`}
                title="Beranda"
              >
                <LayoutDashboard size={18} className={currentPage === 'sb-beranda' ? 'text-slate-950' : 'text-slate-400'} />
                {!isCollapsed && <span>Beranda</span>}
              </button>
            </div>

            {/* DATA SURVEYOR */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Data Surveyor
                </div>
              )}
              {[
                { id: 'sb-akun', label: 'Akun Saya', icon: User },
                { id: 'sb-pendidikan', label: 'Pendidikan', icon: GraduationCap },
                { id: 'sb-magang', label: 'Magang', icon: Briefcase },
                { id: 'sb-pengangkatan', label: 'Pengangkatan', icon: FileCheck },
                { id: 'sb-validasi', label: 'Validasi', icon: CheckCircle2 }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                    }`}
                    title={item.label}
                  >
                    <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* LISENSI */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lisensi
                </div>
              )}
              {[
                { 
                  id: 'sb-perpanjangan', 
                  label: 'Perpanjangan Lisensi', 
                  icon: CalendarClock,
                  badge: 'H-3 Bln',
                  badgeColor: 'bg-amber-400 text-slate-950'
                },
                { id: 'sb-pindah-wilayah', label: 'Pindah Wilayah Kerja', icon: Compass }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* LAINNYA */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lainnya
                </div>
              )}
              {[
                { 
                  id: 'notifikasi', 
                  label: 'Notifikasi', 
                  icon: Bell,
                  badge: unreadNotifCount > 0 ? unreadNotifCount : null,
                  badgeColor: 'bg-blue-500 text-white'
                },
                { id: 'sb-cetak', label: 'Cetak', icon: Printer },
                { id: 'sb-bantuan', label: 'Bantuan', icon: HelpCircle }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* PROFILE */}
            <div className="space-y-1 pt-2 border-t border-[#1a385f]">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Profile
                </div>
              )}
              <button
                onClick={() => handleItemClick('sb-profil')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === 'sb-profil'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                }`}
                title="Profil"
              >
                <User size={17} className={currentPage === 'sb-profil' ? 'text-slate-950' : 'text-slate-400'} />
                {!isCollapsed && <span>Profil</span>}
              </button>
            </div>
          </>
        ) : (
          /* =======================================================
             PANITIA / VERIFIKATOR NAVIGATION (Section 14 Brief)
             ======================================================= */
          <>
            <div>
              <button
                onClick={() => handleItemClick('panitia-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === 'panitia-dashboard'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                }`}
                title="Dashboard"
              >
                <LayoutDashboard size={18} className={currentPage === 'panitia-dashboard' ? 'text-slate-950' : 'text-slate-400'} />
                {!isCollapsed && <span>Dashboard</span>}
              </button>
            </div>

            {/* PENGAJUAN */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pengajuan Masuk
                </div>
              )}
              {[
                { 
                  id: 'panitia-validasi', 
                  label: 'Pengajuan Validasi', 
                  icon: CheckCircle2,
                  badge: pendingValidationCount > 0 ? pendingValidationCount : null,
                  badgeColor: 'bg-amber-500 text-slate-950'
                },
                { 
                  id: 'panitia-perpanjangan', 
                  label: 'Pengajuan Perpanjangan', 
                  icon: CalendarClock,
                  badge: pendingPerpanjanganCount > 0 ? pendingPerpanjanganCount : null,
                  badgeColor: 'bg-orange-500 text-white'
                },
                { id: 'panitia-pindah-wilayah', label: 'Pengajuan Pindah Wilayah', icon: Compass }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* VERIFIKASI & MASTER DATA */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Verifikasi & SK
                </div>
              )}
              {[
                { id: 'panitia-surveyor-list', label: 'Data Surveyor (Master)', icon: Users },
                { id: 'panitia-verifikasi-dokumen', label: 'Verifikasi Dokumen', icon: FileCheck },
                { id: 'panitia-sk', label: 'SK Lisensi', icon: Award },
                { id: 'panitia-pengumuman', label: 'Pengumuman', icon: Megaphone },
                { id: 'panitia-laporan', label: 'Laporan', icon: BarChart3 }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                    }`}
                    title={item.label}
                  >
                    <Icon size={17} className={isActive ? 'text-slate-950' : 'text-slate-400'} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* LAINNYA */}
            <div className="space-y-1 pt-2 border-t border-[#1a385f]">
              <button
                onClick={() => handleItemClick('notifikasi')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === 'notifikasi'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-[#16365c]'
                }`}
                title="Notifikasi"
              >
                <div className="flex items-center gap-3">
                  <Bell size={17} className={currentPage === 'notifikasi' ? 'text-slate-950' : 'text-slate-400'} />
                  {!isCollapsed && <span>Notifikasi</span>}
                </div>
                {!isCollapsed && unreadNotifCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-500 text-white">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Collapse/Expand Toggle Button (Section 3 Brief: "Sidebar harus dapat collapse/expand") */}
      <div className="p-3 border-t border-[#1a385f] bg-[#09182d] flex items-center justify-between">
        {!isCollapsed && (
          <div className="text-[10px] text-slate-400 font-medium">
            Ditjen SPPR ATR/BPN
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors mx-auto"
          title={isCollapsed ? 'Buka Sidebar' : 'Ciutkan Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
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
