interface Props {
  message?: string;
}

export function EmptyState({ message = 'Nie znaleziono filmów' }: Props) {
  return (
    <div className="empty-state">
      <span className="empty-icon">🎬</span>
      <p>{message}</p>
    </div>
  );
}
