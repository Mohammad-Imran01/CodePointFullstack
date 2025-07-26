import React, { useEffect, useState } from "react";

interface ItemDeleteModalProps {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ItemDeleteModal = ({ title, onCancel, onConfirm }: ItemDeleteModalProps) => {
  const [countdown, setCountdown] = useState<any>(null);
  const [canConfirm, setCanConfirm] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev: any) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanConfirm(true);
      setCountdown(null);
      onConfirm();
    }

    return () => clearTimeout(timer);
  }, [countdown, onConfirm]);

  const startCountdown = () => {
    setCountdown(3 as any);
    setCanConfirm(false);
  };

  const cancelCountdown = () => {
    setCountdown(null);
    setCanConfirm(false);
  };

  const handleDelete = () => {
    if (canConfirm) {
      onConfirm();
    } else {
      startCountdown();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Are you sure you want to remove:
        </h3>
        <p className="mb-6 text-gray-600">
          <span className="font-bold  text-stone-950">{title}</span> will be
          permanently removed.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              cancelCountdown();
              onCancel();
            }}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </button>

          {canConfirm ? (
            <button
              onClick={handleDelete}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Confirm Delete
            </button>
          ) : countdown !== null ? (
            <button
              onClick={onConfirm}
              className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
            >
              {countdown}s Skip & Confirm
            </button>
          ) : (
            <button
              onClick={handleDelete}
              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDeleteModal;
