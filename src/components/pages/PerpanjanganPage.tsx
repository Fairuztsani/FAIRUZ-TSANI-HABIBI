import React, { useState, useMemo } from 'react';
import { Surveyor, Permohonan } from '../../types/index.ts';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { Pagination } from '../common/Pagination.tsx';
import { ConfirmationDialog } from '../common/ConfirmationDialog.tsx';
import {
  CalendarClock,
  AlertTriangle,
  Search,
  CheckCircle2,
  FileText,
  Clock,
  RefreshCw,
  Eye,
  ShieldCheck
} from 'lucide-react';

interface PerpanjanganPageProps {
  surveyors: Surveyor[];
  permohonanList: Permohonan[];
  onOpenVerification: (permohonan: Permohonan) => void;
  onSelectSurveyor: (surveyor: Surveyor) => void;
  onRenewLicense: (surveyorId: string) => void;
}

export const PerpanjanganPage: React.FC<PerpanjanganPageProps> = ({
  surveyors,
  permohonanList,
  onOpenVerification,
  onSelectSurveyor,
  onRenewLicense
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [selectedSurveyorForRenew, setSelectedSurveyorForRenew] = useState<Surveyor | null>(null);

  // Expiring in 30 days list
  const expiringSurveyors = useMemo(() => {
    return surveyors.filter((s) => s.statusLisensi === 'Akan Berakhir');
  }, [surveyors]);

  // Combine surveyor data with perpanjangan application data
  const combinedPerpanjanganList = useMemo(() => {
    // 1. Applications with type 'Perpanjangan Lisensi'
    const perpanjanganApps = permohonanList.filter((p) => p.jenisPermohonan === 'Perpanjangan Lisensi');

    // 2. Surveyors that are 'Akan Berakhir' or 'Kedaluwarsa' that might or might not have an app
    const list: Array<{
      id: string;
      surveyorId: string;
      namaSurveyor: string;
      nomorLisensi: string;
      masaBerlaku: string;
      tanggalPengajuan: string;
      status: string;
      permohonanObj?: Permohonan;
      surveyorObj?: Surveyor;
    }> = [];

    // Add existing renewal apps
    perpanjanganApps.forEach((app) => {
      const srv = surveyors.find((s) => s.id === app.surveyorId || s.nik === app.nik);
      list.push({
        id: app.id,
        surveyorId: app.surveyorId,
        namaSurveyor: app.namaSurveyor,
        nomorLisensi: app.nomorLisensiLama || (srv ? srv.nomorLisensi : 'N/A'),
        masaBerlaku: srv ? srv.tanggalBerakhir : '02 November 2026',
        tanggalPengajuan: app.tanggalPengajuan,
        status: app.status,
        permohonanObj: app,
        surveyorObj: srv
      });
    });

    // Add surveyors that are expiring but not yet in applications list
    expiringSurveyors.forEach((srv) => {
      const alreadyInList = list.some((l) => l.surveyorId === srv.id);
      if (!alreadyInList) {
        list.push({
          id: `EXP-${srv.id}`,
          surveyorId: srv.id,
          namaSurveyor: srv.namaLengkap,
          nomorLisensi: srv.nomorLisensi,
          masaBerlaku: srv.tanggalBerakhir,
          tanggalPengajuan: 'Belum Mengajukan',
          status: 'Akan Berakhir',
          surveyorObj: srv
        });
      }
    });

    return list.filter((item) => {
      const matchSearch =
        item.namaSurveyor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomorLisensi.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [surveyors, permohonanList, expiringSurveyors, searchTerm, statusFilter]);

  const totalPages = Math.ceil(combinedPerpanjanganList.length / pageSize) || 1;
  const paginatedList = combinedPerpanjanganList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleConfirmRenew = () => {
    if (selectedSurveyorForRenew) {
      onRenewLicense(selectedSurveyorForRenew.id);
      setSelectedSurveyorForRenew(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Banner: Lisensi yang akan berakhir dalam 30 hari (Mandatory from prompt) */}
      <div className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/50 p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-orange-100 text-orange-700 shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-orange-950">
                  Lisensi yang Akan Berakhir dalam 30 Hari
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-200 text-orange-900 tabular-nums">
                  {expiringSurveyors.length} Lisensi Kritis
                </span>
              </div>
              <p className="text-xs text-orange-800 mt-1 max-w-3xl leading-relaxed">
                Berdasarkan Permen ATR/BPN No. 9/2026, permohonan perpanjangan lisensi Surveyor Kadaster wajib diajukan paling lambat 30 hari kalender sebelum masa berlaku berakhir untuk menjaga legalitas produk peta pendaftaran.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Batas Toleransi: 30 Hari</span>
          </div>
        </div>

        {/* Quick List of Expiring Surveyors */}
        <div className="mt-4 pt-3.5 border-t border-orange-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {expiringSurveyors.map((srv) => (
            <div
              key={srv.id}
              className="flex items-center justify-between p-2.5 bg-white/80 rounded-lg border border-orange-200 text-xs"
            >
              <div className="min-w-0">
                <p className="font-bold text-slate-900 truncate">{srv.namaLengkap}</p>
                <p className="text-[11px] text-orange-800 font-mono">Berakhir: {srv.tanggalBerakhir}</p>
              </div>
              <button
                onClick={() => onSelectSurveyor(srv)}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#0f2e59] bg-white border border-slate-200 hover:bg-slate-50 rounded shadow-2xs shrink-0 ml-2"
              >
                Detail
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama surveyor atau no lisensi..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0f2e59] outline-none"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:border-[#0f2e59] outline-none"
            >
              <option value="Semua">Semua Status Perpanjangan</option>
              <option value="Akan Berakhir">Akan Berakhir</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Sedang Diproses">Sedang Diproses (Diproses)</option>
              <option value="Disetujui">Disetujui (SK Terbit)</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          <div className="flex items-center justify-end text-xs text-slate-500">
            <span>Total Pengajuan & Masa Kritis: <strong className="text-slate-800 tabular-nums">{combinedPerpanjanganList.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Perpanjangan Table (Mandatory from prompt) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Surveyor</th>
                <th className="py-3 px-4">Nomor Lisensi</th>
                <th className="py-3 px-4">Masa Berlaku</th>
                <th className="py-3 px-4">Tanggal Pengajuan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 px-4 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
                        <CalendarClock size={22} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">Tidak Ada Masa Perpanjangan Kritis</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Saat ini tidak ada lisensi surveyor yang memasuki masa tenggang kedaluwarsa (&le; 30 hari) atau pengajuan perpanjangan.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => {
                  const itemIndex = (currentPage - 1) * pageSize + idx + 1;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-400">
                        {itemIndex}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{item.namaSurveyor}</div>
                        <div className="text-[11px] text-slate-500">
                          {item.surveyorObj ? item.surveyorObj.kualifikasi : 'Surveyor Kadaster'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800 tabular-nums">
                        {item.nomorLisensi}
                      </td>

                      <td className="py-3.5 px-4 tabular-nums">
                        <span className="font-medium text-slate-800">{item.masaBerlaku}</span>
                      </td>

                      <td className="py-3.5 px-4 tabular-nums text-slate-600">
                        {item.tanggalPengajuan}
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge status={item.status} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          {item.permohonanObj ? (
                            <button
                              onClick={() => onOpenVerification(item.permohonanObj!)}
                              className="px-3 py-1 text-xs font-semibold rounded bg-[#0f2e59] hover:bg-[#16396b] text-white transition-colors shadow-2xs"
                            >
                              Verifikasi Berkas
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (item.surveyorObj) setSelectedSurveyorForRenew(item.surveyorObj);
                              }}
                              className="px-3 py-1 text-xs font-semibold rounded bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-2xs"
                            >
                              Perpanjang SK
                            </button>
                          )}

                          {item.surveyorObj && (
                            <button
                              onClick={() => onSelectSurveyor(item.surveyorObj!)}
                              title="Lihat Detail Profil Surveyor"
                              className="p-1 rounded hover:bg-slate-200 text-slate-600"
                            >
                              <Eye size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={combinedPerpanjanganList.length}
          pageSize={pageSize}
          onPageChange={(p) => setCurrentPage(p)}
          itemLabel="Perpanjangan Lisensi"
        />
      </div>

      {/* Confirmation Dialog for Fast Renewal */}
      <ConfirmationDialog
        isOpen={!!selectedSurveyorForRenew}
        onClose={() => setSelectedSurveyorForRenew(null)}
        onConfirm={handleConfirmRenew}
        variant="success"
        title="Terbitkan Perpanjangan Lisensi 5 Tahun"
        message={`Apakah Anda ingin menerbitkan SK Perpanjangan Lisensi atas nama ${selectedSurveyorForRenew?.namaLengkap}? Masa berlaku lisensi akan diperpanjang secara otomatis hingga Oktober 2031.`}
        confirmLabel="Ya, Terbitkan Perpanjangan"
        cancelLabel="Batal"
      />
    </div>
  );
};
