"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import styled from "styled-components";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { signUpSchema } from "./FormSchema";
import { BsFillCalculatorFill } from "react-icons/bs";
import { BsCurrencyPound } from "react-icons/bs";
import Result from "./Result";

const StyledFormMessage = styled(FormMessage)`
  color: red;
`;

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      amount: "",
      term: "",
      rate: "",
      type: "",
    },
  });

  const [focusedRadio, setFocusedRadio] = useState(null);
  const [liveValues, setLiveValues] = useState(form.getValues());

  const handleFocus = (value) => {
    setFocusedRadio(value); // Set the radio button as focused
  };

  const handleBlur = () => {
    setFocusedRadio(null); // Reset focus when blurred
  };

  async function onSubmit(values) {
    const { amount, term, rate, type } = form.getValues();

    // Log input values for debugging
    console.log("Input Values:");
    console.log("Amount is:", amount);
    console.log("Term (in years):", term);
    console.log("Rate (%):", rate);
    console.log("Type:", type);

    // Convert inputs to numbers for calculations
    const principal = parseFloat(amount); // Loan amount
    const years = parseInt(term); // Term in years
    const annualRate = parseFloat(rate) / 100; // Rate in decimal
    const months = years * 12; // Convert years to months

    let result = 0;

    if (type === "repayment") {
      // Repayment calculation
      const monthlyRate = annualRate / 12;
      if (monthlyRate > 0) {
        result =
          (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      } else {
        // Zero interest: divide principal equally over months
        result = principal / months;
      }
    } else if (type === "rate") {
      // Interest-only calculation
      result = (principal * annualRate) / 12;
    }

    // Log the result
    console.log(`Calculated Result (${type}):`, result.toFixed(2));

    return result.toFixed(2);
  }

  const handleInputChange = () => {
    setLiveValues(form.getValues());
  };

  return (
    <div className="flex justify-center items-center h-screen w-full  ">
      <div className="flex flex-col sm:flex-row  w-[900px] bg-slate-100 rounded-none  sm:rounded-3xl  ">
        <div className=" bg-slate-100 w-full md:w-[50%] p-8 rounded-none sm:rounded-l-3xl  ">
          <div className="flex-col md:flex sm:flex-row items-center gap-4 justify-between mb-8">
            <p className="text-2xl md:text-xl text-slate-700 shadow-slate-900 font-semibold ">
              Mortgage Calculator
            </p>
            <div>
              <p className="underline cursor-pointer text-slate-500 text-sm mt-2 md:mt-0">
                Clear All
              </p>
            </div>
          </div>
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(onSubmit)}
              onChange={handleInputChange}
            >
              <div className="col-span-1 flex flex-col gap-y-4">
                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-500 text-base md:text-xs">
                        Mortgage Amount
                      </FormLabel>
                      <FormControl>
                        {/* Flex container with a fixed height */}
                        <div
                          className="flex items-center border border-slate-400 rounded-md h-10 hover:border-black
"
                        >
                          {/* Green background div occupying 20% width and taking full height */}
                          <div className="bg-blue-100 w-[10%] h-full flex justify-center items-center">
                            <span>
                              <BsCurrencyPound />
                            </span>
                          </div>

                          {/* Input field filling the remaining space */}
                          <div className="flex-1">
                            <Input
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                console.log("Amount:", e.target.value); // Log amount while typing
                              }}
                              className="h-full  font-medium outline-none "
                            />
                          </div>
                        </div>
                      </FormControl>
                      <StyledFormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex-col md:flex gap-4">
                  {/* Term */}
                  <FormField
                    control={form.control}
                    name="term"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-slate-500 text-base md:text-xs">
                          Mortgage Term
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center border border-slate-400 rounded-md h-10 hover:border-black">
                            {/* Input field filling the remaining space */}
                            <div className="flex-1 ">
                              <Input
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  console.log("Term(years):", e.target.value); // Log amount while typing
                                }}
                                className="h-full   font-medium outline-none  "
                              />
                            </div>

                            {/* Green background div occupying 20% width and taking full height */}
                            <div className="bg-blue-100 w-[35%] h-full flex items-center justify-center rounded-r-md ">
                              <span className="text-slate-700">years</span>
                            </div>
                          </div>
                        </FormControl>

                        <StyledFormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Interest Rate */}
                  <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-slate-500 text-base md:text-xs">
                          Interest Rate
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center border border-slate-400 rounded-md h-10 hover:border-black">
                            {/* Input field filling the remaining space */}
                            <div className="flex-1">
                              <Input
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  console.log("Interest Rate:", e.target.value); // Log amount while typing
                                }}
                                className="h-full  font-medium outline-none "
                              />
                            </div>
                            {/* Green background div occupying 20% width and taking full height */}
                            <div className="bg-blue-100 w-[20%] h-full flex items-center justify-center">
                              <span>%</span>
                            </div>
                          </div>
                        </FormControl>
                        <StyledFormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-500 text-base md:text-xs">
                        Mortgage Type
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          {...field}
                          onValueChange={(value) => field.onChange(value)} // Ensure onChange is connected to the form
                          className="space-y-2"
                        >
                          <div
                            className={`flex items-center space-x-2 border  border-slate-400 rounded-md p-2 hover:border-1 hover:border-[hsl(61,70%,52%)] ${
                              focusedRadio === "repayment"
                                ? "bg-red-100 border-2 border-[hsl(61,70%,52%)]"
                                : ""
                            } `}
                            onFocus={() => handleFocus("repayment")}
                            onBlur={handleBlur}
                          >
                            <RadioGroupItem
                              value="repayment"
                              id="repayment"
                              className="border-2  border-slate-400"
                            />
                            <Label
                              htmlFor="repayment"
                              className="text-sm text-slate-700 font-semibold "
                            >
                              Repayment
                            </Label>
                          </div>
                          <div
                            className={`flex items-center space-x-2 border  border-slate-400 rounded-md p-2 hover:border-1 hover:border-[hsl(61,70%,52%)] ${
                              focusedRadio === "rate"
                                ? "bg-red-100 border-2 border-[hsl(61,70%,52%)]"
                                : ""
                            } `}
                            onFocus={() => handleFocus("rate")}
                            onBlur={handleBlur}
                          >
                            <RadioGroupItem
                              value="rate"
                              id="rate"
                              className=" border-2 border-slate-400"
                            />
                            <Label
                              htmlFor="rate"
                              className="text-base md:text-sm text-slate-700 font-semibold"
                            >
                              Interest Only
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <StyledFormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>

            <div className="mt-8 ">
              <Button
                type="submit"
                className=" rounded-3xl px-7 py-4 bg-[hsl(61,70%,52%)] text-black font-medium hover:bg-[hsl(61,70%,62%)] flex items-center gap-2"
              >
                <BsFillCalculatorFill />
                Calculate Repayments
              </Button>
            </div>
          </Form>
        </div>

        <div className="w-full md:w-[50%] bg-[hsl(202,55%,16%)] py-11 flex justify-center items-center text-white rounded-none  text-lg sm:rounded-r-3xl ">
          <Result />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
