terraform {
  backend "s3" {
    bucket  = "gowalkr-state"
    key     = "terraform.tfstate"
    region  = "eu-west-2"
    encrypt = true
  }
}