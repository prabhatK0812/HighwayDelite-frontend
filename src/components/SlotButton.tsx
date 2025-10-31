interface SlotButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  small?: boolean;
}

export default function SlotButton({
  label,
  selected,
  onClick,
  disabled,
  small,
}: SlotButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border rounded-lg px-4 py-2 ${
        small ? "text-sm" : "text-base"
      } font-medium transition ${
        selected
          ? "bg-yellow-400 border-yellow-400 text-black"
          : "border-gray-300 text-gray-700 hover:border-yellow-400"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}
