#!/usr/bin/env sh

function tekton_pipeline_clean() {
  kubectl delete PipelineResource --all && \
    kubectl delete tasks.tekton.dev --all && \
    kubectl delete taskruns.tekton.dev --all
}

function tekton_pipeline_build() {
  kubectl apply -f tektoncd/notes-git-resource.yaml && \
    kubectl apply -f tektoncd/notes-image-resource.yaml && \
    kubectl apply -f tektoncd --recursive && \
    pod=$(kubectl -n tekton-pipelines get pod -l tekton.dev/taskRun=notes-build-taskrun -o jsonpath='{.items[0].metadata.name}')
}

tekton_pipeline_clean
tekton_pipeline_build
