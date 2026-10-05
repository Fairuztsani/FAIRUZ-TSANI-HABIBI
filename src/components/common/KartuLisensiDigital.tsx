import React, { useState } from 'react';
import { SurveyorModel, LisensiModel } from '../../types/aplikasiMitra.ts';
import { Award, ShieldCheck, QrCode, RotateCw, Download, CheckCircle2, User } from 'lucide-react';

interface KartuLisensiDigitalProps {
  surveyor: SurveyorModel;
  lisensi: LisensiModel;
}

export const KartuLisensiDigital: React.FC<KartuLisensiDigitalProps> = ({
  surveyor,
  lisensi
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="space-y-3">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Award size={15} className="text-amber-500" />
          <span>Kartu Tanda Pengenal Lisensi Digital</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <RotateCw size={13} />
            <span>{isFlipped ? 'Lihat Depan' : 'Lihat Belakang'}</span>
          </button>
          <button
            onClick={() => alert(`Mengunduh Kartu Lisensi Digital: ${lisensi.nomorLisensi}.png`)}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
            title="Unduh Kartu"
          >
            <Download size={15} />
          </button>
        </div>
      </div>

      {/* Card Container with Flip Animation */}
      <div className="relative w-full max-w-md mx-auto aspect-[1.58/1] select-none rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
        {!isFlipped ? (
          /* FRONT SIDE - High Contrast Government Cadastral Card */
          <div className="w-full h-full bg-gradient-to-br from-[#07162c] via-[#0d264a] to-[#123668] text-white p-5 flex flex-col justify-between border-2 border-amber-400/50 relative">
            {/* Top Security Banner */}
            <div className="flex items-center justify-between border-b border-amber-400/30 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold tracking-wider uppercase text-amber-300">
                    Kementerian ATR / BPN
                  </div>
                  <div className="text-[9px] font-semibold text-slate-200 tracking-tight">
                    Direktorat Jenderal SPPR
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase font-mono">
                  {surveyor.kualifikasi === 'Surveyor Kadaster' ? 'SKB' : 'ASK'}
                </span>
              </div>
            </div>

            {/* Middle: Photo + Surveyor Identity */}
            <div className="flex items-center gap-4 my-auto">
              {/* Photo Box */}
              <div className="w-20 h-24 rounded-xl border-2 border-amber-400 bg-slate-800 shrink-0 overflow-hidden shadow-md flex items-center justify-center relative">
                <div className="w-full h-full bg-[#0a1e38] flex flex-col items-center justify-center text-slate-300">
                  <User size={38} className="text-amber-300" />
                  <span className="text-[8px] font-bold text-amber-200 mt-1 uppercase font-mono">FOTO RESMI</span>
                </div>
                {/* Holographic Security Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Data Text (High Contrast & Clear Typography) */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="text-[10px] font-mono text-amber-300 uppercase tracking-wider font-bold">
                  {surveyor.kualifikasi}
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight truncate leading-tight">
                  {surveyor.namaLengkap}
                </h4>
                <div className="text-[10px] text-slate-200 font-mono">
                  No. Reg: <strong className="text-amber-200">{surveyor.nomorRegistrasi}</strong>
                </div>
                <div className="text-[10px] text-slate-200 font-mono truncate">
                  No. Lisensi: <strong className="text-white">{lisensi.nomorLisensi}</strong>
                </div>
                <div className="text-[9px] text-slate-300 truncate">
                  Wilayah: <strong className="text-white">{surveyor.wilayahKerja}</strong>
                </div>
              </div>
            </div>

            {/* Footer: Expiration & Verification QR */}
            <div className="pt-2 border-t border-amber-400/30 flex items-center justify-between text-[9px]">
              <div>
                <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Masa Berlaku Lisensi</span>
                <span className="font-mono font-bold text-amber-300 text-[10px]">
                  s.d. {lisensi.tanggalBerakhir}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[8px] text-slate-300 text-right leading-tight hidden sm:block">
                  Pindai QR<br />Legalitas
                </span>
                <div className="w-8 h-8 bg-white p-0.5 rounded shadow-xs text-slate-950 flex items-center justify-center">
                  <QrCode size={28} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* BACK SIDE - Official Regulations & Authorized Signatures */
          <div className="w-full h-full bg-slate-900 text-slate-200 p-5 flex flex-col justify-between border-2 border-amber-400/40 text-[9px] leading-relaxed">
            <div className="border-b border-slate-700 pb-2">
              <div className="font-bold text-amber-300 uppercase tracking-wider text-[10px] text-center">
                Ketentuan Pemegang Lisensi Kadaster
              </div>
            </div>

            <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[9px]">
              <li>Kartu ini adalah identitas resmi Surveyor Berlisensi yang diterbitkan oleh Kementerian ATR/BPN.</li>
              <li>Wajib dibawa dan ditunjukkan saat melakukan kegiatan pengukuran kadastral dan pendaftaran tanah.</li>
              <li>Penyalahgunaan kartu ini akan dikenakan sanksi sesuai Permen ATR/BPN No. 9/2026.</li>
              <li>Apabila kartu ini hilang atau rusak, segera melapor melalui portal Aplikasi Mitra.</li>
            </ol>

            <div className="pt-2 border-t border-slate-700 flex items-end justify-between">
              <div>
                <p className="text-[8px] text-slate-400">Ditetapkan di Jakarta</p>
                <p className="font-bold text-white text-[9px]">Kementerian ATR/BPN</p>
                <p className="text-[8px] text-slate-400 font-mono">Ditjen SPPR</p>
              </div>

              <div className="text-right">
                <div className="h-6 flex items-center justify-end">
                  <span className="text-emerald-400 font-mono text-[8px] font-bold">[TTE Tersertifikasi BSrE]</span>
                </div>
                <p className="font-bold text-white text-[9px] underline">Direktur Jenderal SPPR</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
