import React, { useState } from 'react';
import { 
  PengajuanPerpanjangan, 
  BerkasPersyaratan, 
  StatusBerkas,
  StatusPengajuan
} from '../../types/mitraPerpanjangan.ts';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  RotateCw,
  Eye,
  FileCheck
} from 'lucide-react';

// =========================================================================
// 1. MODAL AJUKAN PERPANJANGAN (SB - Langkah 2 Swimlane)
// =========================================================================
interface AjukanPerpanjanganModalProps {
  isOpen: boolean;
  onClose: () => void;
  pengajuan?: PengajuanPerpanjangan;
  onSubmit: (data: { catatan: string; files: { jenis: string; file: File }[] }) => void;
}

export const AjukanPerpanjanganModal: React.FC<AjukanPerpanjanganModalProps> = ({
  isOpen,
  onClose,
  pengajuan,
  onSubmit
}) => {
  const [catatan, setCatatan] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    'Kartu Tanda Penduduk (KTP)': null,
    'Sertifikat Kompetensi Keahlian (SKK)': null,
    'SK Lisensi Lama': null,
    'Surat Rekomendasi Asosiasi / KJSB': null
  });

  if (!isOpen) return null;

  const handleFileChange = (jenis: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        alert('Format berkas harus berekstensi PDF sesuai spesifikasi Bagian 3.3.5.');
        return;
      }
      setUploadedFiles(prev => ({ ...prev, [jenis]: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filesToSubmit: { jenis: string; file: File }[] = [];
    Object.entries(uploadedFiles).forEach(([jenis, file]) => {
      if (file) filesToSubmit.push({ jenis, file });
    });

    onSubmit({ catatan, files: filesToSubmit });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-[#0f2e59] text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">
              Langkah 2 Swimlane Alur Sistem
            </div>
            <h3 className="text-base font-bold">
              Formulir Permohonan Perpanjangan Lisensi (SB)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-slate-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {pengajuan && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500">Nama Surveyor:</span>
                <p className="font-bold text-slate-800">{pengajuan.surveyor.nama}</p>
              </div>
              <div>
                <span className="text-slate-500">Nomor Lisensi Saat Ini:</span>
                <p className="font-mono font-bold text-[#0f2e59]">{pengajuan.lisensi.no_lisensi}</p>
              </div>
              <div>
                <span className="text-slate-500">Masa Berlaku Berakhir:</span>
                <p className="font-medium text-amber-700">{pengajuan.lisensi.tgl_berakhir}</p>
              </div>
              <div>
                <span className="text-slate-500">Wilayah Penugasan:</span>
                <p className="font-medium text-slate-700">{pengajuan.surveyor.wilayah_kerja}</p>
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-slate-800 block mb-2">
              Unggah Berkas Persyaratan (Wajib PDF, Maks. 5MB per berkas):
            </label>
            <div className="space-y-3">
              {Object.keys(uploadedFiles).map((jenis) => (
                <div key={jenis} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{jenis}</div>
                      <div className="text-[11px] text-slate-500">
                        {uploadedFiles[jenis] ? (
                          <span className="text-emerald-600 font-medium">
                            ✓ {uploadedFiles[jenis]?.name} ({((uploadedFiles[jenis]?.size || 0) / (1024 * 1024)).toFixed(1)} MB)
                          </span>
                        ) : (
                          'Belum diunggah'
                        )}
                      </div>
                    </div>
                  </div>

                  <label className="cursor-pointer px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors">
                    <span>Pilih File</span>
                    <input 
                      type="file" 
                      accept=".pdf" 
                      onChange={(e) => handleFileChange(jenis, e)} 
                      className="hidden" 
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Catatan Permohonan SB (Opsional):
            </label>
            <textarea
              rows={3}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Tambahkan keterangan pendukung terkait penyelesaian target survei kadaster atau pembaruan KJSB..."
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0f2e59] text-xs"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0f2e59] text-white hover:bg-[#163e75] font-bold shadow-xs flex items-center gap-2"
            >
              <Upload size={14} />
              <span>Ajukan Permohonan (Status: DIAJUKAN)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 2. MODAL PERBAIKI BERKAS (SB - Langkah 5 Swimlane)
// =========================================================================
interface PerbaikiBerkasModalProps {
  isOpen: boolean;
  onClose: () => void;
  pengajuan: PengajuanPerpanjangan;
  onSubmitPerbaikan: (pengajuanId: string, perbaikanCatatan: string) => void;
}

export const PerbaikiBerkasModal: React.FC<PerbaikiBerkasModalProps> = ({
  isOpen,
  onClose,
  pengajuan,
  onSubmitPerbaikan
}) => {
  const [catatanPerbaikan, setCatatanPerbaikan] = useState('');
  const [reuploadedFiles, setReuploadedFiles] = useState<{ [key: string]: boolean }>({});

  if (!isOpen) return null;

  const rejectedDocs = pengajuan.berkas.filter(b => b.status_berkas === 'TIDAK_SESUAI');

  const handleReupload = (berkasId: string) => {
    setReuploadedFiles(prev => ({ ...prev, [berkasId]: true }));
  };

  const handleKirimUlang = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitPerbaikan(pengajuan.id, catatanPerbaikan || 'SB telah mengunggah ulang berkas revisi yang diminta verifikator.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-amber-600 text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-wider text-amber-100 uppercase">
              Langkah 5 Swimlane: Putaran Perbaikan
            </div>
            <h3 className="text-base font-bold">
              Perbaikan & Unggah Ulang Berkas Persyaratan
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleKirimUlang} className="p-6 overflow-y-auto space-y-5 text-xs">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle size={16} className="text-amber-600" />
              <span>Catatan Panitia Verifikator (Putaran Terakhir):</span>
            </div>
            <p className="text-xs text-amber-950 font-medium italic bg-white/70 p-3 rounded-lg border border-amber-200">
              "{pengajuan.riwayatVerifikasi[pengajuan.riwayatVerifikasi.length - 1]?.catatan || 'Ada berkas yang belum sesuai ketentuan.'}"
            </p>
          </div>

          <div>
            <div className="font-bold text-slate-800 mb-2">
              Daftar Berkas yang Memerlukan Perbaikan:
            </div>
            <div className="space-y-3">
              {rejectedDocs.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-xl border border-red-200 bg-red-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{doc.jenis_berkas}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                      TIDAK_SESUAI
                    </span>
                  </div>
                  {doc.catatan && (
                    <p className="text-[11px] text-red-700 font-medium">
                      Alasan kekurangan: {doc.catatan}
                    </p>
                  )}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {reuploadedFiles[doc.id] ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={13} className="text-emerald-600" />
                          Berkas PDF revisi siap dikirimkan
                        </span>
                      ) : (
                        'Menunggu file PDF perbaikan'
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleReupload(doc.id)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 ${
                        reuploadedFiles[doc.id]
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-[#0f2e59] text-white hover:bg-[#163e75]'
                      }`}
                    >
                      <Upload size={13} />
                      <span>{reuploadedFiles[doc.id] ? 'Ganti File Revisi' : 'Unggah File Revisi (PDF)'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Tanggapan & Penjelasan SB:
            </label>
            <textarea
              rows={3}
              value={catatanPerbaikan}
              onChange={(e) => setCatatanPerbaikan(e.target.value)}
              placeholder="Jelaskan perbaikan yang telah dilakukan pada berkas ini..."
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0f2e59] text-xs"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 font-bold shadow-xs flex items-center gap-2"
            >
              <RotateCw size={14} />
              <span>Kirimkan Perbaikan Berkas (Putaran Berikutnya)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 3. MODAL VERIFIKASI PANITIA (Panitia - Langkah 3, 4, 5, 5b, 6)
// =========================================================================
interface VerifikasiPanitiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  pengajuan: PengajuanPerpanjangan;
  onSaveKeputusan: (
    pengajuanId: string, 
    keputusan: 'PERLU_PERBAIKAN' | 'PROSES_SK', 
    catatan: string, 
    berkasStatuses: { [id: string]: { status: StatusBerkas; catatan?: string } }
  ) => void;
  onTerbitkanSk: (pengajuanId: string, noSk: string, linkPengumuman: string) => void;
}

export const VerifikasiPanitiaModal: React.FC<VerifikasiPanitiaModalProps> = ({
  isOpen,
  onClose,
  pengajuan,
  onSaveKeputusan,
  onTerbitkanSk
}) => {
  const [docStatuses, setDocStatuses] = useState<{ [id: string]: { status: StatusBerkas; catatan?: string } }>(() => {
    const map: { [id: string]: { status: StatusBerkas; catatan?: string } } = {};
    pengajuan.berkas.forEach(b => {
      map[b.id] = { status: b.status_berkas === 'MENUNGGU' ? 'SESUAI' : b.status_berkas, catatan: b.catatan || '' };
    });
    return map;
  });

  const [catatanUmum, setCatatanUmum] = useState('');
  const [noSkInput, setNoSkInput] = useState(`SK.412/SPPR-MITRA/X/2026`);
  const [linkUrlInput, setLinkUrlInput] = useState(`https://sppr.atrbpn.go.id/pengumuman/sk-${pengajuan.id.toLowerCase()}`);

  if (!isOpen) return null;

  const currentRound = (pengajuan.riwayatVerifikasi?.length || 0) + 1;
  const hasIncomplete = Object.values(docStatuses).some(d => d.status === 'TIDAK_SESUAI');

  const handleStatusToggle = (docId: string, status: StatusBerkas) => {
    setDocStatuses(prev => ({
      ...prev,
      [docId]: { ...prev[docId], status }
    }));
  };

  const handleDocNoteChange = (docId: string, catatan: string) => {
    setDocStatuses(prev => ({
      ...prev,
      [docId]: { ...prev[docId], catatan }
    }));
  };

  const handleSimpanKeputusan = (keputusan: 'PERLU_PERBAIKAN' | 'PROSES_SK') => {
    onSaveKeputusan(pengajuan.id, keputusan, catatanUmum, docStatuses);
    onClose();
  };

  const handleTerbitkanSkAction = () => {
    onTerbitkanSk(pengajuan.id, noSkInput, linkUrlInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-[#0f2e59] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              <span>Langkah 3-6: Panel Panitia / Verifikator</span>
              <span>•</span>
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-mono">
                Putaran ke-{currentRound}
              </span>
            </div>
            <h3 className="text-base font-bold">
              Verifikasi Kelengkapan & Kesesuaian Berkas Perpanjangan
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-slate-300">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Surveyor Overview Banner */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-500">Nama Surveyor:</span>
              <p className="font-bold text-slate-900">{pengajuan.surveyor.nama}</p>
            </div>
            <div>
              <span className="text-slate-500">Kualifikasi:</span>
              <p className="font-medium text-slate-800">{pengajuan.surveyor.kualifikasi}</p>
            </div>
            <div>
              <span className="text-slate-500">Nomor Lisensi Lama:</span>
              <p className="font-mono font-bold text-[#0f2e59]">{pengajuan.lisensi.no_lisensi}</p>
            </div>
            <div>
              <span className="text-slate-500">Masa Berlaku Lisensi:</span>
              <p className="font-semibold text-amber-700">{pengajuan.lisensi.tgl_berakhir}</p>
            </div>
          </div>

          {/* Checklist of Documents */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-slate-900 text-sm">
                Pemeriksaan Berkas Persyaratan (Format PDF):
              </h4>
              <span className="text-slate-500 text-[11px]">
                Tandai kelayakan setiap dokumen
              </span>
            </div>

            <div className="space-y-3">
              {pengajuan.berkas.map((doc) => {
                const currentDocState = docStatuses[doc.id] || { status: 'SESUAI' };

                return (
                  <div 
                    key={doc.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      currentDocState.status === 'TIDAK_SESUAI'
                        ? 'border-red-300 bg-red-50/30'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                          PDF
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{doc.jenis_berkas}</div>
                          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                            <span>{doc.ukuran || '2.1 MB'}</span>
                            <span>•</span>
                            <span className="text-blue-600 underline cursor-pointer">Pratinjau Dokumen</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Toggle Buttons */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(doc.id, 'SESUAI')}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-1 ${
                            currentDocState.status === 'SESUAI'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <CheckCircle2 size={13} />
                          <span>Sesuai</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(doc.id, 'TIDAK_SESUAI')}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-1 ${
                            currentDocState.status === 'TIDAK_SESUAI'
                              ? 'bg-red-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <AlertTriangle size={13} />
                          <span>Perlu Perbaikan</span>
                        </button>
                      </div>
                    </div>

                    {currentDocState.status === 'TIDAK_SESUAI' && (
                      <div className="mt-2.5 pt-2 border-t border-red-200">
                        <input
                          type="text"
                          placeholder="Tuliskan catatan kekurangan untuk dokumen ini (akan dikirimkan ke SB)..."
                          value={currentDocState.catatan || ''}
                          onChange={(e) => handleDocNoteChange(doc.id, e.target.value)}
                          className="w-full p-2 text-xs rounded-lg border border-red-300 focus:outline-none focus:border-red-500 bg-white"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: If Status is PROSES_SK, display Draft SK Penerbitan Panel */}
          {pengajuan.status === 'PROSES_SK' ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <FileCheck size={16} className="text-blue-700" />
                <span>Penerbitan SK & Publikasi Pengumuman (Langkah 6 Swimlane):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nomor SK Lisensi Baru (BR-09 Otomatis):</label>
                  <input
                    type="text"
                    value={noSkInput}
                    onChange={(e) => setNoSkInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Masa Berlaku Baru (+5 Tahun):</label>
                  <input
                    type="text"
                    disabled
                    value="04 Oktober 2031"
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Tautan Pengumuman Resmi (BR-04):</label>
                  <input
                    type="text"
                    value={linkUrlInput}
                    onChange={(e) => setLinkUrlInput(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleTerbitkanSkAction}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs flex items-center gap-2"
                >
                  <ShieldCheck size={16} />
                  <span>Terbitkan SK & Perbarui Lisensi SB (+5 Thn)</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Catatan Hasil Verifikasi Putaran ke-{currentRound}:
              </label>
              <textarea
                rows={2}
                value={catatanUmum}
                onChange={(e) => setCatatanUmum(e.target.value)}
                placeholder="Catatan umum hasil pemeriksaan oleh panitia..."
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0f2e59] text-xs"
              ></textarea>
            </div>
          )}

          {/* Action Buttons */}
          {pengajuan.status !== 'PROSES_SK' && (
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSimpanKeputusan('PERLU_PERBAIKAN')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-xs flex items-center gap-1.5"
                >
                  <AlertTriangle size={14} />
                  <span>Minta Perbaikan (Status: PERLU_PERBAIKAN)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSimpanKeputusan('PROSES_SK')}
                  className="px-5 py-2 rounded-xl bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>Lengkap & Setujui (Status: PROSES_SK)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. MODAL UNDUH SK & PENGUMUMAN (SB - Langkah 8 Swimlane)
// =========================================================================
interface UnduhSkModalProps {
  isOpen: boolean;
  onClose: () => void;
  pengajuan: PengajuanPerpanjangan;
}

export const UnduhSkModal: React.FC<UnduhSkModalProps> = ({
  isOpen,
  onClose,
  pengajuan
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-emerald-700 text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-wider text-emerald-200 uppercase">
              Langkah 8 Swimlane: Hasil Akhir
            </div>
            <h3 className="text-base font-bold">
              Surat Keputusan (SK) & Tautan Pengumuman Resmi
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {/* Certificate Card */}
          <div className="p-5 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck size={24} />
            </div>

            <div>
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Kementerian Agraria dan Tata Ruang / BPN
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                SURAT KEPUTUSAN PERPANJANGAN LISENSI
              </h4>
              <p className="font-mono text-emerald-800 font-bold mt-1 text-xs">
                {pengajuan.skLisensi?.no_sk || 'SK.402/SPPR-MITRA/X/2026'}
              </p>
            </div>

            <div className="border-t border-b border-emerald-200 py-3 text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600">Penerima Lisensi:</span>
                <span className="font-bold text-slate-900">{pengajuan.surveyor.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Kualifikasi:</span>
                <span className="font-semibold text-slate-800">{pengajuan.surveyor.kualifikasi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Masa Berlaku Baru:</span>
                <span className="font-bold text-emerald-700">
                  {pengajuan.skLisensi?.masa_berlaku_baru || '04 Oktober 2031'} (5 Tahun)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Pejabat Pengesah:</span>
                <span className="font-medium text-slate-800">Direktur Jenderal SPPR</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button 
                onClick={() => alert(`Mengunduh file PDF SK resmi: ${pengajuan.skLisensi?.no_sk || 'SK-Resmi'}.pdf`)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Download size={14} />
                <span>Unduh File SK Lisensi (PDF)</span>
              </button>
            </div>
          </div>

          {/* Announcement Link (BR-04) */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
            <div className="font-bold text-blue-950 flex items-center gap-1.5">
              <ExternalLink size={15} className="text-blue-600" />
              <span>Tautan Pengumuman Resmi Terbitnya SK (BR-04):</span>
            </div>
            <p className="text-[11px] text-blue-900">
              Pengumuman resmi telah dipublikasikan pada portal Ditjen SPPR Kementerian ATR/BPN:
            </p>
            <a
              href={pengajuan.pengumuman?.link_url || 'https://sppr.atrbpn.go.id/pengumuman'}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-blue-700 hover:underline block break-all bg-white p-2.5 rounded-lg border border-blue-200"
            >
              {pengajuan.pengumuman?.link_url || 'https://sppr.atrbpn.go.id/pengumuman/sk-terbit-2026'}
            </a>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900"
            >
              Selesai & Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
