import React, { useState } from 'react';
import { PengajuanPerpanjangan } from '../../../types/mitraPerpanjangan.ts';
import { Megaphone, ExternalLink, Globe, CheckCircle2, Save, Send } from 'lucide-react';

interface PanitiaPengumumanPageProps {
  pengajuanList: PengajuanPerpanjangan[];
}

export const PanitiaPengumumanPage: React.FC<PanitiaPengumumanPageProps> = ({ pengajuanList }) => {
  const publishedList = pengajuanList.filter(p => p.status === 'SK_TERBIT');

  const [judul, setJudul] = useState('Penerbitan SK Perpanjangan Lisensi Surveyor Kadaster Periode Oktober 2026');
  const [nomorSk, setNomorSk] = useState('SK.392/SPPR-MITRA/IX/2026');
  const [surveyorNama, setSurveyorNama] = useState('Ahmad Fauzan, S.T.');
  const [linkUrl, setLinkUrl] = useState('https://sppr.atrbpn.go.id/pengumuman/sk-392-2026');
  const [tglPublikasi, setTglPublikasi] = useState('2026-10-04');
  const [statusPublikasi, setStatusPublikasi] = useState('Terpublikasi');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlertOpen(true);
    setTimeout(() => setIsAlertOpen(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Manajemen & Publikasi Pengumuman Terbitnya SK
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Formulir publikasi tautan resmi pengumuman kelulusan dan perpanjangan lisensi ke portal Ditjen SPPR Kementerian ATR/BPN.
        </p>
      </div>

      {isAlertOpen && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <div>
              <span className="font-bold">Pengumuman Berhasil Dipublikasikan!</span>
              <p className="text-[11px] text-emerald-800">
                Tautan pengumuman resmi kini dapat diakses oleh Surveyor Berlisensi melalui portal publik ATR/BPN.
              </p>
            </div>
          </div>
          <span className="font-mono text-emerald-700 font-bold">{linkUrl}</span>
        </div>
      )}

      {/* Grid: Form Publikasi & Daftar Pengumuman */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Publikasi (Bagian 13 brief) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
            <Megaphone size={16} className="text-[#0f2e59]" />
            <span>Form Buat Pengumuman SK Terbit</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Judul Pengumuman:</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0f2e59]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nomor SK Terkait:</label>
                <input
                  type="text"
                  value={nomorSk}
                  onChange={(e) => setNomorSk(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-[#0f2e59]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Surveyor:</label>
                <input
                  type="text"
                  value={surveyorNama}
                  onChange={(e) => setSurveyorNama(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0f2e59]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Link URL Pengumuman Publik:</label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-blue-700 focus:outline-none focus:border-[#0f2e59]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tanggal Publikasi:</label>
                <input
                  type="date"
                  value={tglPublikasi}
                  onChange={(e) => setTglPublikasi(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-slate-800 focus:outline-none focus:border-[#0f2e59]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Publikasi:</label>
                <select
                  value={statusPublikasi}
                  onChange={(e) => setStatusPublikasi(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
                >
                  <option value="Draft">Draft</option>
                  <option value="Terpublikasi">Terpublikasi</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => alert('Draft pengumuman disimpan.')}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 flex items-center gap-1.5"
              >
                <Save size={14} />
                <span>Simpan Draft</span>
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold shadow-xs flex items-center gap-1.5"
              >
                <Send size={14} />
                <span>Publikasikan Pengumuman</span>
              </button>
            </div>
          </form>
        </div>

        {/* Daftar Pengumuman yang Telah Tayang */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Globe size={16} className="text-[#0f2e59]" />
              <span>Daftar Pengumuman Terbit (Live)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Portal Ditjen SPPR</span>
          </div>

          <div className="space-y-3">
            {publishedList.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.pengumuman?.judul || `Penerbitan SK Perpanjangan Lisensi ${p.surveyor.nama}`}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Aktif
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>SK: {p.skLisensi?.no_sk}</span>
                  <span>{p.pengumuman?.tgl_publikasi || p.tgl_pengajuan}</span>
                </div>
                <a
                  href={p.pengumuman?.link_url || 'https://sppr.atrbpn.go.id/pengumuman'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-700 font-bold hover:underline text-[11px]"
                >
                  <ExternalLink size={13} />
                  <span>Kunjungi Tautan Publik: {p.pengumuman?.link_url || 'https://sppr.atrbpn.go.id'}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
