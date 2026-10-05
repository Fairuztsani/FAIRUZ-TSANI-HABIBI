import { Surveyor, Permohonan, Notifikasi, WilayahStat } from '../types/index.ts';

export const SAMPLE_SURVEYORS: Surveyor[] = [
  {
    id: 'SRV-001',
    nik: '3174051204850003',
    namaLengkap: 'Ahmad Fauzan',
    gelar: 'S.T., M.Sc.',
    tempatLahir: 'Jakarta',
    tanggalLahir: '12 April 1985',
    alamat: 'Jl. Tebet Barat Dalam Raya No. 42, Tebet, Jakarta Selatan, DKI Jakarta',
    email: 'ahmad.fauzan@kjsb-mitra.id',
    telepon: '0812-8877-6655',
    nomorLisensi: '01-SKB-SPPR/2022',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi DKI Jakarta',
    kantorPertanahan: 'Kantor Pertanahan Kota Administrasi Jakarta Selatan',
    bentukUsaha: 'Kantor Jasa Surveyor Berlisensi (KJSB)',
    namaKJSB: 'KJSB Ahmad Fauzan & Rekan',
    nomorSKKJSB: 'SK.512/KJSB/SPPR/2021',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)',
    tanggalTerbit: '15 Maret 2022',
    tanggalBerakhir: '15 Maret 2027',
    statusLisensi: 'Aktif',
    dokumen: [
      {
        id: 'DOK-001-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Ahmad_Fauzan_3174.pdf',
        nomorDokumen: '3174051204850003',
        ukuran: '1.4 MB',
        tanggalUpload: '10 Maret 2022',
        statusVerifikasi: 'Sesuai',
        keterangan: 'E-KTP terdaftar aktif di Dukcapil'
      },
      {
        id: 'DOK-001-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Keahlian_Kadaster_LSP_ISI.pdf',
        nomorDokumen: 'SKK-GEO-2022-0941',
        ukuran: '2.8 MB',
        tanggalUpload: '10 Maret 2022',
        statusVerifikasi: 'Sesuai',
        keterangan: 'Sertifikat Keahlian Kerja Jenjang 8 Geodesi'
      },
      {
        id: 'DOK-001-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Surveyor_Kadaster_2022.pdf',
        nomorDokumen: '01-SKB-SPPR/2022',
        ukuran: '3.1 MB',
        tanggalUpload: '15 Maret 2022',
        statusVerifikasi: 'Sesuai',
        keterangan: 'SK Ditjen SPPR Kementerian ATR/BPN'
      },
      {
        id: 'DOK-001-IJZ',
        jenis: 'Ijazah Geodesi',
        namaFile: 'Ijazah_S1_Teknik_Geodesi_ITB.pdf',
        nomorDokumen: 'IJZ/FTI/GD/2007/0411',
        ukuran: '2.1 MB',
        tanggalUpload: '10 Maret 2022',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-001-PEND',
        jenis: 'Dokumen Pendukung',
        namaFile: 'Rekomendasi_Asosiasi_Profesi_ISI_2022.pdf',
        nomorDokumen: 'REK/ISI-DKI/II/2022',
        ukuran: '890 KB',
        tanggalUpload: '10 Maret 2022',
        statusVerifikasi: 'Sesuai'
      }
    ],
    catatan: 'Surveyor aktif dengan rekam jejak pengukuran PTSL dan pemetaan batas bidang sangat baik.'
  },
  {
    id: 'SRV-002',
    nik: '3273012808880004',
    namaLengkap: 'Budi Santoso',
    gelar: 'S.T.',
    tempatLahir: 'Bandung',
    tanggalLahir: '28 Agustus 1988',
    alamat: 'Jl. Riau No. 115, Cihapit, Bandung, Jawa Barat',
    email: 'budi.santoso.surveyor@gmail.com',
    telepon: '0813-2211-9988',
    nomorLisensi: '18-SKB-SPPR/2021',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Jawa Barat',
    kantorPertanahan: 'Kantor Pertanahan Kota Bandung',
    bentukUsaha: 'Perorangan',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)',
    tanggalTerbit: '02 November 2021',
    tanggalBerakhir: '02 November 2026',
    statusLisensi: 'Akan Berakhir',
    dokumen: [
      {
        id: 'DOK-002-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Budi_Santoso_3273.pdf',
        nomorDokumen: '3273012808880004',
        ukuran: '1.2 MB',
        tanggalUpload: '20 Oktober 2021',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-002-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Kompetensi_Kadaster_2021.pdf',
        nomorDokumen: 'SKK-GEO-2021-0428',
        ukuran: '2.4 MB',
        tanggalUpload: '20 Oktober 2021',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-002-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Budi_Santoso_2021.pdf',
        nomorDokumen: '18-SKB-SPPR/2021',
        ukuran: '2.9 MB',
        tanggalUpload: '02 November 2021',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-002-PEND',
        jenis: 'Dokumen Pendukung',
        namaFile: 'Buku_Log_Pengukuran_Kadaster_2025.pdf',
        ukuran: '4.5 MB',
        tanggalUpload: '15 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      }
    ],
    catatan: 'Lisensi akan berakhir dalam 30 hari. Berkas perpanjangan sedang dalam pengajuan verifikasi.'
  },
  {
    id: 'SRV-003',
    nik: '3578024503920001',
    namaLengkap: 'Rina Maharani',
    gelar: 'S.T.',
    tempatLahir: 'Surabaya',
    tanggalLahir: '15 Maret 1992',
    alamat: 'Jl. Manyar Kertoarjo IX No. 18, Gubeng, Surabaya, Jawa Timur',
    email: 'rina.maharani@geomatika-id.com',
    telepon: '0811-3456-7890',
    nomorLisensi: '42-SKB-SPPR/2023',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Jawa Timur',
    kantorPertanahan: 'Kantor Pertanahan Kota Surabaya I',
    bentukUsaha: 'Kantor Jasa Surveyor Berlisensi (KJSB)',
    namaKJSB: 'KJSB Geomatika Nusantara',
    nomorSKKJSB: 'SK.280/KJSB/SPPR/2023',
    asosiasiProfesi: 'Asosiasi Perusahaan Survei Pertanahan (APSRT)',
    tanggalTerbit: '18 Juli 2023',
    tanggalBerakhir: '18 Juli 2028',
    statusLisensi: 'Aktif',
    dokumen: [
      {
        id: 'DOK-003-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Rina_Maharani_3578.pdf',
        nomorDokumen: '3578024503920001',
        ukuran: '1.6 MB',
        tanggalUpload: '05 Juli 2023',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-003-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Keahlian_Kadaster_ITS.pdf',
        nomorDokumen: 'SKK-GEO-2023-1188',
        ukuran: '2.5 MB',
        tanggalUpload: '05 Juli 2023',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-003-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Rina_Maharani_2023.pdf',
        nomorDokumen: '42-SKB-SPPR/2023',
        ukuran: '3.0 MB',
        tanggalUpload: '18 Juli 2023',
        statusVerifikasi: 'Sesuai'
      }
    ]
  },
  {
    id: 'SRV-004',
    nik: '3374021706950007',
    namaLengkap: 'Dimas Pratama',
    gelar: 'A.Md.',
    tempatLahir: 'Semarang',
    tanggalLahir: '17 Juni 1995',
    alamat: 'Jl. Pamularsih Raya No. 56, Semarang Barat, Kota Semarang, Jawa Tengah',
    email: 'dimas.pratama.survey@gmail.com',
    telepon: '0857-1234-9876',
    nomorLisensi: '91-ASKB-SPPR/2024',
    kualifikasi: 'Asisten Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Jawa Tengah',
    kantorPertanahan: 'Kantor Pertanahan Kota Semarang',
    bentukUsaha: 'Perorangan',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)',
    tanggalTerbit: '12 Januari 2024',
    tanggalBerakhir: '12 Januari 2029',
    statusLisensi: 'Aktif',
    dokumen: [
      {
        id: 'DOK-004-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Dimas_Pratama.pdf',
        nomorDokumen: '3374021706950007',
        ukuran: '1.1 MB',
        tanggalUpload: '02 Januari 2024',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-004-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Asisten_Kadaster_BNSP.pdf',
        nomorDokumen: 'ASK-GEO-2023-0091',
        ukuran: '2.1 MB',
        tanggalUpload: '02 Januari 2024',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-004-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Dimas_Pratama_2024.pdf',
        nomorDokumen: '91-ASKB-SPPR/2024',
        ukuran: '2.7 MB',
        tanggalUpload: '12 Januari 2024',
        statusVerifikasi: 'Sesuai'
      }
    ]
  },
  {
    id: 'SRV-005',
    nik: '1271035010900002',
    namaLengkap: 'Siti Rahmawati',
    gelar: 'S.T.',
    tempatLahir: 'Medan',
    tanggalLahir: '10 Oktober 1990',
    alamat: 'Jl. Brigjend Katamso No. 88, Medan Maimun, Kota Medan, Sumatera Utara',
    email: 'siti.rahmawati.geo@gmail.com',
    telepon: '0812-6011-2233',
    nomorLisensi: '33-SKB-SPPR/2023',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Sumatera Utara',
    kantorPertanahan: 'Kantor Pertanahan Kota Medan',
    bentukUsaha: 'Kantor Jasa Surveyor Berlisensi (KJSB)',
    namaKJSB: 'KJSB Deli Survey Konsultan',
    nomorSKKJSB: 'SK.190/KJSB/SPPR/2023',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)',
    tanggalTerbit: '05 Mei 2023',
    tanggalBerakhir: '05 Mei 2028',
    statusLisensi: 'Aktif',
    dokumen: [
      {
        id: 'DOK-005-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Siti_Rahmawati_1271.pdf',
        nomorDokumen: '1271035010900002',
        ukuran: '1.3 MB',
        tanggalUpload: '20 April 2023',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-005-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Keahlian_Kadaster_USU.pdf',
        nomorDokumen: 'SKK-GEO-2023-0505',
        ukuran: '2.6 MB',
        tanggalUpload: '20 April 2023',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-005-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Siti_Rahmawati.pdf',
        nomorDokumen: '33-SKB-SPPR/2023',
        ukuran: '3.2 MB',
        tanggalUpload: '05 Mei 2023',
        statusVerifikasi: 'Sesuai'
      }
    ]
  },
  {
    id: 'SRV-006',
    nik: '5171010502890008',
    namaLengkap: 'I Made Dananjaya',
    gelar: 'S.T.',
    tempatLahir: 'Denpasar',
    tanggalLahir: '05 Februari 1989',
    alamat: 'Jl. Teuku Umar Barat No. 71, Denpasar Barat, Kota Denpasar, Bali',
    email: 'made.dananjaya@baligeo.co.id',
    telepon: '0819-3300-1122',
    nomorLisensi: '27-SKB-SPPR/2021',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Bali',
    kantorPertanahan: 'Kantor Pertanahan Kota Denpasar',
    bentukUsaha: 'Perorangan',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)',
    tanggalTerbit: '10 Oktober 2021',
    tanggalBerakhir: '10 Oktober 2026',
    statusLisensi: 'Akan Berakhir',
    dokumen: [
      {
        id: 'DOK-006-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_I_Made_Dananjaya.pdf',
        nomorDokumen: '5171010502890008',
        ukuran: '1.5 MB',
        tanggalUpload: '01 Oktober 2021',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-006-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Made_Dananjaya.pdf',
        nomorDokumen: '27-SKB-SPPR/2021',
        ukuran: '2.8 MB',
        tanggalUpload: '10 Oktober 2021',
        statusVerifikasi: 'Sesuai'
      }
    ]
  },
  {
    id: 'SRV-007',
    nik: '6472011909870005',
    namaLengkap: 'Hendra Kusuma',
    gelar: 'S.T.',
    tempatLahir: 'Samarinda',
    tanggalLahir: '19 September 1987',
    alamat: 'Jl. Pahlawan No. 23, Dadi Mulya, Kota Samarinda, Kalimantan Timur',
    email: 'hendra.kusuma@borneosurvey.id',
    telepon: '0852-4455-6677',
    nomorLisensi: '15-SKB-SPPR/2022',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Kalimantan Timur',
    kantorPertanahan: 'Kantor Pertanahan Kota Samarinda (Wilayah IKN)',
    bentukUsaha: 'Kantor Jasa Surveyor Berlisensi (KJSB)',
    namaKJSB: 'KJSB Mahakam Pemetaan Mandiri',
    nomorSKKJSB: 'SK.305/KJSB/SPPR/2022',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)',
    tanggalTerbit: '14 Agustus 2022',
    tanggalBerakhir: '14 Agustus 2027',
    statusLisensi: 'Aktif',
    dokumen: [
      {
        id: 'DOK-007-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Hendra_Kusuma.pdf',
        nomorDokumen: '6472011909870005',
        ukuran: '1.3 MB',
        tanggalUpload: '01 Agustus 2022',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-007-SERT',
        jenis: 'Sertifikat',
        namaFile: 'SKK_Kadaster_Hendra_Kusuma.pdf',
        ukuran: '2.4 MB',
        tanggalUpload: '01 Agustus 2022',
        statusVerifikasi: 'Sesuai'
      }
    ]
  },
  {
    id: 'SRV-008',
    nik: '7371052211910006',
    namaLengkap: 'Faisal Basri',
    gelar: 'S.T.',
    tempatLahir: 'Makassar',
    tanggalLahir: '22 November 1991',
    alamat: 'Jl. Pettarani No. 99, Panakkukang, Kota Makassar, Sulawesi Selatan',
    email: 'faisal.basri.surveyor@gmail.com',
    telepon: '0812-4211-3344',
    nomorLisensi: '61-SKB-SPPR/2020',
    kualifikasi: 'Surveyor Kadaster',
    wilayahKerja: 'Kantor Wilayah BPN Provinsi Sulawesi Selatan',
    kantorPertanahan: 'Kantor Pertanahan Kota Makassar',
    bentukUsaha: 'Perorangan',
    asosiasiProfesi: 'Ikatan Surveyor Indonesia (ISI)',
    tanggalTerbit: '18 September 2020',
    tanggalBerakhir: '18 September 2025',
    statusLisensi: 'Kedaluwarsa',
    dokumen: [
      {
        id: 'DOK-008-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Faisal_Basri.pdf',
        nomorDokumen: '7371052211910006',
        ukuran: '1.2 MB',
        tanggalUpload: '10 September 2020',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-008-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Kadaluwarsa_Faisal.pdf',
        nomorDokumen: '61-SKB-SPPR/2020',
        ukuran: '2.8 MB',
        tanggalUpload: '18 September 2020',
        statusVerifikasi: 'Sesuai'
      }
    ],
    catatan: 'Lisensi kedaluwarsa lebih dari 1 tahun. Telah mengajukan permohonan lisensi kembali.'
  }
];

export const SAMPLE_PERMOHONAN: Permohonan[] = [
  {
    id: 'REQ-2026-0041',
    nomorPermohonan: 'PMH/SPPR/2026/09/0142',
    surveyorId: 'SRV-002',
    namaSurveyor: 'Budi Santoso',
    nik: '3273012808880004',
    jenisPermohonan: 'Perpanjangan Lisensi',
    tanggalPengajuan: '28 September 2026',
    status: 'Menunggu Verifikasi',
    nomorLisensiLama: '18-SKB-SPPR/2021',
    wilayahDiajukan: 'Kantor Wilayah BPN Provinsi Jawa Barat',
    kualifikasiDiajukan: 'Surveyor Kadaster',
    dokumen: [
      {
        id: 'DOK-PMH-01-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Budi_Santoso_Valid.pdf',
        nomorDokumen: '3273012808880004',
        ukuran: '1.2 MB',
        tanggalUpload: '28 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-01-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Kompetensi_Perpanjangan_LSP.pdf',
        nomorDokumen: 'SKK-GEO-2026-0814',
        ukuran: '3.1 MB',
        tanggalUpload: '28 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-01-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Lama_18-SKB.pdf',
        nomorDokumen: '18-SKB-SPPR/2021',
        ukuran: '2.9 MB',
        tanggalUpload: '28 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-01-LOG',
        jenis: 'Dokumen Pendukung',
        namaFile: 'Laporan_Kinerja_Pengukuran_5Tahun.pdf',
        ukuran: '5.2 MB',
        tanggalUpload: '28 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      }
    ]
  },
  {
    id: 'REQ-2026-0042',
    nomorPermohonan: 'PMH/SPPR/2026/09/0143',
    surveyorId: 'SRV-NEW-01',
    namaSurveyor: 'Wahyu Tri Hidayat',
    nik: '3302111409940002',
    jenisPermohonan: 'Lisensi Baru',
    tanggalPengajuan: '29 September 2026',
    status: 'Menunggu Verifikasi',
    wilayahDiajukan: 'Kantor Wilayah BPN Provinsi Jawa Tengah',
    kualifikasiDiajukan: 'Surveyor Kadaster',
    dokumen: [
      {
        id: 'DOK-PMH-02-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Wahyu_Tri.pdf',
        nomorDokumen: '3302111409940002',
        ukuran: '1.4 MB',
        tanggalUpload: '29 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-02-IJZ',
        jenis: 'Ijazah Geodesi',
        namaFile: 'Ijazah_S1_Geodesi_UGM.pdf',
        ukuran: '2.5 MB',
        tanggalUpload: '29 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-02-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Kompetensi_Kadaster_BNSP.pdf',
        nomorDokumen: 'SKK-GEO-2026-0902',
        ukuran: '2.8 MB',
        tanggalUpload: '29 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-02-REK',
        jenis: 'Surat Rekomendasi',
        namaFile: 'Surat_Rekomendasi_ISI_Jateng.pdf',
        ukuran: '1.1 MB',
        tanggalUpload: '29 September 2026',
        statusVerifikasi: 'Belum Diperiksa'
      }
    ]
  },
  {
    id: 'REQ-2026-0043',
    nomorPermohonan: 'PMH/SPPR/2026/09/0144',
    surveyorId: 'SRV-006',
    namaSurveyor: 'I Made Dananjaya',
    nik: '5171010502890008',
    jenisPermohonan: 'Perpanjangan Lisensi',
    tanggalPengajuan: '30 September 2026',
    status: 'Sedang Diproses',
    nomorLisensiLama: '27-SKB-SPPR/2021',
    wilayahDiajukan: 'Kantor Wilayah BPN Provinsi Bali',
    kualifikasiDiajukan: 'Surveyor Kadaster',
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalVerifikasi: '02 Oktober 2026',
    catatanVerifikator: 'Berkas utama valid. Menunggu konfirmasi dari Bidang Survei Kanwil Bali terkait penyelesaian target PTSL.',
    checklist: {
      biodataSesuai: true,
      akunBelumAda: true,
      dokumenDiperiksa: true,
      dataTerverifikasi: false
    },
    dokumen: [
      {
        id: 'DOK-PMH-03-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Made_Dananjaya.pdf',
        nomorDokumen: '5171010502890008',
        ukuran: '1.3 MB',
        tanggalUpload: '30 September 2026',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-PMH-03-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Keahlian_Kadaster_Bali.pdf',
        nomorDokumen: 'SKK-GEO-2026-0211',
        ukuran: '2.6 MB',
        tanggalUpload: '30 September 2026',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-PMH-03-LIS',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_Lisensi_Lama_27-SKB.pdf',
        nomorDokumen: '27-SKB-SPPR/2021',
        ukuran: '2.8 MB',
        tanggalUpload: '30 September 2026',
        statusVerifikasi: 'Sesuai'
      }
    ]
  },
  {
    id: 'REQ-2026-0044',
    nomorPermohonan: 'PMH/SPPR/2026/09/0145',
    surveyorId: 'SRV-001',
    namaSurveyor: 'Ahmad Fauzan',
    nik: '3174051204850003',
    jenisPermohonan: 'Pindah Wilayah Kerja',
    tanggalPengajuan: '25 September 2026',
    status: 'Disetujui',
    nomorLisensiLama: '01-SKB-SPPR/2022',
    nomorLisensiBaru: '01-SKB-SPPR/2026-PW',
    wilayahDiajukan: 'Kantor Wilayah BPN Provinsi DKI Jakarta',
    kualifikasiDiajukan: 'Surveyor Kadaster',
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalVerifikasi: '27 September 2026',
    catatanVerifikator: 'Seluruh berkas kepindahan wilayah KJSB memenuhi syarat Permen ATR/BPN No. 9 Tahun 2026. SK penetapan telah diterbitkan.',
    checklist: {
      biodataSesuai: true,
      akunBelumAda: true,
      dokumenDiperiksa: true,
      dataTerverifikasi: true
    },
    dokumen: [
      {
        id: 'DOK-PMH-04-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Ahmad_Fauzan.pdf',
        ukuran: '1.4 MB',
        tanggalUpload: '25 September 2026',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-PMH-04-SK',
        jenis: 'Dokumen Lisensi',
        namaFile: 'SK_KJSB_Pindah_Wilayah.pdf',
        ukuran: '2.9 MB',
        tanggalUpload: '25 September 2026',
        statusVerifikasi: 'Sesuai'
      }
    ]
  },
  {
    id: 'REQ-2026-0045',
    nomorPermohonan: 'PMH/SPPR/2026/09/0146',
    surveyorId: 'SRV-REJ-01',
    namaSurveyor: 'Bambang Sudarmono',
    nik: '3204121908820005',
    jenisPermohonan: 'Lisensi Baru',
    tanggalPengajuan: '24 September 2026',
    status: 'Ditolak',
    wilayahDiajukan: 'Kantor Wilayah BPN Provinsi Jawa Barat',
    kualifikasiDiajukan: 'Asisten Surveyor Kadaster',
    verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
    tanggalVerifikasi: '26 September 2026',
    catatanVerifikator: 'Sertifikat kompetensi yang dilampirkan telah melewati masa berlaku (kedaluwarsa 2024). Pemohon disarankan untuk resertifikasi ke LSP terlebih dahulu.',
    checklist: {
      biodataSesuai: true,
      akunBelumAda: true,
      dokumenDiperiksa: false,
      dataTerverifikasi: false
    },
    dokumen: [
      {
        id: 'DOK-PMH-05-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Bambang_S.pdf',
        ukuran: '1.2 MB',
        tanggalUpload: '24 September 2026',
        statusVerifikasi: 'Sesuai'
      },
      {
        id: 'DOK-PMH-05-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Kedaluwarsa.pdf',
        ukuran: '2.1 MB',
        tanggalUpload: '24 September 2026',
        statusVerifikasi: 'Perlu Perbaikan',
        keterangan: 'Masa berlaku berakhir pada Desember 2024'
      }
    ]
  },
  {
    id: 'REQ-2026-0046',
    nomorPermohonan: 'PMH/SPPR/2026/10/0147',
    surveyorId: 'SRV-NEW-02',
    namaSurveyor: 'Nurul Annisa',
    nik: '3175026011960004',
    jenisPermohonan: 'Lisensi Baru',
    tanggalPengajuan: '01 Oktober 2026',
    status: 'Menunggu Verifikasi',
    wilayahDiajukan: 'Kantor Wilayah BPN Provinsi DKI Jakarta',
    kualifikasiDiajukan: 'Asisten Surveyor Kadaster',
    dokumen: [
      {
        id: 'DOK-PMH-06-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Nurul_Annisa.pdf',
        nomorDokumen: '3175026011960004',
        ukuran: '1.3 MB',
        tanggalUpload: '01 Oktober 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-06-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Kompetensi_ASK_2026.pdf',
        nomorDokumen: 'ASK-GEO-2026-0418',
        ukuran: '2.4 MB',
        tanggalUpload: '01 Oktober 2026',
        statusVerifikasi: 'Belum Diperiksa'
      }
    ]
  },
  {
    id: 'REQ-2026-0047',
    nomorPermohonan: 'PMH/SPPR/2026/10/0148',
    surveyorId: 'SRV-NEW-03',
    namaSurveyor: 'Agus Priyanto',
    nik: '3515081105930009',
    jenisPermohonan: 'Peningkatan Kualifikasi',
    tanggalPengajuan: '02 Oktober 2026',
    status: 'Menunggu Verifikasi',
    nomorLisensiLama: '78-ASKB-SPPR/2022',
    wilayahDiajukan: 'Kantor Wilayah BPN Provinsi Jawa Timur',
    kualifikasiDiajukan: 'Surveyor Kadaster',
    dokumen: [
      {
        id: 'DOK-PMH-07-KTP',
        jenis: 'KTP',
        namaFile: 'KTP_Agus_Priyanto.pdf',
        nomorDokumen: '3515081105930009',
        ukuran: '1.1 MB',
        tanggalUpload: '02 Oktober 2026',
        statusVerifikasi: 'Belum Diperiksa'
      },
      {
        id: 'DOK-PMH-07-SERT',
        jenis: 'Sertifikat',
        namaFile: 'Sertifikat_Keahlian_SK_Jenjang8.pdf',
        nomorDokumen: 'SKK-GEO-2026-0511',
        ukuran: '3.0 MB',
        tanggalUpload: '02 Oktober 2026',
        statusVerifikasi: 'Belum Diperiksa'
      }
    ]
  }
];

export const SAMPLE_NOTIFICATIONS: Notifikasi[] = [
  {
    id: 'NOTIF-01',
    judul: 'Permohonan Surveyor Baru Menunggu Verifikasi',
    pesan: 'Permohonan lisensi baru atas nama Wahyu Tri Hidayat (Wilayah Jawa Tengah) telah masuk antrean verifikasi berkas.',
    kategori: 'permohonan',
    waktu: '10 menit yang lalu',
    dibaca: false,
    targetPage: 'verifikasi',
    targetId: 'REQ-2026-0042'
  },
  {
    id: 'NOTIF-02',
    judul: 'Terdapat Permohonan Perpanjangan Lisensi',
    pesan: 'Surveyor Budi Santoso (18-SKB-SPPR/2021) telah mengunggah berkas perpanjangan lisensi kadaster.',
    kategori: 'perpanjangan',
    waktu: '1 jam yang lalu',
    dibaca: false,
    targetPage: 'perpanjangan',
    targetId: 'REQ-2026-0041'
  },
  {
    id: 'NOTIF-03',
    judul: 'Lisensi Akan Segera Berakhir (< 30 Hari)',
    pesan: 'Lisensi Surveyor Kadaster atas nama I Made Dananjaya (27-SKB-SPPR/2021) akan kedaluwarsa pada 10 Oktober 2026.',
    kategori: 'peringatan',
    waktu: '3 jam yang lalu',
    dibaca: false,
    targetPage: 'perpanjangan',
    targetId: 'SRV-006'
  },
  {
    id: 'NOTIF-04',
    judul: 'Verifikasi Berhasil Dilakukan',
    pesan: 'Permohonan kepindahan wilayah Ahmad Fauzan telah disetujui dan SK Lisensi Baru telah diterbitkan.',
    kategori: 'verifikasi',
    waktu: 'Kemarin, 16:45 WIB',
    dibaca: true,
    targetPage: 'permohonan',
    targetId: 'REQ-2026-0044'
  },
  {
    id: 'NOTIF-05',
    judul: 'Permohonan Ditolak',
    pesan: 'Permohonan lisensi baru Bambang Sudarmono ditolak karena sertifikat keahlian kadaster telah kedaluwarsa.',
    kategori: 'permohonan',
    waktu: '26 September 2026',
    dibaca: true,
    targetPage: 'permohonan',
    targetId: 'REQ-2026-0045'
  },
  {
    id: 'NOTIF-06',
    judul: 'Pembaruan Kebijakan Regulasi SPPR',
    pesan: 'Surat Edaran Ditjen SPPR No. 4/SE/SPPR/2026 tentang percepatan integrasi data survei drone kadaster telah diberlakukan.',
    kategori: 'sistem',
    waktu: '20 September 2026',
    dibaca: true,
    targetPage: 'dashboard'
  }
];

export const WILAYAH_LIST = [
  'Semua Wilayah',
  'Kantor Wilayah BPN Provinsi DKI Jakarta',
  'Kantor Wilayah BPN Provinsi Jawa Barat',
  'Kantor Wilayah BPN Provinsi Jawa Tengah',
  'Kantor Wilayah BPN Provinsi Jawa Timur',
  'Kantor Wilayah BPN Provinsi Banten',
  'Kantor Wilayah BPN Provinsi Bali',
  'Kantor Wilayah BPN Provinsi Sumatera Utara',
  'Kantor Wilayah BPN Provinsi Kalimantan Timur',
  'Kantor Wilayah BPN Provinsi Sulawesi Selatan'
];

export const WILAYAH_STATS: WilayahStat[] = [
  { provinsi: 'DKI Jakarta', jumlah: 312, aktif: 298, akanBerakhir: 14 },
  { provinsi: 'Jawa Barat', jumlah: 428, aktif: 405, akanBerakhir: 23 },
  { provinsi: 'Jawa Timur', jumlah: 285, aktif: 271, akanBerakhir: 14 },
  { provinsi: 'Jawa Tengah', jumlah: 215, aktif: 206, akanBerakhir: 9 },
  { provinsi: 'Sumatera Utara', jumlah: 94, aktif: 88, akanBerakhir: 6 },
  { provinsi: 'Bali & Nusra', jumlah: 78, aktif: 72, akanBerakhir: 6 },
  { provinsi: 'Kalimantan Timur (IKN)', jumlah: 70, aktif: 68, akanBerakhir: 2 }
];

export const MONTHLY_APPLICATION_DATA = [
  { bulan: 'Jan', baru: 24, perpanjangan: 12, disetujui: 32, ditolak: 4 },
  { bulan: 'Feb', baru: 30, perpanjangan: 15, disetujui: 41, ditolak: 4 },
  { bulan: 'Mar', baru: 28, perpanjangan: 18, disetujui: 42, ditolak: 4 },
  { bulan: 'Apr', baru: 35, perpanjangan: 22, disetujui: 51, ditolak: 6 },
  { bulan: 'Mei', baru: 42, perpanjangan: 20, disetujui: 58, ditolak: 4 },
  { bulan: 'Jun', baru: 38, perpanjangan: 25, disetujui: 59, ditolak: 4 },
  { bulan: 'Jul', baru: 45, perpanjangan: 30, disetujui: 70, ditolak: 5 },
  { bulan: 'Agu', baru: 40, perpanjangan: 28, disetujui: 62, ditolak: 6 },
  { bulan: 'Sep', baru: 48, perpanjangan: 35, disetujui: 76, ditolak: 7 },
  { bulan: 'Okt', baru: 28, perpanjangan: 16, disetujui: 38, ditolak: 6 }
];

// Empty Initial Data as requested by user
export const INITIAL_SURVEYORS: Surveyor[] = [];
export const INITIAL_PERMOHONAN: Permohonan[] = [];
export const INITIAL_NOTIFICATIONS: Notifikasi[] = [];

