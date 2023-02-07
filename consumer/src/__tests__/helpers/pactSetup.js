const path = require("path")
const PactV3 = require("@pact-foundation/pact").PactV3

const Pact = PactV3

const port = 8081

export default new Pact({
  port: port,
  dir: path.resolve(process.cwd(), "../pacts"),
  spec: 4, // SPECIFICATION_VERSION_V3
  logLevel: 'INFO',
  consumer: "ReactPactConsumer",
  provider: "ExpressPactProvider",
})