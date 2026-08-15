import { useCallback, useEffect, useState } from "react";

import type { UserTypes } from "../../../types/user.types";
import type { PredictionsTypes } from "../../../types/predictions.types";
import type { ScoresTypes } from "../../../types/scores.types";

import AdminUserService from "../services/adminUser.service";

export interface UserFiltersTypes {
  email: string;
  firstName: string;
  lastName: string;
  teamName: string;
}

interface UsersResponse {
  data: UserTypes[];
  total: number;
}

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserTypes[]>([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<UserFiltersTypes>({
    email: "",
    firstName: "",
    lastName: "",
    teamName: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPrediction, setSelectedPrediction] =
    useState<PredictionsTypes | null>(null);

  const [selectedScores, setSelectedScores] = useState<ScoresTypes[] | null>(
    null,
  );

  const [loadingPrediction, setLoadingPrediction] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = (await AdminUserService.getUsers({
        page,
        limit,
        ...filters,
      })) as UsersResponse;

      setUsers(response.data);
      setTotal(response.total);
    } catch (err) {
      console.error(err);
      setError("Greška prilikom učitavanja korisnika.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const updateFilter = (name: keyof UserFiltersTypes, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setPage(1);
  };

  const deleteUser = async (userId: number) => {
    const confirmed = window.confirm(
      "Da li ste sigurni da želite obrisati ovog korisnika?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await AdminUserService.deleteUser(userId);

      await loadUsers();
    } catch (err) {
      console.error(err);
      setError("Greška prilikom brisanja korisnika.");
    }
  };

  const loadPrediction = async (userId: number) => {
    try {
      setLoadingPrediction(true);
      setError(null);

      const response = await AdminUserService.getUserPrediction(userId);

      setSelectedPrediction(response);
    } catch (err) {
      console.error(err);
      setError("Greška prilikom učitavanja predikcije.");
    } finally {
      setLoadingPrediction(false);
    }
  };

  const showScores = (user: UserTypes) => {
    setSelectedScores(user.scores ?? []);
  };

  const totalPages = Math.ceil(total / limit);

  return {
    users,
    page,
    setPage,
    limit,
    total,
    totalPages,

    filters,
    updateFilter,
    applyFilters,

    loading,
    error,

    deleteUser,

    selectedPrediction,
    setSelectedPrediction,

    selectedScores,
    setSelectedScores,

    loadingPrediction,
    loadPrediction,
    showScores,

    reload: loadUsers,
  };
};
