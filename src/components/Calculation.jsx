import React from "react";

const Calculation = ({result}) => {
  return (
    <>
      <div className="px-8">
        <div>
          <p className="text-xl">Your results</p>
        </div>

        <div>
          <p className="text-lg sm:text-base text-slate-400 pt-3 pb-4  ">
            Your results shown below are based on the information you provided.
            To adjust the results, edit the form and click "calculate repayment"
            again.
          </p>
        </div>

        <div className="relative rounded-lg overflow-hidden ">
          <div className="bg-[hsl(61,70%,52%)] h-[3px] absolute top-0 left-0 right-0 "></div>
          <div className="bg-slate-800">
            <div className="px-5 space-y-3">
              <p className="text-lg sm:text-base text-slate-400 pt-5 ">
                Your monthly repayments
              </p>
              <p className="text-5xl text-[hsl(61,70%,52%)] ">
                {" "}
                £{result.monthlyPayment}
              </p>
              <div className="h-0.5 bg-slate-700"></div>

              <p className="text-lg sm:text-base text-slate-400">
                Total you will repay over the term
              </p>
              <p className="text-5xl pb-5 text-[hsl(61,70%,52%)]">
                {" "}
                 £{result.totalPayment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculation;
