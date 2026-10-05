export type PageType = 
  | 'dashboard'
  | 'akun-saya'
  | 'pendidikan'
  | 'pengangkatan'
  | 'validasi'
  | 'cetak-lisensi'
  | 'cetak-sk'
  | 'cetak-biodata'
  | 'surveyors'
  | 'surveyor-detail'
  | 'permohonan'
  | 'verifikasi'
  | 'perpanjangan'
  | 'notifikasi'
  | 'laporan'
  | 'pengaturan';

export type StatusPermohonan = 
  | 'Menunggu Verifikasi'
  | 'Sedang Diproses'
  | 'Disetujui'
  | 'Ditolak';

export type StatusLisensi = 
  | 'Aktif'
  | 'Akan Berakhir'
  | 'Kedaluwarsa'
  | 'Dibekukan'
  | 'Menunggu Verifikasi';

export type JenisPermohonan = 
  | 'Lisensi Baru'
  | 'Perpanjangan Lisensi'
  | 'Peningkatan Kualifikasi'
  | 'Pindah Wilayah Kerja';

export type KualifikasiSurveyor = 
  | 'Surveyor Kadaster'
  | 'Asisten Surveyor Kadaster';

export interface DokumenMitra {
  id: string;
  jenis: 'KTP' | 'Sertifikat' | 'Dokumen Lisensi' | 'Dokumen Pendukung' | 'Ijazah Geodesi' | 'Surat Rekomendasi';
  namaFile: string;
  nomorDokumen?: string;
  ukuran: string;
  tanggalUpload: string;
  statusVerifikasi: 'Sesuai' | 'Perlu Perbaikan' | 'Belum Diperiksa';
  keterangan?: string;
}

export interface Surveyor {
  id: string;
  nik: string;
  namaLengkap: string;
  gelar: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamat: string;
  email: string;
  telepon: string;
  nomorLisensi: string;
  kualifikasi: KualifikasiSurveyor;
  wilayahKerja: string;
  kantorPertanahan: string;
  bentukUsaha: 'Perorangan' | 'Kantor Jasa Surveyor Berlisensi (KJSB)';
  namaKJSB?: string;
  nomorSKKJSB?: string;
  asosiasiProfesi: string; // e.g. ISI (Ikatan Surveyor Indonesia)
  tanggalTerbit: string;
  tanggalBerakhir: string;
  statusLisensi: StatusLisensi;
  dokumen: DokumenMitra[];
  catatan?: string;
}

export interface Permohonan {
  id: string;
  nomorPermohonan: string;
  surveyorId: string;
  namaSurveyor: string;
  nik: string;
  jenisPermohonan: JenisPermohonan;
  tanggalPengajuan: string;
  status: StatusPermohonan;
  nomorLisensiLama?: string;
  nomorLisensiBaru?: string;
  wilayahDiajukan: string;
  kualifikasiDiajukan: KualifikasiSurveyor;
  dokumen: DokumenMitra[];
  verifikatorNama?: string;
  tanggalVerifikasi?: string;
  catatanVerifikator?: string;
  checklist?: {
    biodataSesuai: boolean;
    akunBelumAda: boolean;
    dokumenDiperiksa: boolean;
    dataTerverifikasi: boolean;
  };
}

export interface Notifikasi {
  id: string;
  judul: string;
  pesan: string;
  kategori: 'permohonan' | 'verifikasi' | 'perpanjangan' | 'peringatan' | 'sistem';
  waktu: string;
  dibaca: boolean;
  targetPage?: PageType;
  targetId?: string;
}

export interface WilayahStat {
  provinsi: string;
  jumlah: number;
  aktif: number;
  akanBerakhir: number;
}
