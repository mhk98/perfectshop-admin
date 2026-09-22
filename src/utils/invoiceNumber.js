<<<<<<< HEAD
export function formatInvoiceNumber(orderOrValue, fallback = "PS-0000") {
=======
export function formatInvoiceNumber(orderOrValue, fallback = "HD-0000") {
>>>>>>> e704dbdaab800c62fd937c4fa53e31641f46af01
  const rawValue =
    orderOrValue && typeof orderOrValue === "object"
      ? orderOrValue.invoiceId || orderOrValue.orderId || orderOrValue.Id
      : orderOrValue;
  const raw = String(rawValue || "").trim();
  if (!raw) return fallback;

  const prefixed = raw.match(/^(?:WZ|TJ)-?(\d+)$/i);
<<<<<<< HEAD
  if (prefixed) return `PS-${prefixed[1].padStart(4, "0")}`;

  if (/^\d+$/.test(raw)) return `PS-${raw.padStart(4, "0")}`;
=======
  if (prefixed) return `HD-${prefixed[1].padStart(4, "0")}`;

  if (/^\d+$/.test(raw)) return `HD-${raw.padStart(4, "0")}`;
>>>>>>> e704dbdaab800c62fd937c4fa53e31641f46af01
  return raw;
}
