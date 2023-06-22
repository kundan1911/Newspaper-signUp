const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "d27dfe50d006cbcfacc12171b2136a5d-us9",
  server: "us-9",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();