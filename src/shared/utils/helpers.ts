export const formatCurrency = (v: number | string | null | undefined) => {
  if (v == null || v === "") return "—";
  const num = typeof v === "string" ? Number(v) : v;
  if (!Number.isFinite(num)) return String(v);
  return new Intl.NumberFormat("ru-RU").format(num);// + " ₽";
};
