---
id: futureWorkd
sidebar_label: 6. Future Work
sidebar_position: 6
---

# Future Work

The current Nimbus implementation provides a focused solution for deploying specific types of NLP models to AWS serverless infrastructure. Based on this existing foundation, several technical directions could be explored to extend its functionality and address potential limitations.

## Expanded Model Compatibility


<figure>
  <img src="/img/extentions.png" className="image" alt="Multiple model types image" width="70%"/>
</figure>


To expand Nimbus's utility beyond its current spaCy focus, future work could include support for a wider variety of popular NLP and ML models. This would involve enhancing Nimbus to handle different libraries, runtimes, and serialization formats. Key areas for expanded compatibility include:

* **Hugging Face `transformers`:** Supporting deployment of readily available pre-trained or fine-tuned models, especially focusing on efficient and task-specific architectures suitable for serverless deployment.  
* **Scikit-learn Models:** Enabling users to deploy models built with Scikit-learn, commonly used for efficient text classification, clustering, and feature extraction (often saved as `.pkl`).  
* **Custom TensorFlow Models:** Allowing deployment of user-trained NLP models developed using TensorFlow (typically saved in SavedModel `.pb` format).  
* **Custom PyTorch Models:** Providing support for deploying user-trained NLP models developed using PyTorch (usually saved as `.pt` files).  
* **ONNX Models:** Accommodating models converted to the Open Neural Network Exchange (`.onnx`) format, which can offer performance benefits and framework interoperability.  
* **Generic Serialized Objects (`.pkl`):** Supporting models or pipelines saved using Python's pickle format, common for Scikit-learn but also potentially used for other custom Python objects (while acknowledging standard security/compatibility considerations).

Supporting these diverse model types would necessitate implementing flexible runtime environments within Nimbus (e.g., via adaptable Docker images and build strategies) capable of handling varied dependencies and loading multiple model formats.

## Function-Specific Endpoints


<figure>
  <img src="/img/futureWork.png" className="image" alt="multiple endpoints image" width="70%"/>
</figure>


Expanding Nimbus to support multiple, function-specific endpoints in a single deployment would empower users to expose discrete model operations, rather than the monolithic `/predict` route. For example, one might deploy distinct paths such as `/ner` for named‑entity recognition or `/tokenize` for preprocessing, allowing users to invoke only the pipeline component they need. By scoping each endpoint to a specific Lambda handler, one can minimize HTTP payloads and latency, since requests and responses carry only the relevant data.

From an implementation standpoint, this will require:

* **CDK Enhancements:** Register additional HTTP routes and integrate them with their corresponding Lambda functions.  
* **CLI Extensions:** Provide commands for users to define and annotate custom endpoints in their local state file.  
* **Handler Refactoring:** Modularize pipeline components into standalone functions that can be invoked independently.

Together, these changes would give teams finer‑grained control over their deployed models, improve performance for high‑throughput use cases, and pave the way for richer model‑service architectures in Nimbus.