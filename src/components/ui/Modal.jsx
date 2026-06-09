const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-5">
          {title}
        </h2>

        {/* CONTENT */}
        {children}
      </div>
    </div>
  );
};

export default Modal;