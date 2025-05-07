resource "random_id" "suffix" {
	byte_length = 4
}

resource "aws_s3_bucket" "bucket" {
	bucket        = "${var.bucket_prefix}-app-${random_id.suffix.hex}"
	force_destroy = true

	tags = {
		Name        = "${var.bucket_prefix}-bucket"
		Environment = var.environment
		Project     = var.project
		Owner       = var.owner
	}
}

resource "aws_s3_bucket_versioning" "versioning" {
	bucket = aws_s3_bucket.bucket.id

	versioning_configuration {
		status = "Enabled"
	}
}

resource "aws_s3_bucket_public_access_block" "public_access" {
	bucket = aws_s3_bucket.bucket.id

	block_public_acls       = true
	block_public_policy     = true
	ignore_public_acls      = true
	restrict_public_buckets = true
}
