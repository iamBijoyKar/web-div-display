type ProgressProps = {
  progress: number;
};

export default function Progress({ progress }: ProgressProps) {
  return (
    <div className="w-[150px] h-3 rounded-full bg-gray-400 flex justify-start relative">
      <div
        className="h-3 rounded-full progress-bg-animation "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
