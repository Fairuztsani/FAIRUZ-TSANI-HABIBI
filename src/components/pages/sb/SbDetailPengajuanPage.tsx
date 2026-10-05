import React, { useState } from 'react';
import { PengajuanPerpanjangan, StatusBerkas } from '../../../types/mitraPerpanjangan.ts';
import { PdfPreviewModal } from '../../common/PdfPreviewModal.tsx';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  Download,
  ExternalLink,
  ShieldCheck,
  RotateCw,
  History,
  CheckSquare,
  FileCheck2,
  User,
  Award
} from 'lucide-react';

interface SbDetailPengajuanPageProps {
  pengajuan: PengajuanPerpanjangan;
  onBack: () => void;
  onPerbaikiDokumen: (pengajuanId: string, catatan: string) => void;
}

export const SbDetailPengajuanPage: React.FC<SbDetailPengajuanPageProps> = ({
  pengajuan,
  onBack,
  onPerbaikiDokumen
}) => {
  const [previewDocTitle, setPreviewDocTitle] = useState<string | null>(null);
  const [isPerbaikiOpen, setIsPerbaikiOpen] = useState(false);
  const [perbaikanNote, setPerbaikanNote] = useState('');
  const [reuploadedMap, setReuploadedMap] = useState<{ [id: string]: boolean }>({});

  const isPerluPerbaikan = pengajuan.status === 'PERLU_PERBAIKAN';
  const isProsesSk = pengajuan.status === 'PROSES_SK';
  const isSkTerbit = pengajuan.status === 'SK_TERBIT';

  const rejectedDocs = pengajuan.berkas.filter(b => b.status_berkas === 'TIDAK_SESUAI');

  const handleKirimUlangPerbaikan = () => {
    setIsPerbaikiOpen(false);
    onPerbaikiDokumen(pengajuan.id, perbaikanNote || 'SB telah mengunggah ulang dokumen revisi.');
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
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
              <span className="text-xs text-slate-500 font-mono">
                Diajukan {pengajuan.tgl_pengajuan}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
              Detail Permohonan Perpanjangan Lisensi
            </h2>
          </div>
        </div>

        {/* Status Badge */}
        <div className="self-start sm:self-auto">
          {pengajuan.status === 'DIAJUKAN' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
              ● DIAJUKAN
            </span>
          )}
          {pengajuan.status === 'DALAM_VERIFIKASI' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
              ● DALAM_VERIFIKASI
            </span>
          )}
          {pengajuan.status === 'PERLU_PERBAIKAN' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
              ● PERLU_PERBAIKAN
            </span>
          )}
          {pengajuan.status === 'PROSES_SK' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
              ● PROSES_SK
            </span>
          )}
          {pengajuan.status === 'SK_TERBIT' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ● SK_TERBIT
            </span>
          )}
        </div>
      </div>

      {/* ALERT BOX SESUAI STATUS (Bagian 7 brief) */}
      {isPerluPerbaikan && (
        <div className="p-5 rounded-2xl border-2 border-red-300 bg-red-50/80 shadow-xs space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle size={20} />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="font-extrabold text-red-950 text-sm">
                Dokumen Memerlukan Perbaikan
              </h4>
              <p className="text-red-900 leading-relaxed text-[11px]">
                Tim verifikator Ditjen SPPR telah memeriksa berkas Anda dan menemukan dokumen yang belum memenuhi syarat atau kedaluwarsa. 
                Silakan periksa rincian catatan verifikator di bawah ini dan unggah berkas perbaikan.
              </p>
            </div>
            <button
              onClick={() => setIsPerbaikiOpen(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <RotateCw size={14} />
              <span>Perbaiki Dokumen & Ajukan Ulang</span>
            </button>
          </div>
        </div>
      )}

      {isProsesSk && (
        <div className="p-5 rounded-2xl border border-blue-300 bg-blue-50/80 shadow-xs space-y-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="font-extrabold text-blue-950 text-sm">
                Dokumen Telah Dinyatakan Lengkap dan SK Sedang Diproses
              </h4>
              <p className="text-blue-900 text-[11px] mt-0.5">
                Pemeriksaan administratif dan substantif telah selesai dan dinyatakan sesuai. Panitia saat ini sedang menyusun draft Surat Keputusan (SK) perpanjangan lisensi.
              </p>
            </div>
          </div>
        </div>
      )}

      {isSkTerbit && (
        <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/90 shadow-xs space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-extrabold text-emerald-950 text-sm">
                  SK Perpanjangan Lisensi Telah Resmi Diterbitkan!
                </h4>
                <p className="text-emerald-900 text-[11px] mt-0.5">
                  Nomor SK: <strong className="font-mono">{pengajuan.skLisensi?.no_sk || 'SK.392/SPPR-MITRA/IX/2026'}</strong> • Masa Berlaku Baru s.d. <strong>{pengajuan.skLisensi?.masa_berlaku_baru || '2031-10-04'}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Mengunduh file SK resmi: ${pengajuan.skLisensi?.no_sk}.pdf`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Unduh SK</span>
              </button>
              <a
                href={pengajuan.pengumuman?.link_url || 'https://sppr.atrbpn.go.id/pengumuman'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs border border-slate-300 shadow-2xs flex items-center gap-1.5"
              >
                <ExternalLink size={14} />
                <span>Lihat Pengumuman</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Proses (Bagian 7 brief) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">
          Status Proses & Timeline Perpanjangan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {/* Node 1: DIAJUKAN */}
          <div className="p-3.5 rounded-xl border border-sky-300 bg-sky-50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sky-950 text-xs">1. DIAJUKAN</span>
              <span className="text-[10px] font-bold text-sky-800">Selesai</span>
            </div>
            <p className="text-[11px] text-slate-600">Pengajuan diterima oleh sistem</p>
          </div>

          {/* Node 2: DALAM_VERIFIKASI */}
          <div className={`p-3.5 rounded-xl border space-y-1 ${
            pengajuan.status !== 'DIAJUKAN'
              ? 'border-indigo-300 bg-indigo-50'
              : 'border-slate-200 bg-slate-50 text-slate-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs">2. DALAM VERIFIKASI</span>
              {pengajuan.status !== 'DIAJUKAN' && (
                <span className="text-[10px] font-bold text-indigo-700">Putaran ke-{pengajuan.riwayatVerifikasi.length || 1}</span>
              )}
            </div>
            <p className="text-[11px] text-slate-600">Pemeriksaan kelayakan berkas</p>
          </div>

          {/* Node 3: PERLU_PERBAIKAN / PROSES_SK */}
          <div className={`p-3.5 rounded-xl border space-y-1 ${
            isPerluPerbaikan
              ? 'border-amber-300 bg-amber-50 text-amber-950 ring-2 ring-amber-400/50'
              : (isProsesSk || isSkTerbit)
              ? 'border-blue-300 bg-blue-50 text-blue-950'
              : 'border-slate-200 bg-slate-50 text-slate-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs">
                {isPerluPerbaikan ? '3. PERLU PERBAIKAN' : '3. PROSES SK'}
              </span>
              <span className="text-[10px] font-bold">
                {isPerluPerbaikan ? 'Ada Catatan' : (isProsesSk || isSkTerbit) ? 'Selesai' : 'Menunggu'}
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              {isPerluPerbaikan ? 'Perbaikan dokumen oleh SB' : 'Draft SK sedang disusun panitia'}
            </p>
          </div>

          {/* Node 4: SK_TERBIT */}
          <div className={`p-3.5 rounded-xl border space-y-1 ${
            isSkTerbit
              ? 'border-emerald-300 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400/50'
              : 'border-slate-200 bg-slate-50 text-slate-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs">4. SK TERBIT</span>
              <span className="text-[10px] font-bold">{isSkTerbit ? 'Terbit' : 'Menunggu'}</span>
            </div>
            <p className="text-[11px] text-slate-600">Penerbitan SK & Pengumuman</p>
          </div>
        </div>
      </div>

      {/* Grid: Informasi Surveyor & Informasi Lisensi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Informasi Surveyor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
            <User size={16} className="text-[#0f2e59]" />
            <span>Informasi Surveyor</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Nama Lengkap:</span>
              <span className="font-bold text-slate-900">{pengajuan.surveyor.nama}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Nomor Registrasi:</span>
              <span className="font-mono font-bold text-[#0f2e59]">{pengajuan.surveyor.no_registrasi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Kualifikasi:</span>
              <span className="font-semibold text-slate-800">{pengajuan.surveyor.kualifikasi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Wilayah Kerja:</span>
              <span className="font-semibold text-slate-800">{pengajuan.surveyor.wilayah_kerja}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Kantor Jasa Surveyor (KJSB):</span>
              <span className="font-medium text-slate-800">{pengajuan.surveyor.kjsbNama || 'Perorangan'}</span>
            </div>
          </div>
        </div>

        {/* Informasi Lisensi */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
            <Award size={16} className="text-[#0f2e59]" />
            <span>Informasi Lisensi</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Nomor Lisensi:</span>
              <span className="font-mono font-bold text-slate-900">{pengajuan.lisensi.no_lisensi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Tanggal Terbit Lisensi:</span>
              <span className="font-semibold text-slate-800">{pengajuan.lisensi.tgl_terbit}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Tanggal Masa Berlaku Berakhir:</span>
              <span className="font-bold text-amber-700">{pengajuan.lisensi.tgl_berakhir}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Status Lisensi:</span>
              <span className="font-semibold text-slate-800">{pengajuan.lisensi.status}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Sisa Masa Berlaku:</span>
              <span className="font-bold text-[#0f2e59] font-mono">{pengajuan.lisensi.sisaHari} Hari</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dokumen Persyaratan Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[#0f2e59]" />
            <h3 className="font-bold text-slate-900 text-sm">Dokumen Persyaratan (PDF)</h3>
          </div>
          <span className="text-[11px] text-slate-500">
            Total {pengajuan.berkas.length} Dokumen
          </span>
        </div>

        <div className="space-y-3">
          {pengajuan.berkas.map((doc) => (
            <div
              key={doc.id}
              className={`p-3.5 rounded-xl border transition-all ${
                doc.status_berkas === 'TIDAK_SESUAI'
                  ? 'bg-red-50/50 border-red-300'
                  : doc.status_berkas === 'SESUAI'
                  ? 'bg-emerald-50/20 border-emerald-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{doc.jenis_berkas}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{doc.ukuran || '1.8 MB'}</span>
                      <span>•</span>
                      <button
                        onClick={() => setPreviewDocTitle(doc.jenis_berkas)}
                        className="text-blue-700 hover:underline font-semibold"
                      >
                        Pratinjau PDF
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {doc.status_berkas === 'SESUAI' && (
                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ✓ SESUAI
                    </span>
                  )}
                  {doc.status_berkas === 'TIDAK_SESUAI' && (
                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-red-100 text-red-800 border border-red-300">
                      ✕ TIDAK SESUAI
                    </span>
                  )}
                  {doc.status_berkas === 'MENUNGGU' && (
                    <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-slate-100 text-slate-700 border border-slate-300">
                      MENUNGGU PERIKSA
                    </span>
                  )}
                </div>
              </div>

              {/* Catatan Verifikator jika dokumen TIDAK_SESUAI */}
              {doc.catatan && (
                <div className="mt-2.5 pt-2 border-t border-red-200/80 text-[11px] text-red-800 font-medium">
                  <strong>Catatan Verifikator:</strong> {doc.catatan}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Riwayat Verifikasi & Riwayat Status (Audit Trail) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Riwayat Verifikasi */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
            <CheckSquare size={16} className="text-[#0f2e59]" />
            <span>Riwayat Verifikasi Panitia</span>
          </div>

          {pengajuan.riwayatVerifikasi.length === 0 ? (
            <div className="py-6 text-center text-slate-400">
              Belum ada riwayat verifikasi yang dicatat.
            </div>
          ) : (
            <div className="space-y-3">
              {pengajuan.riwayatVerifikasi.map((ver) => (
                <div key={ver.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-[#0f2e59]">Putaran ke-{ver.putaran_ke}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                      ver.hasil === 'LENGKAP' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {ver.hasil}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed italic">
                    "{ver.catatan}"
                  </p>
                  <div className="pt-1 flex justify-between text-[10px] text-slate-400">
                    <span>Verifikator: {ver.verifikator_nama || 'Panitia Ditjen SPPR'}</span>
                    <span className="font-mono">{ver.tgl_verifikasi}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Riwayat Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
            <History size={16} className="text-[#0f2e59]" />
            <span>Riwayat Perubahan Status (Audit Trail)</span>
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
            {pengajuan.riwayatStatus.map((log) => (
              <div key={log.id} className="relative flex items-start gap-3 pl-1">
                <div className="w-5 h-5 rounded-full bg-[#0f2e59] text-white flex items-center justify-center text-[10px] font-bold shrink-0 z-10">
                  ✓
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono font-bold text-[#0f2e59]">
                      {log.status_lama} &rarr; {log.status_baru}
                    </span>
                    <span className="text-slate-400 font-mono">{log.tgl_ubah}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{log.alasan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Perbaiki Dokumen & Unggah Ulang */}
      {isPerbaikiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full p-6 text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm">
                Perbaiki Berkas & Unggah Ulang Permohonan
              </h4>
              <button onClick={() => setIsPerbaikiOpen(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {rejectedDocs.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl border border-red-200 bg-red-50/50 space-y-2">
                  <div className="font-bold text-slate-900">{doc.jenis_berkas}</div>
                  <p className="text-[11px] text-red-800">Catatan: {doc.catatan}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500">
                      {reuploadedMap[doc.id] ? '✓ File PDF revisi siap' : 'Belum diunggah'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setReuploadedMap(prev => ({ ...prev, [doc.id]: true }))}
                      className="px-3 py-1.5 bg-[#0f2e59] text-white rounded-lg font-bold text-[11px]"
                    >
                      {reuploadedMap[doc.id] ? 'Ganti File' : 'Unggah File PDF Baru'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Catatan / Tanggapan Tambahan:
              </label>
              <textarea
                rows={2}
                value={perbaikanNote}
                onChange={(e) => setPerbaikanNote(e.target.value)}
                placeholder="Jelaskan perubahan yang telah dilakukan pada berkas revisi..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0f2e59]"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsPerbaikiOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleKirimUlangPerbaikan}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs"
              >
                Kirimkan Ulang Berkas Revisi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal */}
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
