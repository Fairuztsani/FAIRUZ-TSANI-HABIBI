import React from 'react';
import {
  SurveyorModel,
  LisensiModel,
  PengajuanPerpanjanganModel,
  PengajuanPindahWilayahModel,
  PengajuanPerubahanDataModel,
  NotifikasiModel,
  RiwayatPengangkatanModel,
  RiwayatPendidikanModel
} from '../../../types/aplikasiMitra.ts';
import { KartuLisensiDigital } from '../../common/KartuLisensiDigital.tsx';
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
  User,
  Compass,
  GraduationCap,
  History,
  FileCheck
} from 'lucide-react';

interface SbBerandaViewProps {
  surveyor: SurveyorModel;
  lisensi: LisensiModel;
  perpanjangan: PengajuanPerpanjanganModel;
  pindahWilayah: PengajuanPindahWilayahModel;
  validasi: PengajuanPerubahanDataModel;
  notifications: NotifikasiModel[];
  pengangkatanList: RiwayatPengangkatanModel[];
  pendidikanList: RiwayatPendidikanModel[];
  onNavigate: (page: string) => void;
}

export const SbBerandaView: React.FC<SbBerandaViewProps> = ({
  surveyor,
  lisensi,
  perpanjangan,
  pindahWilayah,
  validasi,
  notifications,
  pengangkatanList,
  pendidikanList,
  onNavigate
}) => {
  const isExpiringSoon = lisensi.sisaHari <= 90;

  return (
    <div className="space-y-6">
      {/* 1. Header Sapaan Resmi (Section 4 Brief) */}
      <div className="bg-gradient-to-r from-[#07192f] via-[#0f2e59] to-[#1a447c] rounded-2xl p-6 sm:p-7 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase font-mono tracking-wider">
              No. Reg: {surveyor.nomorRegistrasi}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              ● Status Akun: {surveyor.statusAkun}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Selamat Datang, {surveyor.namaLengkap}
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Portal Mandiri Surveyor Kadaster Direktorat Jenderal SPPR Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional.
          </p>
        </div>

        {lisensi.bisaPerpanjang && (
          <button
            onClick={() => onNavigate('sb-perpanjangan')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <CalendarClock size={16} />
            <span>Ajukan Perpanjangan</span>
          </button>
        )}
      </div>

      {/* Warning Card jika Lisensi Mendekati Masa Berakhir (Section 4 Brief) */}
      {isExpiringSoon && (
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle size={20} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-amber-950 text-sm">
                  Peringatan Masa Berlaku Lisensi Kadaster
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 font-bold text-[10px] font-mono">
                  Sisa {lisensi.sisaHari} Hari
                </span>
              </div>
              <p className="text-amber-900 text-[11px] leading-relaxed max-w-3xl">
                Lisensi Anda akan segera berakhir. Silakan lakukan pengajuan perpanjangan sebelum tanggal <strong>{lisensi.tanggalBerakhir}</strong> agar kewenangan survei kadaster dan pengesahan gambar ukur tetap berlaku sah.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('sb-perpanjangan')}
            className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl text-xs whitespace-nowrap self-start sm:self-auto shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <span>Ajukan Perpanjangan</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Grid: Card Biodata & Card Status Lisensi (Section 4 Brief) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card Biodata (Section 4 Brief) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <User size={17} className="text-[#0f2e59]" />
              <h3 className="font-bold text-slate-900 text-sm">Biodata Surveyor Berlisensi</h3>
            </div>
            <button
              onClick={() => onNavigate('sb-akun')}
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>Ubah Profil</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">NIK:</span>
              <span className="font-mono font-bold text-slate-900">{surveyor.nik}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Nama Lengkap:</span>
              <span className="font-bold text-slate-900">{surveyor.namaLengkap}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Nomor Lisensi:</span>
              <span className="font-mono font-bold text-[#0f2e59]">{lisensi.nomorLisensi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Email:</span>
              <span className="font-mono text-slate-800 truncate max-w-[170px]">{surveyor.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Telepon/HP:</span>
              <span className="font-mono text-slate-800">{surveyor.telepon}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Tempat, Tgl Lahir:</span>
              <span className="text-slate-800">{surveyor.tempatLahir}, {surveyor.tanggalLahir}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Jenis Kelamin:</span>
              <span className="text-slate-800">{surveyor.jenisKelamin}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Wilayah Kerja:</span>
              <span className="font-semibold text-slate-800">{surveyor.wilayahKerja}</span>
            </div>
            <div className="sm:col-span-2 flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Alamat:</span>
              <span className="text-slate-800 font-medium text-right truncate max-w-xs">{surveyor.alamat}</span>
            </div>
            <div className="sm:col-span-2 flex items-center justify-between pt-1">
              <span className="text-slate-500">Status Verifikasi Sistem:</span>
              <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300">
                ✓ {surveyor.statusValidasi}
              </span>
            </div>
          </div>
        </div>

        {/* Card Status Lisensi (Section 4 Brief) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award size={17} className="text-[#0f2e59]" />
                <h3 className="font-bold text-slate-900 text-sm">Status Lisensi Kadaster</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 font-mono">
                {lisensi.status}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                <span className="text-slate-500">Nomor Lisensi:</span>
                <span className="font-mono font-bold text-slate-900">{lisensi.nomorLisensi}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Tanggal Terbit</span>
                  <span className="font-semibold text-slate-800">{lisensi.tanggalTerbit}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Tanggal Berakhir</span>
                  <span className="font-bold text-amber-800">{lisensi.tanggalBerakhir}</span>
                </div>
              </div>

              {/* Progress Masa Berlaku */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600 font-medium">Sisa Masa Berlaku:</span>
                  <span className="font-bold text-slate-900 font-mono">{lisensi.sisaHari} Hari</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${Math.max(5, Math.min(100, (lisensi.sisaHari / 1825) * 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('sb-lisensi')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Buka Sertifikat Lisensi Saya</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Grid: Card Status Pengajuan (3 Modul) & Card Kartu Lisensi Digital */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card Status Pengajuan: Validasi, Perpanjangan, Pindah Wilayah (Section 4 Brief) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <FileCheck size={17} className="text-[#0f2e59]" />
              <span>Status Pengajuan Aktif</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">3 Modul Terintegrasi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* 1. Status Validasi */}
            <div
              onClick={() => onNavigate('sb-validasi')}
              className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 cursor-pointer transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-emerald-950 text-xs">Validasi Data</span>
                <CheckCircle2 size={15} className="text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                Status data profil terverifikasi lengkap oleh tim verifikator.
              </p>
              <div className="pt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {validasi.status}
                </span>
              </div>
            </div>

            {/* 2. Status Perpanjangan Lisensi */}
            <div
              onClick={() => onNavigate('sb-perpanjangan')}
              className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-blue-950 text-xs">Perpanjangan</span>
                <CalendarClock size={15} className="text-blue-600" />
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                Permohonan No. {perpanjangan.id} masuk antrean verifikasi.
              </p>
              <div className="pt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                  {perpanjangan.status}
                </span>
              </div>
            </div>

            {/* 3. Status Pindah Wilayah Kerja */}
            <div
              onClick={() => onNavigate('sb-pindah-wilayah')}
              className="p-4 rounded-xl border border-purple-200 bg-purple-50/40 hover:bg-purple-50 cursor-pointer transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-purple-950 text-xs">Pindah Wilayah</span>
                <Compass size={15} className="text-purple-600" />
              </div>
              <p className="text-[11px] text-slate-600 line-clamp-2">
                Pengajuan mutasi ke Kanwil BPN Riau sedang diperiksa.
              </p>
              <div className="pt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                  {pindahWilayah.status}
                </span>
              </div>
            </div>
          </div>

          {/* Riwayat Mutasi & Riwayat Pendidikan (Section 4 Brief) */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-800 block text-[11px]">Riwayat Pengangkatan / SK Terakhir:</span>
              <p className="text-[11px] text-slate-600 font-mono">
                {pengangkatanList[0]?.nomorSK || 'SK.182/SPPR.2/IV/2024'}
              </p>
              <span className="text-[10px] text-slate-400">Ditetapkan: {pengangkatanList[0]?.tanggalSK}</span>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-800 block text-[11px]">Riwayat Pendidikan Terakhir:</span>
              <p className="text-[11px] text-slate-600">
                {pendidikanList[0]?.jenjang} - {pendidikanList[0]?.institusi}
              </p>
              <span className="text-[10px] text-slate-400">Lulus Tahun: {pendidikanList[0]?.tahunLulus}</span>
            </div>
          </div>
        </div>

        {/* Card Kartu Lisensi Digital (Section 4 Brief: Preview kartu kontras & mudah dibaca) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <KartuLisensiDigital surveyor={surveyor} lisensi={lisensi} />
        </div>
      </div>

      {/* Card Notifikasi Terbaru (Section 4 Brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-[#0f2e59]" />
            <h3 className="font-bold text-slate-900 text-sm">Notifikasi & Informasi Terbaru</h3>
          </div>
          <button
            onClick={() => onNavigate('notifikasi')}
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            Buka Semua ({notifications.length}) &rarr;
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {notifications.slice(0, 3).map((notif) => (
            <div key={notif.id} className="py-3 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                <div>
                  <span className="font-semibold text-slate-800 block">{notif.kategori}</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">{notif.pesan}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono shrink-0">{notif.tanggalKirim}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
