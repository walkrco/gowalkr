# =============================================================================
# DynamoDB Table - Workouts Storage
# =============================================================================

# DynamoDB table for storing workout data
resource "aws_dynamodb_table" "workouts" {
  name         = "${var.app_name}-workouts"
  billing_mode = "PAY_PER_REQUEST" # On-demand billing for variable workloads
  hash_key     = "pk"              # Partition key
  range_key    = "sk"              # Sort key

  # Primary key attributes
  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

  # Global secondary index attributes
  attribute {
    name = "goal"
    type = "S"
  }

  attribute {
    name = "equipment"
    type = "S"
  }

  # GSI for querying workouts by goal and equipment
  global_secondary_index {
    name            = "goal-equipment-index"
    hash_key        = "goal"
    range_key       = "equipment"
    projection_type = "ALL" # Project all attributes
  }

  # Enable point-in-time recovery for data protection
  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Name = "${var.app_name}-workouts"
  }
}