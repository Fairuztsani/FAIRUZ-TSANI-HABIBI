import React, { useState, useRef, useEffect } from 'react';
import { PageType, Notifikasi } from '../../types/index.ts';
import {
  Menu,
  Bell,
  Search,
  ChevronRight,
  User,
  Shield,
  LogOut,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenMobileSidebar: () => void;
  notifications: Notifikasi[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsRead: () => void;
  selectedSurveyorName?: string;
  onGlobalSearch?: (term: string) => void;
  onClearData?: () => void;
  onLoadSampleData?: () => void;
  totalSurveyorsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileSidebar,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsRead,
  selectedSurveyorName,
  onGlobalSearch,
  onClearData,
  onLoadSampleData,
  totalSurveyorsCount = 0
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.dibaca).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Title and breadcrumb mapping
  const getHeaderMeta = () => {
    switch (currentPage) {
      case 'dashboard':
        return {
          title: 'Beranda Aplikasi Mitra',
          breadcrumb: ['Beranda']
        };
      case 'surveyors':
        return {
          title: 'Daftar Surveyor Berlisensi',
          breadcrumb: ['Beranda', 'Surveyor Berlisensi']
        };
      case 'surveyor-detail':
        return {
          title: selectedSurveyorName ? `Detail: ${selectedSurveyorName}` : 'Detail Surveyor',
          breadcrumb: ['Beranda', 'Surveyor Berlisensi', 'Detail']
        };
      case 'permohonan':
        return {
          title: 'Daftar Permohonan Lisensi',
          breadcrumb: ['Beranda', 'Permohonan']
        };
      case 'verifikasi':
        return {
          title: 'Verifikasi Berkas Permohonan',
          breadcrumb: ['Beranda', 'Verifikasi']
        };
      case 'perpanjangan':
        return {
          title: 'Manajemen Perpanjangan Lisensi',
          breadcrumb: ['Beranda', 'Perpanjangan Lisensi']
        };
      case 'notifikasi':
        return {
          title: 'Pusat Notifikasi & Informasi',
          breadcrumb: ['Beranda', 'Notifikasi']
        };
      case 'laporan':
        return {
          title: 'Laporan & Statistik Surveyor',
          breadcrumb: ['Beranda', 'Laporan']
        };
      case 'pengaturan':
        return {
          title: 'Pengaturan Sistem & Akun',
          breadcrumb: ['Beranda', 'Pengaturan']
        };
      default:
        return {
          title: 'Aplikasi Mitra',
          breadcrumb: ['Beranda']
        };
    }
  };

  const { title, breadcrumb } = getHeaderMeta();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onGlobalSearch) {
      onGlobalSearch(e.target.value);
    }
  };

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile hamburger + Titles & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Buka Menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                {idx > 0 && <ChevronRight size={12} className="text-slate-300" />}
                <span
                  className={
                    idx === breadcrumb.length - 1
                      ? 'text-slate-700 font-semibold'
                      : 'hover:text-slate-600 cursor-pointer'
                  }
                  onClick={() => {
                    if (crumb === 'Beranda') onNavigate('dashboard');
                    if (crumb === 'Surveyor Berlisensi') onNavigate('surveyors');
                  }}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>

          {/* Page Title */}
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none mt-0.5">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Quick Search + Notifications + User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Quick Search Input */}
        <div className="hidden md:flex items-center relative w-48 lg:w-64">
          <Search size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari surveyor, NIK, SK..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none transition-all"
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Lihat Notifikasi"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Notifikasi</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllNotificationsRead}
                    className="text-[11px] text-[#0f2e59] hover:underline font-medium"
                  >
                    Tandai dibaca
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      onMarkNotificationAsRead(notif.id);
                      if (notif.targetPage) onNavigate(notif.targetPage);
                      setShowNotifDropdown(false);
                    }}
                    className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                      !notif.dibaca ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {notif.judul}
                      </p>
                      {!notif.dibaca && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {notif.pesan}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1.5 block">
                      {notif.waktu}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50/50 text-center">
                <button
                  onClick={() => {
                    onNavigate('notifikasi');
                    setShowNotifDropdown(false);
                  }}
                  className="text-xs font-medium text-[#0f2e59] hover:text-[#16396b] py-1 block w-full"
                >
                  Lihat Semua Notifikasi →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Component */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0f2e59] to-[#1e4e8c] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              FH
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                Fairuz Tsani Habibi, S.Kom.
              </span>
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded w-fit mt-0.5 border border-amber-200/60">
                Verifikator
              </span>
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <p className="text-xs font-bold text-slate-900">Fairuz Tsani Habibi, S.Kom.</p>
                <p className="text-[11px] text-slate-500">NIP. 19950320 202012 1 003</p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#0f2e59] font-medium">
                  <Shield size={12} className="text-amber-600" />
                  <span>Verifikator Ahli Pertama – Ditjen SPPR</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    onNavigate('pengaturan');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors text-left"
                >
                  <User size={15} className="text-slate-400" />
                  <span>Profil & Pengaturan Akun</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('verifikasi');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors text-left"
                >
                  <CheckCircle2 size={15} className="text-slate-400" />
                  <span>Antrean Verifikasi Saya</span>
                </button>
                {onLoadSampleData && (
                  <button
                    onClick={() => {
                      onLoadSampleData();
                      setShowProfileDropdown(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-blue-700 hover:bg-blue-50 transition-colors text-left font-medium"
                  >
                    <span>Muat Data Contoh (Demo)</span>
                  </button>
                )}
                {onClearData && (
                  <button
                    onClick={() => {
                      onClearData();
                      setShowProfileDropdown(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 transition-colors text-left"
                  >
                    <span>Kosongkan Semua Data</span>
                  </button>
                )}
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    alert('Sesi demo Verifikator aktif di lingkungan Direktorat Jenderal SPPR.');
                    setShowProfileDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut size={15} />
                  <span>Keluar Sesi</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
