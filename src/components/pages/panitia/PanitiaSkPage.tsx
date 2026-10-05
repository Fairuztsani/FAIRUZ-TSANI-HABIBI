import React, { useState } from 'react';
import { PengajuanPerpanjangan } from '../../../types/mitraPerpanjangan.ts';
import { PdfPreviewModal } from '../../common/PdfPreviewModal.tsx';
import {
  FileCheck2,
  ShieldCheck,
  Download,
  Eye,
  Upload,
  Save,
  CheckCircle2,
  Calendar,
  Award,
  User,
  Clock
} from 'lucide-react';

interface PanitiaSkPageProps {
  pengajuanList: PengajuanPerpanjangan[];
  onTerbitkanSk: (pengajuanId: string, noSk: string, linkPengumuman: string) => void;
}

export const PanitiaSkPage: React.FC<PanitiaSkPageProps> = ({
  pengajuanList,
  onTerbitkanSk
}) => {
  // Filter pengajuan yang berstatus PROSES_SK atau SK_TERBIT
  const skList = pengajuanList.filter(p => p.status === 'PROSES_SK' || p.status === 'SK_TERBIT');

  const [selectedPengajuan, setSelectedPengajuan] = useState<PengajuanPerpanjangan>(
    skList.find(p => p.status === 'PROSES_SK') || skList[0] || pengajuanList[0]
  );

  const [noSk, setNoSk] = useState('SK.412/SPPR-MITRA/X/2026');
  const [tglSk, setTglSk] = useState('2026-10-04');
  const [masaBerlakuBaru, setMasaBerlakuBaru] = useState('2031-10-04');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelect = (p: PengajuanPerpanjangan) => {
    setSelectedPengajuan(p);
    if (p.skLisensi) {
      setNoSk(p.skLisensi.no_sk);
      setTglSk(p.skLisensi.tgl_sk);
      setMasaBerlakuBaru(p.skLisensi.masa_berlaku_baru);
    }
  };

  const handleTerbitkanAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPengajuan) return;

    onTerbitkanSk(
      selectedPengajuan.id,
      noSk,
      `https://sppr.atrbpn.go.id/pengumuman/sk-${selectedPengajuan.id.toLowerCase()}`
    );

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Penyusunan & Penerbitan Surat Keputusan (SK) Lisensi
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Modul penetapan SK perpanjangan lisensi bagi permohonan yang berkasnya telah dinyatakan lengkap.
        </p>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <div>
              <span className="font-bold">Surat Keputusan Berhasil Diterbitkan!</span>
              <p className="text-[11px] text-emerald-800">
                Status pengajuan beralih ke <strong>SK_TERBIT</strong> dan masa berlaku lisensi surveyor diperbarui +5 tahun secara otomatis.
              </p>
            </div>
          </div>
          <span className="font-mono text-emerald-700 font-bold">{noSk}</span>
        </div>
      )}

      {/* Grid: Master Selector & Form Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Daftar Berkas Siap SK */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1">
            Daftar Berkas Lengkap / Siap SK
          </div>

          <div className="space-y-2">
            {skList.map((p) => {
              const isSelected = selectedPengajuan?.id === p.id;
              const isAlreadyTerbit = p.status === 'SK_TERBIT';

              return (
                <div
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-xs ${
                    isSelected
                      ? 'bg-[#0f2e59] text-white border-[#0f2e59] shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[11px]">{p.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isAlreadyTerbit
                        ? 'bg-emerald-100 text-emerald-800'
                        : isSelected
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="font-bold text-sm mt-1">{p.surveyor.nama}</div>
                  <div className={`text-[11px] font-mono mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {p.lisensi.no_lisensi}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Form Penyusunan & Penetapan SK */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] text-slate-500">Pemohon Terpilih:</span>
              <h3 className="font-bold text-slate-900 text-sm">
                {selectedPengajuan.surveyor.nama} ({selectedPengajuan.surveyor.kualifikasi})
              </h3>
            </div>
            <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
              selectedPengajuan.status === 'SK_TERBIT'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
            }`}>
              Status: {selectedPengajuan.status}
            </span>
          </div>

          <form onSubmit={handleTerbitkanAction} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nomor Surat Keputusan (SK):
                </label>
                <input
                  type="text"
                  value={noSk}
                  onChange={(e) => setNoSk(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0f2e59]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Tanggal Penetapan SK:
                </label>
                <input
                  type="date"
                  value={tglSk}
                  onChange={(e) => setTglSk(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-slate-800 focus:outline-none focus:border-[#0f2e59]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Masa Berlaku Lisensi Baru (+5 Tahun):
                </label>
                <input
                  type="date"
                  value={masaBerlakuBaru}
                  onChange={(e) => setMasaBerlakuBaru(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-slate-800 focus:outline-none focus:border-[#0f2e59]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Pejabat Penandatangan SK:
                </label>
                <input
                  type="text"
                  disabled
                  value="Direktur Jenderal SPPR Kementerian ATR/BPN"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
                />
              </div>
            </div>

            {/* Upload File SK Resmi */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="font-bold text-slate-800 block">
                Unggah File Berkas SK Resmi Berstempel Digital (PDF):
              </label>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      {selectedPengajuan.skLisensi?.file_sk ? 'Draft_SK_Resmi_SPPR.pdf' : 'Belum diunggah'}
                    </span>
                    <span className="text-[10px] text-slate-400">Ukuran: 2.4 MB • Format PDF</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Simulasi: Berkas PDF SK Resmi berhasil diunggah.')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
                >
                  Ganti File
                </button>
              </div>
            </div>

            {/* Tombol Aksi (Bagian 12 brief) */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Eye size={14} />
                <span>Preview Salinan SK</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Draft SK berhasil disimpan di basis data sistem.')}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>Simpan Draft</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <ShieldCheck size={16} />
                  <span>Terbitkan SK Resmi (+5 Tahun)</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {isPreviewOpen && (
        <PdfPreviewModal
          isOpen={true}
          onClose={() => setIsPreviewOpen(false)}
          title={`SK Perpanjangan Lisensi ${selectedPengajuan.surveyor.nama}`}
          documentType="Surat Keputusan Perpanjangan Lisensi Surveyor Kadaster"
          surveyorName={selectedPengajuan.surveyor.nama}
          licenseNumber={selectedPengajuan.lisensi.no_lisensi}
        />
      )}
    </div>
  );
};
