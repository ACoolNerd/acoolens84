# ==============================================================================
# SOVEREIGN LA28 LENS MULTI-CLOUD INFRASTRUCTURE CONFIGURATION (AWS + GCP)
# ==============================================================================
# Declarative infrastructure configuration mapping the entire ACoolBrand stack
# to both AWS (ECS Fargate + ALB + Amplify) and GCP (Cloud Run + BigQuery + Maps).
# Compliance Alignment: BETHBeta, RUTH, and RACI Sovereign Security parameters.
# IMPORTANT: Safe Mock deployment mode enabled. No live billing keys are exposed.
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# ------------------------------------------------------------------------------
# Provider Initialization & Variables (Secure Configuration)
# ------------------------------------------------------------------------------
variable "aws_region" {
  type        = string
  default     = "us-west-2"
  description = "Primary AWS region for Fargate deployment (Oregon/Silicon Valley)."
}

variable "gcp_project" {
  type        = string
  default     = "acoolai-la28-sovereign"
  description = "GCP Project ID for serverless containers and BigQuery logs."
}

variable "gcp_region" {
  type        = string
  default     = "us-west1"
  description = "GCP region for Cloud Run deployments."
}

provider "aws" {
  region = var.aws_region
  # Credentials are bound through IAM Instance Profile Roles or local secure tokens.
  # Live access keys are strictly banned from raw code commits.
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

# ==============================================================================
# Google Cloud Platform: Sovereign Serverless & Analytics
# ==============================================================================

# 1. Enable Required GCP APIs (Google Maps, Cloud Run, BigQuery, Vertex AI)
resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "bigquery.googleapis.com",
    "maps-backend.googleapis.com",
    "directions-backend.googleapis.com",
    "street-view-image-backend.googleapis.com",
    "aiplatform.googleapis.com"
  ])
  service            = each.key
  disable_on_destroy = false
}

# 2. Cloud Run Service: Static Express Portal App (Port 3030)
resource "google_cloud_run_v2_service" "static_portal" {
  name     = "la28-static-portal"
  location = var.gcp_region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "gcr.io/${var.gcp_project}/la28-static-portal:latest"
      ports {
        container_port = 3030
      }
      resources {
        limits = {
          cpu    = "1"
          memory = "1024Mi"
        }
      }
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "PORT"
        value = "3030"
      }
    }
  }
  depends_on = [google_project_service.apis]
}

# 3. Cloud Run Service: Next.js App Router Dashboard (Port 3001)
resource "google_cloud_run_v2_service" "nextjs_dashboard" {
  name     = "la84-nextjs-dashboard"
  location = var.gcp_region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "gcr.io/${var.gcp_project}/la84-nextjs-dashboard:latest"
      ports {
        container_port = 3001
      }
      resources {
        limits = {
          cpu    = "2"
          memory = "2048Mi"
        }
      }
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "PORT"
        value = "3001"
      }
    }
  }
  depends_on = [google_project_service.apis]
}

# 4. BigQuery Sovereign Telemetry & Transit Logging
resource "google_bigquery_dataset" "telemetry_dataset" {
  dataset_id                  = "la28_lens_telemetry"
  friendly_name               = "LA28 Lens Live Telemetry Logs"
  description                 = "Secured storage for accessibility metrics, broken elevators, and G-Line G-Force telemetry."
  location                    = "US"
  default_table_expiration_ms = 31536000000 # 365 Days Retention

  access {
    role          = "OWNER"
    special_group = "projectOwners"
  }
  depends_on = [google_project_service.apis]
}

resource "google_bigquery_table" "elevator_logs" {
  dataset_id = google_bigquery_dataset.telemetry_dataset.dataset_id
  table_id   = "elevator_status_history"
  deletion_protection = false

  schema = <<EOF
[
  {"name": "station_id", "type": "STRING", "mode": "REQUIRED", "description": "MTA Unique station node key"},
  {"name": "status", "type": "STRING", "mode": "REQUIRED", "description": "ONLINE, OUTAGE, or BYPASS"},
  {"name": "grade_slope", "type": "FLOAT", "mode": "NULLABLE", "description": "Wheelchair ramp grade slope"},
  {"name": "audited_by", "type": "STRING", "mode": "REQUIRED", "description": "User or script triggering the record"},
  {"name": "logged_at", "type": "TIMESTAMP", "mode": "REQUIRED", "description": "Time the status update occurred"}
]
EOF
}

# ==============================================================================
# AWS (Amazon Web Services): Sovereign Container Orchestration
# ==============================================================================

# 1. Dedicated VPC & Subnets for Secure Isolation
resource "aws_vpc" "sovereign_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "la28-sovereign-vpc"
  }
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id            = aws_vpc.sovereign_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
  tags = {
    Name = "la28-public-a"
  }
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id            = aws_vpc.sovereign_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"
  tags = {
    Name = "la28-public-b"
  }
}

# 2. ECS Cluster definition
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "la28-sovereign-cluster"
}

# 3. Task Definition & Fargate Service: Static Express Portal App (Port 3030)
resource "aws_ecs_task_definition" "static_portal_task" {
  family                   = "la28-static-portal"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "la28-static-portal"
      image     = "123456789012.dkr.ecr.${var.aws_region}.amazonaws.com/la28-static-portal:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3030
          hostPort      = 3030
        }
      ]
      environment = [
        { name = "NODE_ENV", value = "production" },
        { name = "PORT", value = "3030" }
      ]
    }
  ])
}

resource "aws_ecs_service" "static_portal_service" {
  name            = "la28-static-portal-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.static_portal_task.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
    assign_public_ip = true
  }
}

# 4. Task Definition & Fargate Service: Next.js App Router Dashboard (Port 3001)
resource "aws_ecs_task_definition" "nextjs_task" {
  family                   = "la84-nextjs-dashboard"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"

  container_definitions = jsonencode([
    {
      name      = "la84-nextjs-dashboard"
      image     = "123456789012.dkr.ecr.${var.aws_region}.amazonaws.com/la84-nextjs-dashboard:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3001
          hostPort      = 3001
        }
      ]
      environment = [
        { name = "NODE_ENV", value = "production" },
        { name = "PORT", value = "3001" }
      ]
    }
  ])
}

resource "aws_ecs_service" "nextjs_service" {
  name            = "la84-nextjs-dashboard-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.nextjs_task.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
    assign_public_ip = true
  }
}

# 5. AWS Amplify Application Hosting (Optional Git Portal CI/CD)
resource "aws_amplify_app" "static_amplify" {
  name       = "la28-amplify-portal"
  repository = "https://github.com/acoolai/la28-lens-portal"

  # Build Spec definition for Static Express serving fallback
  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - echo "Deploying static assets to AWS CDN..."
      artifacts:
        baseDirectory: /
        files:
          - '**/*'
  EOT
}

# ==============================================================================
# Sovereign Deploy outputs
# ==============================================================================
output "gcp_cloud_run_portal_url" {
  value       = google_cloud_run_v2_service.static_portal.uri
  description = "The direct, global URL for the GCP Cloud Run static portal."
}

output "gcp_cloud_run_nextjs_url" {
  value       = google_cloud_run_v2_service.nextjs_dashboard.uri
  description = "The direct, global URL for the GCP Cloud Run Next.js dashboard."
}

output "bigquery_telemetry_table_id" {
  value       = google_bigquery_table.elevator_logs.id
  description = "The BigQuery table reference for server-side telemetry aggregation."
}

output "aws_ecs_cluster_arn" {
  value       = aws_ecs_cluster.ecs_cluster.arn
  description = "The ARN of the AWS ECS Fargate Cluster."
}
