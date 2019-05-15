#!/usr/bin/env sh

function authenticate_cluster() {
  kubectl config set-cluster $K8S_CLUSTER_NAME --server=$K8S_URL --insecure-skip-tls-verify=true
  kubectl config set-credentials ci --token=$K8S_USER_TOKEN
  kubectl config set-context default --cluster=$K8S_CLUSTER_NAME --user=$K8S_CLUSTER_NAME
  kubectl config use-context default
}

authenticate_cluster
