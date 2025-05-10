output "task_definition_arn" {
  value       = module.ecs_task.task_definition_arn
  description = "The ECS Task Definition ARN"
}
