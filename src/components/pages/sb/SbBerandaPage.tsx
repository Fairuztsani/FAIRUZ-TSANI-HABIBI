import React from 'react';
import { SurveyorMitra, LisensiMitra, PengajuanPerpanjangan, NotifikasiMitra } from '../../../types/mitraPerpanjangan.ts';
import {
  CalendarClock,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  FileText,
  Bell,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  FileCheck2
} from 'lucide-react';

interface SbBerandaPageProps {
  surveyor: SurveyorMitra;
  lisensi: LisensiMitra;
  activePengajuan?: PengajuanPerpanjangan;
  notifications: NotifikasiMitra[];
  onNavigate: (page: string) => void;
  onOpenDetailPengajuan?: (pengajuan: PengajuanPerpanjangan) => void;
}

export const SbBerandaPage: React.FC<SbBerandaPageProps> = ({
  surveyor,
  lisensi,
  activePengajuan,
  notifications,
  onNavigate,
  onOpenDetailPengajuan
}) => {
  const isExpiringSoon = lisensi.sisaHari <= 90;
  const isExpired = lisensi.sisaHari <= 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0a1f3d] via-[#0f2e59] to-[#1e467a] rounded-2xl p-6 sm:p-7 text-white shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider font-mono">
              Surveyor Berlisensi (SB)
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Selamat Datang, {surveyor.nama}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl">
              Portal Mandiri Pengelolaan Lisensi dan Pengajuan Perpanjangan Surveyor Kadaster Direktorat Jenderal SPPR Kementerian ATR/BPN.
            </p>
          </div>

          {/* Quick Action Button */}
          {lisensi.bisaPerpanjang && (
            <button
              onClick={() => onNavigate('sb-perpanjangan')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <CalendarClock size={16} />
              <span>Ajukan Perpanjangan Sekarang</span>
            </button>
          )}
        </div>
      </div>

      {/* Expiration Warning Alert Card (Jika Lisensi Mendekati Masa Berakhir) */}
      {isExpiringSoon && (
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle size={20} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-amber-950 text-sm">
                  Pemberitahuan: Masa Berlaku Lisensi Segera Berakhir
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold text-[10px] font-mono">
                  Sisa {lisensi.sisaHari} Hari
                </span>
              </div>
              <p className="text-amber-900 leading-relaxed text-[11px] max-w-3xl">
                Berdasarkan Permen ATR/BPN No. 9/2026, menu perpanjangan dibuka pada H-3 bulan (90 hari sebelum berakhir). 
                Lisensi Anda No. <strong className="font-mono">{lisensi.no_lisensi}</strong> akan berakhir pada <strong>{lisensi.tgl_berakhir}</strong>. 
                Segera ajukan permohonan agar sertifikat kompetensi dan legalitas pengukuran bidang tanah tetap aktif.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('sb-perpanjangan')}
            className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl text-xs whitespace-nowrap self-start sm:self-auto shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <span>Buka Formulir</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Grid: Status Lisensi Saat Ini & Pengajuan Terkini */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom 1 & 2: Kartu Lisensi Digital Saya */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0f2e59] flex items-center justify-center font-bold">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Status Lisensi Aktif</h3>
                <p className="text-[11px] text-slate-500">Legalitas resmi kementerian ATR/BPN</p>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${
              lisensi.status === 'AKTIF'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : lisensi.status === 'HAMPIR_BERAKHIR'
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              {lisensi.status === 'HAMPIR_BERAKHIR' ? 'HAMPIR BERAKHIR' : lisensi.status}
            </span>
          </div>

          {/* License Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">Nomor Lisensi</span>
              <p className="font-mono font-bold text-slate-900 mt-0.5 text-xs truncate">
                {lisensi.no_lisensi}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">Nomor Registrasi</span>
              <p className="font-mono font-bold text-slate-900 mt-0.5 text-xs">
                {surveyor.no_registrasi}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">Tanggal Terbit</span>
              <p className="font-semibold text-slate-800 mt-0.5 text-xs">
                {lisensi.tgl_terbit}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">Tanggal Berakhir</span>
              <p className="font-semibold text-amber-800 mt-0.5 text-xs">
                {lisensi.tgl_berakhir}
              </p>
            </div>
          </div>

          {/* Timeline Visual Countdown */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-700">Masa Berlaku Lisensi (5 Tahun):</span>
              <span className="font-extrabold text-[#0f2e59] font-mono">
                Tersisa {lisensi.sisaHari} Hari ({Math.round(lisensi.sisaHari / 30)} Bulan)
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, Math.min(100, (lisensi.sisaHari / 1825) * 100))}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{lisensi.tgl_terbit}</span>
              <span className="text-amber-700 font-bold">Batas Perpanjangan: H-30 Hari</span>
              <span>{lisensi.tgl_berakhir}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] text-slate-500">
              Wilayah Penugasan: <strong className="text-slate-800">{surveyor.wilayah_kerja}</strong>
            </div>
            <button
              onClick={() => onNavigate('sb-lisensi')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
            >
              <span>Detail Lisensi Saya</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Kolom 3: Status Pengajuan Perpanjangan Aktif */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-[#0f2e59]" />
                <h3 className="font-bold text-slate-900 text-sm">Pengajuan Terakhir</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">PML</span>
            </div>

            {activePengajuan ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[11px] text-slate-500">Nomor Pengajuan:</div>
                  <div className="font-mono font-bold text-slate-900 text-xs mt-0.5">
                    {activePengajuan.id}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Diajukan pada: {activePengajuan.tgl_pengajuan}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-blue-900 font-semibold">Status Pengajuan:</span>
                    <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-sky-100 text-sky-800 border border-sky-300">
                      {activePengajuan.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {activePengajuan.status === 'DIAJUKAN' && 'Menunggu giliran verifikasi oleh panitia Ditjen SPPR.'}
                    {activePengajuan.status === 'DALAM_VERIFIKASI' && 'Berkas persyaratan sedang diperiksa oleh verifikator.'}
                    {activePengajuan.status === 'PERLU_PERBAIKAN' && 'Terdapat berkas yang memerlukan perbaikan oleh Anda.'}
                    {activePengajuan.status === 'PROSES_SK' && 'Berkas lengkap dan Surat Keputusan (SK) sedang disusun.'}
                    {activePengajuan.status === 'SK_TERBIT' && 'SK resmi telah diterbitkan. Lisensi aktif kembali.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <FileText size={18} />
                </div>
                <p className="text-slate-600 font-semibold">Belum Ada Pengajuan Aktif</p>
                <p className="text-[11px] text-slate-400">
                  Anda belum mengajukan permohonan perpanjangan untuk periode ini.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            {activePengajuan ? (
              <button
                onClick={() => {
                  if (onOpenDetailPengajuan) onOpenDetailPengajuan(activePengajuan);
                  else onNavigate('sb-riwayat');
                }}
                className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Lihat Status & Riwayat Lengkap</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('sb-perpanjangan')}
                className="w-full py-2.5 px-3 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Mulai Pengajuan Perpanjangan</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifikasi Terbaru Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell size={17} className="text-[#0f2e59]" />
            <h3 className="font-bold text-slate-900 text-sm">Notifikasi & Pengingat Terbaru</h3>
          </div>
          <button
            onClick={() => onNavigate('notifikasi')}
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            Lihat Semua ({notifications.length})
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {notifications.slice(0, 3).map((notif) => (
            <div key={notif.id} className="py-3 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Clock size={14} />
                </div>
                <div>
                  <p className="text-slate-800 font-medium">{notif.pesan}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{notif.tgl_kirim}</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('notifikasi')}
                className="text-[11px] font-semibold text-[#0f2e59] hover:underline shrink-0"
              >
                Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
