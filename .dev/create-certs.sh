#!/bin/bash

set -e

CERT_STORE=.dev/certs
KEY_FILE=./$CERT_STORE/dev.handandfoot-key.pem
CERT_FILE=./$CERT_STORE/dev.handandfoot.pem

# Check if both files DO NOT exist
if [ ! -f "$KEY_FILE" ] && [ ! -f "$CERT_FILE" ]; then
  brew install mkcert nss --force && true
  mkcert -install
  mkdir -p $CERT_STORE
  mkcert -key-file "$KEY_FILE" -cert-file "$CERT_FILE" dev.handandfoot.com dev-api.handandfoot.com localhost 127.0.0.1 ::1
fi