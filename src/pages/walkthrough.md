# Nimbus Walkthrough

Nimbus was created in order provide a lightweight, easy-to-use framework for small teams deploying lightweight, task-focused NLP models.

To illustrate this, let’s walk through a typical user journey. The goal is to take a trained NLP model and make it accessible via a cloud-hosted API endpoint with minimal friction.

## Installing Nimbus and Initial Configuration

First, the user installs the Nimbus Command Line Interface (CLI) as a global NPM package. To do this, the user runs the following command in their terminal: `npm i -g nimbusnlp`.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/FinalNimbusDownload.gif"
      alt="nimbus download clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

Before the user can take any action using the CLI, they will be prompted to approve their current working  where Nimbus will create a directory to store the local configurations and artifacts. If the user would prefer to have this placed in a different location, they can cancel the process and call the CLI command from their desired location.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/localFileLocation.png"
      alt="local file confirmation prompt"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

Once installed, the `nimbusCLI` command provides access to the framework’s core functionalities through several sub-commands, which are designed to manage the entire deployment lifecycle. The user can see a list of these commands in the CLI by entering `nimbusCLI` into their console.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/nimbusCLI.png"
      alt="nimbusCLI command"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

The primary commands available to the user are:

* `nimbusCLI deploy`: Initiates the process of deploying a new NLP model to the existing deployment infrastructure. This command guides the user through configuration and automates the necessary backend steps. If no infrastructure has been deployed for this user yet, this will also be done here.   
* `nimbusCLI list`: Displays a list of all the models currently deployed and managed by Nimbus within the configured storage location for the user.  
* `nimbusCLI delete`: Allows the user to select and remove a specific deployed model, cleaning up its associated resources both locally and in the cloud. The user will be provided with a list of the deployed models to select for deletion.  
* `nimbusCLI destroy`: Completely removes all deployed models and the core Nimbus infrastructure (including the API Gateway) from the user’s AWS account, also clearing the user’s local state.  
* `nimbusCLI ui`: Starts a local web server and opens a browser tab displaying the Nimbus Playground for viewing deployed models and testing their endpoints. This allows users to test their models endpoints before they place their endpoints in production. Within this playground, the user can see all of the deployed models, and can interact with the corresponding endpoints seamlessly upon selection.

## Deploying a Model

As our hypothetical user has no models deployed yet, they will want to begin by deploying a model. To deploy a model, the user will run `nimbusCLI deploy`.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/FinalModelDeployment.gif"
      alt="nimbus deploy clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

The CLI uses interactive prompts in order to gather the details necessary for deployment, namely:

* The type of model (‘pre-trained’ or ‘fine-tuned’);  
* A unique name for the deployed model;  
* The source (either a pre-trained model identifier or the local path to the user’s model directory; and  
* An optional description.

Upon successful completion of the deployment, Nimbus displays a confirmation and provides the unique HTTPS URL of the model's prediction endpoint, obtained from the CDK deployment outputs, and the API Gateway key needed to access the models.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/deployedEndpoint.png"
      alt="deployed endpoint clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

The user is then free to immediately use the endpoint URL to send prediction requests

## Listing Models in Deployment

Once a model is deployed, the user can verify the deployment status using `nimbusCLI list`, which displays a list of their deployed models, including the name, description, and endpoint for each model.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/FinalList.gif"
      alt="list clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

 

## Interacting with Models via the Nimbus Playground

Alternatively, the user can visualize and test their recently deployed model(s) through the web dashboard launched by `nimbusCLI ui`. Upon entering this command, the Nimbus Playground will be opened on the user’s default browser automatically.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/OpenUI.gif"
      alt="open UI clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

In the **Nimbus Playground**, the user can test their deployed models and send requests. For example, if the user has 2 models deployed, they can access and send requests to either model easily. 


<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/UIModelQuery.gif"
      alt="interact with UI clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>

## Deleting a Model

When no longer needed in production, individual models can be removed using `nimbusCLI delete`. Upon executing this command. The user will be shown a list of the deployed models, from which they can select the model they wish to be removed from deployment.

<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/deletemodel.gif"
      alt="delete model clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>


## Tearing Down Deployment Infrastructure

Should the user wish to tear down their entire infrastructure, including the API Gateway and all deployed models , they can do this using `nimbusCLI destroy`. 



<figure>
  <div className="w-full sm:w-[80%] md:w-[60%] block">
    <img
      src="/img/gifs/Destroy.gif"
      alt="teardown clip"
      className="align-top object-contain border-2 rounded-[20px] shadow-[0_0_20px_#AA8976] border-[#E5E7EB]"
    />
  </div>
</figure>