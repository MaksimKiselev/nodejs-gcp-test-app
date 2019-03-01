Node.js GCP test app
---
This is simple node.js application which count page views on last minute.

Also project contains configurations for automate deploy to GKE using GCB.


#### Deploy to GCP

Fork project on github: https://github.com/MKiselev/nodejs-gcp-test-app

Install `gcloud` CLI using follow instructions: https://cloud.google.com/sdk/docs/quickstarts or use web console

For this example:   PROJECT_ID     is  `node-gce-test`
                    CLUSTER_NAME   is  `node-gce-test-cluster`
 
Create project: `gcloud projects create PROJECT_ID` 

Install kubectl component: `gcloud components install kubectl`

Set defaults for the gcloud command-line tool:
```
gcloud config set project PROJECT_ID
gcloud config set compute/zone europe-north1-a
```

Add a build trigger:
- Enable building for project https://console.developers.google.com/billing/linkedaccount
- Open https://console.cloud.google.com/cloud-build/triggers
- Press `Enable Cloud Build API`
- Press `Create trigger`
- Select `GitHub` as source
- Select `USERNAME/nodejs-gcp-test-app`, where USERNAME it's your GitHub profile name
- Name: Push in master branch
- Type: Branch
- Branch: master
- Build Configuration type: Cloud Build (yaml or json)
- File: `cloudbuild.yml`
- Press `Create trigger`

If your cluster name is not `node-gce-test-cluster` please set variable `_CLOUDSDK_CONTAINER_CLUSTER` in trigger configuration

If you want, you may configure `_CLOUDSDK_COMPUTE_ZONE` also.

This variables will be used in `kubectl apply` command.
See `cloudbuild.yml` for more details.

Enable GKE API at: https://console.cloud.google.com/kubernetes/list


Create a container cluster: `gcloud container clusters create CLUSTER_NAME --num-nodes=1`

On page https://console.cloud.google.com/iam-admin/iam add role Administrator Kubernetes Engine to Cloud Build Service Account

For run build push commit to master branch or  visit page https://console.cloud.google.com/cloud-build/triggers and run build trigger manually.

Go to https://console.cloud.google.com/kubernetes/discovery and click on endpoint url

Enjoy!
