import clsx from "clsx";
import Button from "../../../../../components/ui/Button/Button";
import type { UserTypes } from "../../../../../types/user.types";
import styles from "./UserTable.module.scss";

interface UserTableProps {
  users: UserTypes[];
  onDelete: (userId: number) => void;
  onPrediction: (userId: number) => void;
  onScores: (user: UserTypes) => void;
}

const UserTable = ({
  users,
  onDelete,
  onPrediction,
  onScores,
}: UserTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ime i prezime</th>
            <th>Email</th>
            <th>Tim</th>
            <th>Status</th>
            <th>Akcije</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>
                <div className={styles.userCell}>
                  <span className={styles.name}>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </td>

              <td>{user.email}</td>

              <td>{user.teamName || "-"}</td>

              <td>
                <span
                  className={clsx(styles.badge, {
                    [styles.verified]: user.isVerified,
                    [styles.unverified]: !user.isVerified,
                  })}
                >
                  {user.isVerified ? "Verifikovan" : "Nije verifikovan"}
                </span>
              </td>

              <td>
                <div className={styles.actions}>
                  <Button variant="outline" onClick={() => onScores(user)}>
                    Score
                  </Button>

                  {user.userId && (
                    <Button
                      variant="outline"
                      onClick={() => onPrediction(user.userId!)}
                    >
                      Prediction
                    </Button>
                  )}

                  {user.userId && (
                    <Button
                      variant="ghost"
                      onClick={() => onDelete(user.userId!)}
                    >
                      Obriši
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
