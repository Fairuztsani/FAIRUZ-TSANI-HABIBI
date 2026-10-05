/**
 * Tipe Data Komprehensif:
 * Aplikasi Mitra – Surveyor Berlisensi & Panitia/Verifikator (Kementerian ATR/BPN)
 */

export type RolePengguna = 'SURVEYOR' | 'PANITIA';

export type StatusLisensiType = 'AKTIF' | 'HAMPIR_BERAKHIR' | 'KEDALUWARSA' | 'DIBEKUKAN';
export type StatusValidasiType = 'BELUM_VALIDASI' | 'DALAM_VERIFIKASI' | 'VALID' | 'PERLU_PERBAIKAN';
export type StatusPengajuanPerpanjangan = 'DIAJUKAN' | 'DALAM_VERIFIKASI' | 'PERLU_PERBAIKAN' | 'PROSES_SK' | 'SK_TERBIT';
export type StatusPindahWilayah = 'DRAFT' | 'DIAJUKAN' | 'DALAM_VERIFIKASI' | 'PERLU_PERBAIKAN' | 'DISETUJUI' | 'DITOLAK';
export type StatusMagangType = 'Belum Magang' | 'Sedang Magang' | 'Selesai';
export type StatusVerifikasiDokumen = 'MENUNGGU' | 'SESUAI' | 'TIDAK_SESUAI';
export type KualifikasiType = 'Surveyor Kadaster' | 'Asisten Surveyor Kadaster';

// 1. SURVEYOR & BIODATA
export interface SurveyorModel {
  id: string;
  nik: string;
  namaLengkap: string;
  gelarDepan?: string;
  gelarBelakang?: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  statusPerkawinan: 'Menikah' | 'Belum Menikah' | 'Cerai';
  alamat: string;
  email: string;
  telepon: string;
  nomorRegistrasi: string;
  kualifikasi: KualifikasiType;
  wilayahKerja: string;
  statusAkun: 'AKTIF' | 'MENUNGGU_VERIFIKASI' | 'PERLU_PERBAIKAN' | 'DITOLAK';
  statusValidasi: StatusValidasiType;
  pasFotoUrl?: string;
  npwp: string;
}

// 2. LISENSI
export interface LisensiModel {
  id: string;
  surveyorId: string;
  nomorLisensi: string;
  tanggalTerbit: string;
  tanggalBerakhir: string;
  status: StatusLisensiType;
  sisaHari: number;
  bisaPerpanjang: boolean;
}

// 3. RIWAYAT PEKERJAAN
export interface RiwayatPekerjaanModel {
  id: string;
  surveyorId: string;
  jenisPekerjaan: string;
  jenisKontrak: 'Kontrak Pemerintah (PTSL)' | 'Proyek Swasta' | 'Konsultansi' | 'Mandiri';
  instansiPerusahaan: string;
  lokasi: string;
  periodeMulai: string;
  periodeSelesai: string;
  status: 'Selesai' | 'Sedang Berjalan';
}

// 4. KJSB & ASOSIASI
export interface KjsbModel {
  id: string;
  namaKJSB: string;
  nomorSKKemenkumham: string;
  nomorIzinATR: string;
  periode: string;
  jabatan: 'Pemimpin Rekan' | 'Rekan' | 'Surveyor Terafiliasi';
  status: 'Aktif' | 'Non-Aktif';
  dokumenSKUrl?: string;
}

export interface AsosiasiProfesiModel {
  id: string;
  namaAsosiasi: string; // e.g. ISI (Ikatan Surveyor Indonesia)
  nomorKeanggotaan: string;
  tanggalBerlaku: string;
  status: 'Aktif' | 'Kedaluwarsa';
  kartuKeanggotaanUrl?: string;
}

// 5. PENDIDIKAN & SERTIFIKASI
export interface RiwayatPendidikanModel {
  id: string;
  jenjang: 'D-I Kadastral' | 'D-III Pengukuran' | 'D-IV / Sarjana Terapan' | 'S1 Teknik Geodesi/Geomatika' | 'S2 Geodesi';
  institusi: string;
  programStudi: string;
  tahunMasuk: string;
  tahunLulus: string;
  nomorIjazah: string;
  status: 'Terverifikasi' | 'Menunggu Verifikasi';
  fileIjazahUrl?: string;
}

export interface SertifikatPelatihanModel {
  id: string;
  namaSertifikat: string;
  jenis: 'Pelatihan Kadaster' | 'GNSS Terestrial' | 'Fotogrametri & Drone' | 'GIS Pertanahan' | 'Uji Kompetensi LSP';
  nomorSertifikat: string;
  tanggal: string;
  lembagaPenerbit: string;
  status: 'Aktif' | 'Kedaluwarsa';
  fileUrl?: string;
}

// 6. MAGANG
export interface RiwayatMagangModel {
  id: string;
  namaInstansi: string;
  lokasi: string;
  waktuMulai: string;
  waktuSelesai: string;
  deskripsiKegiatan: string;
  pembimbing: string;
  suratKeteranganUrl?: string;
  status: StatusMagangType;
}

// 7. PENGANGKATAN & MUTASI
export interface RiwayatPengangkatanModel {
  id: string;
  nomorSK: string;
  tanggalSK: string;
  nomorBaPelantikan: string;
  tanggalPelantikan: string;
  wilayahKerja: string;
  pejabatPengesah: string;
  status: 'Tetap' | 'Pembaruan' | 'Mutasi';
  dokumenSKUrl?: string;
  dokumenBAUrl?: string;
}

// 8. VALIDASI DATA & PENGAJUAN PERUBAHAN
export interface PengajuanPerubahanDataModel {
  id: string;
  surveyorId: string;
  tanggalPengajuan: string;
  dataLama: string;
  dataBaru: string;
  alasanPerubahan: string;
  dokumenPendukungUrl?: string;
  status: StatusValidasiType;
  verifikatorNama?: string;
  tanggalValidasi?: string;
  catatanVerifikator?: string;
}

// 9. DOKUMEN PERSYARATAN & VERIFIKASI PERPANJANGAN
export interface DokumenPersyaratanItem {
  id: string;
  jenisBerkas: string;
  namaFile: string;
  tipeFile: 'PDF';
  ukuran: string;
  statusBerkas: StatusVerifikasiDokumen;
  catatanVerifikator?: string;
  tanggalUpload: string;
}

export interface PengajuanPerpanjanganModel {
  id: string;
  surveyorId: string;
  surveyorNama: string;
  nomorRegistrasi: string;
  nomorLisensi: string;
  kualifikasi: KualifikasiType;
  wilayahKerja: string;
  tanggalPengajuan: string;
  status: StatusPengajuanPerpanjangan;
  catatanSB?: string;
  berkas: DokumenPersyaratanItem[];
  putaranKe: number;
  catatanVerifikator?: string;
  verifikatorNama?: string;
  tanggalVerifikasi?: string;
  nomorSKBaru?: string;
  tanggalSKBaru?: string;
  masaBerlakuBaru?: string;
  linkPengumuman?: string;
}

// 10. PENGAJUAN PINDAH WILAYAH KERJA
export interface PengajuanPindahWilayahModel {
  id: string;
  surveyorId: string;
  surveyorNama: string;
  nomorLisensi: string;
  wilayahAsal: string;
  wilayahTujuan: string;
  alasanPindah: string;
  tanggalPengajuan: string;
  dokumenSuratRekomendasi?: string;
  keterangan?: string;
  status: StatusPindahWilayah;
  catatanVerifikator?: string;
  tanggalKeputusan?: string;
}

// 11. SK LISENSI
export interface SkLisensiModel {
  id: string;
  pengajuanId: string;
  surveyorNama: string;
  nomorLisensi: string;
  nomorSK: string;
  tanggalSK: string;
  masaBerlakuBaru: string;
  fileSKUrl: string;
  statusDraft: 'DRAFT' | 'TERBIT';
}

// 12. PENGUMUMAN
export interface PengumumanModel {
  id: string;
  judul: string;
  nomorSK: string;
  surveyorNama: string;
  linkPengumuman: string;
  tanggalPublikasi: string;
  status: 'Draft' | 'Terpublikasi';
}

// 13. NOTIFIKASI
export interface NotifikasiModel {
  id: string;
  kategori: 'Validasi' | 'Perpanjangan Lisensi' | 'Pindah Wilayah' | 'Perbaikan Dokumen' | 'SK Terbit' | 'Informasi Sistem';
  pesan: string;
  tanggalKirim: string;
  sudahDibaca: boolean;
  linkPage?: string;
  pengajuanId?: string;
}
