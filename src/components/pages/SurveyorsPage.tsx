import React, { useState, useMemo } from 'react';
import { Surveyor, Permohonan, StatusLisensi } from '../../types/index.ts';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { Pagination } from '../common/Pagination.tsx';
import { WILAYAH_LIST } from '../../data/dummyData.ts';
import {
  Search,
  Filter,
  UserPlus,
  Eye,
  Edit,
  ShieldCheck,
  Building2,
  FileCheck2,
  ChevronDown
} from 'lucide-react';

interface SurveyorsPageProps {
  surveyors: Surveyor[];
  onSelectSurveyor: (surveyor: Surveyor) => void;
  onOpenAddSurveyor: () => void;
  onEditSurveyor: (surveyor: Surveyor) => void;
  onOpenVerificationForSurveyor: (surveyor: Surveyor) => void;
  onLoadSampleData?: () => void;
}

export const SurveyorsPage: React.FC<SurveyorsPageProps> = ({
  surveyors,
  onSelectSurveyor,
  onOpenAddSurveyor,
  onEditSurveyor,
  onOpenVerificationForSurveyor,
  onLoadSampleData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [wilayahFilter, setWilayahFilter] = useState<string>('Semua Wilayah');
  const [kualifikasiFilter, setKualifikasiFilter] = useState<string>('Semua');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filter logic
  const filteredSurveyors = useMemo(() => {
    return surveyors.filter((srv) => {
      const matchSearch =
        srv.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.nik.includes(searchTerm) ||
        srv.nomorLisensi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (srv.namaKJSB && srv.namaKJSB.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus = statusFilter === 'Semua' || srv.statusLisensi === statusFilter;
      const matchWilayah = wilayahFilter === 'Semua Wilayah' || srv.wilayahKerja === wilayahFilter;
      const matchKualifikasi = kualifikasiFilter === 'Semua' || srv.kualifikasi === kualifikasiFilter;

      return matchSearch && matchStatus && matchWilayah && matchKualifikasi;
    });
  }, [surveyors, searchTerm, statusFilter, wilayahFilter, kualifikasiFilter]);

  const totalPages = Math.ceil(filteredSurveyors.length / pageSize) || 1;
  const paginatedSurveyors = filteredSurveyors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-5">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Data Surveyor Berlisensi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pangkalan data terpadu Surveyor Kadaster (SK) dan Asisten Surveyor Kadaster (ASK) Kementerian ATR/BPN
          </p>
        </div>

        <button
          onClick={onOpenAddSurveyor}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0f2e59] hover:bg-[#16396b] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          <UserPlus size={15} />
          <span>Tambah Surveyor</span>
        </button>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama, NIK, nomor SK..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:border-[#0f2e59] outline-none"
            >
              <option value="Semua">Semua Status Lisensi</option>
              <option value="Aktif">Lisensi Aktif</option>
              <option value="Akan Berakhir">Akan Berakhir (&le; 30 Hari)</option>
              <option value="Kedaluwarsa">Kedaluwarsa</option>
              <option value="Dibekukan">Dibekukan</option>
            </select>
          </div>

          {/* Wilayah Filter */}
          <div>
            <select
              value={wilayahFilter}
              onChange={(e) => {
                setWilayahFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:border-[#0f2e59] outline-none truncate"
            >
              {WILAYAH_LIST.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          {/* Kualifikasi Filter */}
          <div>
            <select
              value={kualifikasiFilter}
              onChange={(e) => {
                setKualifikasiFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:border-[#0f2e59] outline-none"
            >
              <option value="Semua">Semua Kualifikasi</option>
              <option value="Surveyor Kadaster">Surveyor Kadaster (SK)</option>
              <option value="Asisten Surveyor Kadaster">Asisten Surveyor Kadaster (ASK)</option>
            </select>
          </div>
        </div>

        {/* Active filter counter and reset if any */}
        {(searchTerm || statusFilter !== 'Semua' || wilayahFilter !== 'Semua Wilayah' || kualifikasiFilter !== 'Semua') && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
            <span>
              Menemukan <strong className="text-slate-800 tabular-nums">{filteredSurveyors.length}</strong> surveyor yang sesuai kriteria.
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('Semua');
                setWilayahFilter('Semua Wilayah');
                setKualifikasiFilter('Semua');
                setCurrentPage(1);
              }}
              className="text-[#0f2e59] hover:underline font-medium text-xs"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Surveyor & Gelar</th>
                <th className="py-3 px-4">NIK</th>
                <th className="py-3 px-4">Nomor Lisensi</th>
                <th className="py-3 px-4">Wilayah Kerja & Bentuk Usaha</th>
                <th className="py-3 px-4">Masa Berlaku</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedSurveyors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 px-4 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
                        <UserPlus size={22} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">
                        {surveyors.length === 0 ? 'Pangkalan Data Surveyor Kosong' : 'Data Tidak Ditemukan'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {surveyors.length === 0
                          ? 'Belum ada data Surveyor Berlisensi yang terdaftar di sistem Ditjen SPPR.'
                          : 'Tidak ada hasil yang sesuai dengan kata kunci atau filter yang Anda pilih.'}
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={onOpenAddSurveyor}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f2e59] hover:bg-[#16396b] text-white text-xs font-semibold shadow-2xs transition-colors"
                        >
                          <UserPlus size={14} />
                          <span>Tambah Surveyor Baru</span>
                        </button>
                        {surveyors.length === 0 && onLoadSampleData && (
                          <button
                            onClick={onLoadSampleData}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
                          >
                            <span>Muat Data Contoh</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedSurveyors.map((surveyor, idx) => {
                  const itemIndex = (currentPage - 1) * pageSize + idx + 1;

                  return (
                    <tr key={surveyor.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-400">
                        {itemIndex}
                      </td>

                      <td className="py-3.5 px-4">
                        <div
                          onClick={() => onSelectSurveyor(surveyor)}
                          className="font-bold text-slate-900 hover:text-[#0f2e59] cursor-pointer"
                        >
                          {surveyor.namaLengkap}, {surveyor.gelar}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-medium text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/50">
                            {surveyor.kualifikasi}
                          </span>
                          <span>•</span>
                          <span>{surveyor.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-800 tabular-nums font-medium">
                        {surveyor.nik}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-900 font-semibold tabular-nums">
                          {surveyor.nomorLisensi}
                        </span>
                        <div className="text-[10px] text-slate-400 font-sans">
                          SK Kementerian ATR/BPN
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-800 font-medium max-w-xs truncate" title={surveyor.wilayahKerja}>
                          {surveyor.wilayahKerja.replace('Kantor Wilayah BPN ', '')}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          {surveyor.bentukUsaha === 'Kantor Jasa Surveyor Berlisensi (KJSB)' ? (
                            <span className="text-blue-700 flex items-center gap-1 font-medium">
                              <Building2 size={12} />
                              {surveyor.namaKJSB || 'KJSB Terdaftar'}
                            </span>
                          ) : (
                            <span>Perorangan</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 tabular-nums">
                        <span className="text-slate-800 font-medium">{surveyor.tanggalBerakhir}</span>
                        <div className="text-[10px] text-slate-400">Terbit: {surveyor.tanggalTerbit}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge status={surveyor.statusLisensi} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1">
                          {/* Detail Button */}
                          <button
                            onClick={() => onSelectSurveyor(surveyor)}
                            title="Lihat Detail Biodata & Lisensi"
                            className="p-1.5 rounded-md hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => onEditSurveyor(surveyor)}
                            title="Edit Data Surveyor"
                            className="p-1.5 rounded-md hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 transition-colors"
                          >
                            <Edit size={15} />
                          </button>

                          {/* Quick Verify affordance */}
                          <button
                            onClick={() => onOpenVerificationForSurveyor(surveyor)}
                            title="Verifikasi Dokumen & Pengajuan"
                            className="p-1.5 rounded-md hover:bg-amber-100 text-amber-700 transition-colors"
                          >
                            <FileCheck2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredSurveyors.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          itemLabel="Surveyor Berlisensi"
        />
      </div>
    </div>
  );
};
