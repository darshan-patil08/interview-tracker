import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import {
  Upload,
  Copy,
  Check,
  AlertCircle,
  FileCode,
  CheckCircle2,
} from 'lucide-react';
import showToast from '../../utils/toast';

const SCHEMA_EXAMPLE = `[
  {
    "title": "Two Sum",
    "category": "DSA",
    "difficulty": "Easy",
    "status": "Completed",
    "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
    "notes": "HashMap approach with O(n) time complexity"
  },
  {
    "title": "Merge Conflict Resolution",
    "category": "Git & GitHub",
    "difficulty": "Medium",
    "status": "In Progress",
    "notes": "git rebase vs merge workflow"
  }
]`;

export function ImportModal({ isOpen, onClose, onImport }) {
  const [copied, setCopied] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(SCHEMA_EXAMPLE);
      setCopied(true);
      showToast.success('Schema template copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast.error('Failed to copy to clipboard.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setValidationError('');
    setParsedData(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (!Array.isArray(json)) {
          setValidationError('JSON root must be an array of questions: [ { ... } ]');
          return;
        }

        if (json.length === 0) {
          setValidationError('The JSON array is empty. Please provide at least 1 question.');
          return;
        }

        // Validate basic structure
        const invalidIndex = json.findIndex(
          (q) => !q.title || typeof q.title !== 'string'
        );
        if (invalidIndex !== -1) {
          setValidationError(
            `Item at index ${invalidIndex} is missing a required "title" string.`
          );
          return;
        }

        setParsedData(json);
      } catch {
        setValidationError('Invalid JSON syntax. Please check for trailing commas or syntax errors.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleConfirmImport = () => {
    if (!parsedData || parsedData.length === 0) return;

    onImport(parsedData);
    showToast.upload(`Imported ${parsedData.length} questions successfully!`);
    onClose();
    setParsedData(null);
    setFileName('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Questions (JSON)"
      subtitle="Upload a JSON backup file formatted according to the schema below"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4">
        {/* Schema Structure Guide */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-orange-500" />
              Required JSON Format
            </span>
            <button
              type="button"
              onClick={handleCopyTemplate}
              className="inline-flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 hover:underline font-medium cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Template</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-zinc-300 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 font-mono text-xs overflow-x-auto max-h-36 scrollbar-thin leading-relaxed">
            {SCHEMA_EXAMPLE}
          </pre>
          <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
            Allowed categories: <code className="text-orange-600 dark:text-orange-400">DSA</code>, <code className="text-orange-600 dark:text-orange-400">Git & GitHub</code>, <code className="text-orange-600 dark:text-orange-400">Full-Stack Technical</code>, <code className="text-orange-600 dark:text-orange-400">Machine Coding</code>.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="border-2 border-dashed border-slate-300 dark:border-zinc-700 hover:border-orange-500 rounded-2xl p-6 text-center bg-slate-50 dark:bg-zinc-900/40 transition-colors">
          <Upload className="w-8 h-8 mx-auto text-slate-400 dark:text-zinc-500 mb-2" />
          <p className="text-sm font-medium text-slate-700 dark:text-zinc-200">
            {fileName ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Selected: {fileName}
              </span>
            ) : (
              'Choose a .json file from your computer'
            )}
          </p>
          <label className="inline-block mt-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-750 cursor-pointer shadow-sm">
              <Upload className="w-3.5 h-3.5 text-orange-500" />
              Browse JSON File
            </span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Validation Feedback */}
        {validationError && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-700 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {parsedData && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Ready to import {parsedData.length} valid questions!</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Upload}
            onClick={handleConfirmImport}
            disabled={!parsedData}
          >
            Import Questions
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ImportModal;
