"use client";

const Stocks = ({ wns, symbols }) => {
  const { initialStocks } = wns;
  
  return (
    <div className="flex flex-col gap-3 ">
      {initialStocks?.map((stocks, index) => {
        return (
          <div
            key={index}
            className="dark:shadow-white/40 dark:shadow-md flex flex-col gap-1 border shadow-black/20 shadow-md p-2 rounded"
          >
            <h3 className="font-bold text-xl text-center">{symbols[index]}</h3>
            <p>
              <strong>Current Price</strong>: ${stocks.c.toFixed(2)}
            </p>
            <p>
              <strong>Change</strong>: ${stocks.d.toFixed(2)} ($
              {stocks.dp.toFixed(2)}
              %)
            </p>
            <p>
              <strong>Highest Price Today</strong>: ${stocks.h.toFixed(2)}
            </p>
            <p>
              <strong>Lowest Price Today</strong>: ${stocks.l.toFixed(2)}
            </p>
            <p>
              <strong>Opening Price Today</strong>: ${stocks.o.toFixed(2)}
            </p>
            <p>
              <strong>Previous Closing Price</strong>: ${stocks.pc.toFixed(2)}
            </p>
            <p>
              <strong>Timestamp</strong>:
              {new Date(stocks.t * 1000).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Stocks;
