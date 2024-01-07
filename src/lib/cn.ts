export const cn = (...args: unknown[]) =>
  args
    .flat()
    .filter((arg) => typeof arg === "string")
    .join(" ")
    .trim();
