import { z } from "zod";

export const paginationValidator = {
  offset: z.coerce
    .number({ invalid_type_error: "offset must be a number" })
    .int()
    .nonnegative(),
  limit: z.coerce
    .number({ invalid_type_error: "limit must be a number" })
    .int()
    .nonnegative(),
};
