import React from 'react';
import { PengajuanPerpanjangan } from '../../../types/mitraPerpanjangan.ts';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  TrendingUp,
  BarChart3,
  Eye,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  CheckSquare
} from 'lucide-react';

interface PanitiaDashboardPageProps {
  pengajuanList: PengajuanPerpanjangan[];
  onOpenVerifikasi: (pengajuan: PengajuanPerpanjangan) => void;
  onNavigate: (page: string) => void;
}

export const PanitiaDashboardPage: React.FC<PanitiaDashboardPageProps> = ({
  pengajuanList,
  onOpenVerifikasi,
  onNavigate
}) => {
  const total = pengajuanList.length;
  const diajukan = pengajuanList.filter(p => p.status === 'DIAJUKAN').length;
  const dalamVerifikasi = pengajuanList.filter(p => p.status === 'DALAM_VERIFIKASI').length;
  const perluPerbaikan = pengajuanList.filter(p => p.status === 'PERLU_PERBAIKAN').length;
  const prosesSk = pengajuanList.filter(p => p.status === 'PROSES_SK').length;
  const skTerbit = pengajuanList.filter(p => p.status === 'SK_TERBIT').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0a1c33] via-[#0f2e59] to-[#1a447c] rounded-2xl p-6 sm:p-7 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase font-mono tracking-wider">
            Dashboard Panitia Verifikator Ditjen SPPR
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
            Monitoring & Verifikasi Perpanjangan Lisensi
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mt-0.5">
            Pemeriksaan berkas persyaratan administratif dan substantif permohonan lisensi Surveyor Kadaster.
          </p>
        </div>

        <button
          onClick={() => onNavigate('panitia-pengajuan')}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <CheckSquare size={15} />
          <span>Lihat Antrean Berkas</span>
        </button>
      </div>

      {/* 5 Statistik Cards (Bagian 10 brief) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* 1. Menunggu Verifikasi */}
        <div className="p-4 bg-white rounded-2xl border border-sky-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Menunggu Verifikasi</span>
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Clock size={14} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {diajukan}
          </div>
          <p className="text-[10px] text-slate-400">Status DIAJUKAN</p>
        </div>

        {/* 2. Sedang Diperiksa */}
        <div className="p-4 bg-white rounded-2xl border border-indigo-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Dalam Verifikasi</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <CheckSquare size={14} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {dalamVerifikasi}
          </div>
          <p className="text-[10px] text-slate-400">Status DALAM_VERIFIKASI</p>
        </div>

        {/* 3. Perlu Perbaikan */}
        <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Perlu Perbaikan</span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle size={14} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {perluPerbaikan}
          </div>
          <p className="text-[10px] text-slate-400">Status PERLU_PERBAIKAN</p>
        </div>

        {/* 4. Proses SK */}
        <div className="p-4 bg-white rounded-2xl border border-blue-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Proses SK</span>
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FileCheck2 size={14} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {prosesSk}
          </div>
          <p className="text-[10px] text-slate-400">Status PROSES_SK</p>
        </div>

        {/* 5. SK Terbit */}
        <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">SK Terbit</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 size={14} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {skTerbit}
          </div>
          <p className="text-[10px] text-slate-400">Status SK_TERBIT</p>
        </div>
      </div>

      {/* Grid: 2 Grafik Sederhana (Bagian 10 brief) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik 1: Proporsi Berdasarkan Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-[#0f2e59]" />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Distribusi Berkas Berdasarkan Status Pengajuan
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Total {total} Berkas</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Bar DIAJUKAN */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-sky-800">Menunggu Verifikasi (DIAJUKAN)</span>
                <span className="font-mono text-slate-700">{diajukan} Berkas ({Math.round((diajukan / total) * 100) || 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(diajukan / total) * 100 || 5}%` }}></div>
              </div>
            </div>

            {/* Bar DALAM_VERIFIKASI */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-indigo-800">Sedang Diperiksa (DALAM_VERIFIKASI)</span>
                <span className="font-mono text-slate-700">{dalamVerifikasi} Berkas ({Math.round((dalamVerifikasi / total) * 100) || 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(dalamVerifikasi / total) * 100 || 5}%` }}></div>
              </div>
            </div>

            {/* Bar PERLU_PERBAIKAN */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-amber-800">Perlu Perbaikan Dokumen</span>
                <span className="font-mono text-slate-700">{perluPerbaikan} Berkas ({Math.round((perluPerbaikan / total) * 100) || 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(perluPerbaikan / total) * 100 || 5}%` }}></div>
              </div>
            </div>

            {/* Bar PROSES_SK */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-blue-800">Proses Penyusunan Draft SK</span>
                <span className="font-mono text-slate-700">{prosesSk} Berkas ({Math.round((prosesSk / total) * 100) || 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(prosesSk / total) * 100 || 5}%` }}></div>
              </div>
            </div>

            {/* Bar SK_TERBIT */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-emerald-800">SK Resmi Terbit & Pengumuman</span>
                <span className="font-mono text-slate-700">{skTerbit} Berkas ({Math.round((skTerbit / total) * 100) || 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(skTerbit / total) * 100 || 5}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Grafik 2: Tren Pengajuan Per Bulan */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#0f2e59]" />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Tren Pengajuan Perpanjangan Per Bulan (2026)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Tahun 2026</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-4 px-2">
            {[
              { bulan: 'Jul', jumlah: 8, height: '35%' },
              { bulan: 'Agt', jumlah: 14, height: '55%' },
              { bulan: 'Sep', jumlah: 22, height: '80%' },
              { bulan: 'Okt', jumlah: 28, height: '95%' },
              { bulan: 'Nov', jumlah: 18, height: '65%' },
              { bulan: 'Des', jumlah: 12, height: '45%' }
            ].map((bar) => (
              <div key={bar.bulan} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono font-bold text-slate-700">{bar.jumlah}</span>
                <div
                  className="w-full max-w-[36px] bg-[#0f2e59] hover:bg-amber-500 transition-colors rounded-t-lg"
                  style={{ height: bar.height }}
                ></div>
                <span className="text-[10px] text-slate-500 font-medium">{bar.bulan}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-100">
            Puncak masa berakhir lisensi kadaster 5 tahunan terkonsentrasi pada kuartal IV 2026.
          </div>
        </div>
      </div>

      {/* Tabel "Pengajuan Terbaru" (Bagian 10 brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[#0f2e59]" />
            <h3 className="font-bold text-slate-900 text-sm">
              Antrean Pengajuan Perpanjangan Terbaru
            </h3>
          </div>
          <button
            onClick={() => onNavigate('panitia-pengajuan')}
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            Lihat Semua Antrean &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Nomor Pengajuan</th>
                <th className="py-3 px-4">Nama Surveyor</th>
                <th className="py-3 px-4">Nomor Lisensi</th>
                <th className="py-3 px-4">Tanggal Pengajuan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pengajuanList.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#0f2e59]">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {item.surveyor.nama}
                    <div className="text-[10px] text-slate-400 font-normal">
                      {item.surveyor.wilayah_kerja}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">
                    {item.lisensi.no_lisensi}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {item.tgl_pengajuan}
                  </td>
                  <td className="py-3 px-4">
                    {item.status === 'DIAJUKAN' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                        DIAJUKAN
                      </span>
                    )}
                    {item.status === 'DALAM_VERIFIKASI' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        DALAM_VERIFIKASI
                      </span>
                    )}
                    {item.status === 'PERLU_PERBAIKAN' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        PERLU_PERBAIKAN
                      </span>
                    )}
                    {item.status === 'PROSES_SK' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        PROSES_SK
                      </span>
                    )}
                    {item.status === 'SK_TERBIT' && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        SK_TERBIT
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onOpenVerifikasi(item)}
                      className="px-3 py-1.5 rounded-lg bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <CheckSquare size={13} />
                      <span>{item.status === 'SK_TERBIT' ? 'Tinjau SK' : 'Periksa Berkas'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
