/** Formata um valor em meticais no formato usado em todo o site: "3.950,00 MZN". */
export const formatMZN = (value: number): string => {
  const fixed = value.toFixed(2); // "3950.00"
  const [intPart, decPart] = fixed.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${grouped},${decPart} MZN`;
};
