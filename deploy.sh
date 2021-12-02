#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

mustache config/$CONFIG subgraph.template.yaml > subgraph.yaml

# Run codegen and build
graph codegen
graph build

if [[ "$NO_DEPLOY" = true ]]; then
  rm subgraph.yaml
  exit 0
fi

# Select IPFS and The Graph nodes
if [ "$GRAPH" == "local" ]
then
  IPFS_NODE="http://localhost:5001"
  GRAPH_NODE="http://127.0.0.1:8020"
elif [ "$GRAPH" == "rinkeby" ]
then
  IPFS_NODE="http://:5001"
  GRAPH_NODE="http://:8020"
elif [ "$GRAPH" = "mainnet" ]
then
  IPFS_NODE="http://:5001"
  GRAPH_NODE="http://:8020"
elif [ "$GRAPH" = "rinkeby-remote" ]
then
  graph deploy --studio fiatdao
  # Remove manifest
  rm subgraph.yaml
  exit 0
elif [ "$GRAPH" = "mainnet-remote" ]
then
  graph deploy --studio fiat-dao-subgraph
  # Remove manifest
  rm subgraph.yaml
  exit 0
elif [ "$GRAPH" = "rinkeby-hosted" ]
then
  graph deploy --product hosted-service fiatdao/subgraph-rinkeby
  # Remove manifest
  rm subgraph.yaml
  exit 0
elif [ "$GRAPH" = "mainnet-hosted" ]
then
  graph deploy --product hosted-service fiatdao/subgraph
  # Remove manifest
  rm subgraph.yaml
  exit 0
fi

# Create subgraph if missing
{
  graph create fiatdao/fiat-dao-subgraph --node ${GRAPH_NODE}
} || {
  echo 'Subgraph was already created'
}

# Deploy subgraph
graph deploy fiatdao/fiat-dao-subgraph --ipfs ${IPFS_NODE} --node ${GRAPH_NODE}

# Remove manifest
#rm subgraph.yaml
