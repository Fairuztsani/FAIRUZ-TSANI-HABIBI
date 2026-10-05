import React, { useState, useMemo } from 'react';
import { Permohonan, StatusPermohonan } from '../../types/index.ts';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { Pagination } from '../common/Pagination.tsx';
import {
  CheckSquare,
  Clock,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';

interface VerifikasiPageProps {
  permohonanList: Permohonan[];
  onOpenVerification: (permohonan: Permohonan) => void;
}

export const VerifikasiPage: React.FC<VerifikasiPageProps> = ({
  permohonanList,
  onOpenVerification
}) => {
  const [filterTab, setFilterTab] = useState<'Semua' | 'Belum Diverifikasi' | 'Diproses' | 'Disetujui' | 'Ditolak'>('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return {
      Semua: permohonanList.length,
      'Belum Diverifikasi': permohonanList.filter((p) => p.status === 'Menunggu Verifikasi').length,
      Diproses: permohonanList.filter((p) => p.status === 'Sedang Diproses').length,
      Disetujui: permohonanList.filter((p) => p.status === 'Disetujui').length,
      Ditolak: permohonanList.filter((p) => p.status === 'Ditolak').length
    };
  }, [permohonanList]);

  // Filtered
  const filteredList = useMemo(() => {
    return permohonanList.filter((item) => {
      const matchSearch =
        item.namaSurveyor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nomorPermohonan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nik.includes(searchTerm);

      let matchTab = true;
      if (filterTab === 'Belum Diverifikasi') matchTab = item.status === 'Menunggu Verifikasi';
      if (filterTab === 'Diproses') matchTab = item.status === 'Sedang Diproses';
      if (filterTab === 'Disetujui') matchTab = item.status === 'Disetujui';
      if (filterTab === 'Ditolak') matchTab = item.status === 'Ditolak';

      return matchSearch && matchTab;
    });
  }, [permohonanList, searchTerm, filterTab]);

  const totalPages = Math.ceil(filteredList.length / pageSize) || 1;
  const paginatedList = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-5">
      {/* Header Info Banner for Verifier */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Verifikasi Berkas Permohonan Surveyor
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Modul Verifikator
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pemeriksaan keabsahan dokumen persyaratan, uji kesesuaian biodata Dukcapil, dan pengujian riwayat sertifikasi kompetensi
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
          <Clock size={16} className="text-amber-600 shrink-0" />
          <div>
            <span className="text-slate-500 block text-[10px]">Antrean Menunggu</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {tabCounts['Belum Diverifikasi']} Permohonan
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs (Interactive Segmented Buttons) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
        {/* Segmented Filter Control */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {(['Semua', 'Belum Diverifikasi', 'Diproses', 'Disetujui', 'Ditolak'] as const).map((tab) => {
            const isActive = filterTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setFilterTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0f2e59] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tabCounts[tab]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama atau NIK..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0f2e59] outline-none"
          />
        </div>
      </div>

      {/* Verification Data Table */}
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
                <th className="py-3 px-4 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 px-4 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
                        <CheckSquare size={22} />
                      </div>
                      <p className="text-sm font-bold text-slate-800">Antrean Verifikasi Kosong</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Tidak ada berkas permohonan yang perlu diverifikasi pada kategori status ini.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedList.map((item, idx) => {
                  const itemIndex = (currentPage - 1) * pageSize + idx + 1;
                  const isPending = item.status === 'Menunggu Verifikasi' || item.status === 'Sedang Diproses';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isPending ? 'bg-amber-50/20' : ''
                      }`}
                    >
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
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors shadow-2xs ${
                            isPending
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <FileCheck size={14} />
                          <span>{isPending ? 'Verifikasi Berkas' : 'Review Hasil'}</span>
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
          itemLabel="Antrean Verifikasi"
        />
      </div>
    </div>
  );
};
