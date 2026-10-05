import React, { useState, useMemo } from 'react';
import { PengajuanPerpanjangan } from '../../../types/mitraPerpanjangan.ts';
import {
  Search,
  Filter,
  Eye,
  History,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface SbRiwayatPageProps {
  pengajuanList: PengajuanPerpanjangan[];
  onSelectDetail: (pengajuan: PengajuanPerpanjangan) => void;
}

export const SbRiwayatPage: React.FC<SbRiwayatPageProps> = ({
  pengajuanList,
  onSelectDetail
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return pengajuanList.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lisensi.no_lisensi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.surveyor.nama.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [pengajuanList, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedList = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Riwayat Pengajuan Perpanjangan Lisensi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar seluruh rekam jejak permohonan perpanjangan lisensi beserta riwayat status dan verifikasi.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Permohonan: <strong className="text-slate-900">{filtered.length} Berkas</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-8 relative">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nomor permohonan (PML...), nomor lisensi..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0f2e59] outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-4 relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-[#0f2e59] outline-none font-medium"
            >
              <option value="Semua">Semua Status (5 Kategori)</option>
              <option value="DIAJUKAN">DIAJUKAN</option>
              <option value="DALAM_VERIFIKASI">DALAM_VERIFIKASI</option>
              <option value="PERLU_PERBAIKAN">PERLU_PERBAIKAN</option>
              <option value="PROSES_SK">PROSES_SK</option>
              <option value="SK_TERBIT">SK_TERBIT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nomor Pengajuan</th>
                <th className="py-3 px-4">Nomor Lisensi</th>
                <th className="py-3 px-4">Tanggal Pengajuan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Tanggal Update</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <History size={28} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">Tidak ada pengajuan ditemukan</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Sesuaikan kriteria filter atau kata kunci pencarian</p>
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => {
                  const lastLog = item.riwayatStatus[item.riwayatStatus.length - 1];
                  const lastUpdate = lastLog ? lastLog.tgl_ubah : item.tgl_pengajuan;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#0f2e59]">
                        {item.id}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-800">
                        {item.lisensi.no_lisensi}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {item.tgl_pengajuan}
                      </td>

                      <td className="py-3.5 px-4">
                        {item.status === 'DIAJUKAN' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-300">
                            DIAJUKAN
                          </span>
                        )}
                        {item.status === 'DALAM_VERIFIKASI' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                            DALAM_VERIFIKASI
                          </span>
                        )}
                        {item.status === 'PERLU_PERBAIKAN' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            PERLU_PERBAIKAN
                          </span>
                        )}
                        {item.status === 'PROSES_SK' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                            PROSES_SK
                          </span>
                        )}
                        {item.status === 'SK_TERBIT' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            SK_TERBIT
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {lastUpdate}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onSelectDetail(item)}
                          className="px-3 py-1.5 rounded-lg bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Eye size={13} />
                          <span>Detail</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Halaman {currentPage} dari {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-50 text-slate-600"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-50 text-slate-600"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
