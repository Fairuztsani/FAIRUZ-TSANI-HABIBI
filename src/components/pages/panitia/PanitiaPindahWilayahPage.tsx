import React, { useState } from 'react';
import { PengajuanPindahWilayahModel } from '../../../types/aplikasiMitra.ts';
import {
  Compass,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';

interface PanitiaPindahWilayahPageProps {
  mutasiList: PengajuanPindahWilayahModel[];
  onApproveMutasi: (id: string, catatan: string) => void;
  onRejectMutasi: (id: string, catatan: string) => void;
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const PanitiaPindahWilayahPage: React.FC<PanitiaPindahWilayahPageProps> = ({
  mutasiList,
  onApproveMutasi,
  onRejectMutasi,
  onAddNotification
}) => {
  const [selectedMutasi, setSelectedMutasi] = useState<PengajuanPindahWilayahModel | null>(null);
  const [catatanVerifikator, setCatatanVerifikator] = useState('');

  const handleApprove = (item: PengajuanPindahWilayahModel) => {
    onApproveMutasi(item.id, catatanVerifikator || 'Seluruh berkas rekomendasi Kanwil asal dan tujuan valid. SK Mutasi diproses.');
    setSelectedMutasi(null);
    setCatatanVerifikator('');
    onAddNotification(`Permohonan ${item.id} disetujui. SK Mutasi Wilayah diterbitkan!`, 'success');
  };

  const handleReject = (item: PengajuanPindahWilayahModel) => {
    if (!catatanVerifikator) {
      alert('Harap berikan catatan alasan penolakan/perbaikan.');
      return;
    }
    onRejectMutasi(item.id, catatanVerifikator);
    setSelectedMutasi(null);
    setCatatanVerifikator('');
    onAddNotification(`Permohonan ${item.id} dikembalikan untuk perbaikan.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="text-[#0f2e59]" size={22} />
            <span>Verifikasi Pengajuan Pindah Wilayah Kerja</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pemeriksaan dokumen rekomendasi Kantor Wilayah BPN Provinsi asal dan tujuan kepindahan surveyor.
          </p>
        </div>
      </div>

      {/* Tabel Permohonan Pindah Wilayah Kerja */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm">
          Antrean Permohonan Mutasi Wilayah Kerja
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">No. Pengajuan</th>
                <th className="py-3 px-3">Tanggal</th>
                <th className="py-3 px-4">Nama Surveyor</th>
                <th className="py-3 px-3">Wilayah Asal</th>
                <th className="py-3 px-3">Wilayah Tujuan</th>
                <th className="py-3 px-4">Alasan</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mutasiList.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#0f2e59]">{item.id}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{item.tanggalPengajuan}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.surveyorNama}</td>
                  <td className="py-3.5 px-3 text-slate-700">{item.wilayahAsal}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-blue-900 px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-[11px]">
                      {item.wilayahTujuan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs">{item.alasanPindah}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      item.status === 'DISETUJUI'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'DALAM_VERIFIKASI'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedMutasi(item);
                        setCatatanVerifikator(item.catatanVerifikator || '');
                      }}
                      className="px-3 py-1.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-lg text-xs"
                    >
                      Periksa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Verifikasi Dokumen & Keputusan Mutasi */}
      {selectedMutasi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Verifikasi Pengajuan Pindah Wilayah {selectedMutasi.id}
              </h4>
              <button onClick={() => setSelectedMutasi(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] block">Pemohon:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedMutasi.surveyorNama}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-[11px] block">Wilayah Asal:</span>
                  <span className="font-semibold text-slate-900">{selectedMutasi.wilayahAsal}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-blue-700 text-[11px] block">Wilayah Tujuan:</span>
                  <span className="font-bold text-blue-950">{selectedMutasi.wilayahTujuan}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] block">Alasan Kepindahan:</span>
                <p className="text-slate-800 leading-relaxed">{selectedMutasi.alasanPindah}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[11px] block">Dokumen Rekomendasi Kanwil:</span>
                  <span className="font-semibold text-slate-900">{selectedMutasi.dokumenSuratRekomendasi || 'Rekomendasi_Kanwil.pdf'}</span>
                </div>
                <button
                  onClick={() => alert(`Membuka berkas: ${selectedMutasi.dokumenSuratRekomendasi}`)}
                  className="px-2.5 py-1 bg-white border border-slate-200 text-blue-700 hover:underline font-bold text-xs rounded"
                >
                  Lihat PDF
                </button>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Catatan Panitia Verifikator</label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan catatan verifikasi atau pertimbangan penerbitan SK Mutasi..."
                  value={catatanVerifikator}
                  onChange={e => setCatatanVerifikator(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0f2e59]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleReject(selectedMutasi)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl"
                >
                  Minta Perbaikan Berkas
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(selectedMutasi)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Setujui & Terbitkan SK Mutasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
