import React, { useState } from 'react';
import { Notifikasi, PageType } from '../../types/index.ts';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  Info,
  CalendarClock,
  CheckCheck,
  Trash2,
  Filter
} from 'lucide-react';

interface NotifikasiPageProps {
  notifications: Notifikasi[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNavigate: (page: PageType) => void;
}

export const NotifikasiPage: React.FC<NotifikasiPageProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onNavigate
}) => {
  const [filterKategori, setFilterKategori] = useState<string>('semua');

  const filteredNotifs = notifications.filter((notif) => {
    if (filterKategori === 'semua') return true;
    if (filterKategori === 'belum-dibaca') return !notif.dibaca;
    return notif.kategori === filterKategori;
  });

  const unreadCount = notifications.filter((n) => !n.dibaca).length;

  const getNotifIcon = (kategori: string) => {
    switch (kategori) {
      case 'permohonan':
        return <Clock size={18} className="text-amber-600" />;
      case 'verifikasi':
        return <CheckCircle2 size={18} className="text-emerald-600" />;
      case 'perpanjangan':
        return <CalendarClock size={18} className="text-sky-600" />;
      case 'peringatan':
        return <AlertTriangle size={18} className="text-orange-600" />;
      default:
        return <Info size={18} className="text-blue-600" />;
    }
  };

  const getNotifBg = (kategori: string) => {
    switch (kategori) {
      case 'permohonan':
        return 'bg-amber-50 border-amber-200';
      case 'verifikasi':
        return 'bg-emerald-50 border-emerald-200';
      case 'perpanjangan':
        return 'bg-sky-50 border-sky-200';
      case 'peringatan':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Pusat Notifikasi
            </h2>
            {unreadCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                {unreadCount} Belum Dibaca
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pemberitahuan aktivitas permohonan lisensi, status verifikasi berkas, dan peringatan masa berlaku kadaster
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0f2e59] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
          >
            <CheckCheck size={15} />
            <span>Tandai Semua Sudah Dibaca</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
        {[
          { id: 'semua', label: 'Semua' },
          { id: 'belum-dibaca', label: 'Belum Dibaca' },
          { id: 'permohonan', label: 'Permohonan Baru' },
          { id: 'verifikasi', label: 'Verifikasi' },
          { id: 'perpanjangan', label: 'Perpanjangan' },
          { id: 'peringatan', label: 'Peringatan Lisensi' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterKategori(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterKategori === tab.id
                ? 'bg-[#0f2e59] text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2.5">
        {filteredNotifs.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <Bell size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Tidak Ada Notifikasi</p>
            <p className="text-xs text-slate-400 mt-1">Anda sudah melihat seluruh pembaruan sistem terkini.</p>
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                !notif.dibaca
                  ? 'bg-white border-[#0f2e59]/30 shadow-xs ring-1 ring-[#0f2e59]/10'
                  : 'bg-white border-slate-200 opacity-90'
              }`}
            >
              <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${getNotifBg(notif.kategori)}`}>
                {getNotifIcon(notif.kategori)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">
                      {notif.judul}
                    </h3>
                    {!notif.dibaca && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">
                    {notif.waktu}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {notif.pesan}
                </p>

                <div className="flex items-center justify-between gap-4 mt-3 pt-2.5 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    {notif.targetPage && (
                      <button
                        onClick={() => {
                          onMarkAsRead(notif.id);
                          onNavigate(notif.targetPage!);
                        }}
                        className="text-xs font-semibold text-[#0f2e59] hover:underline"
                      >
                        Buka Halaman Terkait →
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {!notif.dibaca && (
                      <button
                        onClick={() => onMarkAsRead(notif.id)}
                        className="text-[11px] font-medium text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
                      >
                        Tandai sudah dibaca
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteNotification(notif.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors"
                      title="Hapus Notifikasi"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
