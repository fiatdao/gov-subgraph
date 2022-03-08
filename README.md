# FIAT DAO Governance Subgraph

FIAT DAO Subgraph indexing:
- Governance: proposals, votes and abgrogations
- Comitium: deposits and withdrawals, vote delegation, locks
- FDT: transfers
- Airdrop: claims
- Staking (YF): deposits and withdrawals

Hosted Subgraph:
- [Mainnet](https://thegraph.com/hosted-service/subgraph/fiatdao/gov-subgraph)
- [Rinkeby](https://thegraph.com/hosted-service/subgraph/fiatdao/gov-subgraph-rinkeby)

## Running Local Graph Node

Open the `docker-compose.yml` file and edit the `ethereum` node url you want to use.

## Development

There are `npm scripts` for all the stages of subgraph development.

### Building the subgraph (code generation + creating the subgraph):
`yarn build`

### Deploy the Subgraph:
`CONFIG=<CONFIG_FILE_NAME> NETWORK=<NETWORK> TARGET=<TARGET> yarn deploy`

- CONFIG: `dev.json`, `mainnet.json`, `rinkeby.json`
- NETWORK: `local`, `mainnet`, `rinkeby`
- TARGET: `local`, `remote`, `studio`, `hosted-service` (optional)

In order to deploy to a remote node the `IPFS_NODE` and `GRAPH_NODE` has to be set:

`IPFS_NODE=<IPFS_NODE_URL> GRAPH_NODE=<GRAPH_NODE_URL CONFIG=<CONFIG_FILE_NAME> NETWORK=<NETWORK> yarn deploy`

In order to deploy to the hosted service the `ACCESS_TOKEN` has to be set:

`ACCESS_TOKEN=<THE_GRAPH_ACCESS_TOKEN> CONFIG=<CONFIG_FILE_NAME> NETWORK=<NETWORK> yarn deploy`

## Supported APIs

### Governance
- [X] Overview Info
- [X] Get All Proposals
- [X] Get Proposal by ID
- [X] Get all Votes for a given Proposal ID
- [X] Get all Events for a given Proposal ID
- [X] Get all Voters
- [X] Get all Abrogation Proposals
- [X] Get Abrogation Proposal by ID
- [X] Get Abrogation Proposal Votes by ID
