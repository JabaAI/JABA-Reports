import { useState } from 'react';
import { X, Download, FileText, FileSpreadsheet } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'pdf' | 'csv' | 'excel') => Promise<void>;
  reportName: string;
}

export function ExportModal({ isOpen, onClose, onExport, reportName }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate progress
      setExportProgress(25);
      await onExport(selectedFormat);
      setExportProgress(100);

      // Close modal after success
      setTimeout(() => {
        onClose();
        setIsExporting(false);
        setExportProgress(0);
      }, 500);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
      setExportProgress(0);
      alert('Export failed. Please try again.');
    }
  };

  const formats = [
    {
      id: 'pdf' as const,
      name: 'PDF Document',
      description: 'Full page layout with all sections, charts, and tables',
      icon: FileText,
      recommended: true,
    },
    {
      id: 'csv' as const,
      name: 'CSV Files',
      description: 'Data tables exported as CSV (ZIP file with multiple sheets)',
      icon: FileSpreadsheet,
      recommended: false,
    },
    {
      id: 'excel' as const,
      name: 'Excel Workbook',
      description: 'Formatted spreadsheet with multiple sheets and data',
      icon: FileSpreadsheet,
      recommended: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 border-2 border-[#1770C0]/50 rounded-2xl max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div>
            <h2 className="text-2xl font-bold text-white">Export Report</h2>
            <p className="text-sm text-gray-400 mt-1">{reportName}</p>
          </div>
          <button
            onClick={onClose}
            disabled={isExporting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="p-6 space-y-4">
          <label className="text-sm font-semibold text-white block mb-3">
            Select Export Format
          </label>

          <div className="space-y-3">
            {formats.map((format) => {
              const Icon = format.icon;
              const isSelected = selectedFormat === format.id;

              return (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  disabled={isExporting}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'bg-[#1770C0]/20 border-[#1770C0] shadow-lg shadow-[#1770C0]/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  } disabled:opacity-50`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-[#1770C0]' : 'bg-white/10'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{format.name}</span>
                        {format.recommended && (
                          <span className="text-xs bg-[#FFFF00] text-black px-2 py-0.5 rounded font-semibold">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{format.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'border-[#1770C0] bg-[#1770C0]' : 'border-white/30'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        {isExporting && (
          <div className="px-6 pb-4">
            <div className="bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#1770C0] h-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2 text-center">Preparing export...</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/20">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-6 py-2.5 bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#091831] rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : `Export as ${selectedFormat.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
