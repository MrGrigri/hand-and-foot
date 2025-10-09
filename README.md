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

### NPM Scripts

`npm run dev`: Starts the dev server [locally](http://localhost:5173/).

### Users

You can create your own user via the [Supabase dashboard](https://supabase.com/dashboard/project/odmtnqdhylkhgirjhlyp/auth/users) or through the [UI](http://localhost:5173/register)

## Notes

Find the rules on Bicycle Cards [website](https://bicyclecards.com/how-to-play/hand-and-foot).
