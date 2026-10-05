import React, { useState } from 'react';
import {
  SurveyorModel,
  LisensiModel,
  PengajuanPindahWilayahModel
} from '../../../types/aplikasiMitra.ts';
import {
  Compass,
  MapPin,
  Upload,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Send,
  Download,
  Building
} from 'lucide-react';

interface SbPindahWilayahPageProps {
  surveyor: SurveyorModel;
  lisensi: LisensiModel;
  mutasiList: PengajuanPindahWilayahModel[];
  onSubmitMutasi: (data: {
    wilayahTujuan: string;
    alasanPindah: string;
    kjsbTujuan: string;
    dokumenRekomendasi: string;
  }) => void;
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const SbPindahWilayahPage: React.FC<SbPindahWilayahPageProps> = ({
  surveyor,
  lisensi,
  mutasiList,
  onSubmitMutasi,
  onAddNotification
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    wilayahTujuan: 'Riau',
    kjsbTujuan: '',
    alasanPindah: '',
    dokumenName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const daftarKanwil = [
    'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau',
    'Jambi', 'Sumatera Selatan', 'Bengkulu', 'Lampung', 'Kepulauan Bangka Belitung',
    'DKI Jakarta', 'Jawa Barat', 'Banten', 'Jawa Tengah', 'D.I. Yogyakarta',
    'Jawa Timur', 'Bali', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
    'Kalimantan Barat', 'Kalimantan Tengah', 'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara',
    'Sulawesi Utara', 'Gorontalo', 'Sulawesi Tengah', 'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tenggara',
    'Maluku', 'Maluku Utara', 'Papua', 'Papua Barat'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.alasanPindah) {
      alert('Harap masukkan alasan kepindahan wilayah kerja.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitMutasi({
        wilayahTujuan: formData.wilayahTujuan,
        alasanPindah: formData.alasanPindah,
        kjsbTujuan: formData.kjsbTujuan,
        dokumenRekomendasi: formData.dokumenName || 'Surat_Rekomendasi_Kanwil.pdf'
      });
      setIsSubmitting(false);
      setIsFormOpen(false);
      setFormData({
        wilayahTujuan: 'Riau',
        kjsbTujuan: '',
        alasanPindah: '',
        dokumenName: ''
      });
      onAddNotification('Permohonan pindah wilayah kerja berhasil diajukan untuk verifikasi.', 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px] uppercase font-mono mb-1">
            Menu Baru — Perancangan Aplikasi Mitra
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="text-[#0f2e59]" size={22} />
            <span>Permohonan Pindah Wilayah Kerja Surveyor</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pengajuan mutasi wilayah operasional antar Kantor Wilayah BPN Provinsi sesuai ketentuan Permen ATR/BPN No. 9 Tahun 2026.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto flex items-center gap-2"
        >
          <Compass size={15} />
          <span>{isFormOpen ? 'Tutup Formulir' : 'Ajukan Pindah Wilayah'}</span>
        </button>
      </div>

      {/* Info Status Wilayah Kerja Saat Ini */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
          Wilayah Kerja Aktif Saat Ini
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-500 text-[11px] block">Wilayah Operasional:</span>
            <span className="font-extrabold text-slate-900 text-base">{surveyor.wilayahKerja}</span>
            <span className="text-[10px] text-slate-400 block">Kanwil BPN Penetapan Pertama</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-500 text-[11px] block">Nomor Lisensi Surveyor:</span>
            <span className="font-mono font-extrabold text-[#0f2e59] text-base">{lisensi.nomorLisensi}</span>
            <span className="text-[10px] text-slate-400 block">Berlaku s/d {lisensi.tanggalBerakhir}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-500 text-[11px] block">Afiliasi KJSB Saat Ini:</span>
            <span className="font-bold text-slate-800 text-xs">KJSB Pratama Geodesi Nusantara</span>
            <span className="text-[10px] text-emerald-700 font-semibold block">● Status Afiliasi Aktif</span>
          </div>
        </div>
      </div>

      {/* FORMULIR PENGAJUAN PINDAH WILAYAH KERJA (Sesuai Halaman 3 Usulan Pengembangan PDF) */}
      {isFormOpen && (
        <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 sm:p-7 shadow-md space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Send className="text-[#0f2e59]" size={16} />
                <span>Formulir Pengajuan Pindah Wilayah Kerja Baru</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pastikan Anda telah memiliki rekomendasi dari Kanwil BPN asal dan tujuan.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Wilayah Kerja Asal</label>
                <input
                  type="text"
                  disabled
                  value={surveyor.wilayahKerja}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Wilayah Kerja Tujuan (Kanwil BPN) *</label>
                <select
                  value={formData.wilayahTujuan}
                  onChange={e => setFormData({ ...formData, wilayahTujuan: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 bg-white"
                >
                  {daftarKanwil
                    .filter(w => w !== surveyor.wilayahKerja)
                    .map(k => (
                      <option key={k} value={k}>
                        Kanwil BPN Provinsi {k}
                      </option>
                    ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">KJSB Tujuan di Wilayah Baru (Opsional / Perorangan)</label>
                <input
                  type="text"
                  placeholder="Contoh: KJSB Riau Geospasial Mandiri / Praktik Perorangan"
                  value={formData.kjsbTujuan}
                  onChange={e => setFormData({ ...formData, kjsbTujuan: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0f2e59]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Alasan Kepindahan Wilayah Kerja *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Uraikan alasan kepindahan, misalnya pembukaan kantor cabang, penugasan proyek strategis nasional, atau domisili..."
                  value={formData.alasanPindah}
                  onChange={e => setFormData({ ...formData, alasanPindah: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-[#0f2e59]"
                />
              </div>

              {/* Unggah Dokumen Persyaratan (PDF) */}
              <div className="sm:col-span-2 space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="text-slate-800 font-bold block">
                  Unggah Dokumen Rekomendasi Kanwil (PDF maks 5MB) *
                </label>
                <p className="text-[11px] text-slate-500">
                  Surat Rekomendasi dari Kantor Wilayah BPN Asal dan Surat Kesiapan Penerimaan dari Kanwil BPN Tujuan.
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) setFormData({ ...formData, dokumenName: f.name });
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#0f2e59] file:text-white cursor-pointer"
                />
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
                className="px-5 py-2.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan Pindah Wilayah'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Riwayat Pengajuan Pindah Wilayah Kerja */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm">
          Riwayat Pengajuan Pindah Wilayah Kerja & Status Verifikasi
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">No. Pengajuan</th>
                <th className="py-3 px-3">Tanggal</th>
                <th className="py-3 px-3">Wilayah Asal</th>
                <th className="py-3 px-3">Wilayah Tujuan</th>
                <th className="py-3 px-4">Alasan Kepindahan</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4">Catatan Verifikator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mutasiList.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-[#0f2e59]">{item.id}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-600">{item.tanggalPengajuan}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700">{item.wilayahAsal}</td>
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
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                    {item.catatanVerifikator || 'Sedang dalam proses verifikasi berkas oleh Ditjen SPPR'}
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
