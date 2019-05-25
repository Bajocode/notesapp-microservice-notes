#!/bin/bash

DOCKER_SECRET_KEYREF=docker-secret
CI_NAMESPACE=tekton-pipelines

function install_tiller() {
kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: tiller
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: tiller
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: tiller
    namespace: kube-system
EOF

  helm init --service-account tiller
  kubectl rollout status deployment tiller-deploy -n kube-system
}

function install_tekton_pipelines() {
  kubectl apply \
    --filename https://storage.googleapis.com/tekton-releases/latest/release.yaml
}

function install_docker_sa() {
  kubectl apply -f - << EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: docker-sa
  namespace: $CI_NAMESPACE
secrets:
  - name: $DOCKER_SECRET_KEYREF
EOF
}

function install_moby_buildkit()  {
  kubectl -n tekton-pipelines apply \
    -f https://raw.githubusercontent.com/knative/build-templates/master/buildkit/0-buildkitd.yaml
}

install_tiller
install_tekton_pipelines
install_docker_sa
install_moby_buildkit

