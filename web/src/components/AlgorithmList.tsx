import { Algorithm } from "@/lib/algorithms";
import { AlgorithmCard } from "./AlgorithmCard";

type AlgorithmListProps = {
  algorithms: Algorithm[];
};

export function AlgorithmList({ algorithms }: AlgorithmListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {algorithms.map((algo) => (
        <AlgorithmCard key={algo.id} algorithm={algo} />
      ))}
    </div>
  );
}
