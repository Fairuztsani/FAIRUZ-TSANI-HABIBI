import React, { useState, useMemo } from 'react';
import { PengajuanPerpanjangan } from '../../../types/mitraPerpanjangan.ts';
import { Search, Filter, CheckSquare, Clock, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PanitiaPengajuanPageProps {
  pengajuanList: PengajuanPerpanjangan[];
  onOpenVerifikasi: (pengajuan: PengajuanPerpanjangan) => void;
}

export const PanitiaPengajuanPage: React.FC<PanitiaPengajuanPageProps> = ({
  pengajuanList,
  onOpenVerifikasi
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filtered = useMemo(() => {
    return pengajuanList.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.surveyor.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lisensi.no_lisensi.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [pengajuanList, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Antrean Pengajuan Perpanjangan Lisensi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar permohonan masuk yang perlu diperiksa dan diverifikasi oleh tim panitia Ditjen SPPR.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Antrean: <strong className="text-slate-900">{filtered.length} Berkas</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama surveyor, nomor registrasi, nomor lisensi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0f2e59] outline-none"
            />
          </div>

          <div className="sm:col-span-4 relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-[#0f2e59] outline-none font-medium"
            >
              <option value="Semua">Semua Status (5 Kategori)</option>
              <option value="DIAJUKAN">DIAJUKAN (Baru)</option>
              <option value="DALAM_VERIFIKASI">DALAM_VERIFIKASI</option>
              <option value="PERLU_PERBAIKAN">PERLU_PERBAIKAN</option>
              <option value="PROSES_SK">PROSES_SK</option>
              <option value="SK_TERBIT">SK_TERBIT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Nama Pemohon</th>
                <th className="py-3 px-4">Nomor Lisensi</th>
                <th className="py-3 px-4">Masa Berlaku</th>
                <th className="py-3 px-4">Putaran</th>
                <th className="py-3 px-4">Status Pengajuan</th>
                <th className="py-3 px-4 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.surveyor.nama}</div>
                    <div className="text-[10px] text-slate-500">{item.surveyor.wilayah_kerja} • {item.surveyor.kualifikasi}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {item.lisensi.no_lisensi}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-800">{item.lisensi.tgl_berakhir}</div>
                    <span className="text-[10px] text-amber-700 font-semibold">Sisa {item.lisensi.sisaHari} Hari</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                      Putaran {item.riwayatVerifikasi.length || 1}
                    </span>
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
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onOpenVerifikasi(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <CheckSquare size={13} />
                      <span>{item.status === 'SK_TERBIT' ? 'Tinjau SK' : 'Periksa Berkas'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
