import React, { useState } from 'react';
import { PengajuanPerpanjangan } from '../../../types/mitraPerpanjangan.ts';
import { History, Search, Filter, CheckSquare, Eye } from 'lucide-react';

interface PanitiaRiwayatPageProps {
  pengajuanList: PengajuanPerpanjangan[];
  onOpenVerifikasi: (pengajuan: PengajuanPerpanjangan) => void;
}

export const PanitiaRiwayatPage: React.FC<PanitiaRiwayatPageProps> = ({
  pengajuanList,
  onOpenVerifikasi
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all verification logs across applications
  const allLogs = pengajuanList.flatMap(p => 
    p.riwayatStatus.map(log => ({
      ...log,
      pengajuan: p
    }))
  ).sort((a, b) => b.tgl_ubah.localeCompare(a.tgl_ubah));

  const filtered = allLogs.filter(l => 
    l.pengajuan_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.pengajuan.surveyor.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.alasan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Riwayat Verifikasi & Audit Trail
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Log lengkap setiap aktivitas pemeriksaan berkas, perubahan status permohonan, dan stempel waktu aktor penanggung jawab.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nomor pengajuan, nama pemohon, atau catatan alasan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-[#0f2e59] outline-none"
          />
        </div>
      </div>

      {/* Timeline Audit Logs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
          {filtered.map((log) => (
            <div key={log.id} className="relative flex items-start gap-4 pl-1">
              <div className="w-6 h-6 rounded-full bg-[#0f2e59] text-white flex items-center justify-center text-[10px] font-bold shrink-0 z-10 shadow-2xs">
                ✓
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex-1 space-y-1.5 hover:bg-white transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#0f2e59]">{log.pengajuan_id}</span>
                    <span className="font-bold text-slate-900">• {log.pengajuan.surveyor.nama}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{log.tgl_ubah}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-200 rounded text-slate-700 font-bold">
                    {log.status_lama}
                  </span>
                  <span className="text-slate-400">&rarr;</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 rounded text-blue-900 font-bold">
                    {log.status_baru}
                  </span>
                </div>

                <p className="text-slate-700 text-xs leading-relaxed">
                  {log.alasan}
                </p>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Aktor Pengubah: <strong className="text-slate-800">{log.diubah_oleh_nama || 'Sistem Otomatis SPPR'}</strong></span>
                  <button
                    onClick={() => onOpenVerifikasi(log.pengajuan)}
                    className="font-bold text-blue-700 hover:underline"
                  >
                    Buka Berkas &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
