/**
 * hooks/useTournaments.ts — Fetches tournament data from Firestore.
 *
 * Provides:
 * - `tournaments`: Array of all Tournament objects from Firestore
 * - `getTournamentStandings(tournament)`: Computes Swiss standings for a tournament
 * - `loading`: Whether data is still being fetched
 *
 * Used by: TournamentPage, GameHistoryPage (tournaments tab), HomePage (stat count).
 */
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  Tournament,
  SwissStanding,
  getStandings,
} from "../data/tournaments";

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTournaments() {
      const snapshot = await getDocs(collection(db, "tournaments"));
      const data = snapshot.docs.map((doc) => doc.data() as Tournament);
      setTournaments(data);
      setLoading(false);
    }
    fetchTournaments();
  }, []);

  const getTournamentStandings = (tournament: Tournament): SwissStanding[] => {
    return getStandings(tournament);
  };

  return { tournaments, getTournamentStandings, loading };
}
