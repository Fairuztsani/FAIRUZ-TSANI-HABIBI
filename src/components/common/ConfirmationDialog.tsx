import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, XCircle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'success' | 'primary';
  requireReason?: boolean;
  reasonPlaceholder?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  variant = 'primary',
  requireReason = false,
  reasonPlaceholder = 'Tuliskan alasan penolakan berkas atau catatan perbaikan...'
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (requireReason && !reason.trim()) {
      setError('Alasan wajib diisi sebelum melanjutkan.');
      return;
    }
    onConfirm(reason);
    setReason('');
    setError('');
  };

  const handleCancel = () => {
    setReason('');
    setError('');
    onClose();
  };

  const iconConfig = {
    danger: {
      icon: XCircle,
      bg: 'bg-rose-100 text-rose-600',
      btn: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-amber-100 text-amber-700',
      btn: 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500'
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-emerald-100 text-emerald-600',
      btn: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500'
    },
    primary: {
      icon: HelpCircle,
      bg: 'bg-blue-100 text-[#0f2e59]',
      btn: 'bg-[#0f2e59] hover:bg-[#16396b] text-white focus:ring-[#0f2e59]'
    }
  };

  const config = iconConfig[variant];
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity" 
        onClick={handleCancel}
      />

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full shrink-0 ${config.bg}`}>
              <IconComponent size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-slate-900 leading-snug">
                {title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {requireReason && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alasan / Catatan Resmi <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (error) setError('');
                }}
                rows={3}
                placeholder={reasonPlaceholder}
                className="w-full text-xs rounded-lg border border-slate-300 p-2.5 focus:border-[#0f2e59] focus:ring-1 focus:ring-[#0f2e59] outline-none"
              />
              {error && (
                <p className="text-xs text-rose-600 mt-1">{error}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2.5 px-6 py-3.5 bg-slate-50 border-t border-slate-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-1 ${config.btn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
