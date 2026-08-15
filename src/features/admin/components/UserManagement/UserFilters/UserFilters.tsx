import Button from "../../../../../components/ui/Button/Button";
import Input from "../../../../../components/ui/Input/Input";
import type { UserFiltersTypes } from "../../../hooks/useAdminUsers";
import styles from "./UserFilters.module.scss";

interface UserFiltersProps {
  filters: UserFiltersTypes;
  onChange: (name: keyof UserFiltersTypes, value: string) => void;
  onSubmit: () => void;
}

const UserFilters = ({ filters, onChange, onSubmit }: UserFiltersProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        <Input
          name="firstName"
          value={filters.firstName}
          placeholder="Ime"
          onChange={(event) => onChange("firstName", event.target.value)}
        />

        <Input
          name="lastName"
          value={filters.lastName}
          placeholder="Prezime"
          onChange={(event) => onChange("lastName", event.target.value)}
        />

        <Input
          name="email"
          value={filters.email}
          placeholder="Email"
          onChange={(event) => onChange("email", event.target.value)}
        />

        <Input
          name="teamName"
          value={filters.teamName}
          placeholder="Tim"
          onChange={(event) => onChange("teamName", event.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <Button onClick={onSubmit}>Filtriraj</Button>
      </div>
    </div>
  );
};

export default UserFilters;
