import React, { useState } from 'react';
import { Surveyor, DokumenMitra } from '../../types/index.ts';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { ConfirmationDialog } from '../common/ConfirmationDialog.tsx';
import {
  ArrowLeft,
  User,
  ShieldCheck,
  Award,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Download,
  AlertTriangle
} from 'lucide-react';

interface SurveyorDetailPageProps {
  surveyor: Surveyor;
  onBack: () => void;
  onViewDocument: (dokumen: DokumenMitra, surveyorNama: string, surveyorNik: string) => void;
  onVerifikasiAction: (surveyor: Surveyor, action: 'approve' | 'reject', reason?: string) => void;
  onEdit: (surveyor: Surveyor) => void;
}

export const SurveyorDetailPage: React.FC<SurveyorDetailPageProps> = ({
  surveyor,
  onBack,
  onViewDocument,
  onVerifikasiAction,
  onEdit
}) => {
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showConfirmReject, setShowConfirmReject] = useState(false);

  const handleConfirmApprove = () => {
    onVerifikasiAction(surveyor, 'approve');
    setShowConfirmApprove(false);
  };

  const handleConfirmReject = (reason?: string) => {
    onVerifikasiAction(surveyor, 'reject', reason);
    setShowConfirmReject(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Back and Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-lg transition-colors shadow-2xs"
        >
          <ArrowLeft size={15} />
          <span>Kembali ke Daftar Surveyor</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfirmReject(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-700 bg-white border border-rose-300 hover:bg-rose-50 rounded-lg transition-colors shadow-2xs"
          >
            <XCircle size={15} />
            <span>Tolak / Bekukan</span>
          </button>

          <button
            onClick={() => setShowConfirmApprove(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0f2e59] hover:bg-[#16396b] rounded-lg transition-colors shadow-2xs"
          >
            <ShieldCheck size={15} />
            <span>Verifikasi Lisensi</span>
          </button>
        </div>
      </div>

      {/* Surveyor Hero Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0f2e59] to-[#204e87] text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
              {surveyor.namaLengkap.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {surveyor.namaLengkap}, {surveyor.gelar}
                </h1>
                <StatusBadge status={surveyor.statusLisensi} />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Kualifikasi: <strong className="text-slate-800">{surveyor.kualifikasi}</strong> • Asosiasi: {surveyor.asosiasiProfesi}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end text-xs text-slate-500">
            <span className="text-[11px] font-medium text-slate-400">ID Registrasi Sistem</span>
            <span className="font-mono text-slate-800 font-bold text-sm tabular-nums">{surveyor.id}</span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-600">
            <Mail size={16} className="text-slate-400 shrink-0" />
            <span className="truncate">{surveyor.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <Phone size={16} className="text-slate-400 shrink-0" />
            <span className="tabular-nums">{surveyor.telepon}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-600">
            <Building2 size={16} className="text-slate-400 shrink-0" />
            <span className="truncate">{surveyor.namaKJSB || 'Praktik Mandiri (Perorangan)'}</span>
          </div>
        </div>
      </div>

      {/* Grid: DATA PRIBADI & DATA LISENSI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: DATA PRIBADI */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-[#0f2e59] font-bold text-sm uppercase tracking-wider">
            <User size={18} />
            <span>Data Pribadi Surveyor</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Nama Lengkap</span>
              <span className="font-semibold text-slate-800 sm:text-right">{surveyor.namaLengkap}, {surveyor.gelar}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Nomor Induk Kependudukan (NIK)</span>
              <span className="font-mono text-slate-800 font-medium sm:text-right">{surveyor.nik}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Tempat, Tanggal Lahir</span>
              <span className="font-medium text-slate-800 sm:text-right">{surveyor.tempatLahir}, {surveyor.tanggalLahir}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Alamat Domisili</span>
              <span className="font-medium text-slate-800 sm:text-right max-w-xs">{surveyor.alamat}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Alamat Surel (Email)</span>
              <span className="font-medium text-slate-800 sm:text-right">{surveyor.email}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 gap-1">
              <span className="text-slate-500">Nomor Telepon / HP</span>
              <span className="font-mono text-slate-800 font-medium sm:text-right">{surveyor.telepon}</span>
            </div>
          </div>
        </div>

        {/* Card 2: DATA LISENSI */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 text-[#0f2e59] font-bold text-sm uppercase tracking-wider">
            <Award size={18} />
            <span>Data Lisensi & Wilayah Kerja</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Nomor Lisensi SK SPPR</span>
              <span className="font-mono font-bold text-slate-900 sm:text-right">{surveyor.nomorLisensi}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Kualifikasi Jabatan</span>
              <span className="font-semibold text-amber-800 sm:text-right">{surveyor.kualifikasi}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Tanggal Terbit Lisensi</span>
              <span className="font-medium text-slate-800 sm:text-right tabular-nums">{surveyor.tanggalTerbit}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Tanggal Berakhir (Masa Berlaku)</span>
              <span className="font-bold text-slate-900 sm:text-right tabular-nums">{surveyor.tanggalBerakhir}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-slate-50 gap-1">
              <span className="text-slate-500">Status Lisensi Saat Ini</span>
              <div className="sm:text-right">
                <StatusBadge status={surveyor.statusLisensi} size="sm" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between py-1 gap-1">
              <span className="text-slate-500">Wilayah Penugasan Kerja</span>
              <span className="font-medium text-slate-800 sm:text-right max-w-xs">{surveyor.wilayahKerja}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: DOKUMEN PERSYARATAN */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[#0f2e59] font-bold text-sm uppercase tracking-wider">
            <FileText size={18} />
            <span>Dokumen Administrasi Surveyor</span>
          </div>
          <span className="text-xs text-slate-500">
            {surveyor.dokumen.length} Berkas Tersimpan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {surveyor.dokumen.map((dok) => (
            <div
              key={dok.id}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/40 text-xs transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[#0f2e59] shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 truncate">{dok.jenis}</span>
                    <StatusBadge status={dok.statusVerifikasi} size="sm" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {dok.namaFile} • {dok.ukuran}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Diunggah pada: {dok.tanggalUpload}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 ml-3 shrink-0">
                <button
                  onClick={() => onViewDocument(dok, surveyor.namaLengkap, surveyor.nik)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold transition-colors shadow-2xs"
                >
                  <Eye size={13} />
                  <span>Lihat Dokumen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={showConfirmApprove}
        onClose={() => setShowConfirmApprove(false)}
        onConfirm={handleConfirmApprove}
        variant="success"
        title="Verifikasi Status Lisensi Surveyor"
        message={`Pastikan dokumen berkas keahlian atas nama ${surveyor.namaLengkap} sudah sesuai. Apakah Anda ingin mengonfirmasi status lisensi aktif?`}
        confirmLabel="Konfirmasi Lisensi Aktif"
      />

      <ConfirmationDialog
        isOpen={showConfirmReject}
        onClose={() => setShowConfirmReject(false)}
        onConfirm={handleConfirmReject}
        variant="danger"
        title="Bekukan / Tolak Lisensi Surveyor"
        message={`Tindakan ini akan mengubah status lisensi atas nama ${surveyor.namaLengkap} menjadi Dibekukan atau Ditolak. Silakan masukkan catatan resmi.`}
        confirmLabel="Ya, Bekukan Lisensi"
        requireReason={true}
        reasonPlaceholder="Tuliskan pelanggaran kode etik atau ketidaksesuaian dokumen..."
      />
    </div>
  );
};
