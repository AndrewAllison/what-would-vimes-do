resource "aws_iam_role" "ecs_task_execution" {
	name = var.execution_role_name
	
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
