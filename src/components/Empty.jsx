import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div>
          <Image
            src="/illustration-empty.svg"
            width={150}
            height={150}
            alt="Illustration"
          />
        </div>

        <div>
          <h1 className="mt-5">Results shown here</h1>
        </div>

        <div>
          <p className="text-slate-500 text-base font-medium text-center px-8 mt-3">
            Complete the form and click "calculate repayments" to see what your
            monthly repayments would be.
          </p>
        </div>
      </div>
    </>
  );
};

export default Empty;
