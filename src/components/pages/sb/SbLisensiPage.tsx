import React, { useState } from 'react';
import { SurveyorMitra, LisensiMitra } from '../../../types/mitraPerpanjangan.ts';
import { PdfPreviewModal } from '../../common/PdfPreviewModal.tsx';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Download,
  Building,
  UserCheck
} from 'lucide-react';

interface SbLisensiPageProps {
  surveyor: SurveyorMitra;
  lisensi: LisensiMitra;
  onNavigate: (page: string) => void;
}

export const SbLisensiPage: React.FC<SbLisensiPageProps> = ({
  surveyor,
  lisensi,
  onNavigate
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const canRenew = lisensi.bisaPerpanjang;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Lisensi Saya
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Informasi identitas legalitas, masa berlaku lisensi kadaster, dan status perpanjangan.
          </p>
        </div>

        {canRenew ? (
          <button
            onClick={() => onNavigate('sb-perpanjangan')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>Ajukan Perpanjangan Lisensi</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <div className="px-3 py-1.5 bg-slate-100 text-slate-500 font-medium text-xs rounded-xl border border-slate-200">
            Perpanjangan Dibuka pada H-3 Bulan
          </div>
        )}
      </div>

      {/* Main License Digital Certificate Card */}
      <div className="bg-gradient-to-br from-[#0c2344] via-[#0f2e59] to-[#153a6b] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        {/* Background Emblem Watermark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <ShieldCheck size={280} />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-amber-400">
                <Award size={24} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-mono">
                  Sertifikat Lisensi Resmi Ditjen SPPR
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  Kementerian Agraria dan Tata Ruang / BPN
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full font-bold text-xs tracking-wide border ${
                lisensi.status === 'AKTIF'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                  : lisensi.status === 'HAMPIR_BERAKHIR'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-red-500/20 text-red-300 border-red-400/30'
              }`}>
                ● {lisensi.status === 'HAMPIR_BERAKHIR' ? 'HAMPIR BERAKHIR' : lisensi.status}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-slate-300 text-[11px] block">Nomor Lisensi:</span>
              <p className="font-mono text-base font-extrabold text-amber-300 mt-0.5 tracking-tight">
                {lisensi.no_lisensi}
              </p>
            </div>

            <div>
              <span className="text-slate-300 text-[11px] block">Nama Pemegang Lisensi:</span>
              <p className="text-base font-bold text-white mt-0.5">
                {surveyor.nama}
              </p>
            </div>

            <div>
              <span className="text-slate-300 text-[11px] block">Nomor Registrasi (SKK):</span>
              <p className="font-mono text-sm font-semibold text-slate-200 mt-0.5">
                {surveyor.no_registrasi}
              </p>
            </div>

            <div>
              <span className="text-slate-300 text-[11px] block">Kualifikasi:</span>
              <p className="text-xs font-semibold text-slate-100 mt-0.5">
                {surveyor.kualifikasi}
              </p>
            </div>

            <div>
              <span className="text-slate-300 text-[11px] block">Wilayah Kerja Penugasan:</span>
              <p className="text-xs font-semibold text-slate-100 mt-0.5 flex items-center gap-1">
                <MapPin size={13} className="text-amber-400" />
                <span>{surveyor.wilayah_kerja}</span>
              </p>
            </div>

            <div>
              <span className="text-slate-300 text-[11px] block">Kantor Jasa Surveyor (KJSB):</span>
              <p className="text-xs font-semibold text-slate-100 mt-0.5 flex items-center gap-1">
                <Building size={13} className="text-amber-400" />
                <span>{surveyor.kjsbNama || 'Perorangan'}</span>
              </p>
            </div>
          </div>

          {/* Dates Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Tanggal Terbit</span>
                <span className="font-semibold text-white">{lisensi.tgl_terbit}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Tanggal Berakhir</span>
                <span className="font-bold text-amber-300 font-mono">{lisensi.tgl_berakhir}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Sisa Masa Berlaku</span>
                <span className="font-bold text-white font-mono">{lisensi.sisaHari} Hari</span>
              </div>
            </div>

            <button
              onClick={() => setIsPreviewOpen(true)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 border border-white/20"
            >
              <FileText size={14} />
              <span>Lihat Salinan SK Lisensi (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Masa Berlaku Section (Bagian 4 brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">
          Timeline Masa Berlaku Lisensi (5 Tahun)
        </h3>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-slate-600 font-medium">Progress Periode Lisensi Saat Ini:</span>
            <span className="font-bold text-slate-900 font-mono">
              {Math.max(0, 1825 - lisensi.sisaHari)} dari 1825 Hari Terlampaui
            </span>
          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                lisensi.sisaHari <= 30
                  ? 'bg-red-500'
                  : lisensi.sisaHari <= 90
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, Math.max(5, ((1825 - lisensi.sisaHari) / 1825) * 100))}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Penerbitan Pertama:</span>
              <span className="font-semibold text-slate-800">{lisensi.tgl_terbit}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
              <span className="text-[10px] text-amber-700 block font-bold">Menu Perpanjangan Dibuka:</span>
              <span className="font-semibold">H-3 Bulan ({lisensi.sisaHari <= 90 ? 'Sedang Terbuka' : 'Mendatang'})</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">Batas Akhir Berlaku:</span>
              <span className="font-bold text-red-700">{lisensi.tgl_berakhir}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Syarat & Ketentuan Perpanjangan Info Box */}
      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 text-blue-950 text-xs space-y-2">
        <div className="font-bold flex items-center gap-1.5 text-blue-900">
          <ShieldCheck size={16} className="text-blue-700" />
          <span>Ketentuan Perpanjangan Lisensi (Permen ATR/BPN No. 9/2026):</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-blue-900 leading-relaxed">
          <li>Pengajuan perpanjangan lisensi wajib diajukan paling lambat 30 hari kalender sebelum masa berlaku berakhir.</li>
          <li>Surveyor Kadaster wajib melampirkan Sertifikat Kompetensi Keahlian (SKK) yang masih aktif dari LSP berlisensi BNSP.</li>
          <li>Surat rekomendasi dari Asosiasi Profesi (ISI) atau Kantor Jasa Surveyor Berlisensi (KJSB).</li>
          <li>Lisensi yang berakhir tanpa perpanjangan akan dinonaktifkan secara otomatis dari sistem pendaftaran tanah ATR/BPN.</li>
        </ul>
      </div>

      {/* Modal Preview SK */}
      <PdfPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`SK Lisensi ${surveyor.nama}`}
        documentType="Surat Keputusan Lisensi Surveyor Kadaster"
        surveyorName={surveyor.nama}
        licenseNumber={lisensi.no_lisensi}
      />
    </div>
  );
};
