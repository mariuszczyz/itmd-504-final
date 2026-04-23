variable "aws_region" {
  description = "AWS region"
  default     = "us-east-2"
}

variable "availability_zone" {
  description = "Availability zone for the Lightsail instance"
  default     = "us-east-2a"
}

variable "instance_name" {
  description = "Name of the Lightsail instance"
  default     = "course-tracker"
}

variable "blueprint_id" {
  description = "OS blueprint for the instance"
  default     = "amazon_linux_2023"
}

variable "bundle_id" {
  description = "Lightsail bundle (1 GB RAM, 2 vCPU, 40 GB SSD)"
  default     = "micro_3_0"
}

variable "key_pair_name" {
  description = "SSH key pair name pre-imported into Lightsail"
  default     = "id_ed25519"
}
