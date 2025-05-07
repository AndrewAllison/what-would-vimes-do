variable "execution_role_name" {
  description = "Name of the ECS task execution role"
  type        = string
  default     = "ecsTaskExecutionRole"
}

variable "project" {
  description = "Project name or identifier"
  type        = string
}

variable "environment" {
  description = "Environment (e.g., dev, staging, prod)"
  type        = string
}
