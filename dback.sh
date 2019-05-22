#!/bin/bash
pg_dump -U postgres apgclination > /var/www/html/clination/storage/app/backup-temp/temp/db-dumps/apgclination.backup
