import React, { useState } from 'react';
import { NotifikasiModel } from '../../../types/aplikasiMitra.ts';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck2,
  Filter,
  CheckCheck,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface SbNotifikasiPageProps {
  notifications: NotifikasiModel[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigate: (page: string) => void;
}

export const SbNotifikasiPage: React.FC<SbNotifikasiPageProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigate
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('SEMUA');

  const filtered = notifications.filter(n => {
    if (filterCategory === 'SEMUA') return true;
    if (filterCategory === 'BELUM_DIBACA') return !n.sudahDibaca;
    return n.kategori.toLowerCase().includes(filterCategory.toLowerCase());
  });

  const unreadCount = notifications.filter(n => !n.sudahDibaca).length;

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="text-[#0f2e59]" size={22} />
            <span>Pusat Notifikasi & Pemberitahuan Sistem</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pemberitahuan resmi terkait batas lisensi, status verifikasi berkas perpanjangan, mutasi wilayah, dan validasi data.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
          >
            <CheckCheck size={15} />
            <span>Tandai Semua Sudah Dibaca ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'SEMUA', label: 'Semua Notifikasi' },
          { id: 'BELUM_DIBACA', label: `Belum Dibaca (${unreadCount})` },
          { id: 'Perpanjangan', label: 'Perpanjangan Lisensi' },
          { id: 'Validasi', label: 'Validasi Data' },
          { id: 'Pindah Wilayah', label: 'Pindah Wilayah' },
          { id: 'SK Terbit', label: 'SK Terbit' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === tab.id
                ? 'bg-[#0f2e59] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden text-xs">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Bell size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-600 text-sm">Tidak ada notifikasi dalam kategori ini</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Semua pemberitahuan kementerian telah terbaca.</p>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                !item.sudahDibaca ? 'bg-amber-50/50' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0">
                  {item.kategori.includes('Perpanjangan') && (
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-2xs">
                      <Clock size={18} />
                    </div>
                  )}
                  {item.kategori.includes('Validasi') && (
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-2xs">
                      <CheckCircle2 size={18} />
                    </div>
                  )}
                  {item.kategori.includes('Pindah Wilayah') && (
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center shadow-2xs">
                      <Compass size={18} />
                    </div>
                  )}
                  {item.kategori.includes('Perbaikan') && (
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-red-800 flex items-center justify-center shadow-2xs">
                      <AlertTriangle size={18} />
                    </div>
                  )}
                  {item.kategori.includes('SK Terbit') && (
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shadow-2xs">
                      <FileCheck2 size={18} />
                    </div>
                  )}
                  {!['Perpanjangan', 'Validasi', 'Pindah Wilayah', 'Perbaikan', 'SK Terbit'].some(k => item.kategori.includes(k)) && (
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs">
                      <ShieldCheck size={18} />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-xs">
                      {item.kategori}
                    </span>
                    {!item.sudahDibaca && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950">
                        BARU
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px] max-w-3xl">
                    {item.pesan}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {item.tanggalKirim}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                {!item.sudahDibaca && (
                  <button
                    onClick={() => onMarkAsRead(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-xs transition-colors"
                  >
                    Tandai Dibaca
                  </button>
                )}
                {item.linkPage && (
                  <button
                    onClick={() => {
                      onMarkAsRead(item.id);
                      onNavigate(item.linkPage!);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs shadow-2xs flex items-center gap-1 transition-colors"
                  >
                    <span>Buka Menu</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
