import React, { useState } from 'react';
import {
  SurveyorModel,
  PengajuanPerubahanDataModel
} from '../../../types/aplikasiMitra.ts';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  FileText,
  Upload,
  User,
  ShieldCheck,
  BellRing,
  RotateCcw,
  Check,
  ExternalLink
} from 'lucide-react';

interface SbValidasiPageProps {
  surveyor: SurveyorModel;
  perubahanList: PengajuanPerubahanDataModel[];
  onSubmitPerubahan: (data: {
    dataLama: string;
    dataBaru: string;
    alasanPerubahan: string;
    dokumen: string;
  }) => void;
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const SbValidasiPage: React.FC<SbValidasiPageProps> = ({
  surveyor,
  perubahanList,
  onSubmitPerubahan,
  onAddNotification
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fieldTarget: 'Alamat Domisili',
    dataLama: surveyor.alamat,
    dataBaru: '',
    alasan: '',
    dokumenName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dataBaru || !formData.alasan) {
      alert('Harap isi data baru dan alasan pengajuan perubahan.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitPerubahan({
        dataLama: `${formData.fieldTarget}: ${formData.dataLama}`,
        dataBaru: `${formData.fieldTarget}: ${formData.dataBaru}`,
        alasanPerubahan: formData.alasan,
        dokumen: formData.dokumenName || 'Surat_Keterangan_Pendukung.pdf'
      });
      setIsSubmitting(false);
      setIsFormOpen(false);
      setFormData({
        fieldTarget: 'Alamat Domisili',
        dataLama: surveyor.alamat,
        dataBaru: '',
        alasan: '',
        dokumenName: ''
      });
      onAddNotification('Permohonan perubahan data berhasil dikirim. Notifikasi otomatis telah diteruskan ke Panitia/Verifikator!', 'success');
    }, 600);
  };

  const handleFieldChange = (field: string) => {
    let currentVal = '';
    if (field === 'Alamat Domisili') currentVal = surveyor.alamat;
    if (field === 'Nomor Telepon') currentVal = surveyor.telepon;
    if (field === 'Email Resmi') currentVal = surveyor.email;
    if (field === 'Nama / Gelar') currentVal = surveyor.namaLengkap;

    setFormData({
      ...formData,
      fieldTarget: field,
      dataLama: currentVal,
      dataBaru: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 className="text-emerald-600" size={22} />
            <span>Validasi Data Surveyor & Pengajuan Perubahan</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pemeriksaan keabsahan biodata terintegrasi serta pengajuan pembaruan data dengan notifikasi otomatis ke verifikator kementerian.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto flex items-center gap-2"
        >
          <RotateCcw size={14} />
          <span>{isFormOpen ? 'Tutup Formulir' : 'Ajukan Perubahan Data'}</span>
        </button>
      </div>

      {/* Status Utama Validasi (Menyempurnakan Gambar A.6 Halaman 9 PDF) */}
      <div className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-400 bg-emerald-50/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 size={28} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-emerald-950 text-base">
                ✓ ANDA TELAH VALIDASI DATA
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-mono text-[10px] font-bold">
                STATUS: VALID
              </span>
            </div>
            <p className="text-emerald-900 text-xs leading-relaxed max-w-2xl">
              Seluruh data biodata profil, riwayat mutasi/pengangkatan, dan pendidikan formal Anda telah diverifikasi oleh Verifikator Direktorat Jenderal SPPR.
            </p>
            <div className="text-[11px] text-emerald-800 font-medium pt-1">
              Terakhir Divalidasi: <strong>03 Oktober 2026</strong> • Verifikator: <strong>Fairuz Tsani Habibi, S.Kom.</strong>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <BellRing size={14} className="text-emerald-600" />
            <span>Notifikasi Otomatis Aktif</span>
          </span>
          <span className="text-[10px] text-emerald-700">Verifikator otomatis terberitahu</span>
        </div>
      </div>

      {/* FORM PENGAJUAN PERUBAHAN DATA (Solusi Usulan Pengembangan Halaman 3 PDF) */}
      {isFormOpen && (
        <div className="bg-white rounded-2xl border-2 border-blue-400 p-6 sm:p-7 shadow-md space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Send className="text-[#0f2e59]" size={16} />
                <span>Formulir Pengajuan Perubahan Data (Status: Unverifikasi Baru)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pengajuan perubahan data akan dikirim langsung ke dashboard Panitia/Verifikator beserta notifikasi otomatis.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Pilih Elemen Data yang Ingin Diubah *</label>
                <select
                  value={formData.fieldTarget}
                  onChange={e => handleFieldChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 bg-white"
                >
                  <option value="Alamat Domisili">Alamat Domisili</option>
                  <option value="Nomor Telepon">Nomor Telepon / WhatsApp</option>
                  <option value="Email Resmi">Email Resmi</option>
                  <option value="Nama / Gelar">Nama Lengkap & Gelar Akademik</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 font-medium block mb-1">Nilai Data Lama (Database Saat Ini)</label>
                <input
                  type="text"
                  disabled
                  value={formData.dataLama}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Nilai Data Baru yang Diusulkan *</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan data baru yang benar..."
                  value={formData.dataBaru}
                  onChange={e => setFormData({ ...formData, dataBaru: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0f2e59] font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Alasan Perubahan Data *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan alasan mendasar perubahan data tersebut..."
                  value={formData.alasan}
                  onChange={e => setFormData({ ...formData, alasan: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0f2e59]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Dokumen Pendukung Perubahan (PDF maks 2MB)</label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) setFormData({ ...formData, dokumenName: f.name });
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0f2e59] file:text-white cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Unggah bukti pendukung seperti Surat Domisili, KTP baru, atau Ijazah/Sertifikat.
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Permohonan & Beritahu Verifikator'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ringkasan Data yang Divalidasi (Gambar A.6 PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-sm">
            Ringkasan Berkas Validasi Biodata Terdaftar
          </h3>
          <p className="text-xs text-slate-500">
            Seluruh data di bawah ini terkunci dan telah berstatus valid. Perubahan wajib melalui pengajuan verifikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">NIK:</span>
            <span className="font-mono font-bold text-slate-900">{surveyor.nik}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Nama Lengkap:</span>
            <span className="font-bold text-slate-900">{surveyor.namaLengkap}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Tempat, Tanggal Lahir:</span>
            <span className="text-slate-800">{surveyor.tempatLahir}, {surveyor.tanggalLahir}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Jenis Kelamin:</span>
            <span className="text-slate-800">{surveyor.jenisKelamin}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Nomor Registrasi:</span>
            <span className="font-mono font-bold text-[#0f2e59]">{surveyor.nomorRegistrasi}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Wilayah Kerja:</span>
            <span className="font-bold text-slate-900">{surveyor.wilayahKerja}</span>
          </div>
          <div className="md:col-span-2 flex justify-between py-1.5 border-b border-slate-100">
            <span className="text-slate-500">Alamat:</span>
            <span className="text-slate-800 text-right">{surveyor.alamat}</span>
          </div>
        </div>
      </div>

      {/* Riwayat Pengajuan Perubahan Data (Audit Trail) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm">
          Riwayat Pengajuan Perubahan Data & Verifikasi
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">No. Pengajuan</th>
                <th className="py-3 px-3">Tanggal</th>
                <th className="py-3 px-4">Uraian Perubahan Data</th>
                <th className="py-3 px-4">Alasan</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4">Catatan Verifikator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {perubahanList.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#0f2e59]">{item.id}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{item.tanggalPengajuan}</td>
                  <td className="py-3.5 px-4">
                    <div className="text-[11px] text-slate-400 line-through">{item.dataLama}</div>
                    <div className="text-xs font-bold text-emerald-800">{item.dataBaru}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{item.alasanPerubahan}</td>
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
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                    {item.catatanVerifikator || 'Sedang dalam antrean verifikasi'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
