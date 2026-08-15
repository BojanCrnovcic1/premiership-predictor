import Button from "../../../../components/ui/Button/Button";
import Loader from "../../../../components/ui/Loader/Loader";
import { useAdminUsers } from "../../hooks/useAdminUsers";
import UserFilters from "./UserFilters/UserFilters";
import styles from "./UserManagement.module.scss";
import UserPredictionModal from "./UserPredictionModal/UserPredictionModal";
import UserScoreModal from "./UserScoreModal/UserScoreModal";
import UserTable from "./UserTable/UserTable";

const UserManagement = () => {
  const {
    users,
    page,
    setPage,
    totalPages,

    filters,
    updateFilter,
    applyFilters,

    loading,
    error,

    deleteUser,
    loadPrediction,
    showScores,

    selectedPrediction,
    setSelectedPrediction,

    selectedScores,
    setSelectedScores,

    loadingPrediction,
  } = useAdminUsers();

  return (
    <section className={styles.management}>
      <header className={styles.header}>
        <h1>Upravljanje korisnicima</h1>
        <p>Pregled i upravljanje registrovanim korisnicima aplikacije.</p>
      </header>

      <UserFilters
        filters={filters}
        onChange={updateFilter}
        onSubmit={applyFilters}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : users.length === 0 ? (
        <div className={styles.emptyState}>
          Nema korisnika koji odgovaraju zadatim filterima.
        </div>
      ) : (
        <UserTable
          users={users}
          onDelete={deleteUser}
          onPrediction={loadPrediction}
          onScores={showScores}
        />
      )}

      {!loading && users.length > 0 && (
        <div className={styles.pagination}>
          <Button
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(current - 1, 1))}
          >
            Prethodna
          </Button>

          <span className={styles.pageInfo}>
            Strana {page} / {totalPages || 1}
          </span>

          <Button
            disabled={page >= totalPages}
            onClick={() =>
              setPage((current) => Math.min(current + 1, totalPages))
            }
          >
            Sledeća
          </Button>
        </div>
      )}

      {loadingPrediction && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}

      <UserPredictionModal
        prediction={selectedPrediction}
        onClose={() => setSelectedPrediction(null)}
      />

      <UserScoreModal
        scores={selectedScores}
        onClose={() => setSelectedScores(null)}
      />
    </section>
  );
};

export default UserManagement;
