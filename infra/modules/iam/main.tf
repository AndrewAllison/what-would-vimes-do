resource "aws_iam_role" "ecs_task_execution" {
	name = "${var.project}-${var.environment}-ecs-task-execution-role"

	tags = {
		Name        = "${var.project}-${var.environment}-ecs-task-execution-role"
		Environment = var.environment
		Project     = var.project
	}

	assume_role_policy = jsonencode({
		Version = "2012-10-17",
		Statement = [
			{
				Action = "sts:AssumeRole",
				Principal = {
					Service = "ecs-tasks.amazonaws.com"
				},
				Effect = "Allow",
				Sid    = ""
			}
		]
	})
}

resource "aws_iam_role_policy_attachment" "ecs_execution_policy" {
	role       = aws_iam_role.ecs_task_execution.name
	policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
