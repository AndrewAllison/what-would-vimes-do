variable "repository_prefix" {
  description = "Prefix for naming the ECR repository"
  type        = string
}

variable "environment" {
  description = "Environment label (e.g., dev, prod)"
  type        = string
}

variable "project" {
  description = "Project name"
  type        = string
}

variable "owner" {
  description = "Owner of the infrastructure"
  type        = string
}

variable "image_tag_mutability" {
  description = "The tag mutability setting for the repository"
  type        = string
  default     = "MUTABLE"
}

variable "scan_on_push" {
  description = "Indicates whether images are scanned after being pushed"
  type        = bool
  default     = true
}
