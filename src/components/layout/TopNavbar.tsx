import React, { useState, useRef, useEffect } from 'react';
import { RolePengguna, NotifikasiModel } from '../../types/aplikasiMitra.ts';
import {
  Bell,
  Menu,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  LogOut,
  User,
  Settings,
  HelpCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Compass
} from 'lucide-react';

interface TopNavbarProps {
  currentRole: RolePengguna;
  onRoleChange: (role: RolePengguna) => void;
  pageTitle: string;
  breadcrumbs: string[];
  notifications: NotifikasiModel[];
  onOpenMobileMenu: () => void;
  onNavigate: (page: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentRole,
  onRoleChange,
  pageTitle,
  breadcrumbs,
  notifications,
  onOpenMobileMenu,
  onNavigate
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.sudahDibaca).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Drawer Trigger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
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
          {/* Prominent Role Switcher Button */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => onRoleChange('SURVEYOR')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'SURVEYOR'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={14} />
              <span className="hidden sm:inline">Surveyor (SB)</span>
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
              <span className="hidden sm:inline">Panitia / Verifikator</span>
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
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center shadow-xs">
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
                      onNavigate('notifikasi');
                    }}
                    className="text-[11px] font-semibold text-blue-700 hover:underline"
                  >
                    Buka Semua
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        setIsNotifOpen(false);
                        onNavigate('notifikasi');
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                        !notif.sudahDibaca ? 'bg-amber-50/40' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {notif.kategori === 'Perpanjangan Lisensi' && (
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                            <Clock size={14} />
                          </div>
                        )}
                        {notif.kategori === 'Validasi' && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                        {notif.kategori === 'Perbaikan Dokumen' && (
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                            <AlertTriangle size={14} />
                          </div>
                        )}
                        {notif.kategori === 'Pindah Wilayah' && (
                          <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                            <Compass size={14} />
                          </div>
                        )}
                        {(notif.kategori === 'SK Terbit' || notif.kategori === 'Informasi Sistem') && (
                          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                            <FileCheck2 size={14} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="font-semibold text-slate-900 text-[11px]">
                          {notif.kategori}
                        </div>
                        <p className="text-slate-700 line-clamp-2 leading-snug">
                          {notif.pesan}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {notif.tanggalKirim}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      onNavigate('notifikasi');
                    }}
                    className="text-xs font-bold text-[#0f2e59] hover:underline"
                  >
                    Buka Notification Center &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 sm:pl-2 sm:pr-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0f2e59] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {currentRole === 'SURVEYOR' ? 'AP' : 'FT'}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {currentRole === 'SURVEYOR' ? 'Andi Pratama, S.T.' : 'Fairuz Tsani, S.Kom.'}
                </span>
                <span className="text-[10px] text-slate-500 font-medium leading-none">
                  {currentRole === 'SURVEYOR' ? 'Surveyor Kadaster' : 'Panitia Ditjen SPPR'}
                </span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <div className="font-bold text-slate-900">
                    {currentRole === 'SURVEYOR' ? 'Andi Pratama, S.T.' : 'Fairuz Tsani Habibi, S.Kom.'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {currentRole === 'SURVEYOR' ? 'andi.pratama@mitra-bpn.go.id' : 'fairuztsanihabibi03@gmail.com'}
                  </div>
                  <span className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#0f2e59] text-white font-mono">
                    {currentRole === 'SURVEYOR' ? 'ID: SB-2024-00125' : 'NIP: 19950320 202012 1 003'}
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigate(currentRole === 'SURVEYOR' ? 'sb-profil' : 'panitia-dashboard');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium text-left"
                  >
                    <User size={15} className="text-slate-500" />
                    <span>Profil Saya</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onRoleChange(currentRole === 'SURVEYOR' ? 'PANITIA' : 'SURVEYOR');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium text-left"
                  >
                    <ShieldCheck size={15} className="text-amber-500" />
                    <span>
                      Ganti Peran ke: {currentRole === 'SURVEYOR' ? 'Panitia / Verifikator' : 'Surveyor (SB)'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigate('sb-bantuan');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium text-left"
                  >
                    <HelpCircle size={15} className="text-slate-500" />
                    <span>Pusat Bantuan</span>
                  </button>
                </div>

                <div className="p-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      alert('Sesi simulasi Aplikasi Mitra berakhir. Anda dialihkan ke halaman login.');
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
