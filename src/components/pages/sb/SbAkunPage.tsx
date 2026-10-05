import React, { useState } from 'react';
import {
  SurveyorModel,
  LisensiModel,
  RiwayatPekerjaanModel,
  KjsbModel,
  AsosiasiProfesiModel
} from '../../../types/aplikasiMitra.ts';
import { KartuLisensiDigital } from '../../common/KartuLisensiDigital.tsx';
import {
  User,
  FileText,
  Briefcase,
  Building,
  Award,
  Upload,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Save,
  Image as ImageIcon,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

interface SbAkunPageProps {
  surveyor: SurveyorModel;
  lisensi: LisensiModel;
  pekerjaanList: RiwayatPekerjaanModel[];
  kjsb: KjsbModel;
  asosiasi: AsosiasiProfesiModel;
  onUpdateSurveyor: (updated: Partial<SurveyorModel>) => void;
  onAddPekerjaan: (job: Omit<RiwayatPekerjaanModel, 'id' | 'surveyorId'>) => void;
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const SbAkunPage: React.FC<SbAkunPageProps> = ({
  surveyor,
  lisensi,
  pekerjaanList,
  kjsb,
  asosiasi,
  onUpdateSurveyor,
  onAddPekerjaan,
  onAddNotification
}) => {
  const [activeTab, setActiveTab] = useState<'pribadi' | 'dokumen' | 'pekerjaan' | 'kjsb' | 'asosiasi'>('pribadi');

  // Tab 1 Data Pribadi Form State
  const [formData, setFormData] = useState({
    namaLengkap: surveyor.namaLengkap,
    tempatLahir: surveyor.tempatLahir,
    tanggalLahir: surveyor.tanggalLahir,
    jenisKelamin: surveyor.jenisKelamin,
    statusPerkawinan: surveyor.statusPerkawinan,
    email: surveyor.email,
    telepon: surveyor.telepon,
    alamat: surveyor.alamat,
    wilayahKerja: surveyor.wilayahKerja
  });

  // Tab 2 Pas Foto Validation State (Sesuai Usulan Pengembangan Bagian 3 & 5 PDF)
  const [pasFotoFile, setPasFotoFile] = useState<File | null>(null);
  const [pasFotoPreview, setPasFotoPreview] = useState<string | null>(surveyor.pasFotoUrl || null);
  const [pasFotoError, setPasFotoError] = useState<string | null>(null);
  const [pasFotoSuccess, setPasFotoSuccess] = useState<string | null>(null);

  // Tab 3 Modal Tambah Pekerjaan
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    jenisPekerjaan: '',
    jenisKontrak: 'Kontrak Pemerintah (PTSL)' as RiwayatPekerjaanModel['jenisKontrak'],
    instansiPerusahaan: '',
    lokasi: '',
    periodeMulai: '',
    periodeSelesai: '',
    status: 'Selesai' as 'Selesai' | 'Sedang Berjalan'
  });

  // Tab 5 Asosiasi Upload State
  const [isUploadingAsosiasi, setIsUploadingAsosiasi] = useState(false);

  // Handle Pas Foto Upload with Strict Size & Format Validation (< 2MB, JPG/PNG)
  const handlePasFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPasFotoError(null);
    setPasFotoSuccess(null);

    if (!file) return;

    // 1. Validasi Format
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setPasFotoError('Format file tidak didukung. Harap unggah foto dalam format JPG atau PNG.');
      return;
    }

    // 2. Validasi Ukuran (Maksimal 2MB = 2 * 1024 * 1024 byte)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setPasFotoError(`Ukuran file (${(file.size / (1024 * 1024)).toFixed(2)} MB) melebihi batas maksimal 2.00 MB.`);
      return;
    }

    // Preview creation
    const reader = new FileReader();
    reader.onloadend = () => {
      setPasFotoPreview(reader.result as string);
      setPasFotoFile(file);
      setPasFotoSuccess(`Pas foto "${file.name}" (${(file.size / 1024).toFixed(0)} KB) memenuhi syarat validasi ukuran.`);
      onAddNotification('Pas foto baru berhasil divalidasi dan siap disimpan.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleSavePribadi = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSurveyor(formData);
    onAddNotification('Perubahan data pribadi berhasil disimpan.', 'success');
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.jenisPekerjaan || !newJob.instansiPerusahaan) {
      alert('Harap lengkapi nama pekerjaan dan instansi/perusahaan.');
      return;
    }
    onAddPekerjaan(newJob);
    setIsAddJobOpen(false);
    setNewJob({
      jenisPekerjaan: '',
      jenisKontrak: 'Kontrak Pemerintah (PTSL)',
      instansiPerusahaan: '',
      lokasi: '',
      periodeMulai: '',
      periodeSelesai: '',
      status: 'Selesai'
    });
    onAddNotification('Riwayat pekerjaan baru berhasil ditambahkan.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <User className="text-[#0f2e59]" size={22} />
            <span>Akun Saya — Surveyor Berlisensi</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pengelolaan identitas pribadi, berkas legalitas, riwayat pekerjaan, KJSB, dan keanggotaan asosiasi profesi.
          </p>
        </div>
      </div>

      {/* Tabs Navigation (5 Tabs sesuai Usulan Pengembangan PDF Bagian 3 & 5) */}
      <div className="flex overflow-x-auto border-b border-slate-200 gap-1 bg-white p-1.5 rounded-2xl shadow-2xs">
        {[
          { id: 'pribadi', label: 'Tab 1 — Data Pribadi', icon: User },
          { id: 'dokumen', label: 'Tab 2 — Dokumen & Pas Foto', icon: FileText },
          { id: 'pekerjaan', label: 'Tab 3 — Riwayat Pekerjaan', icon: Briefcase },
          { id: 'kjsb', label: 'Tab 4 — KJSB', icon: Building },
          { id: 'asosiasi', label: 'Tab 5 — Asosiasi Profesi', icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#0f2e59] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: DATA PRIBADI */}
      {/* ========================================================= */}
      {activeTab === 'pribadi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Formulir Data Pribadi Surveyor</h3>
                <p className="text-xs text-slate-500">Pastikan seluruh data sesuai dengan KTP elektronik dan SK Pengangkatan.</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                Terverifikasi Valid
              </span>
            </div>

            <form onSubmit={handleSavePribadi} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Nomor Induk Kependudukan (NIK)</label>
                  <input
                    type="text"
                    disabled
                    value={surveyor.nik}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-slate-700"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">NIK terkunci sesuai database Dukcapil/ATR</span>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    value={formData.namaLengkap}
                    onChange={e => setFormData({ ...formData, namaLengkap: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={e => setFormData({ ...formData, tempatLahir: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Tanggal Lahir</label>
                  <input
                    type="text"
                    value={formData.tanggalLahir}
                    onChange={e => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={e => setFormData({ ...formData, jenisKelamin: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] text-slate-800 bg-white"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Status Perkawinan</label>
                  <select
                    value={formData.statusPerkawinan}
                    onChange={e => setFormData({ ...formData, statusPerkawinan: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] text-slate-800 bg-white"
                  >
                    <option value="Menikah">Menikah</option>
                    <option value="Belum Menikah">Belum Menikah</option>
                    <option value="Cerai">Cerai</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] font-mono text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Nomor Telepon / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.telepon}
                    onChange={e => setFormData({ ...formData, telepon: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] font-mono text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-600 font-semibold block mb-1">Alamat Domisili Lengkap</label>
                  <textarea
                    rows={2}
                    value={formData.alamat}
                    onChange={e => setFormData({ ...formData, alamat: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59] text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-600 font-semibold block mb-1">Wilayah Kerja Lisensi</label>
                  <input
                    type="text"
                    disabled
                    value={formData.wilayahKerja}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Untuk mengubah wilayah kerja, silakan ajukan melalui menu <strong>Pindah Wilayah Kerja</strong>.
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Save size={15} />
                  <span>Simpan Perubahan Data Pribadi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Samping: Pratinjau Kartu Lisensi Digital Kontras Tinggi (Section 3 & 4 PDF) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <ShieldCheck className="text-amber-500" size={16} />
                <span>Kartu Lisensi Digital Resmi (High Contrast)</span>
              </h3>
              <KartuLisensiDigital surveyor={surveyor} lisensi={lisensi} />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Desain kartu lisensi telah disempurnakan dengan rasio kontras tinggi, QR code verifikasi dinas, dan barcode identifikasi surveyor kadaster.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: DOKUMEN & PAS FOTO */}
      {/* ========================================================= */}
      {activeTab === 'dokumen' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bagian Validasi Pas Foto (Sesuai Halaman 3 & 8 PDF) */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <ImageIcon className="text-[#0f2e59]" size={17} />
                <span>Unggah & Validasi Ukuran Pas Foto</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sistem menerapkan validasi ukuran file pas foto secara ketat sebelum disimpan.
              </p>
            </div>

            {/* Syarat Pas Foto Box */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1.5 text-blue-950">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-blue-700" />
                Ketentuan Validasi Pas Foto:
              </span>
              <ul className="list-disc list-inside text-[11px] text-blue-900 space-y-0.5">
                <li>Ukuran file maksimal: <strong>2.00 MB</strong> (2048 KB).</li>
                <li>Format file yang diizinkan: <strong>JPG, JPEG, atau PNG</strong>.</li>
                <li>Latar belakang (background) resmi berwarna <strong>Merah</strong> polos.</li>
                <li>Pakaian formal (kemeja putih / berdasi / blazer gelap).</li>
              </ul>
            </div>

            {/* Error / Success Feedback */}
            {pasFotoError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                <span>{pasFotoError}</span>
              </div>
            )}
            {pasFotoSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{pasFotoSuccess}</span>
              </div>
            )}

            {/* Photo Preview & Input Control */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="relative w-32 h-40 rounded-xl bg-slate-200 border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center shadow-xs shrink-0">
                {pasFotoPreview ? (
                  <img src={pasFotoPreview} alt="Pas Foto Surveyor" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2 text-slate-400">
                    <User size={36} className="mx-auto mb-1 text-slate-300" />
                    <span className="text-[10px] block">Belum ada foto</span>
                  </div>
                )}
                <div className="absolute top-1 right-1 bg-slate-900/70 text-white text-[9px] font-mono px-1.5 py-0.2 rounded">
                  4 x 6
                </div>
              </div>

              <div className="space-y-3 flex-1 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Pilih Berkas Pas Foto Baru</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handlePasFotoChange}
                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0f2e59] file:text-white hover:file:bg-[#163e75] cursor-pointer"
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Foto ini akan digunakan pada Kartu Lisensi Digital dan lembar Cetak Biodata resmi.
                </p>
              </div>
            </div>
          </div>

          {/* Dokumen Legalitas KTP & NPWP */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <FileText className="text-[#0f2e59]" size={17} />
                <span>Dokumen KTP & NPWP Surveyor</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dokumen identitas kependudukan dan perpajakan surveyor yang terdaftar di Ditjen SPPR.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                    KTP
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Kartu Tanda Penduduk (e-KTP)</h4>
                    <p className="text-slate-500 text-[11px] font-mono">NIK: {surveyor.nik}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 size={12} /> Terverifikasi Dukcapil
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Membuka dokumen e-KTP ${surveyor.namaLengkap}`)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <ExternalLink size={13} />
                  <span>Lihat File</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
                    NPWP
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Nomor Pokok Wajib Pajak (NPWP)</h4>
                    <p className="text-slate-500 text-[11px] font-mono">No: {surveyor.npwp}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                      <CheckCircle2 size={12} /> Status Valid Ditjen Pajak
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Membuka dokumen NPWP ${surveyor.npwp}`)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <ExternalLink size={13} />
                  <span>Lihat File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: RIWAYAT PEKERJAAN (KONTRAK / SWAKELOLA) */}
      {/* ========================================================= */}
      {activeTab === 'pekerjaan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Briefcase className="text-[#0f2e59]" size={17} />
                <span>Riwayat Pekerjaan Surveyor (Kontrak / Swakelola)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Catatan portofolio pekerjaan survei kadastral, PTSL, pengadaan tanah, dan pemetaan tematik.
              </p>
            </div>

            <button
              onClick={() => setIsAddJobOpen(true)}
              className="px-4 py-2.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Plus size={16} />
              <span>Tambah Riwayat Pekerjaan</span>
            </button>
          </div>

          {/* Table Riwayat Pekerjaan */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 w-10 text-center">No</th>
                  <th className="py-3 px-4">Jenis Pekerjaan</th>
                  <th className="py-3 px-3">Jenis Kontrak</th>
                  <th className="py-3 px-4">Instansi / Perusahaan</th>
                  <th className="py-3 px-3">Lokasi</th>
                  <th className="py-3 px-3">Periode</th>
                  <th className="py-3 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pekerjaanList.map((job, idx) => (
                  <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{job.jenisPekerjaan}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md font-semibold text-[10px] bg-slate-100 text-slate-700">
                        {job.jenisKontrak}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{job.instansiPerusahaan}</td>
                    <td className="py-3.5 px-3 text-slate-600">{job.lokasi}</td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-600">
                      {job.periodeMulai} — {job.periodeSelesai}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        job.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Tambah Riwayat Pekerjaan */}
          {isAddJobOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-extrabold text-slate-900 text-sm">Tambah Riwayat Pekerjaan Baru</h4>
                  <button
                    onClick={() => setIsAddJobOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs">
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Nama / Jenis Pekerjaan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Pengukuran Bidang Tanah PTSL 2026"
                      value={newJob.jenisPekerjaan}
                      onChange={e => setNewJob({ ...newJob, jenisPekerjaan: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0f2e59]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Jenis Kontrak</label>
                      <select
                        value={newJob.jenisKontrak}
                        onChange={e => setNewJob({ ...newJob, jenisKontrak: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Kontrak Pemerintah (PTSL)">Kontrak Pemerintah (PTSL)</option>
                        <option value="Proyek Swasta">Proyek Swasta</option>
                        <option value="Konsultansi">Konsultansi</option>
                        <option value="Mandiri">Mandiri</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Status Proyek</label>
                      <select
                        value={newJob.status}
                        onChange={e => setNewJob({ ...newJob, status: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Selesai">Selesai</option>
                        <option value="Sedang Berjalan">Sedang Berjalan</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Instansi / Perusahaan Pemberi Kerja *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Kantor Pertanahan / PT Swasta"
                      value={newJob.instansiPerusahaan}
                      onChange={e => setNewJob({ ...newJob, instansiPerusahaan: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Lokasi Kegiatan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Kabupaten Padang Pariaman"
                      value={newJob.lokasi}
                      onChange={e => setNewJob({ ...newJob, lokasi: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Periode Mulai</label>
                      <input
                        type="text"
                        placeholder="Contoh: Januari 2026"
                        value={newJob.periodeMulai}
                        onChange={e => setNewJob({ ...newJob, periodeMulai: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 font-semibold block mb-1">Periode Selesai</label>
                      <input
                        type="text"
                        placeholder="Contoh: Desember 2026 / Sekarang"
                        value={newJob.periodeSelesai}
                        onChange={e => setNewJob({ ...newJob, periodeSelesai: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddJobOpen(false)}
                      className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl"
                    >
                      Simpan Pekerjaan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: KJSB (KANTOR JASA SURVEYOR BERLISENSI) */}
      {/* ========================================================= */}
      {activeTab === 'kjsb' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Building className="text-[#0f2e59]" size={17} />
                <span>Afiliasi Kantor Jasa Surveyor Berlisensi (KJSB)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Data badan usaha tempat surveyor berpraktik sesuai perizinan Kementerian ATR/BPN.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              ● Status KJSB: {kjsb.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Nama Resmi KJSB:</span>
                <span className="font-bold text-slate-900 text-sm">{kjsb.namaKJSB}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Nomor SK Pengesahan Kemenkumham:</span>
                <span className="font-mono font-bold text-slate-800">{kjsb.nomorSKKemenkumham}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Nomor Izin Usaha Ditjen SPPR ATR/BPN:</span>
                <span className="font-mono font-bold text-[#0f2e59]">{kjsb.nomorIzinATR}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Jabatan dalam KJSB:</span>
                <span className="font-bold text-slate-900">{kjsb.jabatan}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Masa Periode Aktif:</span>
                <span className="font-semibold text-slate-800">{kjsb.periode}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[11px]">Salinan SK Pendirian & Izin KJSB:</span>
                  <span className="font-semibold text-slate-800">sk_kjsb_pratama.pdf</span>
                </div>
                <button
                  onClick={() => alert(`Mengunduh dokumen salinan SK: ${kjsb.nomorIzinATR}`)}
                  className="px-3 py-1.5 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-lg text-xs flex items-center gap-1"
                >
                  <ExternalLink size={13} />
                  <span>Lihat SK</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: ASOSIASI PROFESI (ISI) */}
      {/* ========================================================= */}
      {activeTab === 'asosiasi' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Award className="text-[#0f2e59]" size={17} />
                <span>Kartu Keanggotaan Asosiasi Profesi Surveyor</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bukti keanggotaan aktif pada organisasi profesi surveyor yang diakui pemerintah (Ikatan Surveyor Indonesia).
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
              ● Keanggotaan: {asosiasi.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Nama Asosiasi Profesi:</span>
                <span className="font-bold text-slate-900 text-sm">{asosiasi.namaAsosiasi}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Nomor Induk Anggota (NIA):</span>
                <span className="font-mono font-bold text-[#0f2e59]">{asosiasi.nomorKeanggotaan}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Tanggal Masa Berlaku:</span>
                <span className="font-semibold text-slate-800">{asosiasi.tanggalBerlaku}</span>
              </div>
            </div>

            {/* Upload & Pratinjau Kartu Anggota */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900">Berkas Kartu Tanda Anggota (KTA)</h4>
              <p className="text-[11px] text-slate-500">
                Unggah pembaruan KTA jika masa berlaku kartu asosiasi Anda telah diperpanjang.
              </p>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="text-amber-500" size={16} />
                  <span className="font-semibold text-slate-800">kartu_anggota_isi_andi.pdf</span>
                </div>
                <button
                  onClick={() => alert('Membuka file Kartu Anggota ISI')}
                  className="text-xs text-blue-700 hover:underline font-bold"
                >
                  Lihat File
                </button>
              </div>

              <div className="pt-2">
                <label className="font-semibold text-slate-700 block mb-1">Unggah KTA Baru (PDF/JPG maks 2MB)</label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={() => {
                    setIsUploadingAsosiasi(true);
                    setTimeout(() => {
                      setIsUploadingAsosiasi(false);
                      onAddNotification('Kartu keanggotaan asosiasi profesi berhasil diperbarui.', 'success');
                    }, 800);
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0f2e59] file:text-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
