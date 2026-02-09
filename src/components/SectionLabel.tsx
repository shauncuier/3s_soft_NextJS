import { HiSparkles } from "react-icons/hi2";

interface SectionLabelProps {
  label: string;
}

const SectionLabel = ({ label }: SectionLabelProps) => {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
      <HiSparkles className="text-yellow-400" />
      {label}
    </span>
  );
};

export default SectionLabel;
