import React, { useState } from 'react';
import { User, Building, Bell, Shield, Key, Save, CheckCircle2 } from 'lucide-react';

interface PengaturanPageProps {
  onSaveNotification: (msg: string) => void;
}

export const PengaturanPage: React.FC<PengaturanPageProps> = ({ onSaveNotification }) => {
  const [userName, setUserName] = useState('Fairuz Tsani Habibi, S.Kom.');
  const [userNip, setUserNip] = useState('19950320 202012 1 003');
  const [userRole, setUserRole] = useState('Verifikator Ahli Pertama');
  const [userEmail, setUserEmail] = useState('fairuztsanihabibi03@gmail.com');
  const [notifyExpiring, setNotifyExpiring] = useState(true);
  const [notifyNewReq, setNotifyNewReq] = useState(true);
  const [expiryDaysThreshold, setExpiryDaysThreshold] = useState('30');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNotification('Pengaturan profil dan preferensi verifikator berhasil disimpan.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Pengaturan Sistem & Profil Pengguna
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Konfigurasi identitas verifikator, preferensi pengingat lisensi, dan integrasi pangkalan data Ditjen SPPR
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Profil Verifikator */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-[#0f2e59] font-bold text-xs uppercase tracking-wider">
            <User size={16} />
            <span>Identitas Pejabat Verifikator</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nama Lengkap & Gelar
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nomor Induk Pegawai (NIP)
              </label>
              <input
                type="text"
                value={userNip}
                onChange={(e) => setUserNip(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Jabatan Fungsional
              </label>
              <input
                type="text"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Alamat Surel Kedinasan
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Lembaga & Satuan Kerja */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-[#0f2e59] font-bold text-xs uppercase tracking-wider">
            <Building size={16} />
            <span>Satuan Kerja / Unit Organisasi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block mb-0.5">Kementerian</span>
              <p className="font-semibold text-slate-900">Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional</p>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Direktorat Jenderal</span>
              <p className="font-semibold text-slate-900">Direktorat Jenderal Survei dan Pemetaan Pertanahan dan Ruang (Ditjen SPPR)</p>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Direktorat Teknis</span>
              <p className="font-semibold text-slate-900">Direktorat Pengukuran dan Pemetaan Kadastral</p>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Otoritas Tanda Tangan Elektronik</span>
              <p className="font-semibold text-emerald-700">Tersertifikasi Balai Sertifikasi Elektronik (BSrE - BSSN)</p>
            </div>
          </div>
        </div>

        {/* Section 3: Preferensi Pengingat & Kebijakan Lisensi */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-[#0f2e59] font-bold text-xs uppercase tracking-wider">
            <Bell size={16} />
            <span>Preferensi Notifikasi & Peringatan Dini</span>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyNewReq}
                onChange={(e) => setNotifyNewReq(e.target.checked)}
                className="w-4 h-4 rounded text-[#0f2e59] focus:ring-[#0f2e59] border-slate-300"
              />
              <div>
                <span className="font-semibold text-slate-800">Notifikasi Permohonan Baru</span>
                <p className="text-slate-500 text-[11px]">Tampilkan lencana dan pemberitahuan seketika saat pemohon mengunggah berkas baru.</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyExpiring}
                onChange={(e) => setNotifyExpiring(e.target.checked)}
                className="w-4 h-4 rounded text-[#0f2e59] focus:ring-[#0f2e59] border-slate-300"
              />
              <div>
                <span className="font-semibold text-slate-800">Peringatan Lisensi Segera Berakhir</span>
                <p className="text-slate-500 text-[11px]">Kirimkan alert sistem untuk surveyor yang lisensinya akan kedaluwarsa.</p>
              </div>
            </label>

            <div className="pt-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Ambang Batas Peringatan Masa Berlaku (Hari Kalender)
              </label>
              <select
                value={expiryDaysThreshold}
                onChange={(e) => setExpiryDaysThreshold(e.target.value)}
                className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 focus:border-[#0f2e59] outline-none"
              >
                <option value="14">14 Hari Sebelum Berakhir</option>
                <option value="30">30 Hari Sebelum Berakhir (Standar Permen ATR/BPN No. 9/2026)</option>
                <option value="60">60 Hari Sebelum Berakhir</option>
                <option value="90">90 Hari Sebelum Berakhir</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0f2e59] hover:bg-[#16396b] rounded-lg shadow-sm transition-colors"
          >
            <Save size={15} />
            <span>Simpan Perubahan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
