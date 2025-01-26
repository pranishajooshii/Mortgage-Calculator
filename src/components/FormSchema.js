import * as z from "zod";

export const signUpSchema = z
  .object({
    amount: z
      .string()
      .min(1, {
        message: "Amount is required.",
      })
      .refine((value) => !isNaN(parseFloat(value)), {
        message: "Amount must be a number.",
      })
      .refine((value) => parseFloat(value) > 0, {
        message: "Amount must be greater than 0.",
      }),

    term: z
      .string()
      .min(1, {
        message: "Term is required.",
      })
      .refine((value) => !isNaN(parseFloat(value)), {
        message: "Term must be a number.",
      })
      .refine((value) => parseFloat(value) > 0, {
        message: "Term must be greater than 0.",
      }),

    rate: z
      .string()
      .min(1, {
        message: "Rate is required.",
      })
      .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
        message: "Rate must be a valid number (can include up to two decimal places).",
      }),

    type: z
      .string()
      .min(1, {
        message: "Mortgage type is required.",
      })
      .refine((value) => value === "repayment" || value === "rate", {
        message: "Please select a valid mortgage type.",
      }),
  });
