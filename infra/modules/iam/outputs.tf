output "execution_role_arn" {
  description = "The ARN of the ECS task execution role"
  value       = aws_iam_role.ecs_task_execution.arn
}

output "execution_role_name" {
  description = "The name of the ECS task execution role"
  value       = aws_iam_role.ecs_task_execution.name
}
