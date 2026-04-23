# Setting up a Lightsail VM with Terraform

This configuration provisions an Amazon Lightsail instance to host the College Course Tracker. It spins up a small server in `us-east-2` running Amazon Linux 2023.

### What you get
*   **OS:** Amazon Linux 2023 (`amazon_linux_2023`)
*   **Hardware:** The `micro_3_0` bundle (1 GB RAM, 2 vCPUs)
*   **Storage:** ~40 GB SSD

### Before you start
Make sure your environment is ready:
1.  **Terraform:** Version 1.0 or higher installed.
2.  **AWS Credentials:** The AWS CLI must be configured with a user that has Lightsail permissions (`aws configure`).
3.  **SSH Key:** You must import your public key into the Lightsail console *before* running Terraform. It needs to be named `id_ed25519`.

Import your key using this command (replace the path if yours is different):
```bash
aws lightsail import-key-pair \
  --key-pair-name id_ed25519 \
  --public-key-base64 "$(base64 < ~/.ssh/id_ed25519.pub)" \
  --region us-east-2
```

### Running it
Once your environment is set up, run these commands from the `terraform/` directory:

```bash
cd terraform

# 1. Download the provider plugins
terraform init

# 2. See what Terraform plans to build (optional but recommended)
terraform plan

# 3. Build the server (~30 seconds)
terraform apply

# 4. Grab the IP address so you can access it
terraform output public_ip
```

### Configuration
The script uses sensible defaults found in `terraform.tfvars`. You can edit that file directly, or override specific settings using `-var` flags.

*   **Region:** `us-east-2` (Default)
*   **Instance Name:** `course-tracker`

### Accessing the server
Once Terraform finishes, SSH into your new instance:

```bash
ssh -i ~/.ssh/id_ed25519 ec2-user@<YOUR_INSTANCE_IP>
```

### Cleanup
When you're done and want to stop the billing, destroy the resources:

```bash
terraform destroy
```
