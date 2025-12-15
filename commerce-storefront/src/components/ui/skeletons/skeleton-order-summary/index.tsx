import SkeletonButton from "@/components/ui/skeletons/skeleton-button"
import SkeletonCartTotals from "@/components/ui/skeletons/skeleton-cart-totals"

const SkeletonOrderSummary = () => {
  return (
    <div className="grid-cols-1">
      <SkeletonCartTotals header={false} />
      <div className="mt-4">
        <SkeletonButton />
      </div>
    </div>
  )
}

export default SkeletonOrderSummary
