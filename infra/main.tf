module "s3" {
  source        = "./modules/s3"
  bucket_prefix = var.project
  environment   = var.environment
  project       = var.project
  owner         = var.owner
}

module "ecr" {
  source             = "./modules/ecr"
  repository_prefix  = var.project
  environment        = var.environment
  project            = var.project
  owner              = var.owner
}

module "ecs_cluster" {
  source      = "./modules/ecs-cluster"
  project     = var.project
  environment = var.environment
}

module "iam" {
  source      = "./modules/iam"
  project     = var.project
  environment = var.environment
}

module "vpc" {
  source      = "./modules/vpc"
  aws_region  = var.aws_region
  environment = var.environment
  project     = var.project
}

module "ecs_sg" {
  source      = "./modules/security-group"
  vpc_id      = module.vpc.vpc_id
  project     = var.project
  environment = var.environment
}

module "ecs_task" {
  source = "./modules/ecs-task"

  project             = var.project
  environment         = var.environment
  execution_role_arn  = module.iam.execution_role_arn
  ecr_repo_url        = module.ecr.repository_url
  openai_api_key      = var.openai_api_key

  container_name  = "mastra-api"
  container_port  = 4111
  cpu             = "256"
  memory          = "512"
}

module "ecs_service" {
  source = "./modules/ecs-service"

  project                   = var.project
  environment               = var.environment
  ecs_cluster_id            = module.ecs_cluster.cluster_id
  task_definition_arn       = module.ecs_task.task_definition_arn
  task_definition_dependency = module.ecs_task
  subnet_ids                = module.vpc.public_subnet_ids
  security_group_id          = module.ecs_sg.security_group_id
}
