variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name (e.g. dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "subnet_ids" {
  description = "List of subnet IDs for EKS"
  type        = list(string)
  default     = ["subnet-12345", "subnet-67890"]
}

variable "db_username" {
  description = "Database admin username"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "Database admin password"
  type        = string
  sensitive   = true
  default     = "password"
}
