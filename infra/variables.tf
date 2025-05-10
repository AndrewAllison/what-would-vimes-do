variable "openai_api_key" {
  description = "OpenAI API Key"
  type        = string
  sensitive   = true
}

variable "aws_region" {
  description = "The AWS region to deploy to"
  type        = string
}

variable "aws_profile" {
  description = "The AWS CLI profile to use"
  type        = string
}

variable "environment" {
  description = "The environment to deploy to (e.g., dev, prod)"
  type        = string
}

variable "repository_name" {
  description = "The name of the ECR repository"
  type        = string
}

variable "project" {
  description = "Project name or identifier"
  type        = string
}

variable "owner" {
  description = "Who owns or maintains this project"
  type        = string
}
