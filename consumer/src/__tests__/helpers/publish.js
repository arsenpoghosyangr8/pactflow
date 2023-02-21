const pact = require('@pact-foundation/pact-node');
const path = require('path');

require('dotenv').config();

if (process.env.PACT_BROKER_BASE_URL) {
    const opts = {
        pactFilesOrDirs: [path.resolve(process.cwd(), "../pacts")],
        pactBroker: process.env.PACT_BROKER_BASE_URL,
        pactBrokerToken: process.env.PACT_BROKER_TOKEN,
        tags: ['prod', 'test', 'main'],
        consumerVersion: `${process.env.CI_COMMIT_REF_NAME || 'local'}.${Math.floor(new Date() / 1000)}`,
    };

    pact.publishPacts(opts)
        .then((d) => {
        })
        .catch((e) => {
        });
} else {
    console.log('Skipping pact publish, no PACT_BROKER_BASE_URL env variable found!');
}