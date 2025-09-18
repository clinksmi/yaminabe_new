'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SpoilerWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  logTitle: string;
}

export default function SpoilerWarningModal({ isOpen, onClose, onConfirm, logTitle }: SpoilerWarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(107, 114, 128, 0.20)' }}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-gray-200">
        <div className="text-center">
          <div className="text-2xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">ネタバレ警告</h2>
          <p className="text-gray-600 mb-6">
            「<span className="font-semibold">{logTitle}</span>」には<br />
            シナリオのネタバレが含まれています。
          </p>
          <p className="text-sm text-gray-500 mb-6">
            この先を閲覧しますか？
          </p>
          
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors duration-200"
            >
              いいえ
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
            >
              はい、閲覧する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
