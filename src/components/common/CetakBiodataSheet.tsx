import React from 'react';
import { SurveyorModel, LisensiModel, KjsbModel, AsosiasiProfesiModel } from '../../types/aplikasiMitra.ts';
import { Printer, Download, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CetakBiodataSheetProps {
  surveyor: SurveyorModel;
  lisensi: LisensiModel;
  kjsb: KjsbModel;
  asosiasi: AsosiasiProfesiModel;
}

export const CetakBiodataSheet: React.FC<CetakBiodataSheetProps> = ({
  surveyor,
  lisensi,
  kjsb,
  asosiasi
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Control Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Lembar Biodata Resmi Surveyor Berlisensi</h4>
          <p className="text-xs text-slate-500">Format cetak A4 baku siap pakai untuk verifikasi administrasi kementerian.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Pratinjau lembar cetak dokumen dalam format A4 standar.')}
            className="px-3.5 py-2 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Eye size={15} />
            <span>Preview</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#0f2e59] hover:bg-[#163e75] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Printer size={15} />
            <span>Cetak Dokumen</span>
          </button>
          <button
            onClick={() => alert(`Mengunduh Biodata_Resmi_${surveyor.namaLengkap.replace(/\s+/g, '_')}.pdf`)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Official A4 Sheet Document View */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 sm:p-10 max-w-4xl mx-auto text-slate-900 text-xs space-y-6">
        {/* Kop Surat Resmi */}
        <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#0f2e59] text-amber-400 flex items-center justify-center mb-1.5 shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h3 className="font-black text-sm uppercase tracking-wide">
            Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional
          </h3>
          <p className="font-extrabold text-xs uppercase tracking-tight text-slate-800">
            Direktorat Jenderal Survei dan Pemetaan Pertanahan dan Ruang
          </p>
          <p className="text-[10px] text-slate-500">
            Gedung Ditjen SPPR, Jl. Raden Patah I No. 1, Kebayoran Baru, Jakarta Selatan 12110 • Telp: (021) 7228901
          </p>
        </div>

        {/* Title of Document */}
        <div className="text-center py-1">
          <h4 className="font-extrabold text-sm uppercase tracking-widest text-[#0f2e59] underline underline-offset-4">
            BIODATA RESMI SURVEYOR BERLISENSI
          </h4>
          <p className="text-[11px] font-mono text-slate-500 mt-0.5">
            Nomor Registrasi: {surveyor.nomorRegistrasi}
          </p>
        </div>

        {/* Section 1: Data Identitas Pribadi */}
        <div className="space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded">
            I. Identitas Pribadi Pemegang Lisensi
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 px-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Nomor Induk Kependudukan (NIK):</span>
              <span className="font-mono font-bold text-slate-900">{surveyor.nik}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Nama Lengkap & Gelar:</span>
              <span className="font-bold text-slate-900">{surveyor.namaLengkap}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Tempat, Tanggal Lahir:</span>
              <span className="font-medium text-slate-800">{surveyor.tempatLahir}, {surveyor.tanggalLahir}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Jenis Kelamin:</span>
              <span className="font-medium text-slate-800">{surveyor.jenisKelamin}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Status Perkawinan:</span>
              <span className="font-medium text-slate-800">{surveyor.statusPerkawinan}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Nomor NPWP:</span>
              <span className="font-mono font-medium text-slate-800">{surveyor.npwp}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Alamat Email:</span>
              <span className="font-mono text-slate-800">{surveyor.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Nomor Telepon/HP:</span>
              <span className="font-mono text-slate-800">{surveyor.telepon}</span>
            </div>
            <div className="sm:col-span-2 flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Alamat Domisili Lengkap:</span>
              <span className="font-medium text-slate-800 text-right">{surveyor.alamat}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Data Lisensi & Legalitas */}
        <div className="space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded">
            II. Status Lisensi & Wilayah Penugasan
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 px-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Nomor Lisensi:</span>
              <span className="font-mono font-bold text-[#0f2e59]">{lisensi.nomorLisensi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Kualifikasi Profesi:</span>
              <span className="font-bold text-slate-900">{surveyor.kualifikasi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Wilayah Kerja:</span>
              <span className="font-bold text-slate-900">{surveyor.wilayahKerja}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Status Lisensi Saat Ini:</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {lisensi.status}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Tanggal Terbit Lisensi:</span>
              <span className="font-medium text-slate-800">{lisensi.tanggalTerbit}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Tanggal Berakhir Lisensi:</span>
              <span className="font-bold text-slate-900">{lisensi.tanggalBerakhir}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Status Validasi Sistem:</span>
              <span className="font-bold text-emerald-700">
                VALID (Terverifikasi SPPR)
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Status Akun Mitra:</span>
              <span className="font-bold text-emerald-700">{surveyor.statusAkun}</span>
            </div>
          </div>
        </div>

        {/* Section 3: KJSB & Asosiasi */}
        <div className="space-y-2">
          <div className="font-bold text-xs uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded">
            III. Badan Usaha (KJSB) & Organisasi Profesi
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 px-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Nama KJSB:</span>
              <span className="font-bold text-slate-900">{kjsb.namaKJSB}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Jabatan di KJSB:</span>
              <span className="font-semibold text-slate-800">{kjsb.jabatan}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Asosiasi Profesi:</span>
              <span className="font-semibold text-slate-800">{asosiasi.namaAsosiasi}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">Nomor Anggota ISI:</span>
              <span className="font-mono text-slate-900">{asosiasi.nomorKeanggotaan}</span>
            </div>
          </div>
        </div>

        {/* Signatures & Stamps */}
        <div className="pt-8 border-t border-slate-200 flex items-end justify-between text-xs">
          <div className="text-left space-y-1">
            <p className="text-slate-500">Pemegang Lisensi,</p>
            <div className="h-14"></div>
            <p className="font-bold text-slate-900 underline">{surveyor.namaLengkap}</p>
            <p className="text-[10px] text-slate-500 font-mono">No. Reg: {surveyor.nomorRegistrasi}</p>
          </div>

          <div className="text-right space-y-1">
            <p className="text-slate-500">Jakarta, 05 Oktober 2026</p>
            <p className="font-semibold text-slate-800">a.n. Direktur Jenderal SPPR,</p>
            <p className="text-[11px] text-slate-600">Kasubdit Surveyor Berlisensi</p>
            <div className="h-10 flex items-center justify-end">
              <span className="text-emerald-600 font-mono text-[9px] font-bold">[Telah Diverifikasi Digital SPPR]</span>
            </div>
            <p className="font-bold text-slate-900 underline">Fairuz Tsani Habibi, S.Kom.</p>
            <p className="text-[10px] text-slate-500 font-mono">NIP. 19950320 202012 1 003</p>
          </div>
        </div>
      </div>
    </div>
  );
};
