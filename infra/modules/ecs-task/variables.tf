variable "project" {
  type = string
}

variable "environment" {
  type = string
}

variable "execution_role_arn" {
  type = string
}

variable "ecr_repo_url" {
  type = string
}

variable "container_name" {
  type    = string
  default = "mastra-api"
}

variable "container_port" {
  type    = number
  default = 4111
}

variable "cpu" {
  type    = string
  default = "256"
}

variable "memory" {
  type    = string
  default = "512"
}

variable "openai_api_key" {
  type      = string
  sensitive = true
}
