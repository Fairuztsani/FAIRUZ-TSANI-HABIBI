import React, { useState, useRef, useEffect } from 'react';
import { RoleAkun, NotifikasiMitra } from '../../types/mitraPerpanjangan.ts';
import { 
  Bell, 
  Menu, 
  ChevronDown, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  User, 
  Settings, 
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Clock
} from 'lucide-react';

interface NavbarProps {
  currentRole: RoleAkun;
  onRoleChange: (role: RoleAkun) => void;
  pageTitle: string;
  breadcrumbs: string[];
  notifications: NotifikasiMitra[];
  onOpenMobileMenu: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  pageTitle,
  breadcrumbs,
  notifications,
  onOpenMobileMenu,
  onNavigateToNotifications,
  onNavigateToProfile
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.sudah_dibaca).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Buka Menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex flex-col">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <span>Aplikasi Mitra</span>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-slate-300">/</span>
                  <span className={idx === breadcrumbs.length - 1 ? 'text-[#0f2e59] font-bold' : ''}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>

            <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right: Role Switcher, Notification & Profile */}
        <div className="flex items-center gap-3">
          {/* Prominent Role Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => onRoleChange('SB')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'SB'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={14} />
              <span>Surveyor (SB)</span>
            </button>
            <button
              onClick={() => onRoleChange('PANITIA')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'PANITIA'
                  ? 'bg-[#0f2e59] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck size={14} />
              <span>Panitia / Verifikator</span>
            </button>
          </div>

          {/* Notification Bell Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Pemberitahuan"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">Pemberitahuan Sistem</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[10px]">
                        {unreadCount} Baru
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onNavigateToNotifications();
                    }}
                    className="text-[11px] font-semibold text-blue-700 hover:underline"
                  >
                    Lihat Semua
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        setIsNotifOpen(false);
                        onNavigateToNotifications();
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                        !notif.sudah_dibaca ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {notif.jenis === 'PENGINGAT_H3' && (
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                            <Clock size={14} />
                          </div>
                        )}
                        {notif.jenis === 'PERBAIKAN' && (
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <AlertTriangle size={14} />
                          </div>
                        )}
                        {notif.jenis === 'PROSES_SK' && (
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                        {notif.jenis === 'SK_TERBIT' && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <FileCheck2 size={14} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <p className="text-slate-800 font-medium line-clamp-2 leading-snug">
                          {notif.pesan}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {notif.tgl_kirim}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onNavigateToNotifications();
                    }}
                    className="text-xs font-bold text-[#0f2e59] hover:underline"
                  >
                    Buka Halaman Notifikasi Lengkap &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 sm:pl-2 sm:pr-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0f2e59] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {currentRole === 'SB' ? 'AP' : 'FT'}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {currentRole === 'SB' ? 'Andi Pratama, S.T.' : 'Fairuz Tsani, S.Kom.'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium leading-none">
                  {currentRole === 'SB' ? 'Surveyor Kadaster' : 'Panitia Verifikator'}
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <div className="font-bold text-slate-900">
                    {currentRole === 'SB' ? 'Andi Pratama, S.T.' : 'Fairuz Tsani Habibi, S.Kom.'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {currentRole === 'SB' ? 'andi.pratama@mitra-bpn.go.id' : 'fairuztsanihabibi03@gmail.com'}
                  </div>
                  <span className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#0f2e59] text-white">
                    {currentRole === 'SB' ? 'Surveyor Berlisensi (SB)' : 'Panitia Ditjen SPPR'}
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  {currentRole === 'SB' && (
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onNavigateToProfile();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium text-left"
                    >
                      <User size={15} className="text-slate-500" />
                      <span>Profil Saya</span>
                    </button>
                  )}

                  {/* Switch Role Trigger in Menu */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onRoleChange(currentRole === 'SB' ? 'PANITIA' : 'SB');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium text-left"
                  >
                    <ShieldCheck size={15} className="text-amber-500" />
                    <span>
                      Ganti ke Mode: {currentRole === 'SB' ? 'Panitia / Verifikator' : 'Surveyor (SB)'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      alert('Sesi simulasi Aplikasi Mitra aktif.');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium text-left"
                  >
                    <Settings size={15} className="text-slate-500" />
                    <span>Pengaturan Akun</span>
                  </button>
                </div>

                <div className="p-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      alert('Logout berhasil. Anda dialihkan ke halaman login portal.');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-bold text-left"
                  >
                    <LogOut size={15} />
                    <span>Keluar Akun (Logout)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
