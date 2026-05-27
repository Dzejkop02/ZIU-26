interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  isPlaceholderData: boolean;
}

export function Pagination({ page, totalPages, onPageChange, isPlaceholderData }: Props) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    return start + i;
  });

  return (
    <nav className="pagination" aria-label="Paginacja">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Poprzednia strona"
      >
        ← Poprzednia
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === page ? 'active' : ''}
          disabled={isPlaceholderData && p !== page}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages || isPlaceholderData}
        aria-label="Następna strona"
      >
        Następna →
      </button>
    </nav>
  );
}
