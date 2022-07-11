import { useState } from "react";
import "./App.css";
import { loadScript } from "./helper/loadScript";

function App() {
  const [orderId, setOrderId] = useState("");
  const [token, setToken] = useState("");

  const onScriptLoad = async () => {
    const res = await loadScript(
      "https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/ZHMpwy77672646700865.js"
    );

    // REACT_APP_PAYMENT_SCRIPT;
    if (!res) {
      alert("SDK failed to load. Are you online?");
      return;
    }

    if (res) {
      console.log("script loaded!", process.env.REACT_APP_PAYMENT_MODE);
    }

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId /* update order id */,
        token /* update token value */,
        tokenType: "TXN_TOKEN",
      },
      merchant: {
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(paymentStatus) {
          console.log(paymentStatus, "paymentStatus");

          // "SUCCES" is always write in '"success"' and also failed ::TODO::::
          if (paymentStatus?.STATUS === "TXN_SUCCESS") {
          } else {
          }
        },
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
        // initialze configuration using init method

        window.Paytm.CheckoutJS.init(config)
          .then(function onSuccess(success) {
            // after successfully update configuration invoke checkoutjs
            window.Paytm.CheckoutJS.invoke();
          })
          .catch(function onError(error) {
            console.log("error => ", error);
          });
      });
    } else {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="App">
      <input
        onChange={(e) => setOrderId(e.target.value)}
        type="text"
        placeholder="Enter ORDER ID"
      />
      <br />

      <input
        onChange={(e) => setToken(e.target.value)}
        type="text"
        placeholder="Enter Your Token"
      />
      <br />

      {/* <button onClick={onScriptLoad}>TEST PAYTM</button> */}

      <br />
      <br />
      <br />

      <button onClick={onScriptLoad}>TEST PAYTM</button>
    </div>
  );
}

export default App;
