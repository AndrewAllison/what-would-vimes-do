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
