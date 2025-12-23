# Hand & Foot Application

This is a private repo for the [Hand & Foot application](https://handandfoot.app) created and maintained with ❤️ by Michael Richins.

## Development

### `.env.local` Example

You have to create a `.env.local` file that will never be checked into source control.

```bash
# Public environment variables
PUBLIC_SUPABASE_URL="{SUPABASE_URL}"
PUBLIC_SUPABASE_API_KEY="{SUPABASE_ANON_KEY}"

# Private environment variables
PRIVATE_SUPABASE_DB_PASSWORD="{SUPABASE_DB_PASSWORD}"
```

The values are also stored in 1Password under `developer > environments`.

### Creating Certificates

You need to create some certificates so that development can run on HTTPS.

`npm run certs:install`: Installs the certificates using [mkcert](https://mkcert.org/) and via [homebrew](https://brew.sh/). You may need to give execution operation to the [create-certs.sh](file://./.dev/create-certs.sh) and [check-certs.sh](file://./.dev/check-certs.sh) files so that NPM can execute them properly. You can achieve this by running `chmod +x ./.dev/create-certs.sh ./.dev/check-certs.sh`.

### Trusting Certificates

#### Omarchy

Follow the steps outlines on the [Arch Wiki](https://wiki.archlinux.org/title/User:Grawity/Adding_a_trusted_CA_certificate).

- Copy the the public certificate to the appropriate file location as root
  - `sudo cp ./.dev/certs/dev.handandfoot.pem /etc/ca-certificates/trust-source/anchors/`
- Run update as root
  - `update-ca-trust`
- Start dev server

### NPM Scripts

`npm run dev`: Starts the dev server [locally](https://localhost:5173/).

### Users

You can create your own user via the [Supabase dashboard](https://supabase.com/dashboard/project/odmtnqdhylkhgirjhlyp/auth/users) or through the [UI](https://localhost:5173/register)

## Notes

Find the rules on Bicycle Cards [website](https://bicyclecards.com/how-to-play/hand-and-foot).
