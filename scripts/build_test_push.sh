#!/usr/bin/env sh

function tekton_pipeline_clean() {
  k delete PipelineResource --all && \
    k delete tasks.tekton.dev --all && \
    k delete taskruns.tekton.dev --all
}

function tekton_pipeline_build() {
  apply -f tektoncd/notes-git-resource.yaml && \
    k apply -f tektoncd/notes-image-resource.yaml && \
    k apply -f tektoncd --recursive && \
    pod=$(k -n tekton-pipelines get pod -l tekton.dev/taskRun=notes-build-taskrun -o jsonpath='{.items[0].metadata.name}')
}

tekton_pipeline_clean
tekton_pipeline_build
