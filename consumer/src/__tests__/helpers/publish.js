// const { Publisher } = require("@pact-foundation/pact")
const PactV3 = require("@pact-foundation/pact")
let path = require("path")

console.log(111111111, PactV3 );

const childProcess = require("child_process")

const exec = command =>
  childProcess
    .execSync(command)
    .toString()
    .trim()

// Usually, you would just use the CI env vars, but to allow these examples to run from
// local development machines, we'll fall back to the git command when the env vars aren't set.
// TODO: Update these for your particular CI server
const gitSha = process.env.TRAVIS_COMMIT || exec("git rev-parse HEAD || echo LOCAL_DEV")
const branch = process.env.TRAVIS_BRANCH || exec("git rev-parse --abbrev-ref HEAD || echo LOCAL_DEV")

const opts = {
  dipactFilesOrDirsr: path.resolve(process.cwd(), "../pacts"),
  pactBroker: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  consumerVersion: gitSha,
  tags: [branch],
}
new Publisher(opts)
  .publishPacts()
  .then(() => {
    console.log("Pact contract publishing complete!")
    console.log("")
    console.log(`Head over to ${process.env.PACT_BROKER_BASE_URL} to see your published contracts.`)
  })
  .catch(e => {
    console.log("Pact contract publishing failed: ", e)
  })
