resource "aws_ecs_cluster" "main" {
  name = "${var.project}-ecs-cluster"

  tags = {
    Name        = "${var.project}-ecs-cluster"
    Environment = var.environment
  }
}
