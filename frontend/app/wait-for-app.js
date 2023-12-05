const http = require("http");

function waitForApp() {
  return new Promise((resolve, reject) => {
    const maxRetries = 40;
    const retryInterval = 15000;
    const timeout = 600000;

    let retries = 0;

    function checkApp() {
      http
        .get("http://localhost:3000", (res) => {
          if (res.statusCode === 200) {
            console.log("Application is ready for testing!");
            resolve();
          } else {
            if (retries < maxRetries) {
              retries++;
              console.log(
                `Application not ready yet. Retrying in ${
                  retryInterval / 1000
                } seconds...`
              );
              setTimeout(checkApp, retryInterval);
            } else {
              console.error(
                "Timeout: Application did not become ready for testing."
              );
              reject(
                new Error(
                  "Timeout: Application did not become ready for testing."
                )
              );
            }
          }
        })
        .on("error", (err) => {
          if (retries < maxRetries) {
            retries++;
            console.log(
              `Application not ready yet. Retrying in ${
                retryInterval / 1000
              } seconds...`
            );
            setTimeout(checkApp, retryInterval);
          } else {
            console.error(
              "Error occurred while checking the application:",
              err
            );
            reject(err);
          }
        });
    }

    setTimeout(() => {
      console.error(
        "Timeout: Application did not become ready for testing within the specified time."
      );
      reject(
        new Error(
          "Timeout: Application did not become ready for testing within the specified time."
        )
      );
    }, timeout);

    checkApp();
  });
}

waitForApp()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("An error occurred:", err);
    process.exit(1);
  });
