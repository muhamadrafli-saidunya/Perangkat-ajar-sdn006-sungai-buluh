import React from 'react';
import { KopConfig } from '../../types';
import { LogoUploadBox } from '../common/LogoUploadBox';
import { DEFAULT_TUT_WURI_LOGO, DEFAULT_SCHOOL_LOGO } from '../../data/defaultLogos';
import {
  FileText,
  PenTool,
  CheckCircle2,
  Building,
  Calendar,
  User,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface KopSignatureSettingsProps {
  config: KopConfig;
  onChange: (updated: Partial<KopConfig>) => void;
  onSaveDefault?: () => void;
}

export const KopSignatureSettings: React.FC<KopSignatureSettingsProps> = ({
  config,
  onChange,
  onSaveDefault,
}) => {
  return (
    <div className="space-y-6">
      {/* SECTION 1: TOGGLE STATUS KOP & TANDA TANGAN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Toggle KOP */}
        <label
          htmlFor="toggle-kop-active"
          className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
            config.showKop
              ? 'bg-blue-50/70 dark:bg-blue-950/40 border-[#00529C] text-[#002D62] dark:text-blue-300'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                config.showKop
                  ? 'bg-[#00529C] text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
              }`}
            >
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">KOP Surat Resmi</p>
              <p className="text-[11px] opacity-80">
                {config.showKop ? 'Aktif dicetak di bagian atas' : 'Dinonaktifkan'}
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            id="toggle-kop-active"
            checked={config.showKop}
            onChange={(e) => onChange({ showKop: e.target.checked })}
            className="w-4 h-4 accent-[#00529C] rounded cursor-pointer"
          />
        </label>

        {/* Toggle Tanda Tangan */}
        <label
          htmlFor="toggle-signature-active"
          className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
            config.showSignature
              ? 'bg-blue-50/70 dark:bg-blue-950/40 border-[#00529C] text-[#002D62] dark:text-blue-300'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                config.showSignature
                  ? 'bg-[#00529C] text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
              }`}
            >
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">Lembar Tanda Tangan</p>
              <p className="text-[11px] opacity-80">
                {config.showSignature ? 'Pengesahan Kepala Sekolah & Guru' : 'Dinonaktifkan'}
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            id="toggle-signature-active"
            checked={config.showSignature}
            onChange={(e) => onChange({ showSignature: e.target.checked })}
            className="w-4 h-4 accent-[#00529C] rounded cursor-pointer"
          />
        </label>
      </div>

      {/* SECTION 2: UPLOAD LOGO SEKOLAH (KIRI & KANAN) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#FF7300] text-white flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Upload Logo KOP Surat (Kiri & Kanan)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Letakkan lambang resmi Kemendikbudristek/Pemda di kiri dan lambang sekolah di kanan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onChange({
                leftLogoUrl: DEFAULT_TUT_WURI_LOGO,
                rightLogoUrl: DEFAULT_SCHOOL_LOGO,
                leftLogoSize: 72,
                rightLogoSize: 72,
              })
            }
            className="flex items-center gap-1 text-[11px] font-bold text-[#00529C] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Dua Logo
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Logo Kiri */}
          <LogoUploadBox
            id="upload-left-logo"
            label="Logo Kiri (Dinas / Pemda / Kemendikbud)"
            sublabel="Umumnya Logo Tut Wuri Handayani atau Lambang Pemerintah Kota/Kabupaten"
            logoUrl={config.leftLogoUrl}
            logoSize={config.leftLogoSize}
            onLogoChange={(url) => onChange({ leftLogoUrl: url })}
            onSizeChange={(size) => onChange({ leftLogoSize: size })}
            onResetDefault={() => onChange({ leftLogoUrl: DEFAULT_TUT_WURI_LOGO })}
            defaultLabel="Tut Wuri Handayani"
          />

          {/* Logo Kanan */}
          <LogoUploadBox
            id="upload-right-logo"
            label="Logo Kanan (Sekolah Dasar / Yayasan)"
            sublabel="Lambang resmi Satuan Pendidikan, Madrasah, atau Yayasan Pengelola"
            logoUrl={config.rightLogoUrl}
            logoSize={config.rightLogoSize}
            onLogoChange={(url) => onChange({ rightLogoUrl: url })}
            onSizeChange={(size) => onChange({ rightLogoSize: size })}
            onResetDefault={() => onChange({ rightLogoUrl: DEFAULT_SCHOOL_LOGO })}
            defaultLabel="Emblem SD Bawaan"
          />
        </div>
      </div>

      {/* SECTION 3: EDIT TEKS KOP SURAT */}
      {config.showKop && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-6 h-6 rounded-lg bg-[#00529C] text-white flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Teks Informasi KOP Surat
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Format baku naskah dinas pendidikan yang akan dicetak di antara kedua logo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Baris 1: Pemerintah Daerah / Provinsi / Kota
              </label>
              <input
                type="text"
                value={config.governmentHeader}
                onChange={(e) => onChange({ governmentHeader: e.target.value })}
                placeholder="Contoh: PEMERINTAH PROVINSI DKI JAKARTA"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Baris 2: Dinas Pendidikan & Kebudayaan
              </label>
              <input
                type="text"
                value={config.departmentHeader}
                onChange={(e) => onChange({ departmentHeader: e.target.value })}
                placeholder="Contoh: DINAS PENDIDIKAN DAN KEBUDAYAAN"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Baris 3: Nama Satuan Pendidikan (Huruf Kapital Tebal)
              </label>
              <input
                type="text"
                value={config.schoolName}
                onChange={(e) => onChange({ schoolName: e.target.value })}
                placeholder="Contoh: SD NEGERI 01 MENTENG JAYA"
                className="w-full px-3 py-2 text-xs font-black rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Baris 4: Alamat Lengkap & Kode Pos
              </label>
              <input
                type="text"
                value={config.schoolAddress}
                onChange={(e) => onChange({ schoolAddress: e.target.value })}
                placeholder="Contoh: Jl. Menteng Raya No. 10, RT.01/RW.02, Kec. Menteng, Jakarta Pusat 10340"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Baris 5: Kontak, NPSN & Email / Posel
              </label>
              <input
                type="text"
                value={config.schoolContact}
                onChange={(e) => onChange({ schoolContact: e.target.value })}
                placeholder="Contoh: NPSN: 20108392 • Telp: (021) 3192849 • Posel: sdn01menteng@sekolah.belajar.id"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: EDIT TANDA TANGAN & PENGESAHAN */}
      {config.showSignature && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-6 h-6 rounded-lg bg-[#002D62] text-white flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Pengaturan Tanda Tangan & Lembar Pengesahan
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tempat penetapan, tanggal penetapan, data Kepala Sekolah, dan Guru Penyusun
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tempat Penetapan (Kota / Kabupaten)
              </label>
              <input
                type="text"
                value={config.signaturePlace}
                onChange={(e) => onChange({ signaturePlace: e.target.value })}
                placeholder="Contoh: Jakarta Pusat"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tanggal Penetapan (Kosongkan untuk tanggal hari ini otomatis)
              </label>
              <input
                type="text"
                value={config.signatureDate}
                onChange={(e) => onChange({ signatureDate: e.target.value })}
                placeholder="Contoh: 15 Juli 2024 atau otomatis hari ini"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Dual columns: Kepala Sekolah & Guru */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Kepala Sekolah */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase text-[#00529C] dark:text-blue-400">
                Pejabat Mengetahui (Kepala Sekolah)
              </h4>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                  Jabatan Pengesahan
                </label>
                <input
                  type="text"
                  value={config.headmasterTitle}
                  onChange={(e) => onChange({ headmasterTitle: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={config.headmasterName}
                  onChange={(e) => onChange({ headmasterName: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                  NIP / NUPTK
                </label>
                <input
                  type="text"
                  value={config.headmasterNip}
                  onChange={(e) => onChange({ headmasterNip: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Guru Penyusun */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2.5">
              <h4 className="text-xs font-extrabold uppercase text-[#FF7300]">
                Penyusun Perangkat (Guru Kelas / Mapel)
              </h4>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                  Jabatan Guru
                </label>
                <input
                  type="text"
                  value={config.teacherTitle}
                  onChange={(e) => onChange({ teacherTitle: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={config.teacherName}
                  onChange={(e) => onChange({ teacherName: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                  NIP / NUPTK
                </label>
                <input
                  type="text"
                  value={config.teacherNip}
                  onChange={(e) => onChange({ teacherNip: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save button if requested */}
      {onSaveDefault && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onSaveDefault}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00529C] hover:bg-[#003e75] text-white font-bold text-xs shadow-md transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Simpan sebagai Pengaturan Utama</span>
          </button>
        </div>
      )}
    </div>
  );
};
