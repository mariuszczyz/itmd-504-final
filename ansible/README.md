# Ansible Playbook — Course Tracker

Provisions an AWS EC2 instance with all dependencies and services required to run the Course Tracker application.

`site.yml` playbook file tasks names are self-documented and very easy to follow and understand what they do.

## What it does

- Installs all prerequisite packages
- Enables and starts `nginx` and `mariadb`
- Creates the `course_tracker` database and `tracker` MySQL user
- Deploys the `course-tracker.service` systemd unit and starts it
- Writes the nginx virtual host config to `/etc/nginx/conf.d/course-tracker.conf`

## Prerequisites

- Ansible installed locally (`pip install ansible`)
- SSH key at `~/.ssh/id_ed25519` with access to the EC2 instance # The same key used when creating the VM instance
- The target host defined in `inventory.ini` # Replace the public IP address

## Usage

```bash
ansible-playbook -i inventory.ini site.yml -e db_password=<your-password>
```

Replace `<your-password>` with the password to set for the `tracker` database user. This value is required.

## Inventory

The default inventory file `inventory.ini` targets the host group `course-tracker`. Update the IP address there if the EC2 instance changes.

## Variables

| Variable | Required | Description |
|---|---|---|
| `db_password` | Yes | Password for the `tracker` MySQL user |
