import React from 'react';
import { StatusPermohonan, StatusLisensi } from '../../types/index.ts';
import { 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Ban, 
  AlertCircle 
} from 'lucide-react';

interface StatusBadgeProps {
  status: StatusPermohonan | StatusLisensi | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-2 py-0.5 gap-1' 
    : 'text-xs px-2.5 py-1 gap-1.5';

  const iconSize = size === 'sm' ? 12 : 14;

  switch (status) {
    case 'Menunggu Verifikasi':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses}`}>
          <Clock size={iconSize} className="text-amber-600 shrink-0" />
          <span>Menunggu Verifikasi</span>
        </span>
      );

    case 'Sedang Diproses':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-sky-50 text-sky-800 border border-sky-200/80 ${sizeClasses}`}>
          <RefreshCw size={iconSize} className="text-sky-600 animate-spin shrink-0" style={{ animationDuration: '3s' }} />
          <span>Sedang Diproses</span>
        </span>
      );

    case 'Disetujui':
    case 'Aktif':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${sizeClasses}`}>
          <ShieldCheck size={iconSize} className="text-emerald-600 shrink-0" />
          <span>{status === 'Aktif' ? 'Lisensi Aktif' : 'Disetujui'}</span>
        </span>
      );

    case 'Akan Berakhir':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-orange-50 text-orange-800 border border-orange-200/80 ${sizeClasses}`}>
          <AlertTriangle size={iconSize} className="text-orange-600 shrink-0" />
          <span>Akan Berakhir</span>
        </span>
      );

    case 'Kedaluwarsa':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-rose-50 text-rose-800 border border-rose-200/80 ${sizeClasses}`}>
          <AlertCircle size={iconSize} className="text-rose-600 shrink-0" />
          <span>Kedaluwarsa</span>
        </span>
      );

    case 'Ditolak':
    case 'Dibekukan':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-rose-50 text-rose-800 border border-rose-200/80 ${sizeClasses}`}>
          <XCircle size={iconSize} className="text-rose-600 shrink-0" />
          <span>{status}</span>
        </span>
      );

    case 'Sesuai':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 ${sizeClasses}`}>
          <CheckCircle2 size={iconSize} className="text-emerald-600 shrink-0" />
          <span>Sesuai</span>
        </span>
      );

    case 'Perlu Perbaikan':
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-amber-50 text-amber-800 border border-amber-200 ${sizeClasses}`}>
          <AlertTriangle size={iconSize} className="text-amber-600 shrink-0" />
          <span>Perlu Perbaikan</span>
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
          <Ban size={iconSize} className="text-slate-500 shrink-0" />
          <span>{status}</span>
        </span>
      );
  }
};
