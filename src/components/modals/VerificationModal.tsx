import React, { useState, useEffect } from 'react';
import { Permohonan, DokumenMitra } from '../../types/index.ts';
import { Modal } from '../common/Modal.tsx';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { ConfirmationDialog } from '../common/ConfirmationDialog.tsx';
import {
  CheckCircle,
  XCircle,
  FileText,
  Eye,
  AlertCircle,
  User,
  Award,
  FileCheck,
  ShieldAlert
} from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  permohonan: Permohonan | null;
  onApprove: (id: string, notes: string, checklist: any) => void;
  onReject: (id: string, reason: string) => void;
  onViewDocument: (dokumen: DokumenMitra, surveyorNama: string, surveyorNik: string) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  permohonan,
  onApprove,
  onReject,
  onViewDocument
}) => {
  const [checklist, setChecklist] = useState({
    biodataSesuai: false,
    akunBelumAda: false,
    dokumenDiperiksa: false,
    dataTerverifikasi: false
  });
  const [catatanVerifikator, setCatatanVerifikator] = useState('');
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showConfirmReject, setShowConfirmReject] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (permohonan) {
      if (permohonan.checklist) {
        setChecklist(permohonan.checklist);
      } else {
        setChecklist({
          biodataSesuai: permohonan.status === 'Disetujui',
          akunBelumAda: permohonan.status === 'Disetujui',
          dokumenDiperiksa: permohonan.status === 'Disetujui',
          dataTerverifikasi: permohonan.status === 'Disetujui'
        });
      }
      setCatatanVerifikator(permohonan.catatanVerifikator || '');
      setValidationError('');
    }
  }, [permohonan]);

  if (!permohonan) return null;

  const handleCheckboxChange = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    setValidationError('');
  };

  const handleTriggerApprove = () => {
    const allChecked = Object.values(checklist).every(Boolean);
    if (!allChecked) {
      setValidationError('Semua 4 kriteria pemeriksaan wajib dicentang sebelum menyetujui verifikasi.');
      return;
    }
    setShowConfirmApprove(true);
  };

  const handleConfirmApprove = () => {
    onApprove(permohonan.id, catatanVerifikator, checklist);
    setShowConfirmApprove(false);
    onClose();
  };

  const handleConfirmReject = (reason?: string) => {
    onReject(permohonan.id, reason || catatanVerifikator || 'Berkas tidak memenuhi syarat.');
    setShowConfirmReject(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Verifikasi Permohonan: ${permohonan.nomorPermohonan}`}
        subtitle={`Pemohon: ${permohonan.namaSurveyor} • ${permohonan.jenisPermohonan}`}
        maxWidth="4xl"
      >
        <div className="space-y-6">
          {/* Header Summary Pill Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Nomor Permohonan</span>
              <p className="text-sm font-bold text-slate-900 font-mono">{permohonan.nomorPermohonan}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Jenis Pengajuan</span>
              <p className="text-sm font-semibold text-[#0f2e59]">{permohonan.jenisPermohonan}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Tanggal Masuk</span>
              <p className="text-sm font-semibold text-slate-800">{permohonan.tanggalPengajuan}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 font-medium">Status Berkas</span>
              <div>
                <StatusBadge status={permohonan.status} size="sm" />
              </div>
            </div>
          </div>

          {/* Section 1: Biodata Surveyor & Data Lisensi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Biodata */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-slate-100 text-[#0f2e59] font-bold text-xs uppercase tracking-wider">
                <User size={15} />
                <span>Biodata Pemohon</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Nama Lengkap</span>
                  <span className="font-semibold text-slate-800">{permohonan.namaSurveyor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Nomor Induk Kependudukan (NIK)</span>
                  <span className="font-mono text-slate-800">{permohonan.nik}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Wilayah yang Diajukan</span>
                  <span className="font-medium text-slate-800 text-right">{permohonan.wilayahDiajukan}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Kualifikasi Diajukan</span>
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {permohonan.kualifikasiDiajukan}
                  </span>
                </div>
              </div>
            </div>

            {/* Data Lisensi Terkait */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white">
              <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-slate-100 text-[#0f2e59] font-bold text-xs uppercase tracking-wider">
                <Award size={15} />
                <span>Data Lisensi Terkait</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Nomor Lisensi Eksisting</span>
                  <span className="font-mono font-medium text-slate-800">
                    {permohonan.nomorLisensiLama || 'Pengajuan Baru (Belum Memiliki)'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Nomor Lisensi Baru Diterbitkan</span>
                  <span className="font-mono font-semibold text-emerald-700">
                    {permohonan.nomorLisensiBaru || '(Diterbitkan setelah SK Disetujui)'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Petugas Verifikator</span>
                  <span className="font-medium text-slate-800">
                    {permohonan.verifikatorNama || 'Fairuz Tsani Habibi, S.Kom. (Anda)'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tanggal Pemeriksaan Terakhir</span>
                  <span className="font-medium text-slate-800">
                    {permohonan.tanggalVerifikasi || 'Sedang berlangsung hari ini'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Dokumen Persyaratan & Aksi Lihat Dokumen */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#0f2e59] font-bold text-xs uppercase tracking-wider">
                <FileCheck size={15} />
                <span>Dokumen Persyaratan Pemohon</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {permohonan.dokumen.length} berkas terlampir
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {permohonan.dokumen.map((dok) => (
                <div
                  key={dok.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/50 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded bg-white border border-slate-200 text-[#0f2e59]">
                      <FileText size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 truncate">{dok.namaFile}</p>
                      <p className="text-[11px] text-slate-500">
                        {dok.jenis} • {dok.ukuran}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onViewDocument(dok, permohonan.namaSurveyor, permohonan.nik)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium shrink-0 ml-2 shadow-2xs"
                  >
                    <Eye size={12} />
                    <span>Lihat</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Checklist Hasil Pemeriksaan Data (Mandatory from prompt) */}
          <div className="border border-amber-200 rounded-xl p-4 bg-amber-50/30">
            <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-amber-200/80 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <CheckCircle size={15} className="text-amber-600" />
              <span>Hasil Pemeriksaan Data & Berkas Persyaratan</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200 hover:border-amber-300 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.biodataSesuai}
                  onChange={() => handleCheckboxChange('biodataSesuai')}
                  className="mt-0.5 w-4 h-4 rounded text-[#0f2e59] focus:ring-[#0f2e59] border-slate-300"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800">Data biodata sudah sesuai</span>
                  <p className="text-slate-500 text-[11px]">
                    Nama, NIK, tempat/tanggal lahir sesuai identitas kependudukan Dukcapil.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200 hover:border-amber-300 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.akunBelumAda}
                  onChange={() => handleCheckboxChange('akunBelumAda')}
                  className="mt-0.5 w-4 h-4 rounded text-[#0f2e59] focus:ring-[#0f2e59] border-slate-300"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800">Surveyor belum memiliki akun sebelumnya</span>
                  <p className="text-slate-500 text-[11px]">
                    Tidak ditemukan duplikasi akun atau nomor lisensi aktif ganda pada sistem SPPR.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200 hover:border-amber-300 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.dokumenDiperiksa}
                  onChange={() => handleCheckboxChange('dokumenDiperiksa')}
                  className="mt-0.5 w-4 h-4 rounded text-[#0f2e59] focus:ring-[#0f2e59] border-slate-300"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800">Dokumen telah diperiksa</span>
                  <p className="text-slate-500 text-[11px]">
                    KTP, Sertifikat Keahlian Kerja Geodesi/Kadaster, dan lampiran pendukung asli dan terbaca jelas.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-2.5 rounded-lg bg-white border border-slate-200 hover:border-amber-300 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.dataTerverifikasi}
                  onChange={() => handleCheckboxChange('dataTerverifikasi')}
                  className="mt-0.5 w-4 h-4 rounded text-[#0f2e59] focus:ring-[#0f2e59] border-slate-300"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800">Data telah diverifikasi</span>
                  <p className="text-slate-500 text-[11px]">
                    Seluruh persyaratan administratif dan substantif telah memenuhi Permen ATR/BPN No. 9/2026.
                  </p>
                </div>
              </label>
            </div>

            {validationError && (
              <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle size={15} className="shrink-0" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Section 4: Catatan Verifikator */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
              Catatan Verifikator (Wajib diisi jika ada catatan perbaikan atau alasan penolakan)
            </label>
            <textarea
              value={catatanVerifikator}
              onChange={(e) => setCatatanVerifikator(e.target.value)}
              placeholder="Contoh: Berkas telah lengkap dan sesuai standar kompetensi kadaster nasional. Siap diterbitkan SK Lisensi."
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Kembali
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowConfirmReject(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 rounded-lg transition-colors"
              >
                <XCircle size={15} />
                <span>Tolak Permohonan</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerApprove}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                <CheckCircle size={15} />
                <span>Setujui Verifikasi</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirmation Dialogs */}
      <ConfirmationDialog
        isOpen={showConfirmApprove}
        onClose={() => setShowConfirmApprove(false)}
        onConfirm={handleConfirmApprove}
        variant="success"
        title="Konfirmasi Persetujuan Verifikasi"
        message={`Apakah Anda yakin menyetujui permohonan lisensi atas nama ${permohonan.namaSurveyor}? Setelah disetujui, sistem akan memvalidasi penerbitan SK Lisensi baru.`}
        confirmLabel="Ya, Setujui Permohonan"
        cancelLabel="Kembali Cek Berkas"
      />

      <ConfirmationDialog
        isOpen={showConfirmReject}
        onClose={() => setShowConfirmReject(false)}
        onConfirm={handleConfirmReject}
        variant="danger"
        title="Konfirmasi Penolakan Permohonan"
        message={`Apakah Anda yakin menolak permohonan atas nama ${permohonan.namaSurveyor}? Mohon cantumkan alasan yang jelas untuk informasi pemohon.`}
        confirmLabel="Ya, Tolak Permohonan"
        cancelLabel="Batal"
        requireReason={true}
        reasonPlaceholder="Tuliskan alasan penolakan, contoh: Sertifikat kompetensi kedaluwarsa atau scan dokumen buram..."
      />
    </>
  );
};
