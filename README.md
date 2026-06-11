# ToDo List — Task Manager

Aplikacja webowa do zarządzania zadaniami (To-Do / Task Manager) zbudowana w React z biblioteką Material UI. Projekt realizowany w ramach przedmiotu **Zaawansowany interfejs użytkownika**, Akademia Tarnowska.

## Demo

🔗 **Wersja live:** _[wstaw link po wdrożeniu na Vercel / Netlify]_

🔗 **Repozytorium GitHub:** [github.com/Dzejkop02/ZIU-26](https://github.com/Dzejkop02/ZIU-26)

---

## Opis projektu

ToDo List to responsywna aplikacja do tworzenia, edycji i śledzenia zadań. Użytkownik może:

- dodawać zadania z priorytetem i terminem realizacji,
- filtrować i wyszukiwać zadania,
- przeglądać statystyki postępów,
- konfigurować motyw (jasny / ciemny) w ustawieniach,
- rejestrować się i logować (dane konta w `localStorage`, zadania synchronizowane per użytkownik).

Aplikacja korzysta z mockowanego API (MSW), dzięki czemu działa w pełni bez backendu — zarówno lokalnie, jak i po wdrożeniu publicznym.

### Realizacja wymagań projektu

| Obszar | Realizacja |
|--------|------------|
| **1. Interfejs** | Komponenty wielokrotnego użytku (`TodoItem`, `TodoList`, `FilterBar`, `AddTodoForm`, modale, formularz rejestracji); routing 3 widoków (`/`, `/stats`, `/settings`); MUI |
| **2. Responsive Design** | Breakpointy mobile / tablet / desktop; responsywny toolbar, siatka kart, overlay formularza na mobile |
| **3. Formularze** | Wieloetapowa rejestracja z React Hook Form + Zod; walidacja i komunikaty błędów; formularz dodawania zadania |
| **4. Dostępność WCAG** | Semantyczny HTML, ARIA, skip link, focus trap w modalach, kontrast AA, audyt Lighthouse Accessibility: **100/100** |
| **5. State Management** | Context API (`TodoContext`, `AuthContext`, `NotificationContext`, `ThemeProvider`); stany loading / success / error |
| **6. API / mock** | MSW: GET, POST, PATCH, DELETE; obsługa błędów sieciowych (Alert, Snackbar) |
| **7. Animacje** | Framer Motion (przejścia widoków, lista zadań); spinnery ładowania; snackbary sukcesu/błędu |

---

## Uruchomienie lokalne

### Wymagania

- Node.js 18+
- npm

### Instalacja i start

```bash
git clone https://github.com/Dzejkop02/ZIU-26.git
cd ZIU-26
git checkout projekt
npm install
npm run dev
```

Aplikacja domyślnie uruchomi się pod adresem `http://localhost:3000`.

### Pozostałe komendy

```bash
npm run build    # budowanie wersji produkcyjnej (folder dist/)
npm run preview  # podgląd buildu produkcyjnego
npm run lint     # sprawdzenie kodu ESLint
```

---

## Użyte technologie

| Kategoria | Technologie |
|-----------|-------------|
| **Core** | React 19, TypeScript, Vite |
| **UI** | Material UI (MUI) 7, Emotion, Roboto |
| **Routing** | React Router DOM 7 |
| **Formularze** | React Hook Form, Zod, @hookform/resolvers |
| **Stan globalny** | Context API |
| **API mock** | MSW (Mock Service Worker) 2 |
| **Animacje** | Framer Motion |
| **Styling** | CSS custom properties, Tailwind CSS 4 (reset / typografia) |
| **Narzędzia** | ESLint, TypeScript ESLint |

---

## Struktura projektu (skrót)

```
src/
├── api/              # warstwa fetch (todosApi)
├── components/       # komponenty UI (TodoItem, TodoList, modale, rejestracja)
├── context/          # Context API (todos, auth, powiadomienia, motyw)
├── mocks/            # MSW — handlery i baza danych mock
├── pages/            # StatsPage, SettingsPage
├── schemas/          # schematy walidacji Zod
└── theme/            # motyw MUI (jasny / ciemny)
```

---

## Kryteria premiowane

Elementy wykraczające poza wymagania podstawowe:

| Element | Opis |
|---------|------|
| **TypeScript** | Cały kod źródłowy w TS — lepsza czytelność i bezpieczeństwo typów |
| **Tryb ciemny** | Przełącznik motywu w navbarze i na stronie Ustawienia; spójne tokeny kolorów CSS + motyw MUI |
| **Wieloetapowa rejestracja** | Formularz 3-krokowy z breadcrumbem, podsumowaniem i obsługą błędu serwera (np. zajęty e-mail) |
| **System powiadomień** | Snackbar MUI (sukces / błąd / info) po akcjach CRUD i rejestracji |
| **Zaawansowana dostępność** | Skip link, focus trap, `aria-live`, widoczny `:focus-visible`, audyt Lighthouse 100/100 |
| **Animacje listy zadań** | `AnimatePresence` — płynne dodawanie i usuwanie kart zadań |
| **Per-użytkownikowe zadania** | Po zalogowaniu lista zadań filtrowana po `userId`; gość ma osobny zestaw |
| **Statystyki** | Osobny widok z podsumowaniem: aktywne, ukończone, procent realizacji, priorytety |
| **Responsywność 3-poziomowa** | Mobile (<768px), tablet (768–1023px), desktop (≥1024px) |

---

## Notatka UX

### Grupa docelowa i persona

**Grupa docelowa:** studenci, osoby uczące się zawodowo i pracownicy biurowi w wieku 20–35 lat, którzy na co dzień korzystają z telefonu i laptopa do organizacji obowiązków.

**Persona — Kasia, 24 lata, studentka:**

- Ma 5–15 aktywnych zadań jednocześnie (studia, praca dorywcza, życie prywatne).
- Chce szybko dodać zadanie „w biegu” z telefonu — bez zbędnych kliknięć.
- Zależy jej na widoku „co jest pilne” (priorytet, termin) i prostym podsumowaniu postępów.
- Nie toleruje nieczytelnych formularzy ani słabego kontrastu (korzysta czasem z telefonu w jasnym świetle).

Projekt projektowany jest pod Kasię: główna akcja (dodanie zadania) dostępna z pierwszego ekranu, priorytet i data widoczne na karcie, statystyki na osobnej zakładce.

### Kluczowe wybory UI/UX

1. **Trzy ekrany zamiast jednego długiego widoku** — Zadania, Statystyki, Ustawienia. Redukuje obciążenie poznawcze: użytkownik wchodzi tam, gdzie ma konkretny cel (edycja vs. przegląd vs. konfiguracja).

2. **Karty zadań zamiast tabeli** — lepiej skalują się na mobile, czytelniejsze na małym ekranie; każda karta zawiera tytuł, datę, priorytet i status w jednym miejscu.

3. **Kolor priorytetu jako `<select>`** — jedno kliknięcie do zmiany priorytetu bez otwierania modalu; kolory (zielony / pomarańczowy / czerwony) wspierają szybkie skanowanie wzrokiem.

4. **Formularz dodawania jako overlay** — na desktopie wysuwa się z boku, na mobile od dołu ekranu (bottom sheet). Nie zabiera miejsca na liście, gdy użytkownik tylko przegląda zadania.

5. **Snackbar zamiast alertów inline** — potwierdzenie akcji (dodano / usunięto / błąd) nie przesuwa layoutu listy; znika automatycznie po 3,5 s.

6. **Rejestracja wieloetapowa** — długi formularz podzielony na 3 kroki (dane → preferencje → podsumowanie), co obniża barierę wejścia i pozwala skupić się na jednej grupie pól naraz.

7. **Tryb ciemny** — wybór użytkownika zapisany w stanie aplikacji; ważny dla komfortu wieczornej pracy i zgodności z preferencjami systemowymi.

### Odniesienie do heurystyk Nielsena

| Heurystyka | Zastosowanie w projekcie |
|------------|--------------------------|
| **1. Widoczność statusu systemu** | Spinner (`CircularProgress`) podczas ładowania zadań; licznik „X aktywnych / Y wszystkich”; snackbar po każdej akcji CRUD; stan `aria-busy` przy submitach formularzy |
| **2. Dopasowanie do świata rzeczywistego** | Polskie etykiety (Niski / Średni / Wysoki), format daty `dd.mm.rrrr`, znane wzorce (navbar, karty, modal) |
| **3. Kontrola i wolność użytkownika** | Anulowanie formularzy (przycisk „Anuluj”, Escape w modalach, klik poza overlay); cofanie w rejestracji (krok wstecz) |
| **4. Spójność i standardy** | MUI jako spójny system komponentów; jednolite zaokrąglenia, kolory primary; ten sam styl modalu (logowanie, profil, szczegóły zadania) |
| **5. Zapobieganie błędom** | Walidacja Zod (hasło, e-mail, zgoda RODO); wyłączony przycisk „Dodaj” przy pustym tytule; `noValidate` + własne komunikaty zamiast domyślnych tooltipów przeglądarki |
| **6. Rozpoznawanie zamiast przypominania** | Podsumowanie danych w kroku 3 rejestracji; filtry „Wszystko / Aktywne / Ukończone” zawsze widoczne po kliknięciu „Filtruj” |
| **7. Elastyczność i efektywność** | Wyszukiwarka na liście; szybka edycja tytułu (double-click); zmiana priorytetu bez otwierania modalu |
| **8. Estetyka i minimalizm** | Toolbar z trzema akcjami (szukaj, dodaj, filtruj); statystyki na osobnej stronie — brak przeładowania głównego widoku |
| **9. Pomoc w rozpoznawaniu i naprawianiu błędów** | Komunikaty błędów przy polach (`role="alert"`, czerwony tekst, `aria-describedby`); błąd sieciowy jako Alert MUI na liście |
| **10. Pomoc i dokumentacja** | Sekcja „Dostępność” na stronie Ustawienia z informacją o nawigacji klawiaturą |

### Zasady UCD i własne obserwacje

Projekt opiera się na **User-Centered Design** — iteracja od potrzeb persony (szybkość, czytelność, mobile-first):

- **Mobile-first layout:** toolbar układa się w kolumnę poniżej 768px; formularz dodawania otwiera się od dołu ekranu — obserwacja: na telefonie użytkownik operuje kciukiem w dolnej połowie ekranu.
- **Test kontrastu:** kolory tekstu i badge’y priorytetów dobrane z kontrastem ≥ 4,5:1 (WCAG AA); w motywie jasnym tekst drugorzędny `#4B5563` na białym tle daje ~7:1.
- **Test klawiatury:** skip link „Przejdź do treści głównej”, focus trap w modalach, widoczny outline `:focus-visible` — umożliwia pełną obsługę bez myszy.
- **Audyt Lighthouse (Accessibility):** wynik **100/100** na stronie głównej — brak krytycznych błędów dostępności w stanie początkowym aplikacji.

---

## Autor

Projekt studencki — Zaawansowany interfejs użytkownika, Akademia Tarnowska.
