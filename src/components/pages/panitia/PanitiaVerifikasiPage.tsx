import React, { useState } from 'react';
import { PengajuanPerpanjangan, StatusBerkas } from '../../../types/mitraPerpanjangan.ts';
import { PdfPreviewModal } from '../../common/PdfPreviewModal.tsx';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ArrowLeft,
  ShieldCheck,
  User,
  Award,
  Save,
  RotateCcw
} from 'lucide-react';

interface PanitiaVerifikasiPageProps {
  pengajuan: PengajuanPerpanjangan;
  onBack: () => void;
  onSaveVerifikasi: (
    pengajuanId: string,
    keputusan: 'PERLU_PERBAIKAN' | 'PROSES_SK' | 'SIMPAN_DRAFT',
    catatanUmum: string,
    berkasStatuses: { [id: string]: { status: StatusBerkas; catatan?: string } }
  ) => void;
}

export const PanitiaVerifikasiPage: React.FC<PanitiaVerifikasiPageProps> = ({
  pengajuan,
  onBack,
  onSaveVerifikasi
}) => {
  const [docStatuses, setDocStatuses] = useState<{ [id: string]: { status: StatusBerkas; catatan?: string } }>(() => {
    const map: { [id: string]: { status: StatusBerkas; catatan?: string } } = {};
    pengajuan.berkas.forEach(b => {
      map[b.id] = {
        status: b.status_berkas === 'MENUNGGU' ? 'SESUAI' : b.status_berkas,
        catatan: b.catatan || ''
      };
    });
    return map;
  });

  const [catatanUmum, setCatatanUmum] = useState('');
  const [previewDocTitle, setPreviewDocTitle] = useState<string | null>(null);

  const currentRound = (pengajuan.riwayatVerifikasi.length || 0) + 1;
  const hasIncomplete = Object.values(docStatuses).some(d => d.status === 'TIDAK_SESUAI');

  const handleStatusChange = (docId: string, status: StatusBerkas) => {
    setDocStatuses(prev => ({
      ...prev,
      [docId]: { ...prev[docId], status }
    }));
  };

  const handleNoteChange = (docId: string, catatan: string) => {
    setDocStatuses(prev => ({
      ...prev,
      [docId]: { ...prev[docId], catatan }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#0f2e59]">
                {pengajuan.id}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Pemeriksaan Putaran ke-{currentRound}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
              Verifikasi Kelengkapan & Kesesuaian Dokumen Persyaratan
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Petugas:</span>
          <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            Fairuz Tsani Habibi, S.Kom. (Verifikator)
          </span>
        </div>
      </div>

      {/* Grid: Data Surveyor & Data Lisensi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Data Surveyor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-2.5">
            <User size={16} className="text-[#0f2e59]" />
            <span>Data Surveyor Berlisensi</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Nama Lengkap:</span>
              <span className="font-bold text-slate-900">{pengajuan.surveyor.nama}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Nomor Registrasi:</span>
              <span className="font-mono font-bold text-[#0f2e59]">{pengajuan.surveyor.no_registrasi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Kualifikasi:</span>
              <span className="font-semibold text-slate-800">{pengajuan.surveyor.kualifikasi}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Wilayah Kerja:</span>
              <span className="font-semibold text-slate-800">{pengajuan.surveyor.wilayah_kerja}</span>
            </div>
          </div>
        </div>

        {/* Data Lisensi */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm border-b border-slate-100 pb-2.5">
            <Award size={16} className="text-[#0f2e59]" />
            <span>Data Lisensi yang Diajukan</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Nomor Lisensi:</span>
              <span className="font-mono font-bold text-slate-900">{pengajuan.lisensi.no_lisensi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Tanggal Terbit:</span>
              <span className="font-semibold text-slate-800">{pengajuan.lisensi.tgl_terbit}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Tanggal Berakhir:</span>
              <span className="font-bold text-amber-700">{pengajuan.lisensi.tgl_berakhir}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Status Saat Ini:</span>
              <span className="font-semibold text-slate-800">{pengajuan.lisensi.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dokumen Persyaratan Checklist (Bagian 11 brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[#0f2e59]" />
            <h3 className="font-bold text-slate-900 text-sm">
              Pemeriksaan Masing-Masing Dokumen Persyaratan (PDF)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Tentukan kesesuaian setiap berkas
          </span>
        </div>

        <div className="space-y-4">
          {pengajuan.berkas.map((doc) => {
            const currentDocState = docStatuses[doc.id] || { status: 'SESUAI' };

            return (
              <div
                key={doc.id}
                className={`p-4 rounded-xl border transition-all ${
                  currentDocState.status === 'TIDAK_SESUAI'
                    ? 'border-red-300 bg-red-50/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0">
                      PDF
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{doc.jenis_berkas}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{doc.ukuran || '1.8 MB'}</span>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => setPreviewDocTitle(doc.jenis_berkas)}
                          className="text-blue-700 hover:underline font-bold"
                        >
                          Buka Preview PDF Dokumen
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Toggle SESUAI vs TIDAK SESUAI (Bagian 11 brief) */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(doc.id, 'SESUAI')}
                      className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 ${
                        currentDocState.status === 'SESUAI'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      <span>SESUAI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(doc.id, 'TIDAK_SESUAI')}
                      className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 ${
                        currentDocState.status === 'TIDAK_SESUAI'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <AlertTriangle size={14} />
                      <span>TIDAK SESUAI</span>
                    </button>
                  </div>
                </div>

                {/* If TIDAK SESUAI, show required textarea for correction notes */}
                {currentDocState.status === 'TIDAK_SESUAI' && (
                  <div className="mt-3 pt-2.5 border-t border-red-200">
                    <label className="font-bold text-red-900 block mb-1">
                      Catatan Kekurangan / Perbaikan Dokumen:
                    </label>
                    <textarea
                      rows={2}
                      value={currentDocState.catatan || ''}
                      onChange={(e) => handleNoteChange(doc.id, e.target.value)}
                      placeholder="Tuliskan alasan mengapa dokumen ini tidak sesuai dan apa yang harus diperbaiki oleh Surveyor..."
                      className="w-full p-2.5 text-xs rounded-xl border border-red-300 bg-white text-slate-800 focus:outline-none focus:border-red-500"
                    ></textarea>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catatan Umum Verifikator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 text-xs">
        <label className="font-bold text-slate-800 block">
          Catatan Keseluruhan Hasil Verifikasi:
        </label>
        <textarea
          rows={2}
          value={catatanUmum}
          onChange={(e) => setCatatanUmum(e.target.value)}
          placeholder="Tuliskan simpulan verifikasi putaran ini..."
          className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0f2e59] text-xs"
        ></textarea>
      </div>

      {/* Action Buttons (Bagian 11 brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
        >
          Kembali ke Antrean
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Simpan Verifikasi */}
          <button
            type="button"
            onClick={() => {
              onSaveVerifikasi(pengajuan.id, 'SIMPAN_DRAFT', catatanUmum, docStatuses);
              onBack();
            }}
            className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 flex items-center gap-1.5"
          >
            <Save size={14} />
            <span>Simpan Verifikasi (Draft)</span>
          </button>

          {/* Kembalikan untuk Perbaikan (Status -> PERLU_PERBAIKAN) */}
          <button
            type="button"
            onClick={() => {
              onSaveVerifikasi(pengajuan.id, 'PERLU_PERBAIKAN', catatanUmum, docStatuses);
              onBack();
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <AlertTriangle size={14} />
            <span>Kembalikan untuk Perbaikan</span>
          </button>

          {/* Nyatakan Lengkap (Status -> PROSES_SK) */}
          <button
            type="button"
            disabled={hasIncomplete}
            onClick={() => {
              onSaveVerifikasi(pengajuan.id, 'PROSES_SK', catatanUmum, docStatuses);
              onBack();
            }}
            className={`px-5 py-2 font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all ${
              !hasIncomplete
                ? 'bg-[#0f2e59] hover:bg-[#163e75] text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 size={14} />
            <span>Nyatakan Lengkap (Proses SK)</span>
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewDocTitle && (
        <PdfPreviewModal
          isOpen={true}
          onClose={() => setPreviewDocTitle(null)}
          title={previewDocTitle}
          documentType={previewDocTitle}
          surveyorName={pengajuan.surveyor.nama}
          licenseNumber={pengajuan.lisensi.no_lisensi}
        />
      )}
    </div>
  );
};
