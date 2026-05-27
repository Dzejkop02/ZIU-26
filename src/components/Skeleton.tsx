import './Skeleton.css';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Bazowy element szkieletu – dowolny prostokąt z animacją shimmer */
export function Skeleton({ className = '', style }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={style} aria-hidden="true" />;
}

/** Pełna karta filmowa jako placeholder – zastępuje SkeletonCard */
export function MovieCardSkeleton() {
  return (
    <div className="skeleton-card-new" aria-hidden="true" role="presentation">
      <Skeleton className="skeleton-card-new__poster" />
      <div className="skeleton-card-new__body">
        <Skeleton className="skeleton-card-new__title" />
        <Skeleton className="skeleton-card-new__subtitle" />
      </div>
    </div>
  );
}
