import React, { useState } from 'react';
import { NotifikasiMitra, JenisNotifikasi } from '../../../types/mitraPerpanjangan.ts';
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck2,
  Filter,
  CheckCheck
} from 'lucide-react';

interface NotifikasiPageProps {
  notifications: NotifikasiMitra[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateToDetail?: (pengajuanId: string) => void;
}

export const NotifikasiPage: React.FC<NotifikasiPageProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateToDetail
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('SEMUA');

  const filtered = notifications.filter(n => {
    if (filterCategory === 'SEMUA') return true;
    return n.jenis === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Pusat Pemberitahuan & Notifikasi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Informasi otomatis mengenai batas waktu lisensi, status verifikasi berkas, dan penerbitan SK.
          </p>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <CheckCheck size={15} />
          <span>Tandai Semua Sudah Dibaca</span>
        </button>
      </div>

      {/* Filter Tabs (Bagian 8 brief) */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'SEMUA', label: 'Semua Notifikasi' },
          { id: 'PENGINGAT_H3', label: 'Pengingat Perpanjangan' },
          { id: 'PERBAIKAN', label: 'Perbaikan Dokumen' },
          { id: 'PROSES_SK', label: 'Proses SK' },
          { id: 'SK_TERBIT', label: 'SK Terbit' }
        ].map((tab) => (
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
            <Bell size={28} className="mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-600">Tidak ada notifikasi dalam kategori ini</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                !item.sudah_dibaca ? 'bg-amber-50/40' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0">
                  {item.jenis === 'PENGINGAT_H3' && (
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shadow-2xs">
                      <Clock size={16} />
                    </div>
                  )}
                  {item.jenis === 'PERBAIKAN' && (
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shadow-2xs">
                      <AlertTriangle size={16} />
                    </div>
                  )}
                  {item.jenis === 'PROSES_SK' && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shadow-2xs">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                  {item.jenis === 'SK_TERBIT' && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-2xs">
                      <FileCheck2 size={16} />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">
                      {item.jenis === 'PENGINGAT_H3' && 'Pengingat Masa Berlaku (H-3 Bulan)'}
                      {item.jenis === 'PERBAIKAN' && 'Perbaikan Dokumen Persyaratan'}
                      {item.jenis === 'PROSES_SK' && 'Dokumen Lengkap & Penyusunan SK'}
                      {item.jenis === 'SK_TERBIT' && 'SK Perpanjangan Resmi Terbit'}
                    </span>
                    {!item.sudah_dibaca && (
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[11px] max-w-3xl">
                    {item.pesan}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {item.tgl_kirim}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                {!item.sudah_dibaca && (
                  <button
                    onClick={() => onMarkAsRead(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-xs"
                  >
                    Tandai Dibaca
                  </button>
                )}
                {item.pengajuan_id && (
                  <button
                    onClick={() => {
                      onMarkAsRead(item.id);
                      if (onNavigateToDetail) onNavigateToDetail(item.pengajuan_id!);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs shadow-2xs"
                  >
                    Lihat Detail
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
