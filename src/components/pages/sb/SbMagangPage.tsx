import React, { useState } from 'react';
import { RiwayatMagangModel, StatusMagangType } from '../../../types/aplikasiMitra.ts';
import {
  Briefcase,
  Upload,
  FileText,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Building,
  UserCheck,
  AlertCircle,
  ExternalLink,
  Save,
  Plus
} from 'lucide-react';

interface SbMagangPageProps {
  initialMagang: RiwayatMagangModel;
  onSaveMagang: (updated: RiwayatMagangModel) => void;
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const SbMagangPage: React.FC<SbMagangPageProps> = ({
  initialMagang,
  onSaveMagang,
  onAddNotification
}) => {
  const [magang, setMagang] = useState<RiwayatMagangModel>(initialMagang);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    namaInstansi: magang.namaInstansi,
    lokasi: magang.lokasi,
    waktuMulai: magang.waktuMulai,
    waktuSelesai: magang.waktuSelesai,
    deskripsiKegiatan: magang.deskripsiKegiatan,
    pembimbing: magang.pembimbing || '',
    status: magang.status
  });

  const [uploadedFile, setUploadedFile] = useState<string>(magang.suratKeteranganUrl || 'surat_magang_kantah_padang.pdf');
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB.');
        return;
      }
      setUploadedFile(file.name);
      setUploadFeedback(`Berkas "${file.name}" berhasil diunggah.`);
      onAddNotification('Surat keterangan magang berhasil diunggah.', 'success');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: RiwayatMagangModel = {
      ...magang,
      ...formData,
      suratKeteranganUrl: `/dokumen/${uploadedFile}`
    };
    setMagang(updated);
    onSaveMagang(updated);
    setIsEditing(false);
    onAddNotification('Informasi dan riwayat magang berhasil disimpan.', 'success');
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
            <Briefcase className="text-[#0f2e59]" size={22} />
            <span>Praktik Kerja Magang Sebelum Pelantikan</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dokumentasi pelaksanaan magang kadastral di Kantor Pertanahan atau KJSB sebagai syarat mutlak pelantikan surveyor berlisensi.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          {isEditing ? 'Batal Ubah' : 'Edit Data Magang'}
        </button>
      </div>

      {/* Status Magang Tracker Card (3 Status: Belum Magang, Sedang Magang, Selesai) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
          Status Magang Surveyor
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              status: 'Belum Magang' as StatusMagangType,
              desc: 'Belum memulai magang di Kantah/KJSB',
              icon: Clock,
              color: 'border-slate-200 text-slate-600 bg-slate-50'
            },
            {
              status: 'Sedang Magang' as StatusMagangType,
              desc: 'Sedang menjalani praktik magang aktif',
              icon: Clock,
              color: 'border-amber-300 text-amber-900 bg-amber-50'
            },
            {
              status: 'Selesai' as StatusMagangType,
              desc: 'Tuntas & mengantongi SK Magang resmi',
              icon: CheckCircle2,
              color: 'border-emerald-300 text-emerald-950 bg-emerald-50'
            }
          ].map((item, idx) => {
            const isCurrent = magang.status === item.status;
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                  isCurrent
                    ? `${item.color} shadow-sm ring-2 ring-offset-1 ring-blue-500`
                    : 'border-slate-100 bg-white opacity-60'
                }`}
              >
                <div className={`p-2 rounded-lg ${isCurrent ? 'bg-white/80' : 'bg-slate-100'}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-extrabold text-sm">{item.status}</div>
                  <div className="text-[11px] mt-0.5">{item.desc}</div>
                  {isCurrent && (
                    <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-900 font-mono">
                      STATUS SAAT INI
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Detail / Form Magang */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Building className="text-[#0f2e59]" size={17} />
              <span>{isEditing ? 'Formulir Pembaruan Data Magang' : 'Informasi Pelaksanaan Magang'}</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">ID: {magang.id}</span>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Status Pelaksanaan Magang *</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as StatusMagangType })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
                >
                  <option value="Belum Magang">Belum Magang</option>
                  <option value="Sedang Magang">Sedang Magang</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Nama Instansi / Kantor Pertanahan *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kantor Pertanahan Kota Padang"
                  value={formData.namaInstansi}
                  onChange={e => setFormData({ ...formData, namaInstansi: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59]"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Lokasi Instansi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Jl. Bagindo Aziz Chan No. 8, Padang"
                  value={formData.lokasi}
                  onChange={e => setFormData({ ...formData, lokasi: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Waktu Mulai Magang *</label>
                  <input
                    type="text"
                    required
                    placeholder="01 Juli 2024"
                    value={formData.waktuMulai}
                    onChange={e => setFormData({ ...formData, waktuMulai: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Waktu Selesai Magang *</label>
                  <input
                    type="text"
                    required
                    placeholder="31 Desember 2024"
                    value={formData.waktuSelesai}
                    onChange={e => setFormData({ ...formData, waktuSelesai: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Nama Pembimbing / Pejabat Kantah</label>
                <input
                  type="text"
                  placeholder="Contoh: Ir. Hendri Chaniago, M.Si. (Kasi Survei)"
                  value={formData.pembimbing}
                  onChange={e => setFormData({ ...formData, pembimbing: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Deskripsi Kegiatan Magang *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan jenis kegiatan pengukuran kadaster yang dilakukan..."
                  value={formData.deskripsiKegiatan}
                  onChange={e => setFormData({ ...formData, deskripsiKegiatan: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Save size={15} />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block mb-0.5">Tempat Magang:</span>
                <span className="font-bold text-slate-900 text-sm">{magang.namaInstansi}</span>
                <div className="flex items-center gap-1.5 text-slate-600 mt-1">
                  <MapPin size={13} className="text-slate-400" />
                  <span>{magang.lokasi}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Waktu Pelaksanaan:</span>
                  <span className="font-semibold text-slate-900 font-mono">
                    {magang.waktuMulai} — {magang.waktuSelesai}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 block">Pembimbing Lapangan:</span>
                  <span className="font-semibold text-slate-900">
                    {magang.pembimbing || 'Pejabat Seksi Survei & Pemetaan'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[11px] text-slate-500 block font-semibold">Deskripsi Kegiatan Magang:</span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{magang.deskripsiKegiatan}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Unggah Surat Keterangan Magang & Timeline Card */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card Unggah Dokumen SK Magang */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
              <FileText className="text-[#0f2e59]" size={16} />
              <span>Surat Keterangan Magang (PDF)</span>
            </h3>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Surat Keterangan Magang bertanda tangan Kepala Kantor Pertanahan / Pimpinan KJSB. Wajib diunggah sebelum proses pelantikan surveyor.
            </p>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs shrink-0">
                  PDF
                </div>
                <div className="truncate">
                  <span className="font-bold text-slate-900 text-xs block truncate">{uploadedFile}</span>
                  <span className="text-[10px] text-slate-400">Terverifikasi Resmi</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Membuka berkas: ${uploadedFile}`)}
                className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold shrink-0"
              >
                Lihat
              </button>
            </div>

            <div className="pt-2">
              <label className="font-semibold text-slate-700 block text-xs mb-1">Unggah Dokumen Baru (PDF maks 5MB)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0f2e59] file:text-white cursor-pointer"
              />
            </div>

            {uploadFeedback && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                <span>{uploadFeedback}</span>
              </div>
            )}
          </div>

          {/* Timeline Card Magang */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
              Alur Verifikasi Magang Menuju Pelantikan
            </h4>

            <div className="relative pl-6 space-y-4 text-xs border-l-2 border-slate-200 ml-2">
              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                <div className="font-bold text-slate-900">1. Penempatan Magang</div>
                <div className="text-[11px] text-slate-500">Mendapat persetujuan di Kantah Padang</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                <div className="font-bold text-slate-900">2. Penyelesaian Masa Praktik</div>
                <div className="text-[11px] text-slate-500">6 Bulan survei lapangan kadaster tuntas</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                <div className="font-bold text-slate-900">3. Penerbitan Surat Keterangan Magang</div>
                <div className="text-[11px] text-slate-500">Diterbitkan oleh Kepala Kantor Pertanahan</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="font-bold text-slate-900">4. Siap untuk Pelantikan & Sumpah Profesi</div>
                <div className="text-[11px] text-slate-500">Memenuhi syarat Berita Acara Pelantikan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
