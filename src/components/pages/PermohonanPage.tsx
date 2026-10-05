import React, { useState, useMemo } from 'react';
import { Permohonan, StatusPermohonan, JenisPermohonan } from '../../types/index.ts';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { Pagination } from '../common/Pagination.tsx';
import { Search, Filter, FileText, CheckSquare, Eye } from 'lucide-react';

interface PermohonanPageProps {
  permohonanList: Permohonan[];
  onOpenVerification: (permohonan: Permohonan) => void;
}

export const PermohonanPage: React.FC<PermohonanPageProps> = ({
  permohonanList,
  onOpenVerification
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [jenisFilter, setJenisFilter] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const filteredList = useMemo(() => {
    return permohonanList.filter((item) => {
      const matchSearch =
        item.namaSurveyor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomorPermohonan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nik.includes(searchTerm);

      const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;
      const matchJenis = jenisFilter === 'Semua' || item.jenisPermohonan === jenisFilter;

      return matchSearch && matchStatus && matchJenis;
    });
  }, [permohonanList, searchTerm, statusFilter, jenisFilter]);

  const totalPages = Math.ceil(filteredList.length / pageSize) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Daftar Permohonan Lisensi Surveyor
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitoring seluruh permohonan lisensi baru, perpanjangan, peningkatan kualifikasi, dan pemindahan wilayah
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama pemohon, nomor berkas..."
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
              <option value="Semua">Semua Status Permohonan</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Sedang Diproses">Sedang Diproses</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          <div>
            <select
              value={jenisFilter}
              onChange={(e) => {
                setJenisFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:border-[#0f2e59] outline-none"
            >
              <option value="Semua">Semua Jenis Permohonan</option>
              <option value="Lisensi Baru">Lisensi Baru</option>
              <option value="Perpanjangan Lisensi">Perpanjangan Lisensi</option>
              <option value="Peningkatan Kualifikasi">Peningkatan Kualifikasi</option>
              <option value="Pindah Wilayah Kerja">Pindah Wilayah Kerja</option>
            </select>
          </div>
        </div>

        {(searchTerm || statusFilter !== 'Semua' || jenisFilter !== 'Semua') && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-500">
            <span>Ditemukan <strong className="text-slate-800 tabular-nums">{filteredList.length}</strong> berkas permohonan.</span>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('Semua');
                setJenisFilter('Semua');
                setCurrentPage(1);
              }}
              className="text-[#0f2e59] hover:underline font-medium text-xs"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Surveyor</th>
                <th className="py-3 px-4">Nomor Permohonan</th>
                <th className="py-3 px-4">Jenis Permohonan</th>
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
                        <FileText size={22} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">Tidak Ada Permohonan</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Belum ada berkas permohonan lisensi yang masuk atau sesuai dengan kriteria filter saat ini.
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
                        <div className="text-[11px] font-mono text-slate-500 tabular-nums">
                          NIK: {item.nik}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-800 font-semibold tabular-nums">
                          {item.nomorPermohonan}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{item.jenisPermohonan}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {item.wilayahDiajukan}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 tabular-nums text-slate-700">
                        {item.tanggalPengajuan}
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge status={item.status} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onOpenVerification(item)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#0f2e59] hover:bg-[#16396b] text-white transition-colors shadow-2xs"
                        >
                          <Eye size={12} />
                          <span>Detail & Verifikasi</span>
                        </button>
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
          totalItems={filteredList.length}
          pageSize={pageSize}
          onPageChange={(p) => setCurrentPage(p)}
          itemLabel="Permohonan"
        />
      </div>
    </div>
  );
};
