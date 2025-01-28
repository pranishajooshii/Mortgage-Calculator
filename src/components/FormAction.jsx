"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { BsFillCalculatorFill, BsCurrencyPound } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Calculation from "@/components/Calculation";
import Empty from "./Empty";

const StyledFormMessage = styled.div`
  color: red;
  font-size: 0.875rem;
`;

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [calculationResult, setCalculationResult] = useState(null);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const calculateMortgage = () => {
    const { amount, term, rate } = formValues;

    // Convert string values to numbers
    const principal = parseFloat(amount);
    const annualInterestRate = parseFloat(rate) / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = parseInt(term) * 12;

    // Calculate monthly payment using the formula:
    const monthlyPayment =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formValues.amount) validationErrors.amount = "This field is required.";
    if (!formValues.term) validationErrors.term = "This field is required.";
    if (!formValues.rate) validationErrors.rate = "This field is required.";
    if (!formValues.type) validationErrors.type = "This field is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = calculateMortgage();
      setCalculationResult(result);
    }
  };

  const inputGroupClass = (hasError) =>
    `group mt-2 flex items-center border rounded-md overflow-hidden h-10 hover:border-black ${
      hasError ? "bg-red-100 border-red-500" : "bg-blue-100 border-slate-400"
    }`;
  
  const inputClass = "flex-1 h-full px-2 font-medium outline-none";

  return (
    <div className="flex justify-center items-center  w-full mt-28 px-0 md:px-6">
      <div className="flex flex-col sm:flex-row w-[900px] bg-white rounded-none sm:rounded-3xl">
        <div className=" w-full md:w-[50%] p-8 rounded-none sm:rounded-l-3xl">
          <div className="flex-col md:flex sm:flex-row items-center gap-4 justify-between mb-8">
            <p className="text-2xl md:text-xl text-slate-700 font-semibold">
              Mortgage Calculator
            </p>
            <p
              className="underline cursor-pointer text-slate-500 text-sm"
              onClick={() => {
                setFormValues({ amount: "", term: "", rate: "", type: "" });
                setCalculationResult(null);
                setErrors({});
              }}
            >
              Clear All
            </p>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-y-4">
              {/* Amount */}
              <div>
                <label className="text-slate-500 text-base md:text-sm font-medium">
                  Mortgage Amount
                </label>
                <div
                  className={inputGroupClass(errors.amount)}
                >
                  <div
                    className={`w-[10%] h-full flex justify-center items-center ${
                      errors.amount ? "bg-red-500 text-white" : "bg-blue-100 text-black"
                    }`}
                  >
                    <BsCurrencyPound />
                  </div>
                  <input
                    type="number"
                    name="amount"
                    value={formValues.amount}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>
                {errors.amount && (
                  <StyledFormMessage>{errors.amount}</StyledFormMessage>
                )}
              </div>

              <div className="flex gap-4">
                {/* Term */}
                <div className="flex-1">
                  <label className="text-slate-500 text-base md:text-sm font-medium ">
                    Mortgage Term
                  </label>
                  <div
                    className={inputGroupClass(errors.term)}
                  >
                    <input
                      type="number"
                      name="term"
                      value={formValues.term}
                      onChange={handleInputChange}
                      className="w-full h-full px-2 font-medium outline-none"
                    />
                    <div
                      className={`bg-blue-100 flex items-center justify-center px-3 h-full ${
                        errors.term ? "bg-red-500 text-white" : "bg-blue-100 text-black"
                      }`}
                    >
                      <span>years</span>
                    </div>
                  </div>
                  {errors.term && (
                    <StyledFormMessage>{errors.term}</StyledFormMessage>
                  )}
                </div>

                {/* Interest Rate */}
                <div className="flex-1">
                  <label className="text-slate-500 text-base md:text-sm font-medium">
                    Interest Rate
                  </label>
                  <div
                    className={inputGroupClass(errors.rate)}
                  >
                    <input
                      type="number"
                      name="rate"
                      value={formValues.rate}
                      onChange={handleInputChange}
                      className="w-full h-full px-2 font-medium outline-none"
                    />
                    <div
                      className={`bg-blue-100 flex items-center justify-center px-3 h-full ${
                        errors.rate ? "bg-red-500 text-white" : "bg-blue-100 text-black"
                      }`}
                    >
                      <span>%</span>
                    </div>
                  </div>
                  {errors.rate && (
                    <StyledFormMessage>{errors.rate}</StyledFormMessage>
                  )}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-slate-500 text-base md:text-sm font-medium">
                  Mortgage Type
                </label>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center space-x-2">
                    <div className="border border-slate-400 w-full p-2 hover:border hover:border-[hsl(61,70%,52%)] rounded-md ">
                      <input
                        type="radio"
                        name="type"
                        value="repayment"
                        checked={formValues.type === "repayment"}
                        onChange={handleInputChange}
                      />
                      <span className="text-sm text-slate-600 pl-1 font-semibold">
                        Repayment
                      </span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <div className="border border-slate-400 w-full p-2 hover:border-1 hover:border-[hsl(61,70%,52%)] rounded-md">
                      <input
                        type="radio"
                        name="type"
                        value="rate"
                        checked={formValues.type === "rate"}
                        onChange={handleInputChange}
                      />
                      <span className="text-sm text-slate-600 pl-1 font-semibold">
                        Interest Only
                      </span>
                    </div>
                  </label>
                </div>
                {errors.type && (
                  <StyledFormMessage>{errors.type}</StyledFormMessage>
                )}
              </div>

              <div className="mt-8 ">
                <button
                  type="submit"
                  className="rounded-full px-6 py-2 bg-[hsl(61,70%,52%)] text-black font-medium hover:bg-[hsl(61,70%,62%)] flex items-center gap-2"
                >
                  <BsFillCalculatorFill />
                  Calculate Repayments
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="w-full md:w-[50%] bg-[hsl(202,55%,16%)] py-11 flex justify-center items-center text-white rounded-none text-lg sm:rounded-r-3xl md:rounded-bl-[65px]">
          {calculationResult ? (
            <Calculation result={calculationResult} />
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
