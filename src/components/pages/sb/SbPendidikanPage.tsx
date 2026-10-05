import React, { useState } from 'react';
import { RiwayatPendidikanModel, SertifikatPelatihanModel } from '../../../types/aplikasiMitra.ts';
import {
  GraduationCap,
  Award,
  Plus,
  Search,
  Filter,
  FileText,
  ExternalLink,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Building,
  Calendar
} from 'lucide-react';

interface SbPendidikanPageProps {
  pendidikanList: RiwayatPendidikanModel[];
  sertifikatList: SertifikatPelatihanModel[];
  onAddPendidikan: (edu: RiwayatPendidikanModel) => void;
  onAddSertifikat: (cert: SertifikatPelatihanModel) => void;
  onAddNotification: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const SbPendidikanPage: React.FC<SbPendidikanPageProps> = ({
  pendidikanList,
  sertifikatList,
  onAddPendidikan,
  onAddSertifikat,
  onAddNotification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJenjang, setFilterJenjang] = useState<string>('ALL');

  // Modal State Pendidikan
  const [isAddEduOpen, setIsAddEduOpen] = useState(false);
  const [newEdu, setNewEdu] = useState({
    jenjang: 'S1 Teknik Geodesi/Geomatika' as RiwayatPendidikanModel['jenjang'],
    institusi: '',
    programStudi: '',
    tahunMasuk: '',
    tahunLulus: '',
    nomorIjazah: ''
  });

  // Modal State Sertifikat
  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [newCert, setNewCert] = useState<{
    namaSertifikat: string;
    jenis: SertifikatPelatihanModel['jenis'];
    nomorSertifikat: string;
    tanggal: string;
    lembagaPenerbit: string;
  }>({
    namaSertifikat: '',
    jenis: 'Uji Kompetensi LSP',
    nomorSertifikat: '',
    tanggal: '',
    lembagaPenerbit: ''
  });

  const filteredPendidikan = pendidikanList.filter(edu => {
    const matchSearch =
      edu.institusi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.programStudi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      edu.nomorIjazah.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterJenjang === 'ALL' || edu.jenjang === filterJenjang;
    return matchSearch && matchFilter;
  });

  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEdu.institusi || !newEdu.programStudi || !newEdu.nomorIjazah) {
      alert('Harap lengkapi nama institusi, program studi, dan nomor ijazah.');
      return;
    }
    const created: RiwayatPendidikanModel = {
      id: `EDU-${Date.now()}`,
      ...newEdu,
      status: 'Terverifikasi',
      fileIjazahUrl: '/dokumen/ijazah_baru.pdf'
    };
    onAddPendidikan(created);
    setIsAddEduOpen(false);
    setNewEdu({
      jenjang: 'S1 Teknik Geodesi/Geomatika',
      institusi: '',
      programStudi: '',
      tahunMasuk: '',
      tahunLulus: '',
      nomorIjazah: ''
    });
    onAddNotification('Data riwayat pendidikan berhasil ditambahkan.', 'success');
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.namaSertifikat || !newCert.nomorSertifikat || !newCert.lembagaPenerbit) {
      alert('Harap lengkapi nama sertifikat, nomor, dan lembaga penerbit.');
      return;
    }
    const created: SertifikatPelatihanModel = {
      id: `CERT-${Date.now()}`,
      ...newCert,
      status: 'Aktif',
      fileUrl: '/dokumen/sertifikat_baru.pdf'
    };
    onAddSertifikat(created);
    setIsAddCertOpen(false);
    setNewCert({
      namaSertifikat: '',
      jenis: 'Uji Kompetensi LSP',
      nomorSertifikat: '',
      tanggal: '',
      lembagaPenerbit: ''
    });
    onAddNotification('Sertifikat pelatihan / uji kompetensi berhasil disimpan.', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="text-[#0f2e59]" size={22} />
            <span>Riwayat Pendidikan & Sertifikasi Surveyor</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dokumentasi jenjang pendidikan formal geodesi/geomatika dan sertifikat keahlian kadaster terakreditasi.
          </p>
        </div>
      </div>

      {/* SECTION 1: TABEL PENDIDIKAN FORMAL (Gambar A.4 & Halaman 8 PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <GraduationCap className="text-[#0f2e59]" size={18} />
              <span>Data Riwayat Pendidikan Formal</span>
            </h3>
            <p className="text-xs text-slate-500">
              Ijazah pendidikan tinggi yang telah diverifikasi sebagai syarat pengangkatan surveyor kadaster.
            </p>
          </div>

          <button
            onClick={() => setIsAddEduOpen(true)}
            className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Tambah Pendidikan</span>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama kampus, program studi, atau no ijazah..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0f2e59]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <select
              value={filterJenjang}
              onChange={e => setFilterJenjang(e.target.value)}
              className="p-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-700"
            >
              <option value="ALL">Semua Jenjang</option>
              <option value="D-I Kadastral">D-I Kadastral</option>
              <option value="D-III Pengukuran">D-III Pengukuran</option>
              <option value="D-IV / Sarjana Terapan">D-IV / Sarjana Terapan</option>
              <option value="S1 Teknik Geodesi/Geomatika">S1 Teknik Geodesi/Geomatika</option>
              <option value="S2 Geodesi">S2 Geodesi</option>
            </select>
          </div>
        </div>

        {/* Tabel Pendidikan */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Jenjang</th>
                <th className="py-3 px-4">Nama Institusi / Perguruan Tinggi</th>
                <th className="py-3 px-3">Program Studi</th>
                <th className="py-3 px-3 text-center">Tahun Masuk</th>
                <th className="py-3 px-3 text-center">Tahun Lulus</th>
                <th className="py-3 px-4">Nomor Ijazah</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center">Dokumen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPendidikan.map(edu => (
                <tr key={edu.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3">
                    <span className="font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200 text-[11px]">
                      {edu.jenjang}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{edu.institusi}</td>
                  <td className="py-3.5 px-3 text-slate-700">{edu.programStudi}</td>
                  <td className="py-3.5 px-3 text-center font-mono text-slate-600">{edu.tahunMasuk}</td>
                  <td className="py-3.5 px-3 text-center font-mono text-slate-600">{edu.tahunLulus}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-800 text-[11px]">{edu.nomorIjazah}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      ✓ {edu.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => alert(`Membuka Ijazah: ${edu.nomorIjazah}`)}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                      title="Lihat Ijazah"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: SERTIFIKAT PELATIHAN & UJI KOMPETENSI (Sesuai Usulan Pengembangan PDF Bagian 3 & 6) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Award className="text-amber-500" size={18} />
              <span>Sertifikat Pelatihan & Uji Kompetensi Keahlian (SKK)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Koleksi sertifikat peningkatan kompetensi teknis, lisensi drone/UAV, GNSS RTK, dan sertifikasi BNSP/LSP Geomatika.
            </p>
          </div>

          <button
            onClick={() => setIsAddCertOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Tambah Sertifikat</span>
          </button>
        </div>

        {/* Tabel Sertifikat */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 w-10 text-center">No</th>
                <th className="py-3 px-4">Nama Sertifikat</th>
                <th className="py-3 px-3">Jenis</th>
                <th className="py-3 px-4">Nomor Sertifikat</th>
                <th className="py-3 px-3">Tanggal Penerbitan</th>
                <th className="py-3 px-4">Lembaga Penerbit</th>
                <th className="py-3 px-3 text-center">Berkas</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sertifikatList.map((cert, idx) => (
                <tr key={cert.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{cert.namaSertifikat}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {cert.jenis}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-800">{cert.nomorSertifikat}</td>
                  <td className="py-3.5 px-3 text-slate-600">{cert.tanggal}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{cert.lembagaPenerbit}</td>
                  <td className="py-3.5 px-3 text-center">
                    <button
                      onClick={() => alert(`Membuka file sertifikat: ${cert.namaSertifikat}`)}
                      className="text-blue-700 hover:text-blue-900 font-bold text-[11px] flex items-center justify-center gap-1 mx-auto"
                    >
                      <ExternalLink size={12} />
                      <span>PDF</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {cert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH PENDIDIKAN */}
      {isAddEduOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Tambah Riwayat Pendidikan</h4>
              <button onClick={() => setIsAddEduOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleSaveEdu} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Jenjang Pendidikan *</label>
                <select
                  value={newEdu.jenjang}
                  onChange={e => setNewEdu({ ...newEdu, jenjang: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="D-I Kadastral">D-I Kadastral</option>
                  <option value="D-III Pengukuran">D-III Pengukuran</option>
                  <option value="D-IV / Sarjana Terapan">D-IV / Sarjana Terapan</option>
                  <option value="S1 Teknik Geodesi/Geomatika">S1 Teknik Geodesi/Geomatika</option>
                  <option value="S2 Geodesi">S2 Geodesi</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Nama Perguruan Tinggi / Institusi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Institut Teknologi Bandung (ITB)"
                  value={newEdu.institusi}
                  onChange={e => setNewEdu({ ...newEdu, institusi: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Program Studi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Teknik Geodesi dan Geomatika"
                  value={newEdu.programStudi}
                  onChange={e => setNewEdu({ ...newEdu, programStudi: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Tahun Masuk</label>
                  <input
                    type="number"
                    placeholder="2016"
                    value={newEdu.tahunMasuk}
                    onChange={e => setNewEdu({ ...newEdu, tahunMasuk: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Tahun Lulus</label>
                  <input
                    type="number"
                    placeholder="2020"
                    value={newEdu.tahunLulus}
                    onChange={e => setNewEdu({ ...newEdu, tahunLulus: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Nomor Ijazah *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: ITB/FTSL/S1/2020/0981"
                  value={newEdu.nomorIjazah}
                  onChange={e => setNewEdu({ ...newEdu, nomorIjazah: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Unggah Scan Ijazah (PDF maks 2MB)</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#0f2e59] file:text-white cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEduOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold rounded-xl"
                >
                  Simpan Pendidikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH SERTIFIKAT */}
      {isAddCertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-extrabold text-slate-900 text-sm">Tambah Sertifikat Pelatihan / Uji Kompetensi</h4>
              <button onClick={() => setIsAddCertOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-600 font-semibold block mb-1">Nama Sertifikat *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pelatihan GNSS RTK untuk Kadaster"
                  value={newCert.namaSertifikat}
                  onChange={e => setNewCert({ ...newCert, namaSertifikat: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Jenis Sertifikasi</label>
                  <select
                    value={newCert.jenis}
                    onChange={e => setNewCert({ ...newCert, jenis: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Uji Kompetensi LSP">Uji Kompetensi LSP (BNSP)</option>
                    <option value="GNSS Terestrial">GNSS Terestrial</option>
                    <option value="Fotogrametri & Drone">Fotogrametri & Drone</option>
                    <option value="GIS Pertanahan">GIS Pertanahan</option>
                    <option value="Pelatihan Kadaster">Pelatihan Kadaster</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">Tanggal Penerbitan</label>
                  <input
                    type="text"
                    placeholder="Contoh: 15 Mei 2026"
                    value={newCert.tanggal}
                    onChange={e => setNewCert({ ...newCert, tanggal: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Nomor Registrasi Sertifikat *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SKK-LSP-2026-091"
                  value={newCert.nomorSertifikat}
                  onChange={e => setNewCert({ ...newCert, nomorSertifikat: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Lembaga Penerbit *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: LSP Geomatika / PPSDM ATR/BPN"
                  value={newCert.lembagaPenerbit}
                  onChange={e => setNewCert({ ...newCert, lembagaPenerbit: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold block mb-1">Unggah Dokumen Sertifikat (PDF maks 2MB)</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 cursor-pointer"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCertOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Simpan Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
