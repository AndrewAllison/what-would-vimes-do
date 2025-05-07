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
