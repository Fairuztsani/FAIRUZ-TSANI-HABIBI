import React from 'react';
import { X, Download, Printer, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  documentType: string;
  surveyorName: string;
  licenseNumber?: string;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  documentType,
  surveyorName,
  licenseNumber
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#0f2e59] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText size={17} className="text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">{title}</h3>
              <p className="text-[11px] text-slate-300 font-mono">Format: Dokumen PDF Resmi ATR/BPN</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => alert(`Mengunduh dokumen: ${title}.pdf`)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Unduh PDF"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Cetak Dokumen"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: High Fidelity Government Document Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-slate-100 flex justify-center">
          <div className="bg-white w-full max-w-2xl shadow-md border border-slate-200 p-8 rounded-xl text-slate-800 text-xs space-y-6">
            {/* Kop Surat Kementerian */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#0f2e59] text-white flex items-center justify-center mb-1">
                <ShieldCheck size={26} className="text-amber-400" />
              </div>
              <h4 className="font-extrabold text-sm tracking-wide uppercase text-slate-900">
                Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional
              </h4>
              <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-tight">
                Direktorat Jenderal Survei dan Pemetaan Pertanahan dan Ruang
              </p>
              <p className="text-[10px] text-slate-500">
                Jl. Raden Patah I No. 1, Selong, Kebayoran Baru, Jakarta Selatan 12110
              </p>
            </div>

            {/* Document Title */}
            <div className="text-center py-2 space-y-1">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 underline underline-offset-4">
                {documentType}
              </h5>
              <p className="text-[11px] font-mono text-slate-600">
                Nomor: {licenseNumber || 'DOC-SPPR-2026-0491'}
              </p>
            </div>

            {/* Metadata Fields */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Nama Pemilik Berkas:</span>
                <span className="font-bold text-slate-900">{surveyorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Kualifikasi:</span>
                <span className="font-semibold text-slate-800">Surveyor Kadaster Berlisensi</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Status Verifikasi Sistem:</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                  Terverifikasi Valid
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Stempel Digital SPPR:</span>
                <span className="font-mono text-slate-600 text-[10px]">SHA256: 7f8a9b2c... verified</span>
              </div>
            </div>

            <p className="text-[11px] leading-relaxed text-slate-600 text-justify">
              Dokumen ini merupakan salinan digital resmi yang disimpan pada basis data Aplikasi Mitra Kementerian ATR/BPN untuk keperluan verifikasi administrasi dan perpanjangan lisensi Surveyor Kadaster sesuai ketentuan perundang-undangan yang berlaku.
            </p>

            {/* Signatory & Barcode Area */}
            <div className="pt-6 flex items-end justify-between text-[11px]">
              <div className="space-y-1">
                <div className="w-20 h-20 border border-slate-300 rounded bg-slate-50 flex items-center justify-center p-1 text-[9px] text-slate-400 font-mono text-center">
                  [QR Code Validasi Resmi]
                </div>
                <p className="text-[9px] text-slate-400 font-mono">Pindai untuk validasi</p>
              </div>

              <div className="text-right space-y-1">
                <p className="text-slate-500">Jakarta, 04 Oktober 2026</p>
                <p className="font-bold text-slate-800">a.n. Direktur Jenderal SPPR,</p>
                <div className="h-12 flex items-center justify-end">
                  <span className="text-slate-400 italic text-[10px]">[Tanda Tangan Digital Tersertifikasi]</span>
                </div>
                <p className="font-bold text-slate-900 underline">Direktur Pengukuran dan Pemetaan Kadastral</p>
                <p className="text-slate-500 font-mono text-[10px]">NIP. 19740510 199803 1 002</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition-colors"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
