import React, { useState } from 'react';
import { SurveyorMitra, LisensiMitra } from '../../../types/mitraPerpanjangan.ts';
import {
  User,
  MapPin,
  Mail,
  Phone,
  Building,
  Award,
  ShieldCheck,
  CheckCircle2,
  Edit3,
  Save
} from 'lucide-react';

interface SbProfilPageProps {
  surveyor: SurveyorMitra;
  lisensi: LisensiMitra;
}

export const SbProfilPage: React.FC<SbProfilPageProps> = ({ surveyor, lisensi }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [telepon, setTelepon] = useState(surveyor.telepon || '0812-6789-1123');
  const [alamat, setAlamat] = useState(surveyor.alamat || 'Jl. Khatib Sulaiman No. 42, Padang');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Profil Surveyor Berlisensi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Data identitas diri, registrasi profesi, dan afiliasi Kantor Jasa Surveyor Berlisensi (KJSB).
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Edit3 size={14} />
          <span>{isEditing ? 'Batal Ubah' : 'Ubah Kontak & Alamat'}</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>Perubahan kontak dan alamat profil berhasil disimpan.</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-slate-100 pb-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-[#0f2e59] text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
            AP
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 font-mono">
              ● STATUS SURVEYOR AKTIF
            </div>
            <h3 className="text-lg font-black text-slate-900">{surveyor.nama}</h3>
            <p className="text-xs text-slate-500 font-medium">
              {surveyor.kualifikasi} • No. Registrasi: <span className="font-mono text-slate-800 font-bold">{surveyor.no_registrasi}</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Afiliasi: {surveyor.kjsbNama || 'Perorangan'}
            </p>
          </div>
        </div>

        {/* Detailed Fields */}
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="text-slate-500 font-medium block mb-1">Nama Lengkap & Gelar</label>
            <input
              type="text"
              disabled
              value={surveyor.nama}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">Nomor Induk Kependudukan (NIK)</label>
            <input
              type="text"
              disabled
              value="1371041504940003"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-800"
            />
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">Nomor Registrasi Lisensi</label>
            <input
              type="text"
              disabled
              value={surveyor.no_registrasi}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-[#0f2e59]"
            />
          </div>

          <div>
            <label className="text-slate-500 font-medium block mb-1">Wilayah Kerja Penugasan</label>
            <input
              type="text"
              disabled
              value={surveyor.wilayah_kerja}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800"
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Nomor Telepon / WhatsApp</label>
            <input
              type="text"
              disabled={!isEditing}
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              className={`w-full p-2.5 rounded-xl border font-medium ${
                isEditing
                  ? 'border-blue-400 bg-white text-slate-900 focus:outline-none ring-2 ring-blue-100'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            />
          </div>

          <div>
            <label className="text-slate-700 font-semibold block mb-1">Email Resmi</label>
            <input
              type="email"
              disabled
              value="andi.pratama@mitra-bpn.go.id"
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-slate-700 font-semibold block mb-1">Alamat Domisili Kantor / KJSB</label>
            <textarea
              rows={2}
              disabled={!isEditing}
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className={`w-full p-2.5 rounded-xl border font-medium text-xs ${
                isEditing
                  ? 'border-blue-400 bg-white text-slate-900 focus:outline-none ring-2 ring-blue-100'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            ></textarea>
          </div>

          {isEditing && (
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0f2e59] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Save size={14} />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
