import React, { useState } from 'react';
import {
  RolePengguna,
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
  PengajuanPindahWilayahModel,
  SkLisensiModel,
  PengumumanModel,
  NotifikasiModel
} from './types/aplikasiMitra.ts';

import {
  PengajuanPerpanjangan,
  SurveyorMitra,
  LisensiMitra,
  StatusBerkas,
  StatusPengajuan
} from './types/mitraPerpanjangan.ts';

import {
  SEED_SURVEYORS,
  SEED_LISENSI_LIST,
  SEED_PEKERJAAN_ANDI,
  SEED_KJSB_ANDI,
  SEED_ASOSIASI_ANDI,
  SEED_PENDIDIKAN_ANDI,
  SEED_SERTIFIKAT_ANDI,
  SEED_MAGANG_ANDI,
  SEED_PENGANGKATAN_ANDI,
  SEED_PERUBAHAN_DATA,
  SEED_PENGAJUAN_PERPANJANGAN,
  SEED_PINDAH_WILAYAH,
  SEED_SK_LISENSI,
  SEED_PENGUMUMAN,
  SEED_NOTIFIKASI
} from './data/aplikasiMitraData.ts';

import { SEED_PENGAJUAN } from './data/mitraData.ts';
import { INITIAL_SURVEYORS, INITIAL_PERMOHONAN } from './data/dummyData.ts';
import { Surveyor, Permohonan } from './types/index.ts';

// Layout Components
import { UnifiedSidebar } from './components/layout/UnifiedSidebar.tsx';
import { TopNavbar } from './components/layout/TopNavbar.tsx';
import { ToastContainer, ToastMessage } from './components/common/Toast.tsx';

// Surveyor (SB) Pages
import { SbBerandaView } from './components/pages/sb/SbBerandaView.tsx';
import { SbAkunPage } from './components/pages/sb/SbAkunPage.tsx';
import { SbPendidikanPage } from './components/pages/sb/SbPendidikanPage.tsx';
import { SbMagangPage } from './components/pages/sb/SbMagangPage.tsx';
import { SbPengangkatanPage } from './components/pages/sb/SbPengangkatanPage.tsx';
import { SbValidasiPage } from './components/pages/sb/SbValidasiPage.tsx';
import { SbPerpanjanganPage } from './components/pages/sb/SbPerpanjanganPage.tsx';
import { SbPindahWilayahPage } from './components/pages/sb/SbPindahWilayahPage.tsx';
import { SbRiwayatPage } from './components/pages/sb/SbRiwayatPage.tsx';
import { SbDetailPengajuanPage } from './components/pages/sb/SbDetailPengajuanPage.tsx';
import { SbCetakPage } from './components/pages/sb/SbCetakPage.tsx';
import { SbNotifikasiPage } from './components/pages/sb/SbNotifikasiPage.tsx';
import { SbBantuanPage } from './components/pages/sb/SbBantuanPage.tsx';
import { SbProfilPage } from './components/pages/sb/SbProfilPage.tsx';
import { SbLisensiPage } from './components/pages/sb/SbLisensiPage.tsx';

// Panitia / Verifikator Pages
import { PanitiaDashboardPage } from './components/pages/panitia/PanitiaDashboardPage.tsx';
import { PanitiaValidasiPage } from './components/pages/panitia/PanitiaValidasiPage.tsx';
import { PanitiaPengajuanPage } from './components/pages/panitia/PanitiaPengajuanPage.tsx';
import { PanitiaPindahWilayahPage } from './components/pages/panitia/PanitiaPindahWilayahPage.tsx';
import { PanitiaVerifikasiPage } from './components/pages/panitia/PanitiaVerifikasiPage.tsx';
import { PanitiaSkPage } from './components/pages/panitia/PanitiaSkPage.tsx';
import { PanitiaPengumumanPage } from './components/pages/panitia/PanitiaPengumumanPage.tsx';
import { PanitiaRiwayatPage } from './components/pages/panitia/PanitiaRiwayatPage.tsx';
import { SurveyorsPage } from './components/pages/SurveyorsPage.tsx';
import { LaporanPage } from './components/pages/LaporanPage.tsx';

export default function App() {
  // 1. Role State
  const [currentRole, setCurrentRole] = useState<RolePengguna>('SURVEYOR');

  // 2. Navigation & Sidebar Layout State
  const [currentPage, setCurrentPage] = useState<string>('sb-beranda');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // 3. Application Data State (Realistic Prototype Persistence)
  const [surveyor, setSurveyor] = useState<SurveyorModel>(SEED_SURVEYORS[0]);
  const [lisensi, setLisensi] = useState<LisensiModel>(SEED_LISENSI_LIST[0]);
  const [pekerjaanList, setPekerjaanList] = useState<RiwayatPekerjaanModel[]>(SEED_PEKERJAAN_ANDI);
  const [kjsb] = useState<KjsbModel>(SEED_KJSB_ANDI);
  const [asosiasi] = useState<AsosiasiProfesiModel>(SEED_ASOSIASI_ANDI);
  const [pendidikanList, setPendidikanList] = useState<RiwayatPendidikanModel[]>(SEED_PENDIDIKAN_ANDI);
  const [sertifikatList, setSertifikatList] = useState<SertifikatPelatihanModel[]>(SEED_SERTIFIKAT_ANDI);
  const [magang, setMagang] = useState<RiwayatMagangModel>(SEED_MAGANG_ANDI);
  const [pengangkatanList] = useState<RiwayatPengangkatanModel[]>(SEED_PENGANGKATAN_ANDI);
  const [perubahanDataList, setPerubahanDataList] = useState<PengajuanPerubahanDataModel[]>(SEED_PERUBAHAN_DATA);
  const [mutasiList, setMutasiList] = useState<PengajuanPindahWilayahModel[]>(SEED_PINDAH_WILAYAH);
  const [pengajuanPerpanjanganList, setPengajuanPerpanjanganList] = useState<PengajuanPerpanjangan[]>(SEED_PENGAJUAN);
  const [skList, setSkList] = useState<SkLisensiModel[]>(SEED_SK_LISENSI);
  const [pengumumanList, setPengumumanList] = useState<PengumumanModel[]>(SEED_PENGUMUMAN);
  const [notifications, setNotifications] = useState<NotifikasiModel[]>(SEED_NOTIFIKASI);

  // Master Surveyors (for Panitia master list & reports)
  const [surveyorsMaster, setSurveyorsMaster] = useState<Surveyor[]>(INITIAL_SURVEYORS);
  const [permohonanMaster] = useState<Permohonan[]>(INITIAL_PERMOHONAN);

  // Selected Detail & Verifikasi items
  const [selectedPengajuanDetail, setSelectedPengajuanDetail] = useState<PengajuanPerpanjangan>(
    pengajuanPerpanjanganList[0]
  );
  const [selectedPengajuanVerifikasi, setSelectedPengajuanVerifikasi] = useState<PengajuanPerpanjangan>(
    pengajuanPerpanjanganList[1] || pengajuanPerpanjanganList[0]
  );

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Switch Role Handler
  const handleRoleChange = (newRole: RolePengguna) => {
    setCurrentRole(newRole);
    if (newRole === 'SURVEYOR') {
      setCurrentPage('sb-beranda');
      addToast('Beralih ke mode Surveyor Berlisensi (Andi Pratama, S.T.)', 'info');
    } else {
      setCurrentPage('panitia-dashboard');
      addToast('Beralih ke mode Panitia / Verifikator Ditjen SPPR', 'info');
    }
  };

  // Adaptor models for components expecting Mitra interfaces
  const surveyorMitra: SurveyorMitra = {
    id: surveyor.id,
    akun_id: 'AKUN-SB-001',
    nama: surveyor.namaLengkap,
    no_registrasi: surveyor.nomorRegistrasi,
    kualifikasi: surveyor.kualifikasi,
    wilayah_kerja: surveyor.wilayahKerja,
    telepon: surveyor.telepon,
    alamat: surveyor.alamat,
    kjsbNama: kjsb.namaKJSB,
    status: 'AKTIF'
  };

  const lisensiMitra: LisensiMitra = {
    id: lisensi.id,
    surveyor_id: lisensi.surveyorId,
    no_lisensi: lisensi.nomorLisensi,
    tgl_terbit: lisensi.tanggalTerbit,
    tgl_berakhir: lisensi.tanggalBerakhir,
    status: lisensi.status === 'HAMPIR_BERAKHIR' ? 'HAMPIR_BERAKHIR' : (lisensi.status === 'KEDALUWARSA' ? 'KEDALUWARSA' : 'AKTIF'),
    sisaHari: lisensi.sisaHari,
    bisaPerpanjang: lisensi.bisaPerpanjang
  };

  // Handlers for SB Actions
  const handleUpdateSurveyor = (updated: Partial<SurveyorModel>) => {
    setSurveyor(prev => ({ ...prev, ...updated }));
  };

  const handleAddPekerjaan = (job: Omit<RiwayatPekerjaanModel, 'id' | 'surveyorId'>) => {
    const newEntry: RiwayatPekerjaanModel = {
      id: `JOB-${Date.now()}`,
      surveyorId: surveyor.id,
      ...job
    };
    setPekerjaanList(prev => [newEntry, ...prev]);
  };

  const handleAddPendidikan = (edu: RiwayatPendidikanModel) => {
    setPendidikanList(prev => [edu, ...prev]);
  };

  const handleAddSertifikat = (cert: SertifikatPelatihanModel) => {
    setSertifikatList(prev => [cert, ...prev]);
  };

  const handleSubmitPerubahanData = (data: {
    dataLama: string;
    dataBaru: string;
    alasanPerubahan: string;
    dokumen: string;
  }) => {
    const newId = `VAL-2026-${Math.floor(Math.random() * 800 + 100)}`;
    const newPerubahan: PengajuanPerubahanDataModel = {
      id: newId,
      surveyorId: surveyor.id,
      tanggalPengajuan: '05 Oktober 2026',
      dataLama: data.dataLama,
      dataBaru: data.dataBaru,
      alasanPerubahan: data.alasanPerubahan,
      dokumenPendukungUrl: `/dokumen/${data.dokumen}`,
      status: 'DALAM_VERIFIKASI'
    };

    setPerubahanDataList(prev => [newPerubahan, ...prev]);

    // Send automated notification to system
    const newNotif: NotifikasiModel = {
      id: `NTF-${Date.now()}`,
      kategori: 'Validasi',
      pesan: `Permohonan koreksi data ${newId} berhasil dikirim ke verifikator kementerian. Status: DALAM_VERIFIKASI.`,
      tanggalKirim: '05 Oktober 2026 11:00',
      sudahDibaca: false,
      linkPage: 'sb-validasi'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSubmitMutasi = (data: {
    wilayahTujuan: string;
    alasanPindah: string;
    kjsbTujuan: string;
    dokumenRekomendasi: string;
  }) => {
    const newId = `MUTASI-2026-${Math.floor(Math.random() * 800 + 100)}`;
    const newMutasi: PengajuanPindahWilayahModel = {
      id: newId,
      surveyorId: surveyor.id,
      surveyorNama: surveyor.namaLengkap,
      nomorLisensi: lisensi.nomorLisensi,
      wilayahAsal: surveyor.wilayahKerja,
      wilayahTujuan: data.wilayahTujuan,
      alasanPindah: data.alasanPindah,
      tanggalPengajuan: '05 Oktober 2026',
      dokumenSuratRekomendasi: data.dokumenRekomendasi,
      keterangan: `KJSB Tujuan: ${data.kjsbTujuan || 'Praktik Mandiri'}`,
      status: 'DALAM_VERIFIKASI'
    };

    setMutasiList(prev => [newMutasi, ...prev]);

    const newNotif: NotifikasiModel = {
      id: `NTF-${Date.now()}`,
      kategori: 'Pindah Wilayah',
      pesan: `Permohonan pindah wilayah kerja ${newId} ke Kanwil BPN ${data.wilayahTujuan} telah masuk antrean verifikasi.`,
      tanggalKirim: '05 Oktober 2026 11:15',
      sudahDibaca: false,
      linkPage: 'sb-pindah-wilayah'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSubmitPerpanjangan = (data: {
    catatan: string;
    files: { jenis: string; namaFile: string; ukuran: string }[];
  }) => {
    const newPengajuanId = `PML-2026-${Math.floor(Math.random() * 800 + 100)}`;
    const newPengajuan: PengajuanPerpanjangan = {
      id: newPengajuanId,
      lisensi_id: lisensi.id,
      tgl_pengajuan: '05 Oktober 2026 10:00:00',
      status: 'DIAJUKAN',
      catatan_sb: data.catatan,
      surveyor: surveyorMitra,
      lisensi: lisensiMitra,
      slaHariTersisa: 5,
      slaTerlewat: false,
      berkas: data.files.map((f, i) => ({
        id: `DOK-NEW-${i}`,
        pengajuan_id: newPengajuanId,
        jenis_berkas: f.jenis,
        tipe_file: 'PDF',
        path_file: `/dokumen/${f.namaFile}`,
        status_berkas: 'MENUNGGU',
        ukuran: f.ukuran,
        tgl_upload: '05 Oktober 2026'
      })),
      riwayatVerifikasi: [],
      riwayatStatus: [
        {
          id: `LOG-${Date.now()}`,
          pengajuan_id: newPengajuanId,
          status_lama: 'BARU',
          status_baru: 'DIAJUKAN',
          alasan: 'Surveyor mengajukan permohonan perpanjangan lisensi baru.',
          diubah_oleh: surveyor.id,
          diubah_oleh_nama: surveyor.namaLengkap,
          tgl_ubah: '05 Oktober 2026 10:00:00'
        }
      ]
    };

    setPengajuanPerpanjanganList(prev => [newPengajuan, ...prev]);
    setSelectedPengajuanDetail(newPengajuan);
    addToast(`Permohonan ${newPengajuanId} berhasil diajukan dengan status DIAJUKAN!`, 'success');
  };

  const handlePerbaikiDokumenPerpanjangan = (pengajuanId: string, catatan: string) => {
    setPengajuanPerpanjanganList(prev =>
      prev.map(p => {
        if (p.id === pengajuanId) {
          const nextRound = p.riwayatVerifikasi.length + 1;
          const updatedDocs = p.berkas.map(b => ({
            ...b,
            status_berkas: 'MENUNGGU' as StatusBerkas,
            catatan: 'Telah diperbaiki oleh SB'
          }));

          const updatedHistory = [
            ...p.riwayatStatus,
            {
              id: `LOG-${Date.now()}`,
              pengajuan_id: p.id,
              status_lama: p.status,
              status_baru: 'DALAM_VERIFIKASI' as StatusPengajuan,
              alasan: `SB mengunggah ulang berkas perbaikan untuk verifikasi putaran ke-${nextRound}. Catatan SB: "${catatan}"`,
              diubah_oleh: surveyor.id,
              diubah_oleh_nama: surveyor.namaLengkap,
              tgl_ubah: '05 Oktober 2026 10:15:00'
            }
          ];

          return {
            ...p,
            status: 'DALAM_VERIFIKASI' as StatusPengajuan,
            berkas: updatedDocs,
            riwayatStatus: updatedHistory
          };
        }
        return p;
      })
    );

    addToast('Berkas perbaikan berhasil dikirimkan kembali ke Panitia (Status: DALAM_VERIFIKASI).', 'success');
  };

  // Handlers for Panitia Verifikasi
  const handleApproveValidasiPanitia = (id: string, catatan: string) => {
    setPerubahanDataList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'VALID',
              catatanVerifikator: catatan,
              verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
              tanggalValidasi: '05 Oktober 2026'
            }
          : item
      )
    );
  };

  const handleRejectValidasiPanitia = (id: string, catatan: string) => {
    setPerubahanDataList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'PERLU_PERBAIKAN',
              catatanVerifikator: catatan,
              verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
              tanggalValidasi: '05 Oktober 2026'
            }
          : item
      )
    );
  };

  const handleApproveMutasiPanitia = (id: string, catatan: string) => {
    setMutasiList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'DISETUJUI',
              catatanVerifikator: catatan,
              tanggalKeputusan: '05 Oktober 2026'
            }
          : item
      )
    );
  };

  const handleRejectMutasiPanitia = (id: string, catatan: string) => {
    setMutasiList(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: 'PERLU_PERBAIKAN',
              catatanVerifikator: catatan,
              tanggalKeputusan: '05 Oktober 2026'
            }
          : item
      )
    );
  };

  const handleSaveVerifikasiPerpanjangan = (
    pengajuanId: string,
    keputusan: 'PERLU_PERBAIKAN' | 'PROSES_SK' | 'SIMPAN_DRAFT',
    catatanUmum: string,
    berkasStatuses: { [id: string]: { status: StatusBerkas; catatan?: string } }
  ) => {
    if (keputusan === 'SIMPAN_DRAFT') {
      addToast('Draft hasil verifikasi berhasil disimpan.', 'info');
      return;
    }

    setPengajuanPerpanjanganList(prev =>
      prev.map(p => {
        if (p.id === pengajuanId) {
          const nextRound = p.riwayatVerifikasi.length + 1;
          const updatedDocs = p.berkas.map(b => {
            if (berkasStatuses[b.id]) {
              return {
                ...b,
                status_berkas: berkasStatuses[b.id].status,
                catatan: berkasStatuses[b.id].catatan
              };
            }
            return b;
          });

          const newRound = {
            id: `VER-${Date.now()}`,
            pengajuan_id: p.id,
            verifikator_id: 'PANITIA-001',
            verifikator_nama: 'Fairuz Tsani Habibi, S.Kom.',
            putaran_ke: nextRound,
            hasil: keputusan === 'PERLU_PERBAIKAN' ? ('PERLU_PERBAIKAN' as const) : ('LENGKAP' as const),
            catatan: catatanUmum || (keputusan === 'PERLU_PERBAIKAN' ? 'Ada berkas yang memerlukan perbaikan oleh SB.' : 'Berkas dinyatakan lengkap.'),
            tgl_verifikasi: '05 Oktober 2026'
          };

          const newHistory = [
            ...p.riwayatStatus,
            {
              id: `LOG-${Date.now()}`,
              pengajuan_id: p.id,
              status_lama: p.status,
              status_baru: keputusan,
              alasan: catatanUmum || (keputusan === 'PERLU_PERBAIKAN' ? 'Panitia menetapkan status PERLU_PERBAIKAN.' : 'Berkas dinyatakan lengkap. Sistem menyusun draft SK.'),
              diubah_oleh: 'PANITIA-001',
              diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
              tgl_ubah: '05 Oktober 2026 11:30:00'
            }
          ];

          return {
            ...p,
            status: keputusan,
            berkas: updatedDocs,
            riwayatVerifikasi: [...p.riwayatVerifikasi, newRound],
            riwayatStatus: newHistory,
            skLisensi: keputusan === 'PROSES_SK' ? {
              id: `SK-${p.id}-DRAFT`,
              pengajuan_id: p.id,
              no_sk: `SK.412/SPPR-MITRA/X/2026`,
              tgl_sk: '2026-10-05',
              masa_berlaku_baru: '2031-10-05',
              file_sk: `/sk/draft_sk_${p.id}.pdf`,
              status_draft: 'DRAFT' as const
            } : p.skLisensi
          };
        }
        return p;
      })
    );

    addToast(`Hasil verifikasi berhasil diputuskan sebagai: ${keputusan}`, 'success');
  };

  const handleTerbitkanSk = (pengajuanId: string, noSk: string, linkPengumuman: string) => {
    setPengajuanPerpanjanganList(prev =>
      prev.map(p => {
        if (p.id === pengajuanId) {
          const finalSk = {
            id: `SK-${p.id}`,
            pengajuan_id: p.id,
            no_sk: noSk,
            tgl_sk: '2026-10-05',
            masa_berlaku_baru: '2031-10-05',
            file_sk: `/sk/sk_${p.id}.pdf`,
            status_draft: 'TERBIT' as const
          };

          const finalHistory = [
            ...p.riwayatStatus,
            {
              id: `LOG-${Date.now()}`,
              pengajuan_id: p.id,
              status_lama: p.status,
              status_baru: 'SK_TERBIT' as StatusPengajuan,
              alasan: `SK perpanjangan resmi No. ${noSk} diterbitkan dan pengumuman disiarkan.`,
              diubah_oleh: 'PANITIA-001',
              diubah_oleh_nama: 'Fairuz Tsani Habibi, S.Kom.',
              tgl_ubah: '05 Oktober 2026 12:00:00'
            }
          ];

          return {
            ...p,
            status: 'SK_TERBIT' as StatusPengajuan,
            skLisensi: finalSk,
            link_pengumuman: linkPengumuman,
            riwayatStatus: finalHistory
          };
        }
        return p;
      })
    );

    addToast(`Surat Keputusan (SK) resmi ${noSk} berhasil diterbitkan!`, 'success');
  };

  // Notification handlers
  const handleMarkNotifAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, sudahDibaca: true } : n))
    );
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, sudahDibaca: true })));
    addToast('Seluruh notifikasi ditandai telah dibaca.', 'success');
  };

  // Dynamic Header Info
  const getHeaderInfo = (): { title: string; crumbs: string[] } => {
    switch (currentPage) {
      case 'sb-beranda':
        return { title: 'Beranda Surveyor', crumbs: ['Beranda'] };
      case 'sb-akun':
        return { title: 'Akun Saya', crumbs: ['Data Surveyor', 'Akun Saya'] };
      case 'sb-pendidikan':
        return { title: 'Riwayat Pendidikan & Sertifikasi', crumbs: ['Data Surveyor', 'Pendidikan'] };
      case 'sb-magang':
        return { title: 'Praktik Magang Sebelum Pelantikan', crumbs: ['Data Surveyor', 'Magang'] };
      case 'sb-pengangkatan':
        return { title: 'SK Pengangkatan & Arsip', crumbs: ['Data Surveyor', 'Pengangkatan'] };
      case 'sb-validasi':
        return { title: 'Validasi & Perubahan Data', crumbs: ['Data Surveyor', 'Validasi'] };
      case 'sb-perpanjangan':
        return { title: 'Perpanjangan Lisensi', crumbs: ['Lisensi', 'Perpanjangan Lisensi'] };
      case 'sb-pindah-wilayah':
        return { title: 'Pindah Wilayah Kerja', crumbs: ['Lisensi', 'Pindah Wilayah Kerja'] };
      case 'sb-riwayat':
        return { title: 'Riwayat Pengajuan Perpanjangan', crumbs: ['Lisensi', 'Riwayat Pengajuan'] };
      case 'sb-detail-pengajuan':
        return { title: 'Detail Pengajuan Perpanjangan', crumbs: ['Riwayat Pengajuan', 'Detail'] };
      case 'sb-cetak':
        return { title: 'Cetak Dokumen Biodata Surveyor', crumbs: ['Lainnya', 'Cetak'] };
      case 'notifikasi':
        return { title: 'Pusat Notifikasi & Pemberitahuan', crumbs: ['Lainnya', 'Notifikasi'] };
      case 'sb-bantuan':
        return { title: 'Bantuan & Regulasi Permen ATR/BPN', crumbs: ['Lainnya', 'Bantuan'] };
      case 'sb-profil':
        return { title: 'Profil Surveyor', crumbs: ['Profile', 'Profil'] };
      case 'sb-lisensi':
        return { title: 'Lisensi Saya', crumbs: ['Lisensi', 'Lisensi Saya'] };

      // Panitia Pages
      case 'panitia-dashboard':
        return { title: 'Dashboard Panitia / Verifikator', crumbs: ['Dashboard'] };
      case 'panitia-validasi':
        return { title: 'Verifikasi Pengajuan Validasi', crumbs: ['Pengajuan Masuk', 'Validasi'] };
      case 'panitia-perpanjangan':
        return { title: 'Pengajuan Perpanjangan Lisensi', crumbs: ['Pengajuan Masuk', 'Perpanjangan Lisensi'] };
      case 'panitia-pindah-wilayah':
        return { title: 'Pengajuan Pindah Wilayah Kerja', crumbs: ['Pengajuan Masuk', 'Pindah Wilayah'] };
      case 'panitia-verifikasi-dokumen':
      case 'panitia-verifikasi':
        return { title: 'Lembar Verifikasi Dokumen Persyaratan', crumbs: ['Verifikasi', 'Periksa Berkas'] };
      case 'panitia-surveyor-list':
        return { title: 'Master Data Surveyor Berlisensi', crumbs: ['Master Data', 'Surveyor'] };
      case 'panitia-sk':
        return { title: 'Penerbitan Surat Keputusan (SK)', crumbs: ['SK Lisensi'] };
      case 'panitia-pengumuman':
        return { title: 'Publikasi Pengumuman SK', crumbs: ['Pengumuman'] };
      case 'panitia-riwayat':
        return { title: 'Riwayat Verifikasi & Audit Trail', crumbs: ['Riwayat Verifikasi'] };
      case 'panitia-laporan':
        return { title: 'Laporan Rekapitulasi & Statistik', crumbs: ['Laporan'] };
      default:
        return { title: 'Aplikasi Mitra — Kementerian ATR/BPN', crumbs: [] };
    }
  };

  const headerInfo = getHeaderInfo();
  const unreadNotifCount = notifications.filter(n => !n.sudahDibaca).length;
  const pendingValidationCount = perubahanDataList.filter(p => p.status === 'DALAM_VERIFIKASI').length;
  const pendingPerpanjanganCount = pengajuanPerpanjanganList.filter(p => p.status === 'DIAJUKAN' || p.status === 'DALAM_VERIFIKASI').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800 selection:bg-amber-100 selection:text-amber-950">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <div className="flex-1 flex flex-row">
        {/* Unified Ministry Sidebar with Collapse/Expand */}
        <UnifiedSidebar
          currentRole={currentRole}
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          unreadNotifCount={unreadNotifCount}
          pendingValidationCount={pendingValidationCount}
          pendingPerpanjanganCount={pendingPerpanjanganCount}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navbar */}
          <TopNavbar
            currentRole={currentRole}
            onRoleChange={handleRoleChange}
            pageTitle={headerInfo.title}
            breadcrumbs={headerInfo.crumbs}
            notifications={notifications}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onNavigate={(page) => setCurrentPage(page)}
          />

          {/* Page Routing */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {/* ========================================================
                ROLE: SURVEYOR BERLISENSI (SB)
               ======================================================== */}
            {currentRole === 'SURVEYOR' && (
              <>
                {currentPage === 'sb-beranda' && (
                  <SbBerandaView
                    surveyor={surveyor}
                    lisensi={lisensi}
                    perpanjangan={SEED_PENGAJUAN_PERPANJANGAN[0]}
                    pindahWilayah={mutasiList[0]}
                    validasi={perubahanDataList[0]}
                    notifications={notifications}
                    pengangkatanList={pengangkatanList}
                    pendidikanList={pendidikanList}
                    onNavigate={(page) => setCurrentPage(page)}
                  />
                )}

                {currentPage === 'sb-akun' && (
                  <SbAkunPage
                    surveyor={surveyor}
                    lisensi={lisensi}
                    pekerjaanList={pekerjaanList}
                    kjsb={kjsb}
                    asosiasi={asosiasi}
                    onUpdateSurveyor={handleUpdateSurveyor}
                    onAddPekerjaan={handleAddPekerjaan}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'sb-pendidikan' && (
                  <SbPendidikanPage
                    pendidikanList={pendidikanList}
                    sertifikatList={sertifikatList}
                    onAddPendidikan={handleAddPendidikan}
                    onAddSertifikat={handleAddSertifikat}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'sb-magang' && (
                  <SbMagangPage
                    initialMagang={magang}
                    onSaveMagang={(updated) => setMagang(updated)}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'sb-pengangkatan' && (
                  <SbPengangkatanPage
                    pengangkatanList={pengangkatanList}
                    skList={skList}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'sb-validasi' && (
                  <SbValidasiPage
                    surveyor={surveyor}
                    perubahanList={perubahanDataList}
                    onSubmitPerubahan={handleSubmitPerubahanData}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'sb-perpanjangan' && (
                  <SbPerpanjanganPage
                    surveyor={surveyorMitra}
                    lisensi={lisensiMitra}
                    onNavigate={(page) => setCurrentPage(page)}
                    onSubmitPengajuan={handleSubmitPerpanjangan}
                  />
                )}

                {currentPage === 'sb-pindah-wilayah' && (
                  <SbPindahWilayahPage
                    surveyor={surveyor}
                    lisensi={lisensi}
                    mutasiList={mutasiList}
                    onSubmitMutasi={handleSubmitMutasi}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'sb-riwayat' && (
                  <SbRiwayatPage
                    pengajuanList={pengajuanPerpanjanganList}
                    onSelectDetail={(p) => {
                      setSelectedPengajuanDetail(p);
                      setCurrentPage('sb-detail-pengajuan');
                    }}
                  />
                )}

                {currentPage === 'sb-detail-pengajuan' && (
                  <SbDetailPengajuanPage
                    pengajuan={selectedPengajuanDetail}
                    onBack={() => setCurrentPage('sb-riwayat')}
                    onPerbaikiDokumen={handlePerbaikiDokumenPerpanjangan}
                  />
                )}

                {currentPage === 'sb-cetak' && (
                  <SbCetakPage
                    surveyor={surveyor}
                    lisensi={lisensi}
                    kjsb={kjsb}
                    asosiasi={asosiasi}
                    pengangkatanList={pengangkatanList}
                    pendidikanList={pendidikanList}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'notifikasi' && (
                  <SbNotifikasiPage
                    notifications={notifications}
                    onMarkAsRead={handleMarkNotifAsRead}
                    onMarkAllAsRead={handleMarkAllNotifsRead}
                    onNavigate={(page) => setCurrentPage(page)}
                  />
                )}

                {currentPage === 'sb-bantuan' && <SbBantuanPage />}

                {currentPage === 'sb-profil' && (
                  <SbProfilPage surveyor={surveyorMitra} lisensi={lisensiMitra} />
                )}

                {currentPage === 'sb-lisensi' && (
                  <SbLisensiPage
                    surveyor={surveyorMitra}
                    lisensi={lisensiMitra}
                    onNavigate={(page) => setCurrentPage(page)}
                  />
                )}
              </>
            )}

            {/* ========================================================
                ROLE: PANITIA / VERIFIKATOR
               ======================================================== */}
            {currentRole === 'PANITIA' && (
              <>
                {currentPage === 'panitia-dashboard' && (
                  <PanitiaDashboardPage
                    pengajuanList={pengajuanPerpanjanganList}
                    onOpenVerifikasi={(p) => {
                      setSelectedPengajuanVerifikasi(p);
                      setCurrentPage('panitia-verifikasi-dokumen');
                    }}
                    onNavigate={(page) => setCurrentPage(page)}
                  />
                )}

                {currentPage === 'panitia-validasi' && (
                  <PanitiaValidasiPage
                    perubahanList={perubahanDataList}
                    onApprovePerubahan={handleApproveValidasiPanitia}
                    onRejectPerubahan={handleRejectValidasiPanitia}
                    onAddNotification={addToast}
                  />
                )}

                {currentPage === 'panitia-perpanjangan' && (
                  <PanitiaPengajuanPage
                    pengajuanList={pengajuanPerpanjanganList}
                    onOpenVerifikasi={(p) => {
                      setSelectedPengajuanVerifikasi(p);
                      setCurrentPage('panitia-verifikasi-dokumen');
                    }}
                  />
                )}

                {currentPage === 'panitia-pindah-wilayah' && (
                  <PanitiaPindahWilayahPage
                    mutasiList={mutasiList}
                    onApproveMutasi={handleApproveMutasiPanitia}
                    onRejectMutasi={handleRejectMutasiPanitia}
                    onAddNotification={addToast}
                  />
                )}

                {(currentPage === 'panitia-verifikasi-dokumen' || currentPage === 'panitia-verifikasi') && (
                  <PanitiaVerifikasiPage
                    pengajuan={selectedPengajuanVerifikasi}
                    onBack={() => setCurrentPage('panitia-perpanjangan')}
                    onSaveVerifikasi={handleSaveVerifikasiPerpanjangan}
                  />
                )}

                {currentPage === 'panitia-surveyor-list' && (
                  <SurveyorsPage
                    surveyors={surveyorsMaster}
                    onSelectSurveyor={() => {}}
                    onOpenAddSurveyor={() => alert('Fitur Registrasi Surveyor Baru')}
                    onEditSurveyor={() => {}}
                    onOpenVerificationForSurveyor={() => {}}
                    onLoadSampleData={() => {}}
                  />
                )}

                {currentPage === 'panitia-sk' && (
                  <PanitiaSkPage
                    pengajuanList={pengajuanPerpanjanganList}
                    onTerbitkanSk={handleTerbitkanSk}
                  />
                )}

                {currentPage === 'panitia-pengumuman' && (
                  <PanitiaPengumumanPage pengajuanList={pengajuanPerpanjanganList} />
                )}

                {currentPage === 'panitia-riwayat' && (
                  <PanitiaRiwayatPage
                    pengajuanList={pengajuanPerpanjanganList}
                    onOpenVerifikasi={(p) => {
                      setSelectedPengajuanVerifikasi(p);
                      setCurrentPage('panitia-verifikasi-dokumen');
                    }}
                  />
                )}

                {currentPage === 'panitia-laporan' && (
                  <LaporanPage
                    surveyors={surveyorsMaster}
                    permohonanList={permohonanMaster}
                    onOpenExportModal={() => alert('Membuka dialog ekspor laporan')}
                  />
                )}

                {currentPage === 'notifikasi' && (
                  <SbNotifikasiPage
                    notifications={notifications}
                    onMarkAsRead={handleMarkNotifAsRead}
                    onMarkAllAsRead={handleMarkAllNotifsRead}
                    onNavigate={(page) => setCurrentPage(page)}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
