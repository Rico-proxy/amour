import { createContext, useContext, useMemo, useState } from 'react';
import { letters, type LoveLetter } from './data/letters';

type AmourContextValue = {
  archiveLetters: LoveLetter[];
  savedIds: number[];
  stampedIds: number[];
  savedLetters: LoveLetter[];
  selectedLetter: LoveLetter | null;
  addLetter: (letter: LoveLetter) => void;
  addComment: (letterId: number, comment: string) => void;
  openLetter: (letterOrId: LoveLetter | number) => void;
  closeLetter: () => void;
  isSaved: (id: number) => boolean;
  toggleSave: (id: number) => void;
  isStamped: (id: number) => boolean;
  toggleStamp: (id: number) => void;
  displayStamps: (letter: LoveLetter) => number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const AmourContext = createContext<AmourContextValue | null>(null);

function readStoredIds(key: string) {
  if (typeof window === 'undefined') return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((id) => typeof id === 'number') : [];
  } catch {
    return [];
  }
}

function readStoredComments() {
  if (typeof window === 'undefined') return {};
  try {
    const value = JSON.parse(window.localStorage.getItem('amour-letter-comments') || '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    }

    const commentsByLetter: Record<number, string[]> = {};

    Object.entries(value).forEach(([id, comments]) => {
      const letterId = Number(id);
      const validComments = Array.isArray(comments)
        ? comments.filter((comment): comment is string => typeof comment === 'string')
        : [];

      if (Number.isFinite(letterId) && validComments.length > 0) {
        commentsByLetter[letterId] = validComments;
      }
    });

    return commentsByLetter;
  } catch {
    return {};
  }
}

export function AmourProvider({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userLetters, setUserLetters] = useState<LoveLetter[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>(() => readStoredIds('amour-saved-letters'));
  const [stampedIds, setStampedIds] = useState<number[]>(() => readStoredIds('amour-stamped-letters'));
  const [commentOverrides, setCommentOverrides] = useState<Record<number, string[]>>(readStoredComments);

  const archiveLetters = useMemo(
    () =>
      [...userLetters, ...letters].map((letter) => ({
        ...letter,
        comments: [...letter.comments, ...(commentOverrides[letter.id] ?? [])],
      })),
    [commentOverrides, userLetters]
  );
  const selectedLetter = useMemo(
    () => archiveLetters.find((letter) => letter.id === selectedId) ?? null,
    [archiveLetters, selectedId]
  );

  const value = useMemo<AmourContextValue>(() => {
    const persistIds = (key: string, ids: number[]) => {
      window.localStorage.setItem(key, JSON.stringify(ids));
    };

    return {
      archiveLetters,
      savedIds,
      stampedIds,
      savedLetters: archiveLetters.filter((letter) => savedIds.includes(letter.id)),
      selectedLetter,
      addLetter: (letter) => setUserLetters((current) => [letter, ...current]),
      addComment: (letterId, comment) => setCommentOverrides((current) => {
        const cleanComment = comment.trim();
        if (!cleanComment) {
          return current;
        }

        const next = {
          ...current,
          [letterId]: [...(current[letterId] ?? []), cleanComment],
        };
        window.localStorage.setItem('amour-letter-comments', JSON.stringify(next));
        return next;
      }),
      openLetter: (letterOrId) => {
        setSelectedId(typeof letterOrId === 'number' ? letterOrId : letterOrId.id);
        setDrawerOpen(false);
      },
      closeLetter: () => setSelectedId(null),
      isSaved: (id) => savedIds.includes(id),
      toggleSave: (id) => setSavedIds((current) => {
        const next = current.includes(id)
          ? current.filter((savedId) => savedId !== id)
          : [...current, id];
        persistIds('amour-saved-letters', next);
        return next;
      }),
      isStamped: (id) => stampedIds.includes(id),
      toggleStamp: (id) => setStampedIds((current) => {
        const next = current.includes(id)
          ? current.filter((stampedId) => stampedId !== id)
          : [...current, id];
        persistIds('amour-stamped-letters', next);
        return next;
      }),
      displayStamps: (letter) => letter.stamps + (stampedIds.includes(letter.id) ? 1 : 0),
      drawerOpen,
      setDrawerOpen,
    };
  }, [archiveLetters, drawerOpen, savedIds, selectedLetter, stampedIds]);

  return <AmourContext.Provider value={value}>{children}</AmourContext.Provider>;
}

export function useAmour() {
  const context = useContext(AmourContext);
  if (!context) throw new Error('useAmour must be used within AmourProvider');
  return context;
}
