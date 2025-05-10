resource "aws_ecr_repository" "mastra" {
  name                 = var.repository_prefix
  image_tag_mutability = var.image_tag_mutability
  force_delete         = true

  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = var.scan_on_push
  }

  tags = {
    Name        = var.repository_prefix
    Environment = var.environment
    Project     = var.project
    Owner       = var.owner
  }
}
