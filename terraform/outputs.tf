output "public_ip" {
  description = "Public IP address of the Lightsail instance"
  value       = aws_lightsail_instance.course_tracker.public_ip_address
}
