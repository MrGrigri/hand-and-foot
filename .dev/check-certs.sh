#!/bin/bash

CERT_STORE=.dev/certs
KEY_FILE=./$CERT_STORE/dev.handandfoot-key.pem
CERT_FILE=./$CERT_STORE/dev.handandfoot.pem

# Check if both files DO NOT exist
if [ ! -f "$KEY_FILE" ] && [ ! -f "$CERT_FILE" ]; then
  echo "Error: Key file ($KEY_FILE) and certificate file ($CERT_FILE) not found." >&2
  exit 2
# Check if at least one file is missing
elif [ ! -f "$KEY_FILE" ] || [ ! -f "$CERT_FILE" ]; then
  echo "Error: One or both files are missing." >&2
  exit 2
# If both files exist
else
  echo "Success: Both certificate files exist."
  exit 0
fi