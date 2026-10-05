import {
  SurveyorModel,
  LisensiModel,
  RiwayatPekerjaanModel,
  KjsbModel,
  AsosiasiProfesiModel,
  RiwayatPendidikanModel,
  SertifikatPelatihanModel,
  RiwayatMagangModel,
  RiwayatPengangkatanModel,
  PengajuanPerubahanDataModel,
  PengajuanPerpanjanganModel,
  PengajuanPindahWilayahModel,
  SkLisensiModel,
  PengumumanModel,
  NotifikasiModel
} from '../types/aplikasiMitra.ts';

// 1. DATA 10 SURVEYOR DUMMY REALISTIS
export const SEED_SURVEYORS: SurveyorModel[] = [
  {
    id: 'SRV-001',
    nik: '1371041504940003',
    namaLengkap: 'Andi Pratama, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Padang',
    tanggalLahir: '15 April 1994',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Khatib Sulaiman No. 42, RT 02/RW 05, Ulak Karang Selatan, Kota Padang',
    email: 'andi.pratama@mitra-bpn.go.id',
    telepon: '0812-6789-1123',
    nomorRegistrasi: 'SB-2024-00125',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Sumatera Barat',
    statusAkun: 'AKTIF',
    statusValidasi: 'VALID',
    npwp: '84.921.304.2-201.000',
    pasFotoUrl: '/dokumen/pas_foto_andi.jpg'
  },
  {
    id: 'SRV-002',
    nik: '5171011010920005',
    namaLengkap: 'I Made Dananjaya, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Denpasar',
    tanggalLahir: '10 Oktober 1992',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Raya Renon No. 45, Denpasar Selatan, Kota Denpasar',
    email: 'made.dananjaya@mitra-bpn.go.id',
    telepon: '0813-3890-4412',
    nomorRegistrasi: 'SB-2021-00089',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Bali',
    statusAkun: 'AKTIF',
    statusValidasi: 'VALID',
    npwp: '73.112.409.1-903.000'
  },
  {
    id: 'SRV-003',
    nik: '3374020211910001',
    namaLengkap: 'Budi Santoso, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Semarang',
    tanggalLahir: '02 November 1991',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Pahlawan No. 12, Pleburan, Semarang Selatan, Kota Semarang',
    email: 'budi.santoso@mitra-bpn.go.id',
    telepon: '0812-9844-3321',
    nomorRegistrasi: 'SB-2021-00042',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Jawa Tengah',
    statusAkun: 'AKTIF',
    statusValidasi: 'PERLU_PERBAIKAN',
    npwp: '62.401.993.4-504.000'
  },
  {
    id: 'SRV-004',
    nik: '3578052510960002',
    namaLengkap: 'Dewi Lestari, A.Md.',
    gelarDepan: '',
    gelarBelakang: 'A.Md.',
    tempatLahir: 'Surabaya',
    tanggalLahir: '25 Oktober 1996',
    jenisKelamin: 'Perempuan',
    statusPerkawinan: 'Belum Menikah',
    alamat: 'Jl. Pemuda No. 78, Genteng, Kota Surabaya',
    email: 'dewi.lestari@mitra-bpn.go.id',
    telepon: '0821-4478-9901',
    nomorRegistrasi: 'ASK-2021-00112',
    kualifikasi: 'Asisten Surveyor Kadaster',
    wilayahKerja: 'Jawa Timur',
    statusAkun: 'AKTIF',
    statusValidasi: 'VALID',
    npwp: '91.802.341.5-609.000'
  },
  {
    id: 'SRV-005',
    nik: '3174061503900004',
    namaLengkap: 'Ahmad Fauzan, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Jakarta',
    tanggalLahir: '15 Maret 1990',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Kemang Raya No. 18, Mampang Prapatan, Jakarta Selatan',
    email: 'ahmad.fauzan@mitra-bpn.go.id',
    telepon: '0811-2334-5561',
    nomorRegistrasi: 'SB-2022-00015',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'DKI Jakarta',
    statusAkun: 'AKTIF',
    statusValidasi: 'VALID',
    npwp: '55.334.809.1-014.000'
  },
  {
    id: 'SRV-006',
    nik: '3273101001950007',
    namaLengkap: 'Hendra Wijaya, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Bandung',
    tanggalLahir: '10 Januari 1995',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Ir. H. Juanda No. 102, Dago, Coblong, Kota Bandung',
    email: 'hendra.wijaya@mitra-bpn.go.id',
    telepon: '0812-2234-8899',
    nomorRegistrasi: 'SB-2024-00009',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Jawa Barat',
    statusAkun: 'AKTIF',
    statusValidasi: 'VALID',
    npwp: '79.221.804.3-421.000'
  },
  {
    id: 'SRV-007',
    nik: '3471021408930006',
    namaLengkap: 'Siti Rahmawati, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Yogyakarta',
    tanggalLahir: '14 Agustus 1993',
    jenisKelamin: 'Perempuan',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Malioboro No. 67, Sosromenduran, Kota Yogyakarta',
    email: 'siti.rahmawati@mitra-bpn.go.id',
    telepon: '0813-7765-2210',
    nomorRegistrasi: 'SB-2023-00078',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'D.I. Yogyakarta',
    statusAkun: 'AKTIF',
    statusValidasi: 'VALID',
    npwp: '81.440.119.2-541.000'
  },
  {
    id: 'SRV-008',
    nik: '6471032009970002',
    namaLengkap: 'Rian Hidayat, A.Md.',
    gelarDepan: '',
    gelarBelakang: 'A.Md.',
    tempatLahir: 'Balikpapan',
    tanggalLahir: '20 September 1997',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Belum Menikah',
    alamat: 'Jl. Jenderal Sudirman No. 89, Klandasan Ulu, Kota Balikpapan',
    email: 'rian.hidayat@mitra-bpn.go.id',
    telepon: '0852-3341-9002',
    nomorRegistrasi: 'ASK-2022-00063',
    kualifikasi: 'Asisten Surveyor Kadaster',
    wilayahKerja: 'Kalimantan Timur',
    statusAkun: 'AKTIF',
    statusValidasi: 'DALAM_VERIFIKASI',
    npwp: '94.103.778.6-721.000'
  },
  {
    id: 'SRV-009',
    nik: '7371050505940008',
    namaLengkap: 'Muhammad Rizky, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Makassar',
    tanggalLahir: '05 Mei 1994',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Urip Sumoharjo No. 34, Panakkukang, Kota Makassar',
    email: 'm.rizky@mitra-bpn.go.id',
    telepon: '0811-4567-8910',
    nomorRegistrasi: 'SB-2024-00141',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Sulawesi Selatan',
    statusAkun: 'AKTIF',
    statusValidasi: 'VALID',
    npwp: '72.901.345.1-801.000'
  },
  {
    id: 'SRV-010',
    nik: '1271011802880003',
    namaLengkap: 'Fajar Nugroho, S.T.',
    gelarDepan: '',
    gelarBelakang: 'S.T.',
    tempatLahir: 'Medan',
    tanggalLahir: '18 Februari 1988',
    jenisKelamin: 'Laki-laki',
    statusPerkawinan: 'Menikah',
    alamat: 'Jl. Gatot Subroto No. 51, Sei Sikambing, Kota Medan',
    email: 'fajar.nugroho@mitra-bpn.go.id',
    telepon: '0812-6019-3382',
    nomorRegistrasi: 'SB-2020-00031',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Sumatera Utara',
    statusAkun: 'MENUNGGU_VERIFIKASI',
    statusValidasi: 'BELUM_VALIDASI',
    npwp: '51.344.209.4-112.000'
  }
];

// 2. DATA LISENSI
export const SEED_LISENSI_LIST: LisensiModel[] = [
  {
    id: 'LIC-001',
    surveyorId: 'SRV-001',
    nomorLisensi: 'LIS-SB-2024-00125',
    tanggalTerbit: '15 April 2024',
    tanggalBerakhir: '15 November 2026',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 41,
    bisaPerpanjang: true // <= 90 hari
  },
  {
    id: 'LIC-002',
    surveyorId: 'SRV-002',
    nomorLisensi: '27-SKB-SPPR/2021',
    tanggalTerbit: '10 Oktober 2021',
    tanggalBerakhir: '10 Oktober 2026',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 5,
    bisaPerpanjang: true
  },
  {
    id: 'LIC-003',
    surveyorId: 'SRV-003',
    nomorLisensi: '18-SKB-SPPR/2021',
    tanggalTerbit: '02 November 2021',
    tanggalBerakhir: '02 November 2026',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 28,
    bisaPerpanjang: true
  },
  {
    id: 'LIC-004',
    surveyorId: 'SRV-004',
    nomorLisensi: '39-ASK-SPPR/2021',
    tanggalTerbit: '25 Oktober 2021',
    tanggalBerakhir: '25 Oktober 2026',
    status: 'HAMPIR_BERAKHIR',
    sisaHari: 20,
    bisaPerpanjang: true
  },
  {
    id: 'LIC-005',
    surveyorId: 'SRV-005',
    nomorLisensi: '01-SKB-SPPR/2022',
    tanggalTerbit: '15 Maret 2022',
    tanggalBerakhir: '20 September 2031',
    status: 'AKTIF',
    sisaHari: 1812,
    bisaPerpanjang: false
  },
  {
    id: 'LIC-006',
    surveyorId: 'SRV-006',
    nomorLisensi: '55-SKB-SPPR/2024',
    tanggalTerbit: '10 Januari 2024',
    tanggalBerakhir: '10 Januari 2029',
    status: 'AKTIF',
    sisaHari: 827,
    bisaPerpanjang: false
  },
  {
    id: 'LIC-007',
    surveyorId: 'SRV-007',
    nomorLisensi: '78-SKB-SPPR/2023',
    tanggalTerbit: '14 Agustus 2023',
    tanggalBerakhir: '14 Agustus 2028',
    status: 'AKTIF',
    sisaHari: 678,
    bisaPerpanjang: false
  },
  {
    id: 'LIC-008',
    surveyorId: 'SRV-008',
    nomorLisensi: '63-ASK-SPPR/2022',
    tanggalTerbit: '20 September 2022',
    tanggalBerakhir: '20 September 2027',
    status: 'AKTIF',
    sisaHari: 350,
    bisaPerpanjang: false
  },
  {
    id: 'LIC-009',
    surveyorId: 'SRV-009',
    nomorLisensi: '141-SKB-SPPR/2024',
    tanggalTerbit: '05 Mei 2024',
    tanggalBerakhir: '05 Mei 2029',
    status: 'AKTIF',
    sisaHari: 942,
    bisaPerpanjang: false
  },
  {
    id: 'LIC-010',
    surveyorId: 'SRV-010',
    nomorLisensi: '31-SKB-SPPR/2020',
    tanggalTerbit: '18 Februari 2020',
    tanggalBerakhir: '18 Februari 2025',
    status: 'KEDALUWARSA',
    sisaHari: 0,
    bisaPerpanjang: true
  }
];

// 3. RIWAYAT PEKERJAAN (ANDI PRATAMA)
export const SEED_PEKERJAAN_ANDI: RiwayatPekerjaanModel[] = [
  {
    id: 'JOB-001',
    surveyorId: 'SRV-001',
    jenisPekerjaan: 'Pengukuran dan Pemetaan Bidang Tanah PTSL Partisipatif',
    jenisKontrak: 'Kontrak Pemerintah (PTSL)',
    instansiPerusahaan: 'Kantor Pertanahan Kabupaten Padang Pariaman',
    lokasi: 'Kecamatan Enam Lingkung, Padang Pariaman',
    periodeMulai: 'Januari 2024',
    periodeSelesai: 'Oktober 2024',
    status: 'Selesai'
  },
  {
    id: 'JOB-002',
    surveyorId: 'SRV-001',
    jenisPekerjaan: 'Survei Kadastral Pengadaan Tanah Tol Padang-Sicincin',
    jenisKontrak: 'Konsultansi',
    instansiPerusahaan: 'PT Hutama Karya (Persero) Infrastruktur',
    lokasi: 'Kabupaten Padang Pariaman',
    periodeMulai: 'Maret 2023',
    periodeSelesai: 'Desember 2023',
    status: 'Selesai'
  },
  {
    id: 'JOB-003',
    surveyorId: 'SRV-001',
    jenisPekerjaan: 'Pemetaan Batas Desa dan Kawasan Pesisir Mandeh',
    jenisKontrak: 'Kontrak Pemerintah (PTSL)',
    instansiPerusahaan: 'Dinas Perumahan Rakyat & Tata Ruang Prov. Sumbar',
    lokasi: 'Kabupaten Pesisir Selatan',
    periodeMulai: 'Agustus 2022',
    periodeSelesai: 'Februari 2023',
    status: 'Selesai'
  },
  {
    id: 'JOB-004',
    surveyorId: 'SRV-001',
    jenisPekerjaan: 'Pengukuran Bidang Tanah Rutin & Pengembalian Batas',
    jenisKontrak: 'Mandiri',
    instansiPerusahaan: 'KJSB Pratama Geodesi Nusantara',
    lokasi: 'Kota Padang & Kota Bukittinggi',
    periodeMulai: 'Januari 2025',
    periodeSelesai: 'Sekarang',
    status: 'Sedang Berjalan'
  }
];

// 4. KJSB & ASOSIASI (ANDI PRATAMA)
export const SEED_KJSB_ANDI: KjsbModel = {
  id: 'KJSB-001',
  namaKJSB: 'Kantor Jasa Surveyor Berlisensi Pratama Geodesi Nusantara',
  nomorSKKemenkumham: 'AHU-0019284.AH.02.01.TAHUN 2023',
  nomorIzinATR: '12/Izin-KJSB/SPPR/2023',
  periode: '2023 - Sekarang',
  jabatan: 'Pemimpin Rekan',
  status: 'Aktif',
  dokumenSKUrl: '/dokumen/sk_kjsb_pratama.pdf'
};

export const SEED_ASOSIASI_ANDI: AsosiasiProfesiModel = {
  id: 'ASO-001',
  namaAsosiasi: 'Ikatan Surveyor Indonesia (ISI) Pengwil Sumatera Barat',
  nomorKeanggotaan: 'ISI-SB-2018-0914',
  tanggalBerlaku: '31 Desember 2027',
  status: 'Aktif',
  kartuKeanggotaanUrl: '/dokumen/kartu_anggota_isi_andi.pdf'
};

// 5. RIWAYAT PENDIDIKAN & SERTIFIKAT (ANDI PRATAMA)
export const SEED_PENDIDIKAN_ANDI: RiwayatPendidikanModel[] = [
  {
    id: 'EDU-001',
    jenjang: 'S1 Teknik Geodesi/Geomatika',
    institusi: 'Institut Teknologi Bandung (ITB)',
    programStudi: 'Teknik Geodesi dan Geomatika',
    tahunMasuk: '2012',
    tahunLulus: '2016',
    nomorIjazah: 'ITB/FTSL/S1/2016/0491',
    status: 'Terverifikasi',
    fileIjazahUrl: '/dokumen/ijazah_s1_geodesi_itb.pdf'
  },
  {
    id: 'EDU-002',
    jenjang: 'S2 Geodesi',
    institusi: 'Universitas Gadjah Mada (UGM)',
    programStudi: 'Magister Teknik Geomatika',
    tahunMasuk: '2018',
    tahunLulus: '2020',
    nomorIjazah: 'UGM/FT/S2/2020/0118',
    status: 'Terverifikasi',
    fileIjazahUrl: '/dokumen/ijazah_s2_geomatika_ugm.pdf'
  }
];

export const SEED_SERTIFIKAT_ANDI: SertifikatPelatihanModel[] = [
  {
    id: 'CERT-001',
    namaSertifikat: 'Sertifikat Kompetensi Kerja (SKK) Jenjang 7 Surveyor Kadaster Madya',
    jenis: 'Uji Kompetensi LSP',
    nomorSertifikat: 'SKK-LSP-GEO-2024-0419',
    tanggal: '10 Februari 2024',
    lembagaPenerbit: 'Lembaga Sertifikasi Profesi (LSP) Geomatika BNSP',
    status: 'Aktif',
    fileUrl: '/dokumen/skk_kadaster_andi.pdf'
  },
  {
    id: 'CERT-002',
    namaSertifikat: 'Pelatihan GNSS Real-Time Kinematic (RTK) untuk Kadaster Berlisensi',
    jenis: 'GNSS Terestrial',
    nomorSertifikat: 'PEL/SPPR/GNSS/2023/089',
    tanggal: '15 September 2023',
    lembagaPenerbit: 'Pusat Pengembangan SDM Kementerian ATR/BPN',
    status: 'Aktif',
    fileUrl: '/dokumen/sertifikat_gnss_atrbpn.pdf'
  },
  {
    id: 'CERT-003',
    namaSertifikat: 'Bimtek Pemanfaatan UAV/Drone untuk Pemetaan Tematik Bidang Tanah',
    jenis: 'Fotogrametri & Drone',
    nomorSertifikat: 'ISI-SUMBAR/UAV/2022/112',
    tanggal: '20 Agustus 2022',
    lembagaPenerbit: 'Ikatan Surveyor Indonesia (ISI)',
    status: 'Aktif',
    fileUrl: '/dokumen/sertifikat_drone_isi.pdf'
  }
];

// 6. RIWAYAT MAGANG (ANDI PRATAMA)
export const SEED_MAGANG_ANDI: RiwayatMagangModel = {
  id: 'MGN-001',
  namaInstansi: 'Kantor Pertanahan Kota Padang, Kementerian ATR/BPN',
  lokasi: 'Jl. Bagindo Aziz Chan No. 8, Aie Pacah, Kota Padang',
  waktuMulai: '01 Juli 2016',
  waktuSelesai: '31 Desember 2016',
  deskripsiKegiatan: 'Membantu proses pengukuran yuridis dan fisik bidang tanah sporadis, asistensi pembuatan surat ukur kadaster, kalibrasi instrumen Electronic Total Station (ETS), dan entri data spasial Geokkp.',
  pembimbing: 'Ir. Hendri Chaniago, M.Si. (Kepala Seksi Survei & Pemetaan)',
  suratKeteranganUrl: '/dokumen/surat_magang_kantah_padang.pdf',
  status: 'Selesai'
};

// 7. PENGANGKATAN (ANDI PRATAMA)
export const SEED_PENGANGKATAN_ANDI: RiwayatPengangkatanModel[] = [
  {
    id: 'SK-ANGKAT-001',
    nomorSK: 'SK.182/SPPR.2/IV/2024',
    tanggalSK: '15 April 2024',
    nomorBaPelantikan: 'BA.042/PLT-SB/SPPR/IV/2024',
    tanggalPelantikan: '18 April 2024',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Sumatera Barat',
    pejabatPengesah: 'Direktur Jenderal SPPR Kementerian ATR/BPN',
    status: 'Tetap',
    dokumenSKUrl: '/dokumen/sk_pengangkatan_andi.pdf',
    dokumenBAUrl: '/dokumen/ba_pelantikan_andi.pdf'
  },
  {
    id: 'SK-ANGKAT-002',
    nomorSK: 'SK.512/SPPR.2/X/2019',
    tanggalSK: '10 Oktober 2019',
    nomorBaPelantikan: 'BA.119/PLT-SB/SPPR/X/2019',
    tanggalPelantikan: '14 Oktober 2019',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Sumatera Barat',
    pejabatPengesah: 'Direktur Jenderal SPPR Kementerian ATR/BPN',
    status: 'Pembaruan',
    dokumenSKUrl: '/dokumen/sk_pengangkatan_lama.pdf'
  }
];

// 8. PENGAJUAN PERUBAHAN DATA (VALIDASI)
export const SEED_PERUBAHAN_DATA: PengajuanPerubahanDataModel[] = [
  {
    id: 'VAL-2026-0041',
    surveyorId: 'SRV-001',
    tanggalPengajuan: '02 Oktober 2026',
    dataLama: 'Alamat: Jl. Pemuda No. 14, Padang Barat, Kota Padang',
    dataBaru: 'Alamat: Jl. Khatib Sulaiman No. 42, Ulak Karang Selatan, Kota Padang',
    alasanPerubahan: 'Pemindahan kantor operasional KJSB Pratama Geodesi Nusantara ke lokasi baru yang lebih representatif.',
    dokumenPendukungUrl: '/dokumen/surat_domisili_kjsb.pdf',
    status: 'VALID',
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalValidasi: '03 Oktober 2026',
    catatanVerifikator: 'Surat domisili kantor KJSB terverifikasi valid dan sesuai ketentuan.'
  }
];

// 9. PENGAJUAN PERPANJANGAN LISENSI
export const SEED_PENGAJUAN_PERPANJANGAN: PengajuanPerpanjanganModel[] = [
  {
    id: 'PML-2026-00125',
    surveyorId: 'SRV-001',
    surveyorNama: 'Andi Pratama, S.T.',
    nomorRegistrasi: 'SB-2024-00125',
    nomorLisensi: 'LIS-SB-2024-00125',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Sumatera Barat',
    tanggalPengajuan: '03 Oktober 2026',
    status: 'DIAJUKAN',
    catatanSB: 'Permohonan perpanjangan lisensi Surveyor Kadaster periode 2026-2031 wilayah kerja Sumatera Barat. Berkas telah diunggah lengkap sesuai Permen ATR/BPN No. 9/2026.',
    putaranKe: 1,
    berkas: [
      {
        id: 'DOK-01',
        jenisBerkas: 'Kartu Tanda Penduduk (KTP)',
        namaFile: 'KTP_Andi_Pratama.pdf',
        tipeFile: 'PDF',
        ukuran: '1.2 MB',
        statusBerkas: 'MENUNGGU',
        tanggalUpload: '03 Oktober 2026'
      },
      {
        id: 'DOK-02',
        jenisBerkas: 'Sertifikat Kompetensi Keahlian (SKK) Kadaster',
        namaFile: 'SKK_Kadaster_Andi_2026.pdf',
        tipeFile: 'PDF',
        ukuran: '2.5 MB',
        statusBerkas: 'MENUNGGU',
        tanggalUpload: '03 Oktober 2026'
      },
      {
        id: 'DOK-03',
        jenisBerkas: 'SK Lisensi Lama (LIS-SB-2024-00125)',
        namaFile: 'SK_Lisensi_Lama_Andi.pdf',
        tipeFile: 'PDF',
        ukuran: '3.1 MB',
        statusBerkas: 'MENUNGGU',
        tanggalUpload: '03 Oktober 2026'
      },
      {
        id: 'DOK-04',
        jenisBerkas: 'Surat Rekomendasi Asosiasi Profesi (ISI)',
        namaFile: 'Rekomendasi_ISI_Sumbar.pdf',
        tipeFile: 'PDF',
        ukuran: '1.4 MB',
        statusBerkas: 'MENUNGGU',
        tanggalUpload: '03 Oktober 2026'
      }
    ]
  },
  {
    id: 'PML-2026-00042',
    surveyorId: 'SRV-003',
    surveyorNama: 'Budi Santoso, S.T.',
    nomorRegistrasi: 'SB-2021-00042',
    nomorLisensi: '18-SKB-SPPR/2021',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Jawa Tengah',
    tanggalPengajuan: '28 September 2026',
    status: 'PERLU_PERBAIKAN',
    catatanSB: 'Permohonan perpanjangan lisensi wilayah Jateng.',
    putaranKe: 1,
    catatanVerifikator: 'Masa berlaku Sertifikat Kompetensi Kadaster telah kedaluwarsa pada Agustus 2026. Harap unggah bukti sertifikat resertifikasi terbaru dari LSP Geomatika.',
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalVerifikasi: '30 September 2026',
    berkas: [
      {
        id: 'DOK-B1',
        jenisBerkas: 'Kartu Tanda Penduduk (KTP)',
        namaFile: 'KTP_Budi_Santoso.pdf',
        tipeFile: 'PDF',
        ukuran: '1.1 MB',
        statusBerkas: 'SESUAI',
        tanggalUpload: '28 September 2026'
      },
      {
        id: 'DOK-B2',
        jenisBerkas: 'Sertifikat Kompetensi Keahlian (SKK) Kadaster',
        namaFile: 'SKK_Kadaster_Budi.pdf',
        tipeFile: 'PDF',
        ukuran: '2.4 MB',
        statusBerkas: 'TIDAK_SESUAI',
        catatanVerifikator: 'Sertifikat kadaluwarsa pada Agustus 2026. Unggah sertifikat terbaru.',
        tanggalUpload: '28 September 2026'
      },
      {
        id: 'DOK-B3',
        jenisBerkas: 'SK Lisensi Lama (18-SKB-SPPR/2021)',
        namaFile: 'SK_18_Santoso.pdf',
        tipeFile: 'PDF',
        ukuran: '3.0 MB',
        statusBerkas: 'SESUAI',
        tanggalUpload: '28 September 2026'
      }
    ]
  },
  {
    id: 'PML-2026-00089',
    surveyorId: 'SRV-002',
    surveyorNama: 'I Made Dananjaya, S.T.',
    nomorRegistrasi: 'SB-2021-00089',
    nomorLisensi: '27-SKB-SPPR/2021',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Bali',
    tanggalPengajuan: '01 Oktober 2026',
    status: 'DALAM_VERIFIKASI',
    putaranKe: 1,
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalVerifikasi: '02 Oktober 2026',
    berkas: [
      {
        id: 'DOK-M1',
        jenisBerkas: 'Kartu Tanda Penduduk (KTP)',
        namaFile: 'KTP_Dananjaya.pdf',
        tipeFile: 'PDF',
        ukuran: '1.2 MB',
        statusBerkas: 'SESUAI',
        tanggalUpload: '01 Oktober 2026'
      },
      {
        id: 'DOK-M2',
        jenisBerkas: 'Sertifikat Kompetensi Keahlian (SKK)',
        namaFile: 'SKK_Dananjaya_2026.pdf',
        tipeFile: 'PDF',
        ukuran: '2.6 MB',
        statusBerkas: 'SESUAI',
        tanggalUpload: '01 Oktober 2026'
      },
      {
        id: 'DOK-M3',
        jenisBerkas: 'SK Lisensi Lama',
        namaFile: 'SK_27_Bali.pdf',
        tipeFile: 'PDF',
        ukuran: '2.9 MB',
        statusBerkas: 'SESUAI',
        tanggalUpload: '01 Oktober 2026'
      }
    ]
  },
  {
    id: 'PML-2026-00112',
    surveyorId: 'SRV-004',
    surveyorNama: 'Dewi Lestari, A.Md.',
    nomorRegistrasi: 'ASK-2021-00112',
    nomorLisensi: '39-ASK-SPPR/2021',
    kualifikasi: 'Asisten Surveyor Kadaster',
    wilayahKerja: 'Jawa Timur',
    tanggalPengajuan: '25 September 2026',
    status: 'PROSES_SK',
    putaranKe: 1,
    catatanVerifikator: 'Berkas telah lengkap dan sah. Sedang proses pembuatan SK.',
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalVerifikasi: '27 September 2026',
    nomorSKBaru: 'SK.408/SPPR-MITRA/X/2026',
    tanggalSKBaru: '04 Oktober 2026',
    masaBerlakuBaru: '25 Oktober 2031',
    berkas: []
  },
  {
    id: 'PML-2026-00015',
    surveyorId: 'SRV-005',
    surveyorNama: 'Ahmad Fauzan, S.T.',
    nomorRegistrasi: 'SB-2022-00015',
    nomorLisensi: '01-SKB-SPPR/2022',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'DKI Jakarta',
    tanggalPengajuan: '15 September 2026',
    status: 'SK_TERBIT',
    putaranKe: 1,
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalVerifikasi: '18 September 2026',
    nomorSKBaru: 'SK.392/SPPR-MITRA/IX/2026',
    tanggalSKBaru: '20 September 2026',
    masaBerlakuBaru: '20 September 2031',
    linkPengumuman: 'https://sppr.atrbpn.go.id/pengumuman/sk-392-2026',
    berkas: []
  }
];

// 10. PENGAJUAN PINDAH WILAYAH KERJA
export const SEED_PINDAH_WILAYAH: PengajuanPindahWilayahModel[] = [
  {
    id: 'MUTASI-2026-0012',
    surveyorId: 'SRV-001',
    surveyorNama: 'Andi Pratama, S.T.',
    nomorLisensi: 'LIS-SB-2024-00125',
    wilayahAsal: 'Sumatera Barat',
    wilayahTujuan: 'Riau',
    alasanPindah: 'Pembukaan kantor cabang representatif KJSB Pratama di Kota Pekanbaru dan penugasan proyek survei batas kawasan perkebunan dan permukiman transmigrasi.',
    tanggalPengajuan: '20 September 2026',
    dokumenSuratRekomendasi: 'Rekomendasi_Kanwil_BPN_Riau.pdf',
    keterangan: 'Telah mendapatkan persetujuan awal dari Kepala Kantor Wilayah BPN Provinsi Riau.',
    status: 'DALAM_VERIFIKASI',
    catatanVerifikator: 'Menunggu kelengkapan berita acara verifikasi beban kerja dari Kanwil asal.'
  },
  {
    id: 'MUTASI-2026-0008',
    surveyorId: 'SRV-006',
    surveyorNama: 'Hendra Wijaya, S.T.',
    nomorLisensi: '55-SKB-SPPR/2024',
    wilayahAsal: 'Jawa Barat',
    wilayahTujuan: 'DKI Jakarta',
    alasanPindah: 'Konsentrasi penugasan pengukuran kadaster bidang tanah vertikal dan apartemen di Jakarta Pusat.',
    tanggalPengajuan: '15 Agustus 2026',
    dokumenSuratRekomendasi: 'Rekomendasi_Kanwil_DKI.pdf',
    status: 'DISETUJUI',
    catatanVerifikator: 'Seluruh syarat mutasi wilayah terpenuhi. SK Mutasi No. SK.219/MUTASI-SB/SPPR/IX/2026 telah terbit.',
    tanggalKeputusan: '05 September 2026'
  }
];

// 11. SK LISENSI
export const SEED_SK_LISENSI: SkLisensiModel[] = [
  {
    id: 'SK-001',
    pengajuanId: 'PML-2026-00015',
    surveyorNama: 'Ahmad Fauzan, S.T.',
    nomorLisensi: '01-SKB-SPPR/2022',
    nomorSK: 'SK.392/SPPR-MITRA/IX/2026',
    tanggalSK: '20 September 2026',
    masaBerlakuBaru: '20 September 2031',
    fileSKUrl: '/sk/sk_392_ahmad_fauzan.pdf',
    statusDraft: 'TERBIT'
  },
  {
    id: 'SK-002',
    pengajuanId: 'PML-2026-00112',
    surveyorNama: 'Dewi Lestari, A.Md.',
    nomorLisensi: '39-ASK-SPPR/2021',
    nomorSK: 'SK.408/SPPR-MITRA/X/2026',
    tanggalSK: '04 Oktober 2026',
    masaBerlakuBaru: '25 Oktober 2031',
    fileSKUrl: '/sk/draft_sk_dewi.pdf',
    statusDraft: 'DRAFT'
  }
];

// 12. PENGUMUMAN
export const SEED_PENGUMUMAN: PengumumanModel[] = [
  {
    id: 'ANN-001',
    judul: 'Penerbitan SK Perpanjangan Lisensi Surveyor Kadaster Periode September 2026',
    nomorSK: 'SK.392/SPPR-MITRA/IX/2026',
    surveyorNama: 'Ahmad Fauzan, S.T.',
    linkPengumuman: 'https://sppr.atrbpn.go.id/pengumuman/sk-392-2026',
    tanggalPublikasi: '20 September 2026',
    status: 'Terpublikasi'
  },
  {
    id: 'ANN-002',
    judul: 'Pemberitahuan Pembukaan Gelombang Perpanjangan Lisensi Kuartal IV 2026',
    nomorSK: 'SE.104/SPPR/X/2026',
    surveyorNama: 'Seluruh Surveyor Kadaster',
    linkPengumuman: 'https://sppr.atrbpn.go.id/pengumuman/edaran-perpanjangan-q4',
    tanggalPublikasi: '01 Oktober 2026',
    status: 'Terpublikasi'
  }
];

// 13. NOTIFIKASI REALISTIS
export const SEED_NOTIFIKASI: NotifikasiModel[] = [
  {
    id: 'NTF-001',
    kategori: 'Perpanjangan Lisensi',
    pesan: 'Lisensi Anda akan segera berakhir pada 15 November 2026 (tersisa 41 hari). Silakan lakukan pengajuan perpanjangan sebelum masa berlaku habis.',
    tanggalKirim: '01 Oktober 2026 08:00',
    sudahDibaca: false,
    linkPage: 'sb-perpanjangan'
  },
  {
    id: 'NTF-002',
    kategori: 'Validasi',
    pesan: 'Data Anda telah diverifikasi oleh verifikator Fairuz Tsani Habibi, S.Kom. Status validasi saat ini: VALID.',
    tanggalKirim: '03 Oktober 2026 14:15',
    sudahDibaca: false,
    linkPage: 'sb-validasi'
  },
  {
    id: 'NTF-003',
    kategori: 'Pindah Wilayah',
    pesan: 'Pengajuan pindah wilayah kerja Anda ke Kantor Wilayah BPN Provinsi Riau sedang dalam tahap verifikasi administrasi.',
    tanggalKirim: '22 September 2026 11:30',
    sudahDibaca: true,
    linkPage: 'sb-pindah-wilayah'
  },
  {
    id: 'NTF-004',
    kategori: 'Perbaikan Dokumen',
    pesan: 'Dokumen persyaratan perpanjangan lisensi No. PML-2026-00042 memerlukan perbaikan pada berkas Sertifikat Kompetensi.',
    tanggalKirim: '30 September 2026 15:45',
    sudahDibaca: true
  },
  {
    id: 'NTF-005',
    kategori: 'SK Terbit',
    pesan: 'Surat Keputusan (SK) perpanjangan lisensi No. SK.392/SPPR-MITRA/IX/2026 telah resmi diterbitkan oleh Ditjen SPPR.',
    tanggalKirim: '20 September 2026 14:00',
    sudahDibaca: true
  },
  {
    id: 'NTF-006',
    kategori: 'Informasi Sistem',
    pesan: 'Pemeliharaan berkala server database Aplikasi Mitra dijadwalkan pada hari Sabtu pukul 22.00 - 02.00 WIB.',
    tanggalKirim: '15 September 2026 09:00',
    sudahDibaca: true
  }
];
