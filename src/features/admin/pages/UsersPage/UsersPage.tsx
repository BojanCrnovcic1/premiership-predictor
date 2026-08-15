import UserManagement from "../../components/UserManagement/UserManagement";
import styles from "./UsersPage.module.scss";

const UsersPage = () => {
  return (
    <main className={styles.page}>
      <UserManagement />
    </main>
  );
};

export default UsersPage;
