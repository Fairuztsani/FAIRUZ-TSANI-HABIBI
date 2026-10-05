import React, { useState } from 'react';
import { Surveyor, KualifikasiSurveyor } from '../../types/index.ts';
import { Modal } from '../common/Modal.tsx';
import { WILAYAH_LIST } from '../../data/dummyData.ts';
import { UserPlus, AlertCircle } from 'lucide-react';

interface AddSurveyorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSurveyor: (surveyor: Partial<Surveyor>) => void;
}

export const AddSurveyorModal: React.FC<AddSurveyorModalProps> = ({
  isOpen,
  onClose,
  onAddSurveyor
}) => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    gelar: 'S.T.',
    nik: '',
    tempatLahir: '',
    tanggalLahir: '',
    alamat: '',
    email: '',
    telepon: '',
    kualifikasi: 'Surveyor Kadaster' as KualifikasiSurveyor,
    wilayahKerja: WILAYAH_LIST[1],
    kantorPertanahan: 'Kantor Pertanahan Kota Terkait',
    bentukUsaha: 'Perorangan' as 'Perorangan' | 'Kantor Jasa Surveyor Berlisensi (KJSB)',
    namaKJSB: '',
    nomorLisensi: '',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)'
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.namaLengkap.trim()) {
      setError('Nama lengkap surveyor wajib diisi.');
      return;
    }
    if (!formData.nik.trim() || formData.nik.length < 16) {
      setError('NIK harus berjumlah 16 digit angka.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Email surveyor tidak valid.');
      return;
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const generatedLic = formData.nomorLisensi.trim() 
      ? formData.nomorLisensi 
      : `${formData.kualifikasi === 'Surveyor Kadaster' ? 'SKB' : 'ASKB'}-SPPR/2026/${randomNum}`;

    onAddSurveyor({
      ...formData,
      nomorLisensi: generatedLic,
      tanggalTerbit: '04 Oktober 2026',
      tanggalBerakhir: '04 Oktober 2031',
      statusLisensi: 'Aktif',
      dokumen: [
        {
          id: `DOK-NEW-${Date.now()}-KTP`,
          jenis: 'KTP',
          namaFile: `KTP_${formData.namaLengkap.replace(/\s+/g, '_')}.pdf`,
          nomorDokumen: formData.nik,
          ukuran: '1.2 MB',
          tanggalUpload: '04 Oktober 2026',
          statusVerifikasi: 'Sesuai'
        },
        {
          id: `DOK-NEW-${Date.now()}-LIS`,
          jenis: 'Dokumen Lisensi',
          namaFile: `SK_Lisensi_${generatedLic.replace(/\//g, '_')}.pdf`,
          nomorDokumen: generatedLic,
          ukuran: '2.8 MB',
          tanggalUpload: '04 Oktober 2026',
          statusVerifikasi: 'Sesuai'
        }
      ]
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tambah Surveyor Berlisensi Baru"
      subtitle="Registrasi data mitra surveyor ke pangkalan data Ditjen SPPR Kementerian ATR/BPN"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap (Tanpa Gelar) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Muhammad Rizki"
              value={formData.namaLengkap}
              onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gelar Akademik
            </label>
            <input
              type="text"
              placeholder="Contoh: S.T., M.Sc."
              value={formData.gelar}
              onChange={(e) => setFormData({ ...formData, gelar: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor Induk Kependudukan (NIK) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              maxLength={16}
              required
              placeholder="16 digit angka NIK KTP"
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tempat Lahir
            </label>
            <input
              type="text"
              placeholder="Kota Tempat Lahir"
              value={formData.tempatLahir}
              onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tanggal Lahir
            </label>
            <input
              type="text"
              placeholder="Contoh: 14 Mei 1990"
              value={formData.tanggalLahir}
              onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Aktif <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="surveyor@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="text"
              placeholder="0812-xxxx-xxxx"
              value={formData.telepon}
              onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Lengkap Domisili
            </label>
            <textarea
              rows={2}
              placeholder="Alamat jalan, kelurahan, kecamatan, kota/kabupaten..."
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kualifikasi Surveyor
            </label>
            <select
              value={formData.kualifikasi}
              onChange={(e) => setFormData({ ...formData, kualifikasi: e.target.value as KualifikasiSurveyor })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:border-[#0f2e59] outline-none"
            >
              <option value="Surveyor Kadaster">Surveyor Kadaster (SK)</option>
              <option value="Asisten Surveyor Kadaster">Asisten Surveyor Kadaster (ASK)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Wilayah Kerja (Kantor Wilayah BPN)
            </label>
            <select
              value={formData.wilayahKerja}
              onChange={(e) => setFormData({ ...formData, wilayahKerja: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:border-[#0f2e59] outline-none"
            >
              {WILAYAH_LIST.filter(w => w !== 'Semua Wilayah').map((wil) => (
                <option key={wil} value={wil}>{wil}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Bentuk Praktik Usaha
            </label>
            <select
              value={formData.bentukUsaha}
              onChange={(e) => setFormData({ ...formData, bentukUsaha: e.target.value as any })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:border-[#0f2e59] outline-none"
            >
              <option value="Perorangan">Perorangan</option>
              <option value="Kantor Jasa Surveyor Berlisensi (KJSB)">Kantor Jasa Surveyor Berlisensi (KJSB)</option>
            </select>
          </div>

          {formData.bentukUsaha === 'Kantor Jasa Surveyor Berlisensi (KJSB)' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Kantor KJSB
              </label>
              <input
                type="text"
                placeholder="Contoh: KJSB Surveyor Nusantara Mandiri"
                value={formData.namaKJSB}
                onChange={(e) => setFormData({ ...formData, namaKJSB: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Asosiasi Profesi
            </label>
            <input
              type="text"
              placeholder="Ikatan Surveyor Indonesia (ISI)"
              value={formData.asosiasiProfesi}
              onChange={(e) => setFormData({ ...formData, asosiasiProfesi: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor Lisensi (Opsional - Dibuat Otomatis jika Kosong)
            </label>
            <input
              type="text"
              placeholder="Contoh: 102-SKB-SPPR/2026"
              value={formData.nomorLisensi}
              onChange={(e) => setFormData({ ...formData, nomorLisensi: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:border-[#0f2e59] outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#0f2e59] hover:bg-[#16396b] rounded-lg transition-colors shadow-xs"
          >
            <UserPlus size={14} />
            <span>Simpan Data Surveyor</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
