output "security_group_id" {
  description = "The ID of the security group created for ECS"
  value       = aws_security_group.ecs_tasks.id
}
