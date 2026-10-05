import React, { useState } from 'react';
import { SurveyorMitra, LisensiMitra, PengajuanPerpanjangan } from '../../../types/mitraPerpanjangan.ts';
import {
  CalendarClock,
  CheckCircle2,
  Upload,
  AlertCircle,
  FileText,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  X,
  Clock,
  Eye,
  Trash2,
  FileCheck2,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

interface SbPerpanjanganPageProps {
  surveyor: SurveyorMitra;
  lisensi: LisensiMitra;
  onNavigate: (page: string) => void;
  onSubmitPengajuan: (data: {
    catatan: string;
    files: { jenis: string; namaFile: string; ukuran: string }[];
  }) => void;
}

export const SbPerpanjanganPage: React.FC<SbPerpanjanganPageProps> = ({
  surveyor,
  lisensi,
  onNavigate,
  onSubmitPengajuan
}) => {
  // Stepper 6 langkah (Bagian 5 brief)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [catatanSb, setCatatanSb] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Files state (PDF required)
  const [uploadedDocs, setUploadedDocs] = useState<{
    [key: string]: { namaFile: string; ukuran: string; status: 'Siap' | 'Belum' }
  }>({
    'Kartu Tanda Penduduk (KTP)': {
      namaFile: 'KTP_Andi_Pratama.pdf',
      ukuran: '1.2 MB',
      status: 'Siap'
    },
    'Sertifikat Kompetensi Keahlian (SKK) Kadaster': {
      namaFile: 'SKK_Kadaster_Andi_2026.pdf',
      ukuran: '2.5 MB',
      status: 'Siap'
    },
    'SK Lisensi Lama': {
      namaFile: 'SK_Lisensi_Lama_2024.pdf',
      ukuran: '3.1 MB',
      status: 'Siap'
    },
    'Surat Rekomendasi Asosiasi Profesi (ISI) / KJSB': {
      namaFile: '',
      ukuran: '',
      status: 'Belum'
    }
  });

  const steps = [
    { number: 1, title: 'Data Lisensi', desc: 'Identitas Lisensi' },
    { number: 2, title: 'Upload Persyaratan', desc: 'Unggah Berkas PDF' },
    { number: 3, title: 'Pemeriksaan Data', desc: 'Review Kelengkapan' },
    { number: 4, title: 'Pengajuan', desc: 'Kirim Permohonan' },
    { number: 5, title: 'Verifikasi', desc: 'Pemeriksaan Panitia' },
    { number: 6, title: 'SK Terbit', desc: 'Penerbitan SK' }
  ];

  const handleSimulateUpload = (jenis: string) => {
    setUploadedDocs(prev => ({
      ...prev,
      [jenis]: {
        namaFile: `${jenis.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_andi.pdf`,
        ukuran: '1.8 MB',
        status: 'Siap'
      }
    }));
  };

  const handleRemoveDoc = (jenis: string) => {
    setUploadedDocs(prev => ({
      ...prev,
      [jenis]: { namaFile: '', ukuran: '', status: 'Belum' }
    }));
  };

  const allRequiredUploaded = Object.values(uploadedDocs).every(d => d.status === 'Siap');

  const handleFinalSubmit = () => {
    setIsConfirmOpen(false);
    const filesList = Object.entries(uploadedDocs).map(([jenis, doc]) => ({
      jenis,
      namaFile: doc.namaFile,
      ukuran: doc.ukuran
    }));

    onSubmitPengajuan({
      catatan: catatanSb || 'Permohonan perpanjangan lisensi 5 tahunan diajukan lengkap.',
      files: filesList
    });

    // Move to step 4 or 5
    setCurrentStep(4);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Perpanjangan Lisensi Surveyor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Lengkapi data dan berkas persyaratan untuk memperpanjang masa berlaku lisensi kadaster Anda.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="font-semibold text-slate-500">Masa Berlaku:</span>
          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 font-mono">
            {lisensi.tgl_berakhir} (Sisa {lisensi.sisaHari} Hari)
          </span>
        </div>
      </div>

      {/* Stepper Progress Bar (Bagian 5 brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {steps.map((st) => {
            const isCompleted = currentStep > st.number;
            const isCurrent = currentStep === st.number;

            return (
              <div
                key={st.number}
                className={`p-3 rounded-xl border text-xs transition-all relative ${
                  isCurrent
                    ? 'bg-[#0f2e59] text-white border-[#0f2e59] shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isCompleted ? '✓' : st.number}
                  </span>
                  <span className="text-[10px] font-mono opacity-80">
                    Step {st.number}
                  </span>
                </div>
                <div className="font-bold truncate">{st.title}</div>
                <div className={`text-[10px] truncate ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* STEP 1: Data Lisensi */}
        {currentStep === 1 && (
          <div className="p-6 sm:p-8 space-y-6 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Langkah 1: Verifikasi Data Surveyor & Lisensi
              </h3>
              <p className="text-[11px] text-slate-500">
                Pastikan data profil dan lisensi yang terdaftar di sistem SPPR sudah sesuai sebelum melanjutkan.
              </p>
            </div>

            {/* Data Surveyor Section */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-500">
                A. Data Surveyor Berlisensi (SB)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[11px]">Nama Lengkap:</span>
                  <span className="font-bold text-slate-900 text-sm">{surveyor.nama}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Nomor Registrasi:</span>
                  <span className="font-mono font-bold text-[#0f2e59]">{surveyor.no_registrasi}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Wilayah Kerja Penugasan:</span>
                  <span className="font-semibold text-slate-800">{surveyor.wilayah_kerja}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Alamat Email Terdaftar:</span>
                  <span className="font-mono text-slate-700">andi.pratama@mitra-bpn.go.id</span>
                </div>
              </div>
            </div>

            {/* Data Lisensi Section */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-500">
                B. Data Lisensi Kadaster Saat Ini
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[11px]">Nomor Lisensi:</span>
                  <span className="font-mono font-bold text-slate-900">{lisensi.no_lisensi}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Tanggal Terbit:</span>
                  <span className="font-semibold text-slate-800">{lisensi.tgl_terbit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Tanggal Berakhir:</span>
                  <span className="font-bold text-amber-700">{lisensi.tgl_berakhir}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Status Lisensi:</span>
                  <span className="inline-block px-2 py-0.5 rounded font-bold text-[10px] bg-amber-100 text-amber-900 border border-amber-300">
                    {lisensi.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('sb-beranda')}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
              >
                Batalkan
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <span>Lanjutkan ke Upload Persyaratan</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Upload Persyaratan (Bagian 6 brief) */}
        {currentStep === 2 && (
          <div className="p-6 sm:p-8 space-y-6 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Langkah 2: Unggah Dokumen Persyaratan
              </h3>
              <p className="text-[11px] text-slate-500">
                Unggah dokumen persyaratan legalitas. Format dibatasi file <strong>PDF</strong> dengan batas maksimal 5 MB per berkas.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(uploadedDocs).map(([jenis, doc]) => (
                <div
                  key={jenis}
                  className={`p-4 rounded-xl border transition-all ${
                    doc.status === 'Siap'
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        doc.status === 'Siap' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-600'
                      }`}>
                        PDF
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{jenis}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          {doc.status === 'Siap' ? (
                            <>
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                {doc.namaFile}
                              </span>
                              <span>•</span>
                              <span className="font-mono">{doc.ukuran}</span>
                            </>
                          ) : (
                            <span className="text-amber-700 font-medium">
                              Belum diunggah (Wajib diisi)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {doc.status === 'Siap' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleRemoveDoc(jenis)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus berkas"
                          >
                            <Trash2 size={16} />
                          </button>
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                            Terunggah
                          </span>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSimulateUpload(jenis)}
                          className="px-3.5 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-2xs"
                        >
                          <Upload size={14} />
                          <span>Pilih File PDF</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Drag & Drop Box Simulation */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <Upload size={28} className="mx-auto text-slate-400 mb-2" />
              <p className="font-bold text-slate-700 text-xs">
                Tarik & Lepas File Dokumen PDF ke Area Ini
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Atau klik tombol "Pilih File PDF" pada masing-masing dokumen di atas
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 flex items-center gap-1"
              >
                <ArrowLeft size={14} />
                <span>Kembali</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDraftSaved(true)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
                >
                  {isDraftSaved ? '✓ Draft Tersimpan' : 'Simpan Draft'}
                </button>
                <button
                  type="button"
                  disabled={!allRequiredUploaded}
                  onClick={() => setCurrentStep(3)}
                  className={`px-5 py-2.5 font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all ${
                    allRequiredUploaded
                      ? 'bg-[#0f2e59] hover:bg-[#163e75] text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Lanjutkan ke Pemeriksaan Data</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Pemeriksaan Data & Catatan */}
        {currentStep === 3 && (
          <div className="p-6 sm:p-8 space-y-6 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Langkah 3: Pemeriksaan Data & Ringkasan Permohonan
              </h3>
              <p className="text-[11px] text-slate-500">
                Tinjau kembali seluruh data dan kelengkapan berkas sebelum mengirim permohonan ke verifikator SPPR.
              </p>
            </div>

            {/* Summary Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 text-[11px]">Nama Pemohon:</span>
                  <p className="font-bold text-slate-900 text-sm">{surveyor.nama}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Nomor Lisensi:</span>
                  <p className="font-mono font-bold text-[#0f2e59]">{lisensi.no_lisensi}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Kualifikasi Surveyor:</span>
                  <p className="font-semibold text-slate-800">{surveyor.kualifikasi}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px]">Wilayah Penugasan:</span>
                  <p className="font-semibold text-slate-800">{surveyor.wilayah_kerja}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="font-bold text-slate-800 block mb-2">Berkas Persyaratan yang Telah Diunggah:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(uploadedDocs).map(([jenis, doc]) => (
                    <div key={jenis} className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <span className="font-semibold text-slate-800 block truncate">{jenis}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{doc.namaFile}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Catatan / Keterangan Tambahan untuk Verifikator (Opsional):
              </label>
              <textarea
                rows={3}
                value={catatanSb}
                onChange={(e) => setCatatanSb(e.target.value)}
                placeholder="Tuliskan keterangan pendukung atau catatan terkait pengajuan perpanjangan lisensi ini..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0f2e59] text-xs"
              ></textarea>
            </div>

            {/* Pernyataan Legalitas */}
            <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-2.5">
              <input type="checkbox" defaultChecked id="pernyataan" className="mt-0.5 rounded text-[#0f2e59]" />
              <label htmlFor="pernyataan" className="text-[11px] text-blue-950 leading-relaxed cursor-pointer">
                Saya menyatakan bahwa seluruh data dan berkas yang saya unggah adalah benar, sah, dan sesuai dengan ketentuan Peraturan Menteri ATR/BPN No. 9/2026.
              </label>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 flex items-center gap-1"
              >
                <ArrowLeft size={14} />
                <span>Kembali</span>
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmOpen(true)}
                className="px-6 py-2.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <FileCheck2 size={16} />
                <span>Ajukan Permohonan Perpanjangan</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 & 5: Pengajuan Sukses & Status Verifikasi */}
        {currentStep >= 4 && (
          <div className="p-8 text-center space-y-6 text-xs max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full font-bold text-xs bg-sky-100 text-sky-800 border border-sky-300">
                Status: DIAJUKAN
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Permohonan Perpanjangan Berhasil Diajukan
              </h3>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Berkas Anda telah masuk ke dalam antrean verifikasi Panitia Ditjen SPPR Kementerian ATR/BPN. 
                Anda akan menerima notifikasi otomatis pada setiap perubahan status pemeriksaan.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Registrasi Lisensi:</span>
                <span className="font-mono font-bold text-slate-900">{lisensi.no_lisensi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu Pengajuan:</span>
                <span className="font-medium text-slate-800">05 Oktober 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimasi Durasi Verifikasi:</span>
                <span className="font-bold text-[#0f2e59]">Maksimal 5 Hari Kerja (SLA)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => onNavigate('sb-riwayat')}
                className="px-5 py-2.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl shadow-xs"
              >
                Lihat di Riwayat Pengajuan
              </button>
              <button
                onClick={() => onNavigate('sb-beranda')}
                className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Before Submit */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 text-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0f2e59] flex items-center justify-center mx-auto">
              <HelpCircle size={26} />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-bold text-slate-900 text-base">Konfirmasi Pengajuan Permohonan</h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Apakah Anda yakin ingin mengajukan permohonan perpanjangan lisensi <strong>{lisensi.no_lisensi}</strong>? Berkas yang telah diajukan akan diperiksa oleh tim verifikator.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Periksa Kembali
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 rounded-xl bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold shadow-xs"
              >
                Ya, Kirim Permohonan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
