import React, { useState } from 'react';
import { Surveyor, Permohonan } from '../../types/index.ts';
import { StatCard } from '../common/StatCard.tsx';
import { WILAYAH_STATS, MONTHLY_APPLICATION_DATA } from '../../data/dummyData.ts';
import {
  BarChart3,
  Download,
  Users,
  FileText,
  CheckCircle2,
  CalendarClock,
  PieChart,
  MapPin,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface LaporanPageProps {
  surveyors: Surveyor[];
  permohonanList: Permohonan[];
  onOpenExportModal: () => void;
}

export const LaporanPage: React.FC<LaporanPageProps> = ({
  surveyors,
  permohonanList,
  onOpenExportModal
}) => {
  const [filterTahun, setFilterTahun] = useState('2026');

  // Real Dynamic Metrics
  const totalSurveyor = surveyors.length;
  const totalPermohonan = permohonanList.length;
  const totalVerifikasiSelesai = permohonanList.filter((p) => p.status === 'Disetujui').length;
  const totalPerpanjangan = permohonanList.filter((p) => p.jenisPermohonan === 'Perpanjangan Lisensi').length;

  const approvedCount = permohonanList.filter((p) => p.status === 'Disetujui').length;
  const inProgressCount = permohonanList.filter((p) => p.status === 'Sedang Diproses' || p.status === 'Menunggu Verifikasi').length;
  const rejectedCount = permohonanList.filter((p) => p.status === 'Ditolak').length;

  const approvedPct = totalPermohonan > 0 ? Math.round((approvedCount / totalPermohonan) * 100) : 0;
  const inProgressPct = totalPermohonan > 0 ? Math.round((inProgressCount / totalPermohonan) * 100) : 0;
  const rejectedPct = totalPermohonan > 0 ? (100 - approvedPct - inProgressPct) : 0;

  // Max value for bar scaling
  const maxMonthValue = Math.max(...MONTHLY_APPLICATION_DATA.map((d) => d.baru + d.perpanjangan), 1);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Laporan & Analisis Statistik Surveyor Berlisensi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Rekapitulasi capaian layanan lisensi kadaster, waktu siklus verifikasi berkas, dan sebaran wilayah kerja
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="py-2 px-3 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 focus:border-[#0f2e59] outline-none shadow-2xs"
          >
            <option value="2026">Tahun Anggaran 2026</option>
            <option value="2025">Tahun Anggaran 2025</option>
          </select>

          <button
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0f2e59] hover:bg-[#16396b] rounded-lg shadow-sm transition-colors"
          >
            <Download size={14} />
            <span>Export Laporan</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards (Mandatory from prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Jumlah Surveyor"
          value={totalSurveyor}
          subtitle="SK & ASKB Terdaftar Resmi"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Jumlah Permohonan"
          value={totalPermohonan}
          subtitle="Tahun Berjalan 2026"
          icon={FileText}
          variant="slate"
        />
        <StatCard
          title="Jumlah Verifikasi"
          value={totalVerifikasiSelesai}
          subtitle="93.1% Telah Diputus SK"
          icon={CheckCircle2}
          variant="emerald"
        />
        <StatCard
          title="Jumlah Perpanjangan"
          value={totalPerpanjangan}
          subtitle="Masa Berlaku Diperbarui"
          icon={CalendarClock}
          variant="indigo"
        />
      </div>

      {/* Grid: Permohonan Per Bulan & Status Permohonan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Permohonan per Bulan (Bar Chart) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 size={17} className="text-[#0f2e59]" />
                <span>Tren Permohonan Masuk per Bulan (2026)</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Perbandingan volume berkas Lisensi Baru vs Permohonan Perpanjangan
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#0f2e59]"></span>
                Lisensi Baru
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-amber-500"></span>
                Perpanjangan
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 pt-6 pb-2 px-2">
            {MONTHLY_APPLICATION_DATA.map((item) => {
              const total = item.baru + item.perpanjangan;
              const heightPct = Math.round((total / maxMonthValue) * 100);
              const baruPct = Math.round((item.baru / total) * 100);

              return (
                <div key={item.bulan} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Tooltip on hover */}
                  <span className="text-[10px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                    {total}
                  </span>

                  {/* Stacked bar */}
                  <div className="w-full max-w-[28px] bg-slate-100 rounded-t-sm flex flex-col justify-end overflow-hidden transition-all group-hover:brightness-95" style={{ height: `${heightPct}%` }}>
                    <div
                      className="bg-amber-500 w-full"
                      style={{ height: `${100 - baruPct}%` }}
                      title={`Perpanjangan: ${item.perpanjangan}`}
                    />
                    <div
                      className="bg-[#0f2e59] w-full"
                      style={{ height: `${baruPct}%` }}
                      title={`Baru: ${item.baru}`}
                    />
                  </div>

                  {/* Month Label */}
                  <span className="text-xs font-semibold text-slate-600 mt-1">
                    {item.bulan}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Rata-rata permohonan masuk: 49 berkas / bulan</span>
            <span>Puncak pengajuan: September (83 berkas)</span>
          </div>
        </div>

        {/* Chart 2: Status Permohonan (Pie / Donut Proportion) */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <PieChart size={17} className="text-[#0f2e59]" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Komposisi Status Permohonan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Distribusi hasil verifikasi berkas
                </p>
              </div>
            </div>

            {/* Custom Clean SVG Donut Chart */}
            <div className="py-2 flex items-center justify-center relative">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                {/* Background circle */}
                <path
                  className="text-slate-100"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {totalPermohonan > 0 && (
                  <>
                    {/* Disetujui */}
                    <path
                      className="text-emerald-500"
                      strokeDasharray={`${approvedPct}, 100`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Diproses */}
                    <path
                      className="text-sky-500"
                      strokeDasharray={`${inProgressPct}, 100`}
                      strokeDashoffset={`-${approvedPct}`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Ditolak */}
                    <path
                      className="text-rose-500"
                      strokeDasharray={`${rejectedPct}, 100`}
                      strokeDashoffset={`-${approvedPct + inProgressPct}`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </>
                )}
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-slate-900 tabular-nums">{totalPermohonan}</span>
                <span className="text-[10px] text-slate-400 font-medium">Permohonan</span>
              </div>
            </div>

            {/* Legend & Percentages */}
            <div className="space-y-2 mt-4 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="font-medium text-slate-700">Disetujui (SK Terbit)</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  {approvedCount} ({approvedPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="font-medium text-slate-700">Sedang Diproses</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  {inProgressCount} ({inProgressPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="font-medium text-slate-700">Ditolak / Dikembalikan</span>
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  {rejectedCount} ({rejectedPct}%)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Tingkat persetujuan memenuhi standar KPI Ditjen SPPR (&ge; 75%).
          </div>
        </div>
      </div>

      {/* Section 3: Jumlah Surveyor Berdasarkan Wilayah (Mandatory from prompt) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin size={17} className="text-[#0f2e59]" />
              <span>Jumlah Surveyor Berdasarkan Wilayah Kantor Wilayah BPN</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Sebaran tenaga surveyor kadaster berlisensi yang aktif bertugas dalam proyek PTSL dan kadaster perorangan
            </p>
          </div>

          <button
            onClick={onOpenExportModal}
            className="text-xs font-semibold text-[#0f2e59] hover:underline flex items-center gap-1"
          >
            <FileSpreadsheet size={14} />
            <span>Unduh Rincian Wilayah</span>
          </button>
        </div>

        <div className="space-y-3.5">
          {WILAYAH_STATS.map((stat) => {
            const maxRegion = 450;
            const pct = Math.round((stat.jumlah / maxRegion) * 100);

            return (
              <div key={stat.provinsi} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{stat.provinsi}</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      ({stat.aktif} Aktif, {stat.akanBerakhir} Akan Berakhir)
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {stat.jumlah} Orang
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#0f2e59] rounded-l-full"
                    style={{ width: `${pct * 0.9}%` }}
                    title={`Aktif: ${stat.aktif}`}
                  />
                  <div
                    className="bg-amber-500 rounded-r-full"
                    style={{ width: `${pct * 0.1}%` }}
                    title={`Akan Berakhir: ${stat.akanBerakhir}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
