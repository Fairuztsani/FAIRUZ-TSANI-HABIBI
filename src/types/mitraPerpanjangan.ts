/**
 * Tipe Data Spesifikasi Resmi:
 * Dokumen Perancangan Modul Perpanjangan Lisensi Surveyor
 * Proses Bisnis dan ERD — Aplikasi Mitra (Kementerian ATR/BPN)
 */

// 2.3 Status Pengajuan (Sesuai Bagian 2.3 Dokumen)
export type StatusPengajuan = 
  | 'DIAJUKAN'           // Pengajuan diterima sistem dan menunggu verifikasi (Dipicu oleh SB)
  | 'DALAM_VERIFIKASI'   // Berkas sedang diperiksa panitia (Dipicu oleh Panitia)
  | 'PERLU_PERBAIKAN'    // Ada berkas kurang atau tidak sesuai; SB diminta memperbaiki (Dipicu oleh Panitia / Sistem)
  | 'PROSES_SK'          // Berkas dinyatakan lengkap; SK sedang dibuat (Dipicu oleh Panitia)
  | 'SK_TERBIT';         // SK sudah terbit dan pengumuman tersedia (Dipicu oleh Panitia / Sistem)

// 3.3.3 Status Lisensi
export type StatusLisensiMitra = 
  | 'AKTIF' 
  | 'HAMPIR_BERAKHIR'    // Dasar notifikasi H-3 bulan (sisa <= 90 hari)
  | 'KEDALUWARSA';

// Role Akun (Bagian 3.3.1)
export type RoleAkun = 'SB' | 'PANITIA' | 'ADMIN';
export type StatusAkun = 'AKTIF' | 'NONAKTIF';

// 3.3.5 Status Berkas Persyaratan
export type StatusBerkas = 'MENUNGGU' | 'SESUAI' | 'TIDAK_SESUAI';

// 3.3.6 Hasil Verifikasi
export type HasilVerifikasi = 'LENGKAP' | 'PERLU_PERBAIKAN';

// 3.3.7 Status Draft SK
export type StatusDraftSK = 'DRAFT' | 'TERBIT';

// 3.3.10 Jenis Notifikasi
export type JenisNotifikasi = 'PENGINGAT_H3' | 'PERBAIKAN' | 'SK_TERBIT' | 'PROSES_SK';

// ==========================================
// 3.3 ENTITAS BASIS DATA (ERD KAMUS DATA)
// ==========================================

// 3.3.1 AKUN
export interface Akun {
  id: string; // UUID
  username: string; // VARCHAR(50)
  email: string; // VARCHAR(100)
  role: RoleAkun; // VARCHAR(20)
  status_akun: StatusAkun; // VARCHAR(20)
  namaLengkap?: string;
  nip?: string;
}

// 3.3.2 SURVEYOR
export interface SurveyorMitra {
  id: string; // UUID
  akun_id: string; // UUID FK -> AKUN.id
  nama: string; // VARCHAR(100)
  no_registrasi: string; // VARCHAR(30)
  wilayah_kerja: string; // VARCHAR(100)
  status: 'AKTIF' | 'NONAKTIF'; // VARCHAR(20)
  kualifikasi: 'Surveyor Kadaster' | 'Asisten Surveyor Kadaster';
  kjsbNama?: string;
  alamat?: string;
  telepon?: string;
}

// 3.3.3 LISENSI
export interface LisensiMitra {
  id: string; // UUID
  surveyor_id: string; // UUID FK -> SURVEYOR.id
  no_lisensi: string; // VARCHAR(50)
  tgl_terbit: string; // DATE (YYYY-MM-DD)
  tgl_berakhir: string; // DATE (YYYY-MM-DD); dasar notifikasi H-3 bulan
  status: StatusLisensiMitra; // VARCHAR(20)
  sisaHari: number; // Dihitung dinamis: tgl_berakhir - hari ini
  bisaPerpanjang: boolean; // BR-01: True jika sisa masa berlaku <= 3 bulan (90 hari)
}

// 3.3.5 BERKAS_PERSYARATAN
export interface BerkasPersyaratan {
  id: string; // UUID
  pengajuan_id: string; // UUID FK -> PENGAJUAN_PERPANJANGAN.id
  jenis_berkas: string; // VARCHAR(50)
  tipe_file: 'PDF'; // VARCHAR(10)
  path_file: string; // VARCHAR(255)
  status_berkas: StatusBerkas; // VARCHAR(20)
  catatan?: string; // TEXT
  ukuran?: string;
  tgl_upload?: string;
}

// 3.3.6 VERIFIKASI
export interface VerifikasiPutaran {
  id: string; // UUID
  pengajuan_id: string; // UUID FK -> PENGAJUAN_PERPANJANGAN.id
  verifikator_id: string; // UUID FK -> AKUN.id
  verifikator_nama?: string;
  putaran_ke: number; // INT (1, 2, dst.)
  hasil: HasilVerifikasi; // VARCHAR(20)
  catatan: string; // TEXT
  tgl_verifikasi: string; // DATETIME
}

// 3.3.7 SK_LISENSI
export interface SkLisensi {
  id: string; // UUID
  pengajuan_id: string; // UUID FK -> PENGAJUAN_PERPANJANGAN.id (unik)
  no_sk: string; // VARCHAR(50)
  tgl_sk: string; // DATE
  masa_berlaku_baru: string; // DATE
  file_sk: string; // VARCHAR(255)
  status_draft: StatusDraftSK; // VARCHAR(20)
}

// 3.3.8 PENGUMUMAN
export interface PengumumanMitra {
  id: string; // UUID
  sk_id: string; // UUID FK -> SK_LISENSI.id (unik)
  judul: string; // VARCHAR(200)
  link_url: string; // VARCHAR(255)
  dipublikasi_oleh: string; // UUID FK -> AKUN.id
  tgl_publikasi: string; // DATETIME
}

// 3.3.9 RIWAYAT_STATUS (Audit Trail BR-06)
export interface RiwayatStatus {
  id: string; // UUID
  pengajuan_id: string; // UUID FK -> PENGAJUAN_PERPANJANGAN.id
  status_lama: StatusPengajuan | 'BARU'; // VARCHAR(30)
  status_baru: StatusPengajuan; // VARCHAR(30)
  alasan: string; // TEXT
  diubah_oleh: string | null; // UUID FK -> AKUN.id; NULL bila diubah otomatis oleh sistem
  diubah_oleh_nama?: string;
  tgl_ubah: string; // DATETIME
}

// 3.3.10 NOTIFIKASI
export interface NotifikasiMitra {
  id: string; // UUID
  akun_id: string; // UUID FK -> AKUN.id
  pengajuan_id?: string | null; // UUID FK -> PENGAJUAN_PERPANJANGAN.id; NULL untuk pengingat H-3
  jenis: JenisNotifikasi; // VARCHAR(30)
  pesan: string; // TEXT
  sudah_dibaca: boolean; // BOOLEAN
  tgl_kirim: string; // DATETIME
}

// 3.3.4 PENGAJUAN_PERPANJANGAN (Entitas Utama Modul)
export interface PengajuanPerpanjangan {
  id: string; // UUID
  lisensi_id: string; // UUID FK -> LISENSI.id
  tgl_pengajuan: string; // DATETIME
  status: StatusPengajuan; // VARCHAR(30)
  catatan_sb?: string; // TEXT
  
  // Relasi & Virtual Properties untuk Tampilan UI
  surveyor: SurveyorMitra;
  lisensi: LisensiMitra;
  berkas: BerkasPersyaratan[];
  riwayatVerifikasi: VerifikasiPutaran[];
  skLisensi?: SkLisensi;
  pengumuman?: PengumumanMitra;
  riwayatStatus: RiwayatStatus[];
  
  // Metadata SLA (BR-08)
  slaHariTersisa?: number;
  slaTerlewat?: boolean;
}

// Aturan Bisnis (Section 2.4 BR-01 s/d BR-10)
export interface AturanBisnisInfo {
  kode: string;
  nama: string;
  deskripsi: string;
  dasar: string;
  statusImplementasi: 'Terpenuhi' | 'Aktif Terpasang';
}
