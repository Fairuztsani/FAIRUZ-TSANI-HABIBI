/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageType, Surveyor, Permohonan, Notifikasi, DokumenMitra } from './types/index.ts';
import {
  INITIAL_SURVEYORS,
  INITIAL_PERMOHONAN,
  INITIAL_NOTIFICATIONS,
  SAMPLE_SURVEYORS,
  SAMPLE_PERMOHONAN,
  SAMPLE_NOTIFICATIONS
} from './data/dummyData.ts';

// Layout
import { Sidebar } from './components/layout/Sidebar.tsx';
import { Header } from './components/layout/Header.tsx';

// Pages
import { DashboardPage } from './components/pages/DashboardPage.tsx';
import { SurveyorsPage } from './components/pages/SurveyorsPage.tsx';
import { SurveyorDetailPage } from './components/pages/SurveyorDetailPage.tsx';
import { PermohonanPage } from './components/pages/PermohonanPage.tsx';
import { VerifikasiPage } from './components/pages/VerifikasiPage.tsx';
import { PerpanjanganPage } from './components/pages/PerpanjanganPage.tsx';
import { NotifikasiPage } from './components/pages/NotifikasiPage.tsx';
import { LaporanPage } from './components/pages/LaporanPage.tsx';
import { PengaturanPage } from './components/pages/PengaturanPage.tsx';

// Modals
import { DocumentModal } from './components/modals/DocumentModal.tsx';
import { VerificationModal } from './components/modals/VerificationModal.tsx';
import { AddSurveyorModal } from './components/modals/AddSurveyorModal.tsx';
import { ExportReportModal } from './components/modals/ExportReportModal.tsx';
import { ToastContainer, ToastMessage } from './components/common/Toast.tsx';

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedSurveyor, setSelectedSurveyor] = useState<Surveyor | null>(null);

  // Core Data State (in-memory prototype persistence)
  const [surveyors, setSurveyors] = useState<Surveyor[]>(INITIAL_SURVEYORS);
  const [permohonanList, setPermohonanList] = useState<Permohonan[]>(INITIAL_PERMOHONAN);
  const [notifications, setNotifications] = useState<Notifikasi[]>(INITIAL_NOTIFICATIONS);

  // Modals State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAddSurveyorModalOpen, setIsAddSurveyorModalOpen] = useState(false);
  const [isExportReportModalOpen, setIsExportReportModalOpen] = useState(false);

  // Document Viewer Modal State
  const [activeDocument, setActiveDocument] = useState<{
    doc: DokumenMitra;
    surveyorNama: string;
    surveyorNik: string;
  } | null>(null);

  // Verification Modal State
  const [activeVerification, setActiveVerification] = useState<Permohonan | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Counters for Sidebar and Badges
  const pendingVerificationCount = permohonanList.filter(
    (p) => p.status === 'Menunggu Verifikasi'
  ).length;

  const expiringCount = surveyors.filter((s) => s.statusLisensi === 'Akan Berakhir').length;
  const unreadNotifCount = notifications.filter((n) => !n.dibaca).length;

  // Handlers
  const handleSelectSurveyor = (surveyor: Surveyor) => {
    setSelectedSurveyor(surveyor);
    setCurrentPage('surveyor-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVerification = (permohonan: Permohonan) => {
    setActiveVerification(permohonan);
  };

  const handleOpenVerificationForSurveyor = (surveyor: Surveyor) => {
    // Find matching permohonan or create a virtual one for inspection
    const existing = permohonanList.find(
      (p) => p.surveyorId === surveyor.id || p.nik === surveyor.nik
    );
    if (existing) {
      setActiveVerification(existing);
    } else {
      const virtualReq: Permohonan = {
        id: `REQ-${surveyor.id}`,
        nomorPermohonan: `PMH/SPPR/REG/${surveyor.id}`,
        surveyorId: surveyor.id,
        namaSurveyor: surveyor.namaLengkap,
        nik: surveyor.nik,
        jenisPermohonan: 'Perpanjangan Lisensi',
        tanggalPengajuan: '01 Oktober 2026',
        status: surveyor.statusLisensi === 'Aktif' ? 'Disetujui' : 'Menunggu Verifikasi',
        nomorLisensiLama: surveyor.nomorLisensi,
        wilayahDiajukan: surveyor.wilayahKerja,
        kualifikasiDiajukan: surveyor.kualifikasi,
        dokumen: surveyor.dokumen
      };
      setActiveVerification(virtualReq);
    }
  };

  const handleViewDocument = (
    dokumen: DokumenMitra,
    surveyorNama: string,
    surveyorNik: string
  ) => {
    setActiveDocument({ doc: dokumen, surveyorNama, surveyorNik });
  };

  // Add Surveyor Handler
  const handleAddSurveyor = (data: Partial<Surveyor>) => {
    const newId = `SRV-00${surveyors.length + 1}`;
    const newSurveyor: Surveyor = {
      id: newId,
      nik: data.nik || '3174xxxxxxxxxxxx',
      namaLengkap: data.namaLengkap || 'Nama Surveyor',
      gelar: data.gelar || 'S.T.',
      tempatLahir: data.tempatLahir || 'Jakarta',
      tanggalLahir: data.tanggalLahir || '01 Januari 1990',
      alamat: data.alamat || 'Alamat Domisili',
      email: data.email || 'surveyor@domain.com',
      telepon: data.telepon || '0812-xxxx-xxxx',
      nomorLisensi: data.nomorLisensi || `SKB-SPPR/2026/${newId}`,
      kualifikasi: data.kualifikasi || 'Surveyor Kadaster',
      wilayahKerja: data.wilayahKerja || 'Kantor Wilayah BPN Provinsi DKI Jakarta',
      kantorPertanahan: data.kantorPertanahan || 'Kantor Pertanahan Kota Terkait',
      bentukUsaha: data.bentukUsaha || 'Perorangan',
      namaKJSB: data.namaKJSB,
      asosiasiProfesi: data.asosiasiProfesi || 'Ikatan Surveyor Indonesia (ISI)',
      tanggalTerbit: data.tanggalTerbit || '04 Oktober 2026',
      tanggalBerakhir: data.tanggalBerakhir || '04 Oktober 2031',
      statusLisensi: 'Aktif',
      dokumen: data.dokumen || []
    };

    setSurveyors((prev) => [newSurveyor, ...prev]);

    // Add notification
    const newNotif: Notifikasi = {
      id: `NOTIF-${Date.now()}`,
      judul: 'Surveyor Baru Berhasil Didaftarkan',
      pesan: `Surveyor ${newSurveyor.namaLengkap} (${newSurveyor.nomorLisensi}) telah terdaftar dalam sistem Ditjen SPPR.`,
      kategori: 'sistem',
      waktu: 'Baru saja',
      dibaca: false,
      targetPage: 'surveyors'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addToast(`Surveyor ${newSurveyor.namaLengkap} berhasil ditambahkan!`, 'success');
  };

  // Approve Verification Handler
  const handleApproveVerification = (id: string, notes: string, checklist: any) => {
    const randomLicNum = Math.floor(10 + Math.random() * 90);
    const newLic = `SKB-SPPR/2026/${randomLicNum}`;

    setPermohonanList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'Disetujui',
            catatanVerifikator: notes || 'Berkas telah memenuhi ketentuan Permen ATR/BPN No. 9/2026.',
            nomorLisensiBaru: newLic,
            tanggalVerifikasi: '04 Oktober 2026',
            verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.',
            checklist
          };
        }
        return item;
      })
    );

    // If surveyor exists in list, update their status to Aktif
    const targetPermohonan = permohonanList.find((p) => p.id === id);
    if (targetPermohonan) {
      setSurveyors((prev) =>
        prev.map((s) => {
          if (s.id === targetPermohonan.surveyorId || s.nik === targetPermohonan.nik) {
            return {
              ...s,
              statusLisensi: 'Aktif',
              tanggalBerakhir: '04 Oktober 2031'
            };
          }
          return s;
        })
      );
    }

    // Add Notification
    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        judul: 'Verifikasi Permohonan Disetujui',
        pesan: `Permohonan lisensi ${targetPermohonan?.namaSurveyor || 'pemohon'} telah disetujui. SK Lisensi ${newLic} siap diterbitkan.`,
        kategori: 'verifikasi',
        waktu: 'Baru saja',
        dibaca: false,
        targetPage: 'permohonan'
      },
      ...prev
    ]);

    addToast('Verifikasi disetujui! SK Lisensi berhasil diterbitkan.', 'success');
  };

  // Reject Verification Handler
  const handleRejectVerification = (id: string, reason: string) => {
    setPermohonanList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'Ditolak',
            catatanVerifikator: reason,
            tanggalVerifikasi: '04 Oktober 2026',
            verifikatorNama: 'Fairuz Tsani Habibi, S.Kom.'
          };
        }
        return item;
      })
    );

    const targetPermohonan = permohonanList.find((p) => p.id === id);

    setNotifications((prev) => [
      {
        id: `NOTIF-${Date.now()}`,
        judul: 'Permohonan Lisensi Ditolak',
        pesan: `Permohonan atas nama ${targetPermohonan?.namaSurveyor} ditolak: ${reason}`,
        kategori: 'verifikasi',
        waktu: 'Baru saja',
        dibaca: false,
        targetPage: 'permohonan'
      },
      ...prev
    ]);

    addToast('Permohonan telah ditolak. Catatan dikirimkan ke pemohon.', 'error');
  };

  // Direct Renew from Perpanjangan Page
  const handleRenewLicenseDirectly = (surveyorId: string) => {
    setSurveyors((prev) =>
      prev.map((s) => {
        if (s.id === surveyorId) {
          return {
            ...s,
            statusLisensi: 'Aktif',
            tanggalBerakhir: '04 Oktober 2031'
          };
        }
        return s;
      })
    );

    const srv = surveyors.find((s) => s.id === surveyorId);
    addToast(`Lisensi ${srv?.namaLengkap || 'Surveyor'} berhasil diperpanjang hingga Oktober 2031!`, 'success');
  };

  // Verification action from Detail Page
  const handleVerifikasiFromDetail = (
    surveyor: Surveyor,
    action: 'approve' | 'reject',
    reason?: string
  ) => {
    if (action === 'approve') {
      setSurveyors((prev) =>
        prev.map((s) => (s.id === surveyor.id ? { ...s, statusLisensi: 'Aktif' } : s))
      );
      if (selectedSurveyor && selectedSurveyor.id === surveyor.id) {
        setSelectedSurveyor({ ...selectedSurveyor, statusLisensi: 'Aktif' });
      }
      addToast(`Status lisensi ${surveyor.namaLengkap} berhasil diverifikasi aktif!`, 'success');
    } else {
      setSurveyors((prev) =>
        prev.map((s) => (s.id === surveyor.id ? { ...s, statusLisensi: 'Dibekukan' } : s))
      );
      if (selectedSurveyor && selectedSurveyor.id === surveyor.id) {
        setSelectedSurveyor({ ...selectedSurveyor, statusLisensi: 'Dibekukan' });
      }
      addToast(`Lisensi ${surveyor.namaLengkap} telah dibekukan. Catatan: ${reason || 'Pelanggaran ketentuan'}.`, 'error');
    }
  };

  // Notification actions
  const handleMarkNotifAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, dibaca: true } : n))
    );
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, dibaca: true })));
    addToast('Semua notifikasi telah ditandai dibaca.', 'info');
  };

  const handleDeleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAllData = () => {
    setSurveyors([]);
    setPermohonanList([]);
    setNotifications([]);
    setSelectedSurveyor(null);
    addToast('Pangkalan data telah dikosongkan.', 'info');
  };

  const handleLoadSampleData = () => {
    setSurveyors(SAMPLE_SURVEYORS);
    setPermohonanList(SAMPLE_PERMOHONAN);
    setNotifications(SAMPLE_NOTIFICATIONS);
    addToast('Data contoh/demo berhasil dimuat ke sistem.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-800">
      <div className="flex-1 flex w-full">
        {/* Sidebar Kiri */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          pendingVerificationCount={pendingVerificationCount}
          expiringCount={expiringCount}
          unreadNotifCount={unreadNotifCount}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header
            currentPage={currentPage}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            notifications={notifications}
            onMarkNotificationAsRead={handleMarkNotifAsRead}
            onMarkAllNotificationsRead={handleMarkAllNotifsRead}
            selectedSurveyorName={selectedSurveyor?.namaLengkap}
            onGlobalSearch={(term) => {
              if (currentPage !== 'surveyors') {
                setCurrentPage('surveyors');
              }
            }}
            onClearData={handleClearAllData}
            onLoadSampleData={handleLoadSampleData}
            totalSurveyorsCount={surveyors.length}
          />

          {/* Main View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {currentPage === 'dashboard' && (
              <DashboardPage
                surveyors={surveyors}
                permohonanList={permohonanList}
                onNavigate={(page) => setCurrentPage(page)}
                onOpenAddSurveyor={() => setIsAddSurveyorModalOpen(true)}
                onOpenVerification={handleOpenVerification}
                onSelectSurveyor={handleSelectSurveyor}
                onLoadSampleData={handleLoadSampleData}
              />
            )}

            {currentPage === 'surveyors' && (
              <SurveyorsPage
                surveyors={surveyors}
                onSelectSurveyor={handleSelectSurveyor}
                onOpenAddSurveyor={() => setIsAddSurveyorModalOpen(true)}
                onEditSurveyor={(srv) => {
                  handleSelectSurveyor(srv);
                  addToast(`Membuka mode perbaikan data untuk ${srv.namaLengkap}`, 'info');
                }}
                onOpenVerificationForSurveyor={handleOpenVerificationForSurveyor}
                onLoadSampleData={handleLoadSampleData}
              />
            )}

            {currentPage === 'surveyor-detail' && selectedSurveyor && (
              <SurveyorDetailPage
                surveyor={selectedSurveyor}
                onBack={() => setCurrentPage('surveyors')}
                onViewDocument={handleViewDocument}
                onVerifikasiAction={handleVerifikasiFromDetail}
                onEdit={(srv) => addToast('Form edit lisensi siap diperbarui.', 'info')}
              />
            )}

            {currentPage === 'permohonan' && (
              <PermohonanPage
                permohonanList={permohonanList}
                onOpenVerification={handleOpenVerification}
              />
            )}

            {currentPage === 'verifikasi' && (
              <VerifikasiPage
                permohonanList={permohonanList}
                onOpenVerification={handleOpenVerification}
              />
            )}

            {currentPage === 'perpanjangan' && (
              <PerpanjanganPage
                surveyors={surveyors}
                permohonanList={permohonanList}
                onOpenVerification={handleOpenVerification}
                onSelectSurveyor={handleSelectSurveyor}
                onRenewLicense={handleRenewLicenseDirectly}
              />
            )}

            {currentPage === 'notifikasi' && (
              <NotifikasiPage
                notifications={notifications}
                onMarkAsRead={handleMarkNotifAsRead}
                onMarkAllAsRead={handleMarkAllNotifsRead}
                onDeleteNotification={handleDeleteNotif}
                onNavigate={(page) => setCurrentPage(page)}
              />
            )}

            {currentPage === 'laporan' && (
              <LaporanPage
                surveyors={surveyors}
                permohonanList={permohonanList}
                onOpenExportModal={() => setIsExportReportModalOpen(true)}
              />
            )}

            {currentPage === 'pengaturan' && (
              <PengaturanPage
                onSaveNotification={(msg) => addToast(msg, 'success')}
              />
            )}
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <DocumentModal
        isOpen={!!activeDocument}
        onClose={() => setActiveDocument(null)}
        dokumen={activeDocument?.doc || null}
        surveyorNama={activeDocument?.surveyorNama}
        surveyorNik={activeDocument?.surveyorNik}
      />

      <VerificationModal
        isOpen={!!activeVerification}
        onClose={() => setActiveVerification(null)}
        permohonan={activeVerification}
        onApprove={handleApproveVerification}
        onReject={handleRejectVerification}
        onViewDocument={handleViewDocument}
      />

      <AddSurveyorModal
        isOpen={isAddSurveyorModalOpen}
        onClose={() => setIsAddSurveyorModalOpen(false)}
        onAddSurveyor={handleAddSurveyor}
      />

      <ExportReportModal
        isOpen={isExportReportModalOpen}
        onClose={() => setIsExportReportModalOpen(false)}
        onExportSuccess={(format) => {
          addToast(`Laporan format ${format} berhasil digenerate dan siap diunduh!`, 'success');
        }}
      />

      {/* Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
