import React, { useState } from 'react';
import { X, Save, User, ShieldCheck } from 'lucide-react';

export interface BiodataProfile {
  nik: string;
  nomorLisensi: string;
  namaLengkap: string;
  statusPerkawinan: string;
  email: string;
  tempatLahir: string;
  tanggalLahir: string;
  telpHp: string;
  skPengangkatan: string;
  jenisKelamin: string;
  alamat: string;
  wilayahKerja: string;
  kualifikasi: string;
  statusVerifikasi: 'SUDAH VERIFIKASI' | 'BELUM VERIFIKASI' | 'MENUNGGU VERIFIKASI';
}

interface UpdateBiodataModalProps {
  isOpen: boolean;
  onClose: () => void;
  biodata: BiodataProfile;
  onSave: (updated: BiodataProfile) => void;
}

export const UpdateBiodataModal: React.FC<UpdateBiodataModalProps> = ({
  isOpen,
  onClose,
  biodata,
  onSave
}) => {
  const [formData, setFormData] = useState<BiodataProfile>({ ...biodata });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Modal Header */}
        <div className="bg-[#1b431e] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User size={18} className="text-amber-400" />
            <h3 className="font-bold text-sm tracking-wide">
              Update Biodata Surveyor Kadaster
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                NIK (Nomor Induk Kependudukan)
              </label>
              <input
                type="text"
                value={formData.nik}
                onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Nomor Lisensi
              </label>
              <input
                type="text"
                value={formData.nomorLisensi}
                onChange={(e) => setFormData({ ...formData, nomorLisensi: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none font-mono font-semibold text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Nama Lengkap & Gelar
              </label>
              <input
                type="text"
                value={formData.namaLengkap}
                onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none font-semibold text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Status Perkawinan
              </label>
              <select
                value={formData.statusPerkawinan}
                onChange={(e) => setFormData({ ...formData, statusPerkawinan: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none bg-white"
              >
                <option value="Menikah">Menikah</option>
                <option value="Belum Menikah">Belum Menikah</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Jenis Kelamin
              </label>
              <select
                value={formData.jenisKelamin}
                onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none bg-white"
              >
                <option value="Wanita">Wanita</option>
                <option value="Pria">Pria</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Tempat Lahir
              </label>
              <input
                type="text"
                value={formData.tempatLahir}
                onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Tanggal Lahir
              </label>
              <input
                type="text"
                value={formData.tanggalLahir}
                onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none"
                placeholder="25 Maret 1997"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                No. Telepon / HP
              </label>
              <input
                type="text"
                value={formData.telpHp}
                onChange={(e) => setFormData({ ...formData, telpHp: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Wilayah Kerja
              </label>
              <input
                type="text"
                value={formData.wilayahKerja}
                onChange={(e) => setFormData({ ...formData, wilayahKerja: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">
                SK Pengangkatan
              </label>
              <input
                type="text"
                value={formData.skPengangkatan}
                onChange={(e) => setFormData({ ...formData, skPengangkatan: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none font-mono text-[11px]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">
                Alamat Domisili Lengkap
              </label>
              <textarea
                rows={2}
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Status Verifikasi
              </label>
              <select
                value={formData.statusVerifikasi}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    statusVerifikasi: e.target.value as any
                  })
                }
                className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1b431e] outline-none bg-white font-bold text-emerald-700"
              >
                <option value="SUDAH VERIFIKASI">SUDAH VERIFIKASI</option>
                <option value="MENUNGGU VERIFIKASI">MENUNGGU VERIFIKASI</option>
                <option value="BELUM VERIFIKASI">BELUM VERIFIKASI</option>
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-[#0073b7] hover:bg-[#005f99] text-white font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Save size={14} />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
