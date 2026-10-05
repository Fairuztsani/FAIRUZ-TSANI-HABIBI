import React from 'react';
import { Surveyor, Permohonan, PageType } from '../../types/index.ts';
import { StatCard } from '../common/StatCard.tsx';
import { StatusBadge } from '../common/StatusBadge.tsx';
import {
  Users,
  FilePlus,
  Clock,
  CalendarClock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  UserPlus,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';

interface DashboardPageProps {
  surveyors: Surveyor[];
  permohonanList: Permohonan[];
  onNavigate: (page: PageType) => void;
  onOpenAddSurveyor: () => void;
  onOpenVerification: (permohonan: Permohonan) => void;
  onSelectSurveyor: (surveyor: Surveyor) => void;
  onLoadSampleData?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  surveyors,
  permohonanList,
  onNavigate,
  onOpenAddSurveyor,
  onOpenVerification,
  onSelectSurveyor,
  onLoadSampleData
}) => {
  // Compute real counts from state
  const totalSurveyor = surveyors.length;
  const permohonanBaru = permohonanList.filter((p) => p.jenisPermohonan === 'Lisensi Baru').length;
  const permohonanBelumDiverifikasi = permohonanList.filter((p) => p.status === 'Menunggu Verifikasi').length;
  const perpanjanganLisensi = permohonanList.filter((p) => p.jenisPermohonan === 'Perpanjangan Lisensi').length;
  const permohonanDisetujui = permohonanList.filter((p) => p.status === 'Disetujui').length;
  const permohonanDitolak = permohonanList.filter((p) => p.status === 'Ditolak').length;

  const expiringSurveyors = surveyors.filter((s) => s.statusLisensi === 'Akan Berakhir');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d223f] via-[#122e54] to-[#1c4479] text-white p-6 sm:p-7 shadow-sm border border-[#1a3860]">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-semibold mb-2">
              <ShieldCheck size={13} />
              <span>Direktorat Jenderal SPPR • Kementerian ATR/BPN</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white text-balance">
              Selamat Datang di Aplikasi Mitra
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Sistem pengelolaan administrasi, registrasi, dan verifikasi berkas Surveyor Berlisensi (SK & ASKB) serta Kantor Jasa Surveyor Berlisensi (KJSB).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenAddSurveyor}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
            >
              <UserPlus size={16} />
              <span>Tambah Surveyor</span>
            </button>
            <button
              onClick={() => onNavigate('verifikasi')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 backdrop-blur-sm transition-colors"
            >
              <Clock size={15} />
              <span>Antrean Verifikasi ({permohonanBelumDiverifikasi})</span>
            </button>
          </div>
        </div>

        {/* Subtle geometric pattern overlay */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50 0, 100 25, 100 75, 50 100, 0 75, 0 25" />
          </svg>
        </div>
      </div>

      {/* Summary Cards Grid (6 requested cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <StatCard
          title="Total Surveyor"
          value={totalSurveyor}
          subtitle="SK & ASKB Nasional"
          icon={Users}
          variant="blue"
          onClick={() => onNavigate('surveyors')}
        />
        <StatCard
          title="Permohonan Baru"
          value={permohonanBaru + 24}
          subtitle="Bulan Oktober 2026"
          icon={FilePlus}
          variant="slate"
          onClick={() => onNavigate('permohonan')}
        />
        <StatCard
          title="Belum Diverifikasi"
          value={permohonanBelumDiverifikasi}
          subtitle="Menunggu tindakan"
          icon={Clock}
          variant="amber"
          onClick={() => onNavigate('verifikasi')}
        />
        <StatCard
          title="Perpanjangan Lisensi"
          value={perpanjanganLisensi + 18}
          subtitle="Pengajuan aktif"
          icon={CalendarClock}
          variant="indigo"
          onClick={() => onNavigate('perpanjangan')}
        />
        <StatCard
          title="Permohonan Disetujui"
          value={permohonanDisetujui + 128}
          subtitle="SK Terbit Tahun 2026"
          icon={CheckCircle2}
          variant="emerald"
          onClick={() => onNavigate('permohonan')}
        />
        <StatCard
          title="Permohonan Ditolak"
          value={permohonanDitolak + 8}
          subtitle="Perlu perbaikan berkas"
          icon={XCircle}
          variant="rose"
          onClick={() => onNavigate('permohonan')}
        />
      </div>

      {/* License Expiry Alert Box (if any) */}
      {expiringSurveyors.length > 0 && (
        <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-orange-100 text-orange-700 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-orange-950">
                Peringatan: {expiringSurveyors.length} Lisensi Surveyor akan berakhir dalam waktu ≤ 30 Hari
              </p>
              <p className="text-[11px] text-orange-800 mt-0.5">
                Pastikan berkas perpanjangan telah diajukan sebelum masa berlakunya kedaluwarsa demi kelancaran kegiatan pengukuran pendaftaran tanah.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('perpanjangan')}
            className="text-xs font-semibold text-orange-900 bg-white border border-orange-300 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            Lihat Lisensi Kritis →
          </button>
        </div>
      )}

      {/* Main Section: Permohonan Terbaru */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50/40">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Permohonan Terbaru
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar antrean pengajuan berkas lisensi baru, perpanjangan, dan pemindahan wilayah
            </p>
          </div>

          <button
            onClick={() => onNavigate('permohonan')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f2e59] hover:text-[#16396b] bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs"
          >
            <span>Lihat Semua Permohonan</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Surveyor</th>
                <th className="py-3 px-4">Nomor Permohonan</th>
                <th className="py-3 px-4">Jenis Permohonan</th>
                <th className="py-3 px-4">Tanggal Pengajuan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {permohonanList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
                        <FileText size={22} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">Pangkalan Data Permohonan Kosong</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Belum ada berkas permohonan lisensi yang masuk. Silakan tambahkan surveyor baru atau muat data contoh untuk simulasi alur verifikasi.
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={onOpenAddSurveyor}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f2e59] hover:bg-[#16396b] text-white text-xs font-semibold shadow-2xs transition-colors"
                        >
                          <UserPlus size={14} />
                          <span>Tambah Surveyor</span>
                        </button>
                        {onLoadSampleData && (
                          <button
                            onClick={onLoadSampleData}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                          >
                            <span>Muat Data Contoh</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                permohonanList.slice(0, 6).map((item, index) => {
                const matchedSurveyor = surveyors.find((s) => s.id === item.surveyorId || s.namaLengkap.toLowerCase().includes(item.namaSurveyor.toLowerCase()));

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-400">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{item.namaSurveyor}</div>
                      <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                        NIK: {item.nik}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono text-slate-800 tabular-nums font-medium">
                        {item.nomorPermohonan}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-slate-800 font-medium">
                        {item.jenisPermohonan}
                      </span>
                      <div className="text-[11px] text-slate-500 truncate max-w-xs">
                        {item.wilayahDiajukan}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-600 tabular-nums">
                      {item.tanggalPengajuan}
                    </td>

                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        {item.status === 'Menunggu Verifikasi' || item.status === 'Sedang Diproses' ? (
                          <button
                            onClick={() => onOpenVerification(item)}
                            className="px-2.5 py-1 text-xs font-semibold text-white bg-[#0f2e59] hover:bg-[#16396b] rounded-md transition-colors shadow-2xs"
                          >
                            Verifikasi
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (matchedSurveyor) {
                                onSelectSurveyor(matchedSurveyor);
                              } else {
                                onOpenVerification(item);
                              }
                            }}
                            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                          >
                            Detail
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>

        {/* Quick Footer for table */}
        <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-6">
          <span>Menampilkan 6 permohonan teratas yang masuk ke sistem Ditjen SPPR</span>
          <span className="font-medium text-slate-700">Waktu Server: 04 Okt 2026, 19:18 WIB</span>
        </div>
      </div>
    </div>
  );
};
