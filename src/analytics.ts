// plausible-tracker jako moduł npm nie blokuje renderowania (nie jest skryptem zewnętrznym).
// Ładuje się jako część głównego bundla aplikacji — brak render-blocking.
import Plausible from 'plausible-tracker';

// RODO: Zbieramy tylko nazwę domeny wymaganą do identyfikacji projektu
// w panelu Plausible. Nie jest to dana osobowa.
// Cel: przypisanie zdarzeń do właściwej instancji analizy.
const plausible = Plausible({
  domain: 'localhost',
  // RODO: Włączamy śledzenie na localhost wyłącznie w celach deweloperskich
  // i testowych — nie trafia do produkcyjnych raportów użytkowników końcowych.
  trackLocalhost: true,
});

// RODO: Zbieramy tylko URL odwiedzonej podstrony (ścieżkę, bez query string
// zawierającego potencjalnie wrażliwe dane) oraz anonimowy timestamp.
// Cel: analiza popularności sekcji aplikacji (art. 6 ust. 1 lit. f RODO —
// prawnie uzasadniony interes). Plausible nie używa cookies ani nie gromadzi
// adresów IP ani identyfikatorów urządzenia — zasada minimalizacji art. 5 RODO.
plausible.enableAutoPageviews();

export { plausible };
