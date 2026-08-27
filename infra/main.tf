terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Example EKS cluster resource for AgentKart
# (In a real implementation, use the terraform-aws-modules/eks/aws module)
resource "aws_eks_cluster" "agentkart_cluster" {
  name     = "agentkart-cluster-${var.environment}"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }
}

resource "aws_iam_role" "eks_cluster_role" {
  name = "agentkart-eks-cluster-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "eks.amazonaws.com"
        }
      }
    ]
  })
}

# PostgreSQL Database (RDS)
resource "aws_db_instance" "agentkart_postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  db_name              = "agentkart"
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
}

# Redis (ElastiCache)
resource "aws_elasticache_cluster" "agentkart_redis" {
  cluster_id           = "agentkart-redis-${var.environment}"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
}

# S3 Bucket for artifacts
resource "aws_s3_bucket" "agentkart_artifacts" {
  bucket = "agentkart-artifacts-${var.environment}"
}
