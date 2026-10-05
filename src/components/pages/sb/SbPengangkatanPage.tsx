import React, { useState } from 'react';
import { RiwayatPengangkatanModel, SkLisensiModel } from '../../../types/aplikasiMitra.ts';
import {
  FileCheck,
  Download,
  Eye,
  Award,
  Calendar,
  ShieldCheck,
  ExternalLink,
  MapPin,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface SbPengangkatanPageProps {
  pengangkatanList: RiwayatPengangkatanModel[];
  skList: SkLisensiModel[];
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const SbPengangkatanPage: React.FC<SbPengangkatanPageProps> = ({
  pengangkatanList,
  skList,
  onAddNotification
}) => {
  const [activeSection, setActiveSection] = useState<'pengangkatan' | 'sk-perpanjangan' | 'sk-mutasi'>('pengangkatan');

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck className="text-[#0f2e59]" size={22} />
            <span>Riwayat Pengangkatan & Surat Keputusan (SK)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Arsip resmi Surat Keputusan (SK) Pengangkatan, Berita Acara Pelantikan, SK Perpanjangan Lisensi, dan SK Pindah Wilayah Kerja.
          </p>
        </div>
      </div>

      {/* Tabs Filter Sub-Dokumen (PDF Halaman 3 Usulan Pengembangan Pengangkatan) */}
      <div className="flex border-b border-slate-200 gap-1 bg-white p-1.5 rounded-2xl shadow-2xs overflow-x-auto">
        <button
          onClick={() => setActiveSection('pengangkatan')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'pengangkatan'
              ? 'bg-[#0f2e59] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award size={15} />
          <span>SK Pengangkatan & BA Pelantikan</span>
        </button>

        <button
          onClick={() => setActiveSection('sk-perpanjangan')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'sk-perpanjangan'
              ? 'bg-[#0f2e59] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Download size={15} />
          <span>Unduh SK Perpanjangan Lisensi</span>
        </button>

        <button
          onClick={() => setActiveSection('sk-mutasi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'sk-mutasi'
              ? 'bg-[#0f2e59] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MapPin size={15} />
          <span>Unduh SK Pindah Wilayah Kerja</span>
        </button>
      </div>

      {/* TAB 1: TABEL SK PENGANGKATAN & BA PELANTIKAN (Gambar A.5 Halaman 9 PDF) */}
      {activeSection === 'pengangkatan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm">
              Tabel Riwayat SK Pengangkatan, BA Pelantikan, dan Wilayah Kerja
            </h3>
            <p className="text-xs text-slate-500">
              Dokumentasi penetapan yuridis sebagai Surveyor Kadaster Berlisensi oleh Menteri ATR / Direktur Jenderal SPPR.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">No</th>
                  <th className="py-3 px-4">Nomor & Tanggal SK</th>
                  <th className="py-3 px-4">Nomor & Tanggal BA Pelantikan</th>
                  <th className="py-3 px-4">Wilayah Kerja Resmi</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Aksi Dokumen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pengangkatanList.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-slate-900 text-xs">{item.nomorSK}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Tanggal SK: {item.tanggalSK}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-slate-800 text-xs">{item.nomorBaPelantikan}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Tanggal Lantik: {item.tanggalPelantikan}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">{item.wilayahKerja}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Penetapan Ditjen SPPR</div>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => alert(`Membuka SK Pengangkatan: ${item.nomorSK}`)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Eye size={13} />
                          <span>SK</span>
                        </button>
                        <button
                          onClick={() => alert(`Membuka Berita Acara Pelantikan: ${item.nomorBaPelantikan}`)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <FileText size={13} />
                          <span>BA</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: UNDUH SK PERPANJANGAN LISENSI (PDF Halaman 3 Usulan Pengembangan Pengangkatan) */}
      {activeSection === 'sk-perpanjangan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Download className="text-[#0f2e59]" size={17} />
              <span>Unduh Surat Keputusan (SK) Perpanjangan Lisensi</span>
            </h3>
            <p className="text-xs text-slate-500">
              Fitur khusus untuk mengunduh salinan resmi Surat Keputusan Perpanjangan Lisensi yang telah ditandatangani secara elektronik (BSrE).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900 font-mono">
                  SK TERBIT RESMI
                </span>
                <span className="text-[11px] text-slate-500 font-mono">20 September 2026</span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  SK Perpanjangan Lisensi Periode 2026 — 2031
                </h4>
                <p className="text-xs font-mono text-slate-600 mt-0.5">
                  Nomor: SK.392/SPPR-MITRA/IX/2026
                </p>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1">
                <div>Masa Berlaku Baru: <strong>20 September 2026 s/d 20 September 2031</strong></div>
                <div>Status Pengesahan: <strong>TTE Direktur Jenderal SPPR</strong></div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => alert('Mengunduh Salinan Dokumen SK Perpanjangan No. SK.392/SPPR-MITRA/IX/2026')}
                  className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download size={14} />
                  <span>Unduh SK Perpanjangan (PDF)</span>
                </button>
                <button
                  onClick={() => alert('Pratinjau SK Digital')}
                  className="px-3 py-2 border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold rounded-xl"
                >
                  Lihat
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3 opacity-80">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 font-mono">
                  ARSIP HISTORIS
                </span>
                <span className="text-[11px] text-slate-500 font-mono">15 April 2024</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  SK Perpanjangan Lisensi Periode 2024 — 2026
                </h4>
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  Nomor: SK.182/SPPR.2/IV/2024
                </p>
              </div>

              <div className="text-[11px] text-slate-500">
                <div>Masa Berlaku: 15 April 2024 s/d 15 November 2026</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Mengunduh SK Arsip 2024')}
                  className="px-3.5 py-1.5 border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Unduh Arsip SK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UNDUH SK PINDAH WILAYAH KERJA (PDF Halaman 3 Usulan Pengembangan Pengangkatan) */}
      {activeSection === 'sk-mutasi' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="text-[#0f2e59]" size={17} />
              <span>Unduh Surat Keputusan (SK) Pindah Wilayah Kerja</span>
            </h3>
            <p className="text-xs text-slate-500">
              Dokumen penetapan mutasi wilayah operasional kerja surveyor antar Kantor Wilayah BPN Provinsi.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 max-w-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 font-mono">
                SK MUTASI RESMI
              </span>
              <span className="text-[11px] text-slate-500 font-mono">05 September 2026</span>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">
                Surat Keputusan Pindah Wilayah Kerja
              </h4>
              <p className="text-xs font-mono text-slate-600 mt-0.5">
                Nomor: SK.219/MUTASI-SB/SPPR/IX/2026
              </p>
            </div>

            <div className="text-[11px] text-slate-700 space-y-1">
              <div>Wilayah Asal: <strong>Kantor Wilayah BPN Provinsi Jawa Barat</strong></div>
              <div>Wilayah Baru: <strong>Kantor Wilayah BPN Provinsi DKI Jakarta</strong></div>
              <div>Dasar Penetapan: Keputusan Direktur Jenderal SPPR ATR/BPN</div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => alert('Mengunduh SK Pindah Wilayah Kerja SK.219/MUTASI-SB/SPPR/IX/2026')}
                className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Download size={14} />
                <span>Unduh SK Mutasi Wilayah (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
