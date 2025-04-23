import React from 'react';

interface ListPopupProps {
  trigger: boolean;
  onClose: () => void;
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    transform?: string;
  };
  isAddingSharedList: boolean;
  newListTitle: string;
  setNewListTitle: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

function ListPopup({
  trigger,
  onClose,
  position,
  isAddingSharedList,
  newListTitle,
  setNewListTitle,
  handleSubmit,
}: ListPopupProps) {
  if (!trigger) return null;

  const popupPosition = {
    top: position?.top || '1rem',
    right: position?.right || '1rem',
    bottom: position?.bottom || 'auto',
    left: position?.left || 'auto',
  };

  return (
    <section>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          className="fixed flex items-start p-4 z-50"
          style={{
            top: popupPosition.top,
            right: popupPosition.right,
            bottom: popupPosition.bottom,
            left: popupPosition.left,
          }}
        >
          <div
            className="opacity-80 backdrop-blur-sm rounded-xl shadow-xl p-6 w-full max-w-xs border border-black pointer-events-auto relative"
            style={{ backgroundColor: '#665C5C' }}
          >
            <button
              className="absolute top-2 right-2 hover:text-red-500 text-xl"
              onClick={onClose}
            >
              ✕
            </button>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="p-2">
              <h3 className="text-xl font-bold mb-4">
                Add New {isAddingSharedList ? 'Shared' : 'Private'} List
              </h3>
              <div className="mb-4">
                <label className="block text-md font-bold mb-2 pt-2">List Name:</label>
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="Enter list name"
                />
                {isAddingSharedList && (
                  <div>
                    <label className="block text-md font-bold mb-2 pt-2">Share With:</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      required
                      placeholder="Enter Friend's Username"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#90AEAD] text-white rounded hover:bg-[#738b8a]"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListPopup;
