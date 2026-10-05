import React, { useState } from 'react';
import { Modal } from '../common/Modal.tsx';
import { FileSpreadsheet, FileText, Download, CheckCircle2 } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportSuccess: (format: string) => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  onExportSuccess
}) => {
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [periode, setPeriode] = useState('2026-q3');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onExportSuccess(format.toUpperCase());
      onClose();
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Laporan Surveyor Berlisensi"
      subtitle="Unduh rekapitulasi data surveyor dan permohonan lisensi Ditjen SPPR"
      maxWidth="md"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Pilih Format Berkas
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('pdf')}
              className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                format === 'pdf'
                  ? 'border-[#0f2e59] bg-blue-50/40 ring-1 ring-[#0f2e59]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Dokumen PDF Resmi</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Lengkap dengan kop & TTE Ditjen SPPR</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormat('excel')}
              className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                format === 'excel'
                  ? 'border-[#0f2e59] bg-blue-50/40 ring-1 ring-[#0f2e59]'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Microsoft Excel / CSV</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Tabel data mentah untuk analisis tabular</p>
              </div>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Periode Laporan
          </label>
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:border-[#0f2e59] outline-none"
          >
            <option value="2026-all">Tahun Berjalan 2026 (Januari - Oktober)</option>
            <option value="2026-q3">Kuartal III 2026 (Juli - September)</option>
            <option value="2026-q2">Kuartal II 2026 (April - Juni)</option>
            <option value="2026-q1">Kuartal I 2026 (Januari - Maret)</option>
            <option value="all-time">Semua Arsip Surveyor Terdaftar (Historis)</option>
          </select>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">Cakupan Data yang Diekspor:</p>
          <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
            <li>Daftar lengkap 1.482 Surveyor Kadaster & Asisten Terdaftar</li>
            <li>Status masa berlaku lisensi & kepemilikan KJSB</li>
            <li>Log verifikasi permohonan Ditjen SPPR per wilayah</li>
          </ul>
        </div>

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#0f2e59] hover:bg-[#16396b] rounded-lg transition-colors shadow-xs disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Menyiapkan Berkas...</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Unduh Laporan ({format.toUpperCase()})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
