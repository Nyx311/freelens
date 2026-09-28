import { t } from "@freelensapp/i18n";
import { Badge } from "./badge";
import styles from "./badge-boolean.module.scss";

export interface BadgeBooleanProps {
  value?: boolean;
}

export function getBooleanText(value?: boolean) {
  if (value === true) return t("True");
  if (value === false) return t("False");
  return "-";
}

export function getBooleanClass(value?: boolean) {
  if (value === true) return styles.true;
  if (value === false) return styles.false;
  return styles.undefined;
}

export function BadgeBoolean({ value }: BadgeBooleanProps) {
  return <Badge className={getBooleanClass(value)} label={getBooleanText(value)} />;
}
