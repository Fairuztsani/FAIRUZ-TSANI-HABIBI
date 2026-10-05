import React from 'react';
import { DokumenMitra } from '../../types/index.ts';
import { Modal } from '../common/Modal.tsx';
import { StatusBadge } from '../common/StatusBadge.tsx';
import { AtrBpnLogo } from '../common/AtrBpnLogo.tsx';
import { Download, Printer, CheckCircle, FileText, QrCode, ShieldCheck } from 'lucide-react';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  dokumen: DokumenMitra | null;
  surveyorNama?: string;
  surveyorNik?: string;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  dokumen,
  surveyorNama = 'Surveyor Terdaftar',
  surveyorNik = '3174xxxxxxxxxxxx'
}) => {
  if (!dokumen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Pratinjau Dokumen: ${dokumen.jenis}`}
      subtitle={`Berkas: ${dokumen.namaFile} • Diunggah ${dokumen.tanggalUpload}`}
      maxWidth="3xl"
    >
      <div className="space-y-5">
        {/* Document Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
          <div className="flex items-center gap-2">
            <StatusBadge status={dokumen.statusVerifikasi} size="sm" />
            <span className="text-slate-500">Ukuran: {dokumen.ukuran}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Mengunduh file: ${dokumen.namaFile}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
            >
              <Download size={13} />
              <span>Unduh PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
            >
              <Printer size={13} />
              <span>Cetak</span>
            </button>
          </div>
        </div>

        {/* Realistic Government Certificate / Document Canvas */}
        <div className="relative border-2 border-slate-300 rounded-lg p-6 sm:p-8 bg-white shadow-inner font-sans min-h-[480px] overflow-hidden select-none">
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none rotate-[-25deg]">
            <p className="text-5xl font-black text-slate-900 tracking-widest text-center leading-tight uppercase">
              KEMENTERIAN ATR/BPN<br />DITJEN SPPR DOKUMEN RESMI
            </p>
          </div>

          {/* Official Letterhead */}
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4 mb-6">
            <AtrBpnLogo size="md" showText={false} />
            <div className="text-center flex-1 px-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                KEMENTERIAN AGRARIA DAN TATA RUANG / BADAN PERTANAHAN NASIONAL
              </p>
              <p className="text-xs font-extrabold uppercase text-[#0f2e59]">
                DIREKTORAT JENDERAL SURVEI DAN PEMETAAN PERTANAHAN DAN RUANG
              </p>
              <p className="text-[10px] text-slate-500">
                Jl. Kuningan Barat I No. 1, Jakarta Selatan 12710 • Telp: (021) 5202328
              </p>
            </div>
            <div className="w-10 h-10 border border-slate-300 rounded flex items-center justify-center text-[10px] font-mono text-slate-400">
              BSrE
            </div>
          </div>

          {/* Document Content View */}
          <div className="space-y-4">
            <div className="text-center py-2">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                LEMBAR VALIDASI DOKUMEN {dokumen.jenis.toUpperCase()}
              </span>
              <h2 className="text-sm font-bold text-slate-900 mt-2">
                {dokumen.nomorDokumen ? `NOMOR: ${dokumen.nomorDokumen}` : `KODE ARSIP: ${dokumen.id}`}
              </h2>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-xs space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">Pemilik Berkas:</span>
                <span className="sm:col-span-2 font-semibold text-slate-800">{surveyorNama}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">Nomor Induk Kependudukan (NIK):</span>
                <span className="sm:col-span-2 font-mono text-slate-800">{surveyorNik}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">Jenis Dokumen:</span>
                <span className="sm:col-span-2 font-medium text-slate-800">{dokumen.jenis}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                <span className="text-slate-500">Status Validasi Sistem:</span>
                <span className="sm:col-span-2 flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Terdaftar dalam Database Sertifikasi Ditjen SPPR
                </span>
              </div>
              {dokumen.keterangan && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Catatan Khusus:</span>
                  <span className="sm:col-span-2 text-slate-700">{dokumen.keterangan}</span>
                </div>
              )}
            </div>

            {/* Document Digital Stamp / QR Verification Signature */}
            <div className="pt-6 flex flex-col sm:flex-row items-end justify-between gap-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded p-1 flex items-center justify-center">
                  <QrCode size={48} className="text-slate-800" />
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  <p className="font-semibold text-slate-700">Verifikasi Digital BSrE</p>
                  <p>Keabsahan dokumen dapat dicek</p>
                  <p>melalui portal https://mitra.atrbpn.go.id</p>
                </div>
              </div>

              <div className="text-right text-xs">
                <p className="text-slate-500 text-[11px]">Jakarta, {dokumen.tanggalUpload}</p>
                <p className="font-semibold text-slate-800 mt-1">Direktur Pengukuran dan Pemetaan Kadastral</p>
                <div className="h-10 flex items-center justify-end">
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-mono">
                    [TTE Tersertifikasi Balai Sertifikasi Elektronik]
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">Ditjen SPPR Kementerian ATR/BPN</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </Modal>
  );
};
