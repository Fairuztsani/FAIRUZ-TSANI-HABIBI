import {
  Akun,
  SurveyorMitra,
  LisensiMitra,
  PengajuanPerpanjangan,
  BerkasPersyaratan,
  VerifikasiPutaran,
  SkLisensi,
  PengumumanMitra,
  RiwayatStatus,
  NotifikasiMitra
} from '../types/mitraPerpanjangan.ts';

// 1. DATA AKUN
export const SEED_AKUN: Akun[] = [
  {
    id: 'AKUN-SB-001',
    username: 'andi.pratama',
    email: 'andi.pratama@mitra-bpn.go.id',
    role: 'SB',
    status_akun: 'AKTIF',
    namaLengkap: 'Andi Pratama, S.T.',
    nip: '-'
  },
  {
    id: 'AKUN-PANITIA-001',
    username: 'fairuz.tsani',
    email: 'fairuztsanihabibi03@gmail.com',
    role: 'PANITIA',
    status_akun: 'AKTIF',
    namaLengkap: 'Fairuz Tsani Habibi, S.Kom.',
    nip: '19950320 202012 1 003'
  },
  {
    id: 'AKUN-ADMIN-001',
    username: 'admin.sppr',
    email: 'admin.sppr@atrbpn.go.id',
    role: 'ADMIN',
    status_akun: 'AKTIF',
    namaLengkap: 'Administrator Ditjen SPPR',
    nip: '19890412 201402 1 001'
  }
];

// 2. DATA SURVEYOR
export const SEED_SURVEYOR: SurveyorMitra[] = [
  {
    id: 'SRV-001',
    akun_id: 'AKUN-SB-001',
    nama: 'Andi Pratama, S.T.',
    no_registrasi: 'SB-2024-00125',
    wilayah_kerja: 'Sumatera Barat',
    status: 'AKTIF',
    kualifikasi: 'Surveyor Kadaster',
    kjsbNama: 'KJSB Pratama Geodesi Nusantara',
    alamat: 'Jl. Khatib Sulaiman No. 42, Kota Padang, Sumatera Barat',
    telepon: '0812-6789-1123'
  },
  {
    id: 'SRV-002',
    akun_id: 'AKUN-SB-002',
    nama: 'I Made Dananjaya, S.T.',
    no_registrasi: 'REG-SB-2021-089',
    wilayah_kerja: 'Bali',
    status: 'AKTIF',
    kualifikasi: 'Surveyor Kadaster',
    kjsbNama: 'KJSB Dananjaya Geomatika',
    alamat: 'Jl. Raya Renon No. 45, Denpasar Selatan, Kota Denpasar',
    telepon: '0813-3890-4412'
  },
  {
    id: 'SRV-003',
    akun_id: 'AKUN-SB-003',
    nama: 'Budi Santoso, S.T.',
    no_registrasi: 'REG-SB-2021-042',
    wilayah_kerja: 'Jawa Tengah',
    status: 'AKTIF',
    kualifikasi: 'Surveyor Kadaster',
    kjsbNama: 'KJSB Santoso & Rekan',
    alamat: 'Jl. Pahlawan No. 12, Pleburan, Semarang',
    telepon: '0812-9844-3321'
  },
  {
    id: 'SRV-004',
    akun_id: 'AKUN-SB-004',
    nama: 'Dewi Lestari, A.Md.',
    no_registrasi: 'REG-ASK-2021-112',
    wilayah_kerja: 'Jawa Timur',
    status: 'AKTIF',
    kualifikasi: 'Asisten Surveyor Kadaster',
    kjsbNama: 'Perorangan',
    alamat: 'Jl. Pemuda No. 78, Genteng, Kota Surabaya',
    telepon: '0821-4478-9901'
  },
  {
    id: 'SRV-005',
    akun_id: 'AKUN-SB-005',
    nama: 'Ahmad Fauzan, S.T.',
    no_registrasi: 'REG-SB-2022-015',
    wilayah_kerja: 'DKI Jakarta',
    status: 'AKTIF',
    kualifikasi: 'Surveyor Kadaster',
    kjsbNama: 'KJSB Fauzan Pemetaan Mandiri',
    alamat: 'Jl. Kemang Raya No. 18, Jakarta Selatan',
    telepon: '0811-2334-5561'
  },
  {
    id: 'SRV-006',
    akun_id: 'AKUN-SB-006',
    nama: 'Hendra Wijaya, S.T.',
    no_registrasi: 'REG-SB-2024-009',
    wilayah_kerja: 'Jawa Barat',
    status: 'AKTIF',
    kualifikasi: 'Surveyor Kadaster',
    kjsbNama: 'KJSB Wijaya Spatial',
    alamat: 'Jl. Ir. H. Juanda No. 102, Dago, Bandung',
    telepon: '0812-2234-8899'
  }
];

// 3. DATA LISENSI
export const SEED_LISENSI: LisensiMitra[] = [
  {
    id: 'LIC-001',
    surveyor_id: 'SRV-001',
    no_lisensi: 'LIS-SB-2024-00125',
    tgl_terbit: '2024-04-15',
    tgl_berakhir: '2026-11-15',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 41,
    bisaPerpanjang: true // sisa <= 90 hari
  },
  {
    id: 'LIC-002',
    surveyor_id: 'SRV-002',
    no_lisensi: '27-SKB-SPPR/2021',
    tgl_terbit: '2021-10-10',
    tgl_berakhir: '2026-10-10',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 5,
    bisaPerpanjang: true
  },
  {
    id: 'LIC-003',
    surveyor_id: 'SRV-003',
    no_lisensi: '18-SKB-SPPR/2021',
    tgl_terbit: '2021-11-02',
    tgl_berakhir: '2026-11-02',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 28,
    bisaPerpanjang: true
  },
  {
    id: 'LIC-004',
    surveyor_id: 'SRV-004',
    no_lisensi: '39-ASK-SPPR/2021',
    tgl_terbit: '2021-10-25',
    tgl_berakhir: '2026-10-25',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 20,
    bisaPerpanjang: true
  },
  {
    id: 'LIC-005',
    surveyor_id: 'SRV-005',
    no_lisensi: '01-SKB-SPPR/2022',
    tgl_terbit: '2022-03-15',
    tgl_berakhir: '2031-09-20',
    status: 'AKTIF',
    sisaHari: 1812,
    bisaPerpanjang: false
  },
  {
    id: 'LIC-006',
    surveyor_id: 'SRV-006',
    no_lisensi: '55-SKB-SPPR/2024',
    tgl_terbit: '2024-01-10',
    tgl_berakhir: '2029-01-10',
    status: 'AKTIF',
    sisaHari: 827,
    bisaPerpanjang: false // > 90 hari, tombol dinonaktifkan
  }
];

// 4. DATA PENGAJUAN PERPANJANGAN (5 Status Resmi)
export const SEED_PENGAJUAN: PengajuanPerpanjangan[] = [
  // 1. Andi Pratama - DIAJUKAN (Menunggu Verifikasi)
  {
    id: 'PML-2026-00125',
    lisensi_id: 'LIC-001',
    tgl_pengajuan: '2026-10-03 10:15:00',
    status: 'DIAJUKAN',
    catatan_sb: 'Permohonan perpanjangan lisensi Surveyor Kadaster periode 2026-2031 untuk wilayah penugasan Sumatera Barat. Dokumen KTP, SKK, SK lama, dan rekomendasi telah diunggah lengkap.',
    surveyor: SEED_SURVEYOR[0],
    lisensi: SEED_LISENSI[0],
    slaHariTersisa: 5,
    slaTerlewat: false,
    berkas: [
      {
        id: 'DOK-001-KTP',
        pengajuan_id: 'PML-2026-00125',
        jenis_berkas: 'Kartu Tanda Penduduk (KTP)',
        tipe_file: 'PDF',
        path_file: '/dokumen/ktp_andi_pratama.pdf',
        status_berkas: 'MENUNGGU',
        ukuran: '1.2 MB',
        tgl_upload: '2026-10-03 10:05'
      },
      {
        id: 'DOK-001-SKK',
        pengajuan_id: 'PML-2026-00125',
        jenis_berkas: 'Sertifikat Kompetensi Keahlian (SKK) Kadaster',
        tipe_file: 'PDF',
        path_file: '/dokumen/skk_kadaster_andi.pdf',
        status_berkas: 'MENUNGGU',
        ukuran: '2.5 MB',
        tgl_upload: '2026-10-03 10:08'
      },
      {
        id: 'DOK-001-SKL',
        pengajuan_id: 'PML-2026-00125',
        jenis_berkas: 'SK Lisensi Lama (LIS-SB-2024-00125)',
        tipe_file: 'PDF',
        path_file: '/dokumen/sk_lama_andi.pdf',
        status_berkas: 'MENUNGGU',
        ukuran: '3.1 MB',
        tgl_upload: '2026-10-03 10:10'
      },
      {
        id: 'DOK-001-REK',
        pengajuan_id: 'PML-2026-00125',
        jenis_berkas: 'Surat Rekomendasi Asosiasi Profesi (ISI)',
        tipe_file: 'PDF',
        path_file: '/dokumen/rekomendasi_isi_sumbar.pdf',
        status_berkas: 'MENUNGGU',
        ukuran: '1.4 MB',
        tgl_upload: '2026-10-03 10:12'
      }
    ],
    riwayatVerifikasi: [],
    riwayatStatus: [
      {
        id: 'LOG-001-1',
        pengajuan_id: 'PML-2026-00125',
        status_lama: 'BARU',
        status_baru: 'DIAJUKAN',
        alasan: 'Surveyor Berlisensi Andi Pratama telah melengkapi berkas dan mengajukan permohonan.',
        diubah_oleh: 'AKUN-SB-001',
        diubah_oleh_nama: 'Andi Pratama, S.T.',
        tgl_ubah: '2026-10-03 10:15:00'
      }
    ]
  },

  // 2. I Made Dananjaya - DALAM_VERIFIKASI
  {
    id: 'PML-2026-00089',
    lisensi_id: 'LIC-002',
    tgl_pengajuan: '2026-10-01 09:30:00',
    status: 'DALAM_VERIFIKASI',
    catatan_sb: 'Permohonan perpanjangan lisensi Surveyor Kadaster Wilayah Bali.',
    surveyor: SEED_SURVEYOR[1],
    lisensi: SEED_LISENSI[1],
    slaHariTersisa: 3,
    slaTerlewat: false,
    berkas: [
      {
        id: 'DOK-002-KTP',
        pengajuan_id: 'PML-2026-00089',
        jenis_berkas: 'Kartu Tanda Penduduk (KTP)',
        tipe_file: 'PDF',
        path_file: '/dokumen/ktp_i_made_dananjaya.pdf',
        status_berkas: 'SESUAI',
        ukuran: '1.1 MB',
        tgl_upload: '2026-10-01 09:20'
      },
      {
        id: 'DOK-002-SKK',
        pengajuan_id: 'PML-2026-00089',
        jenis_berkas: 'Sertifikat Kompetensi Keahlian (SKK) Kadaster',
        tipe_file: 'PDF',
        path_file: '/dokumen/skk_kadaster_dananjaya.pdf',
        status_berkas: 'SESUAI',
        ukuran: '2.8 MB',
        tgl_upload: '2026-10-01 09:22'
      },
      {
        id: 'DOK-002-SKL',
        pengajuan_id: 'PML-2026-00089',
        jenis_berkas: 'SK Lisensi Lama (27-SKB-SPPR/2021)',
        tipe_file: 'PDF',
        path_file: '/dokumen/sk_lisensi_lama_27.pdf',
        status_berkas: 'SESUAI',
        ukuran: '3.0 MB',
        tgl_upload: '2026-10-01 09:25'
      },
      {
        id: 'DOK-002-REK',
        pengajuan_id: 'PML-2026-00089',
        jenis_berkas: 'Surat Rekomendasi Asosiasi Profesi (ISI)',
        tipe_file: 'PDF',
        path_file: '/dokumen/rekomendasi_isi_bali.pdf',
        status_berkas: 'MENUNGGU',
        ukuran: '1.5 MB',
        tgl_upload: '2026-10-01 09:28'
      }
    ],
    riwayatVerifikasi: [
      {
        id: 'VER-002-1',
        pengajuan_id: 'PML-2026-00089',
        verifikator_id: 'AKUN-PANITIA-001',
        verifikator_nama: 'Fairuz Tsani Habibi, S.Kom.',
        putaran_ke: 1,
        hasil: 'LENGKAP',
        catatan: 'Pemeriksaan berkas putaran ke-1 sedang berjalan. KTP, SKK, dan SK Lama valid.',
        tgl_verifikasi: '2026-10-02 11:15:00'
      }
    ],
    riwayatStatus: [
      {
        id: 'LOG-002-1',
        pengajuan_id: 'PML-2026-00089',
        status_lama: 'BARU',
        status_baru: 'DIAJUKAN',
        alasan: 'SB mengajukan permohonan perpanjangan lisensi.',
        diubah_oleh: 'AKUN-SB-002',
        diubah_oleh_nama: 'I Made Dananjaya, S.T.',
        tgl_ubah: '2026-10-01 09:30:00'
      },
      {
        id: 'LOG-002-2',
        pengajuan_id: 'PML-2026-00089',
        status_lama: 'DIAJUKAN',
        status_baru: 'DALAM_VERIFIKASI',
        alasan: 'Panitia verifikator memulai pemeriksaan berkas putaran ke-1.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-10-02 10:00:00'
      }
    ]
  },

  // 3. Budi Santoso - PERLU_PERBAIKAN
  {
    id: 'PML-2026-00042',
    lisensi_id: 'LIC-003',
    tgl_pengajuan: '2026-09-28 14:10:00',
    status: 'PERLU_PERBAIKAN',
    catatan_sb: 'Pengajuan perpanjangan lisensi Surveyor Kadaster Wilayah Jateng.',
    surveyor: SEED_SURVEYOR[2],
    lisensi: SEED_LISENSI[2],
    slaHariTersisa: 2,
    slaTerlewat: false,
    berkas: [
      {
        id: 'DOK-003-KTP',
        pengajuan_id: 'PML-2026-00042',
        jenis_berkas: 'Kartu Tanda Penduduk (KTP)',
        tipe_file: 'PDF',
        path_file: '/dokumen/ktp_budi_santoso.pdf',
        status_berkas: 'SESUAI',
        ukuran: '1.1 MB',
        tgl_upload: '2026-09-28 13:55'
      },
      {
        id: 'DOK-003-SKK',
        pengajuan_id: 'PML-2026-00042',
        jenis_berkas: 'Sertifikat Kompetensi Keahlian (SKK) Kadaster',
        tipe_file: 'PDF',
        path_file: '/dokumen/skk_kadaster_budi.pdf',
        status_berkas: 'TIDAK_SESUAI',
        catatan: 'Masa berlaku Sertifikat Kompetensi Kadaster telah kedaluwarsa pada Agustus 2026. Harap lampirkan sertifikat resertifikasi terbaru dari LSP Geomatika.',
        ukuran: '2.4 MB',
        tgl_upload: '2026-09-28 14:00'
      },
      {
        id: 'DOK-003-SKL',
        pengajuan_id: 'PML-2026-00042',
        jenis_berkas: 'SK Lisensi Lama (18-SKB-SPPR/2021)',
        tipe_file: 'PDF',
        path_file: '/dokumen/sk_lisensi_18_santoso.pdf',
        status_berkas: 'SESUAI',
        ukuran: '3.0 MB',
        tgl_upload: '2026-09-28 14:02'
      },
      {
        id: 'DOK-003-REK',
        pengajuan_id: 'PML-2026-00042',
        jenis_berkas: 'Surat Rekomendasi Asosiasi Profesi (ISI)',
        tipe_file: 'PDF',
        path_file: '/dokumen/rekomendasi_isi_jateng.pdf',
        status_berkas: 'SESUAI',
        ukuran: '1.3 MB',
        tgl_upload: '2026-09-28 14:05'
      }
    ],
    riwayatVerifikasi: [
      {
        id: 'VER-003-1',
        pengajuan_id: 'PML-2026-00042',
        verifikator_id: 'AKUN-PANITIA-001',
        verifikator_nama: 'Fairuz Tsani Habibi, S.Kom.',
        putaran_ke: 1,
        hasil: 'PERLU_PERBAIKAN',
        catatan: 'Sertifikat kompetensi LSP telah habis masa berlakunya. Mohon unggah bukti perpanjangan SKK aktif.',
        tgl_verifikasi: '2026-09-30 15:45:00'
      }
    ],
    riwayatStatus: [
      {
        id: 'LOG-003-1',
        pengajuan_id: 'PML-2026-00042',
        status_lama: 'BARU',
        status_baru: 'DIAJUKAN',
        alasan: 'SB mengajukan permohonan perpanjangan.',
        diubah_oleh: 'AKUN-SB-003',
        diubah_oleh_nama: 'Budi Santoso, S.T.',
        tgl_ubah: '2026-09-28 14:10:00'
      },
      {
        id: 'LOG-003-2',
        pengajuan_id: 'PML-2026-00042',
        status_lama: 'DIAJUKAN',
        status_baru: 'DALAM_VERIFIKASI',
        alasan: 'Panitia memeriksa berkas putaran ke-1.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-09-30 09:15:00'
      },
      {
        id: 'LOG-003-3',
        pengajuan_id: 'PML-2026-00042',
        status_lama: 'DALAM_VERIFIKASI',
        status_baru: 'PERLU_PERBAIKAN',
        alasan: 'Hasil verifikasi putaran ke-1: Berkas SKK kedaluwarsa. Sistem mengirim notifikasi perbaikan ke SB.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-09-30 15:45:00'
      }
    ]
  },

  // 4. Dewi Lestari - PROSES_SK
  {
    id: 'PML-2026-00112',
    lisensi_id: 'LIC-004',
    tgl_pengajuan: '2026-09-25 10:00:00',
    status: 'PROSES_SK',
    catatan_sb: 'Perpanjangan lisensi Asisten Surveyor Kadaster wilayah Jawa Timur.',
    surveyor: SEED_SURVEYOR[3],
    lisensi: SEED_LISENSI[3],
    slaHariTersisa: 4,
    slaTerlewat: false,
    berkas: [
      {
        id: 'DOK-004-KTP',
        pengajuan_id: 'PML-2026-00112',
        jenis_berkas: 'Kartu Tanda Penduduk (KTP)',
        tipe_file: 'PDF',
        path_file: '/dokumen/ktp_dewi_lestari.pdf',
        status_berkas: 'SESUAI',
        ukuran: '1.0 MB',
        tgl_upload: '2026-09-25 09:40'
      },
      {
        id: 'DOK-004-SKK',
        pengajuan_id: 'PML-2026-00112',
        jenis_berkas: 'Sertifikat Kompetensi Keahlian (SKK)',
        tipe_file: 'PDF',
        path_file: '/dokumen/skk_ask_dewi.pdf',
        status_berkas: 'SESUAI',
        ukuran: '2.1 MB',
        tgl_upload: '2026-09-25 09:45'
      },
      {
        id: 'DOK-004-SKL',
        pengajuan_id: 'PML-2026-00112',
        jenis_berkas: 'SK Lisensi Lama (39-ASK-SPPR/2021)',
        tipe_file: 'PDF',
        path_file: '/dokumen/sk_lama_39.pdf',
        status_berkas: 'SESUAI',
        ukuran: '2.7 MB',
        tgl_upload: '2026-09-25 09:50'
      }
    ],
    riwayatVerifikasi: [
      {
        id: 'VER-004-1',
        pengajuan_id: 'PML-2026-00112',
        verifikator_id: 'AKUN-PANITIA-001',
        verifikator_nama: 'Fairuz Tsani Habibi, S.Kom.',
        putaran_ke: 1,
        hasil: 'LENGKAP',
        catatan: 'Seluruh berkas lengkap dan sesuai ketentuan. Lanjut ke proses penyusunan draft SK.',
        tgl_verifikasi: '2026-09-27 11:20:00'
      }
    ],
    skLisensi: {
      id: 'SK-MITRA-004-DRAFT',
      pengajuan_id: 'PML-2026-00112',
      no_sk: 'SK.408/SPPR-MITRA/X/2026',
      tgl_sk: '2026-10-04',
      masa_berlaku_baru: '2031-10-25',
      file_sk: '/sk/draft_sk_dewi_lestari.pdf',
      status_draft: 'DRAFT'
    },
    riwayatStatus: [
      {
        id: 'LOG-004-1',
        pengajuan_id: 'PML-2026-00112',
        status_lama: 'BARU',
        status_baru: 'DIAJUKAN',
        alasan: 'SB mengajukan permohonan perpanjangan.',
        diubah_oleh: 'AKUN-SB-004',
        diubah_oleh_nama: 'Dewi Lestari, A.Md.',
        tgl_ubah: '2026-09-25 10:00:00'
      },
      {
        id: 'LOG-004-2',
        pengajuan_id: 'PML-2026-00112',
        status_lama: 'DIAJUKAN',
        status_baru: 'DALAM_VERIFIKASI',
        alasan: 'Pemeriksaan berkas oleh verifikator.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-09-26 14:00:00'
      },
      {
        id: 'LOG-004-3',
        pengajuan_id: 'PML-2026-00112',
        status_lama: 'DALAM_VERIFIKASI',
        status_baru: 'PROSES_SK',
        alasan: 'Berkas dinyatakan lengkap dan valid. Sistem otomatis menyusun draft SK Lisensi baru.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-09-27 11:20:00'
      }
    ]
  },

  // 5. Ahmad Fauzan - SK_TERBIT
  {
    id: 'PML-2026-00015',
    lisensi_id: 'LIC-005',
    tgl_pengajuan: '2026-09-15 08:30:00',
    status: 'SK_TERBIT',
    catatan_sb: 'Perpanjangan berkala lisensi 5 tahunan Surveyor Kadaster DKI.',
    surveyor: SEED_SURVEYOR[4],
    lisensi: SEED_LISENSI[4],
    slaHariTersisa: 0,
    slaTerlewat: false,
    berkas: [
      {
        id: 'DOK-005-KTP',
        pengajuan_id: 'PML-2026-00015',
        jenis_berkas: 'Kartu Tanda Penduduk (KTP)',
        tipe_file: 'PDF',
        path_file: '/dokumen/ktp_ahmad_fauzan.pdf',
        status_berkas: 'SESUAI',
        ukuran: '1.4 MB',
        tgl_upload: '2026-09-15 08:15'
      },
      {
        id: 'DOK-005-SKK',
        pengajuan_id: 'PML-2026-00015',
        jenis_berkas: 'Sertifikat Kompetensi Keahlian (SKK)',
        tipe_file: 'PDF',
        path_file: '/dokumen/skk_fauzan.pdf',
        status_berkas: 'SESUAI',
        ukuran: '2.5 MB',
        tgl_upload: '2026-09-15 08:20'
      },
      {
        id: 'DOK-005-SKL',
        pengajuan_id: 'PML-2026-00015',
        jenis_berkas: 'SK Lisensi Lama (01-SKB-SPPR/2022)',
        tipe_file: 'PDF',
        path_file: '/dokumen/sk_lama_01.pdf',
        status_berkas: 'SESUAI',
        ukuran: '2.9 MB',
        tgl_upload: '2026-09-15 08:25'
      }
    ],
    riwayatVerifikasi: [
      {
        id: 'VER-005-1',
        pengajuan_id: 'PML-2026-00015',
        verifikator_id: 'AKUN-PANITIA-001',
        verifikator_nama: 'Fairuz Tsani Habibi, S.Kom.',
        putaran_ke: 1,
        hasil: 'LENGKAP',
        catatan: 'Dokumen lengkap dan valid. SK disetujui untuk diterbitkan.',
        tgl_verifikasi: '2026-09-18 10:00:00'
      }
    ],
    skLisensi: {
      id: 'SK-MITRA-005-FINAL',
      pengajuan_id: 'PML-2026-00015',
      no_sk: 'SK.392/SPPR-MITRA/IX/2026',
      tgl_sk: '2026-09-20',
      masa_berlaku_baru: '2031-09-20',
      file_sk: '/sk/sk_resmi_ahmad_fauzan.pdf',
      status_draft: 'TERBIT'
    },
    pengumuman: {
      id: 'ANN-005',
      sk_id: 'SK-MITRA-005-FINAL',
      judul: 'Penerbitan SK Perpanjangan Lisensi Surveyor Kadaster Ahmad Fauzan, S.T.',
      link_url: 'https://sppr.atrbpn.go.id/pengumuman/sk-392-2026',
      dipublikasi_oleh: 'AKUN-PANITIA-001',
      tgl_publikasi: '2026-09-20 14:00:00'
    },
    riwayatStatus: [
      {
        id: 'LOG-005-1',
        pengajuan_id: 'PML-2026-00015',
        status_lama: 'BARU',
        status_baru: 'DIAJUKAN',
        alasan: 'SB mengajukan permohonan.',
        diubah_oleh: 'AKUN-SB-005',
        diubah_oleh_nama: 'Ahmad Fauzan, S.T.',
        tgl_ubah: '2026-09-15 08:30:00'
      },
      {
        id: 'LOG-005-2',
        pengajuan_id: 'PML-2026-00015',
        status_lama: 'DIAJUKAN',
        status_baru: 'DALAM_VERIFIKASI',
        alasan: 'Pemeriksaan oleh verifikator.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-09-16 09:00:00'
      },
      {
        id: 'LOG-005-3',
        pengajuan_id: 'PML-2026-00015',
        status_lama: 'DALAM_VERIFIKASI',
        status_baru: 'PROSES_SK',
        alasan: 'Hasil pemeriksaan berkas: LENGKAP. Draft SK disusun.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-09-18 10:00:00'
      },
      {
        id: 'LOG-005-4',
        pengajuan_id: 'PML-2026-00015',
        status_lama: 'PROSES_SK',
        status_baru: 'SK_TERBIT',
        alasan: 'Panitia menandatangani dan menerbitkan SK No. SK.392/SPPR-MITRA/IX/2026. Tautan pengumuman dipublikasikan. Masa berlaku lisensi otomatis diperbarui sistem hingga 2031.',
        diubah_oleh: 'AKUN-PANITIA-001',
        diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
        tgl_ubah: '2026-09-20 14:00:00'
      }
    ]
  }
];

// 5. DATA NOTIFIKASI
export const SEED_NOTIFIKASI_MITRA: NotifikasiMitra[] = [
  {
    id: 'NTF-001',
    akun_id: 'AKUN-SB-001',
    pengajuan_id: 'PML-2026-00125',
    jenis: 'PENGINGAT_H3',
    pesan: 'Pengingat Masa Berlaku Lisensi (H-3 Bulan): Lisensi Anda No. LIS-SB-2024-00125 akan berakhir pada 15 November 2026 (sisa 41 hari). Menu perpanjangan lisensi telah dibuka. Silakan ajukan perpanjangan segera.',
    sudah_dibaca: false,
    tgl_kirim: '2026-08-15 08:00:00'
  },
  {
    id: 'NTF-002',
    akun_id: 'AKUN-SB-003',
    pengajuan_id: 'PML-2026-00042',
    jenis: 'PERBAIKAN',
    pesan: 'Perbaikan Dokumen Persyaratan: Berkas pengajuan No. PML-2026-00042 memerlukan perbaikan pada dokumen Sertifikat Kompetensi Keahlian (SKK). Silakan periksa catatan verifikator dan unggah berkas revisi.',
    sudah_dibaca: false,
    tgl_kirim: '2026-09-30 15:45:00'
  },
  {
    id: 'NTF-003',
    akun_id: 'AKUN-SB-004',
    pengajuan_id: 'PML-2026-00112',
    jenis: 'PROSES_SK',
    pesan: 'Dokumen Persyaratan Lengkap: Berkas permohonan No. PML-2026-00112 dinyatakan lengkap dan sesuai ketentuan. SK perpanjangan lisensi sedang diproses oleh Panitia Ditjen SPPR.',
    sudah_dibaca: true,
    tgl_kirim: '2026-09-27 11:20:00'
  },
  {
    id: 'NTF-004',
    akun_id: 'AKUN-SB-005',
    pengajuan_id: 'PML-2026-00015',
    jenis: 'SK_TERBIT',
    pesan: 'SK Perpanjangan Lisensi Terbit: SK No. SK.392/SPPR-MITRA/IX/2026 telah resmi diterbitkan. Masa berlaku lisensi Anda telah diperpanjang hingga 20 September 2031. Silakan unduh SK dan tinjau tautan pengumuman resmi.',
    sudah_dibaca: true,
    tgl_kirim: '2026-09-20 14:00:00'
  }
];
