// src/components/QuickViewModal.jsx
import React from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function QuickViewModal({ pillar }) {
  const navigate = useNavigate();

  return (
    <Dialog
      open={true}
      onClose={() => navigate(-1)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <Dialog.Panel className="bg-white rounded-xl max-w-5xl w-full p-6 flex flex-col md:flex-row gap-6">
        {/* Left: title, bullets, buttons */}
        <div className="flex-1">
          <Dialog.Title className="text-2xl font-bold mb-4">{pillar.title}</Dialog.Title>
          <ul className="list-disc ml-5 mb-4">
            {pillar.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/${pillar.id}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Want more
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded-lg">Action</button>
          </div>
        </div>
        {/* Right: video / poster */}
        <div className="flex-1">
          <img
            src={pillar.trailer}
            alt={`${pillar.title} trailer`}
            className="w-full rounded-lg"
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
