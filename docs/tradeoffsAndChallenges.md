---
id: tradeoffs
sidebar_label: 5. Trade-offs & Challenges
sidebar_position: 5
---

# Trade-offs and Challenges

## Container Hosting on EC2/Fargate vs. Dockerized Lambda

Selecting the appropriate compute layer for model inference was a critical architectural decision for Nimbus, balancing scalability, cost, and operational simplicity. The team evaluated options ranging from traditional container hosting to fully serverless functions, ultimately comparing two primary serverless strategies: **AWS Elastic Container Service (ECS) with Fargate** and **Dockerized AWS Lambda** functions.

### ECS with Fargate

Using **ECS with Fargate** offers a serverless compute engine for containers, removing the need to manage underlying EC2 instances directly. This approach provides a familiar container-based workflow, potentially appealing to teams with existing containerization experience. Its advantages include greater flexibility than Lambda in terms of maximum execution duration and more traditional networking configurations.

However, for Nimbus's specific goals, several drawbacks were identified. Fargate still necessitates managing ECS task definitions and services, introducing a layer of **orchestration overhead** that contrasts with Nimbus's aim for maximum simplicity. Furthermore, its pricing model (per vCPU/memory per second, often with minimum durations) could prove less cost-effective than Lambda for the highly **intermittent, low-traffic workloads** anticipated for Nimbus users, potentially incurring costs even during **idle periods**.

<figure>
  <img src="/img/ecsFargatevsLambda.png" className="image" alt="image" width="70%"/>
</figure>

### Dockerized AWS Lambda

The team ultimately selected **Dockerized AWS Lambda** as the compute layer, determining it aligned most strongly with Nimbus’s core goals of maximizing **simplicity** and **cost-efficiency** for users deploying lightweight models. As a fully managed function-as-a-service platform, Lambda entirely abstracts away server and orchestration concerns.

The key advantages driving this decision were Lambda's **automatic scaling** based on demand (from zero upwards), its true **pay-per-invocation cost model** (billed per millisecond, ideal for intermittent traffic), and the elimination of infrastructure management. Crucially, Lambda's support for **Docker container images** allows users to reliably package complex Python dependencies (like spaCy) using familiar tooling, overcoming traditional deployment package limitations. Additionally, the **seamless integration** with API Gateway, provisioned via Nimbus's AWS CDK stack, simplifies exposing models as secure HTTP endpoints.

This choice required accepting certain **trade-offs** inherent to Lambda. These include the 15-minute maximum execution duration, memory limits (up to 10GB), lack of direct GPU access, and the potential for **cold start latency** on infrequent invocations.

<figure>
  <img src="/img/dockerizedLambda.png" className="image" alt="dockerized lambda image" width="70%"/>
</figure>

### Justification for Choosing Lambda

After evaluating both options, the Dockerized Lambda approach was chosen because its benefits directly addressed Nimbus's primary objectives, while its limitations were considered acceptable for the target use case. The significant reduction in operational overhead, the cost model optimized for sporadic usage, and the ease of packaging complex dependencies via Docker outweighed the constraints on execution time and resources. While Fargate offered more flexibility in some areas, its orchestration requirements and less granular pricing model presented potential barriers to the simplicity and cost-effectiveness Nimbus aims to provide. Therefore, Lambda provided the optimal balance, best embodying Nimbus's value proposition of abstraction and simplicity for individual developers and small teams deploying task-specific NLP models.

<figure>
  <img src="/img/LambdaFargateComparison.png" className="image" alt="lambda vs fargate image" width="70%"/>
</figure>

## AWS CDK vs. AWS SDK

The team also evaluated how Nimbus would define and manage cloud infrastructure, including API Gateway and Lambda functions. The choice lay between direct interaction via the **AWS SDK (Software Development Kit)** and a higher-level abstraction using the **AWS CDK (Cloud Development Kit)**.

<figure>
  <img src="/img/cdkVsSdk.png" className="image" alt="cdk vs sdk image" width="70%"/>
</figure>

### AWS SDK

Using the AWS SDK would involve making direct API calls to AWS services. This **imperative approach** could potentially allow for faster initial infrastructure provisioning times, as resources are created immediately via API interactions without an intermediate synthesis step. This was confirmed during the creation of a prototype utilizing the SDK for our infrastructure management, where we did see faster provisioning, often with deployment occurring in under a minute.

This method, however, presented significant drawbacks that were misaligned with Nimbus's goals. For example, using the SDK would require **manual management** of resource creation, tracking, and updates. Of particular importance, the absence of state tracking could result in deployments facing a high risk of infrastructure misalignment where the actual infrastructure could easily become inconsistent with the intended configuration, especially across multiple updates. This lack of state management would hinder reliability and repeatability.

<figure>
  <img src="/img/sdkToAWS.png" className="image" alt=" sdk image" width="70%"/>
</figure>

### AWS CDK

Our team ultimately chose to adopt the **AWS Cloud Development Kit (CDK)** as the standard for infrastructure provisioning. This decision prioritized long-term maintainability, reliability, and a better developer experience for managing cloud resources.

The CDK facilitates a **declarative Infrastructure as Code (IaC)** approach, synthesizing code into AWS CloudFormation templates while providing **reliable state management** and ensuring repeatable deployments with safer updates. Furthermore, its **integrated deployment flow** fits naturally into Nimbus’s CLI-driven workflow, offering safeguards like dependency resolution and automated rollback mechanisms. Finally, using CDK or other IaC tools are considered best-practice when provisioning AWS-specific infrastructure. Deployment times using the CDK generally occur within minutes.

<figure>
  <img src="/img/CDKtoAWS.png" className="image" alt="CDK image" width="70%"/>
</figure>

### Justification for Choosing CDK

Although using CDK introduces a slightly longer initial deployment time due to the CloudFormation synthesis step, compared to direct SDK calls, this trade-off was deemed acceptable. The CDK’s declarative, idempotent infrastructure model ensures that repeated deployments always converge to the same final state, minimizing the risk of drift or inconsistent environments. This, combined with robust state management, improved maintainability, and a developer-friendly abstraction, outweighs the minor speed difference. These features directly benefit Nimbus’s target audience by ensuring infrastructure predictability and consistency, while reducing the burden of manual cloud resource management, fitting perfectly with the project’s emphasis on simplicity, and repeatability.

## State Management: Local vs Cloud

Managing deployment state was another key architectural decision; specifically, we needed to decide how Nimbus would keep track of which models were deployed and their associated metadata (like model types, descriptions and endpoints). Two main approaches were evaluated: using a cloud-based database or a local configuration file.

<figure>
  <img src="/img/localStorageVsCloud.png" className="image" alt="loacal storage vs cloud image" width="70%"/>
</figure>

### Cloud-Based State Management

Using a cloud-backed datastore like AWS DynamoDB for tracking deployment state offered potential advantages, particularly for larger-scale scenarios:

- **Scalability:** Cloud databases are designed to handle growth, making them suitable for large teams or applications with many concurrent users managing deployments.
- **Shared Visibility:** A centralized cloud database provides a single source of truth, allowing team-wide visibility into the current deployment status and facilitating collaboration in deployments.

This approach, however, was not utilized for Nimbus due to several factors that conflicted with its core design principles:

- **Added Complexity:** Implementing cloud-based state management would introduce additional overhead. This includes setting up and managing cloud resources, handling potential state synchronization issues between local actions and the cloud state, and managing the cloud-side logic itself.
- **Extra Cost:** Leveraging cloud services incurs ongoing operational costs for storage, read/write operations, and potentially data transfer. Even if not significant, this still adds a financial burden that is unnecessary for Nimbus's target use case.

### Local Configuration File

Nimbus adopted a simpler approach, utilizing a local configuration file named models.json stored within the user's local artifact directory to maintain deployment state. This method was selected based on its alignment with Nimbus's goals:

- **Simplicity:** A local JSON file is easy for developers to understand, inspect, and edit if necessary. The structure is simple, and therefore the learning curve is not steep.
- **Minimal Operational Burden:** As stated above, this approach avoids the need to provision, configure, or pay for external cloud infrastructure solely for state tracking.

This local file strategy operates under the reasonable assumption that for Nimbus's primary user base (individual developers or small teams), the same person or group training a model is also responsible for deploying it. Therefore, the need for centralized, real-time state synchronization is less critical than simplicity and cost-effectiveness.

<figure>
  <img src="/img/LocalFileStorage.png" className="image" alt="loacal file storage image" width="70%"/>
</figure>
