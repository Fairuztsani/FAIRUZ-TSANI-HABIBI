import React, { useState } from 'react';
import { PengajuanPerubahanDataModel, SurveyorModel } from '../../../types/aplikasiMitra.ts';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  User,
  ExternalLink,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';

interface PanitiaValidasiPageProps {
  perubahanList: PengajuanPerubahanDataModel[];
  onApprovePerubahan: (id: string, catatan: string) => void;
  onRejectPerubahan: (id: string, catatan: string) => void;
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const PanitiaValidasiPage: React.FC<PanitiaValidasiPageProps> = ({
  perubahanList,
  onApprovePerubahan,
  onRejectPerubahan,
  onAddNotification
}) => {
  const [selectedItem, setSelectedItem] = useState<PengajuanPerubahanDataModel | null>(null);
  const [catatanVerifikator, setCatatanVerifikator] = useState('');

  const handleApprove = (item: PengajuanPerubahanDataModel) => {
    onApprovePerubahan(item.id, catatanVerifikator || 'Data terverifikasi valid dan disetujui.');
    setSelectedItem(null);
    setCatatanVerifikator('');
    onAddNotification(`Pengajuan ${item.id} berhasil disetujui. Notifikasi otomatis dikirimkan ke surveyor.`, 'success');
  };

  const handleReject = (item: PengajuanPerubahanDataModel) => {
    if (!catatanVerifikator) {
      alert('Harap berikan catatan alasan penolakan/perbaikan.');
      return;
    }
    onRejectPerubahan(item.id, catatanVerifikator);
    setSelectedItem(null);
    setCatatanVerifikator('');
    onAddNotification(`Pengajuan ${item.id} dikembalikan untuk perbaikan.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 className="text-[#0f2e59]" size={22} />
            <span>Verifikasi Pengajuan Perubahan Data (Menu Validasi)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar permohonan koreksi biodata dan dokumen pendukung yang diajukan surveyor melalui menu Validasi.
          </p>
        </div>
      </div>

      {/* Tabel Permohonan Perubahan Data */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm">
          Antrean Permohonan Perubahan Data Surveyor
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">No. Pengajuan</th>
                <th className="py-3 px-3">Tanggal</th>
                <th className="py-3 px-4">Surveyor</th>
                <th className="py-3 px-4">Uraian Perubahan Data</th>
                <th className="py-3 px-4">Alasan</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {perubahanList.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#0f2e59]">{item.id}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{item.tanggalPengajuan}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Andi Pratama, S.T.</td>
                  <td className="py-3.5 px-4">
                    <div className="text-[11px] text-slate-400 line-through">{item.dataLama}</div>
                    <div className="text-xs font-bold text-emerald-800">{item.dataBaru}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs">{item.alasanPerubahan}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      item.status === 'VALID'
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
                        setSelectedItem(item);
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

      {/* Modal Pemeriksaan & Keputusan Verifikasi */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                Pemeriksaan Permohonan Perubahan Data {selectedItem.id}
              </h4>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] block">Pemohon:</span>
                <span className="font-bold text-slate-900 text-sm">Andi Pratama, S.T. (SB-2024-00125)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-500 text-[11px] block">Data Lama:</span>
                <span className="text-slate-500 line-through block">{selectedItem.dataLama}</span>
                <span className="text-slate-500 text-[11px] block mt-2">Data Baru yang Diajukan:</span>
                <span className="font-bold text-emerald-800 text-sm block">{selectedItem.dataBaru}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 text-[11px] block">Alasan Pemohon:</span>
                <span className="text-slate-800">{selectedItem.alasanPerubahan}</span>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Catatan Verifikator untuk Surveyor</label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan catatan verifikasi atau alasan jika meminta perbaikan..."
                  value={catatanVerifikator}
                  onChange={e => setCatatanVerifikator(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0f2e59]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleReject(selectedItem)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl"
                >
                  Kembalikan untuk Perbaikan
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(selectedItem)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Setujui Perubahan Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
