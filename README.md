# Mini Message Board

A tiny Express + EJS message board. Post and read messages.

## Tech stack

- Express
- PostgreSQL via pg
- express-validator for data validation
- EJS
- Vanilla CSS

## Getting started (development)

1. Set up a local PostgreSQL database and add its connection string to a `.env` file:

```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

2. Seed the database (creates the `messages` table and adds a few starter messages):

```bash
   node db/populatedb.js "<DATABASE_URL>"
```

3. Install dependencies and start the server:

```bash
   npm install
   npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Production

Server is hosted on Render

- Start command: `node app.js`
- Environment variables: DATABASE_URL

Database is hosted on Neon

- During set up ran `node db/populatedb.js "<DATABASE_URL>"` to create/seed the messages table

## Project structure

```
├── app.js                      # Express app setup and route mounting
├── controllers/
│   ├── indexController.js      # Renders the message list
│   └── messageController.js    # Validates, renders, and creates messages
├── db/
│   ├── pool.js                 # PostgreSQL connection pool
│   ├── queries.js              # SQL queries (get all, get by id, insert)
│   └── populatedb.js           # One-off script to create/seed the messages table
├── routes/
│   ├── indexRouter.js          # GET /
│   ├── newMessageRouter.js     # GET & POST /new
│   └── messageRouter.js        # GET /message/:id
├── views/
│   ├── partials/
│   │   ├── header.ejs          # opens <html>, <head>, opens <body>, site header, opens <main>
│   │   └── footer.ejs          # closes <main>, site footer, closes </body> and </html>
│   │   └── errors.ejs          # Renders a list of validation error messages, if any
│   ├── index.ejs               # Message list / home page
│   ├── message.ejs             # Single message detail page
│   ├── form.ejs                # New message form
│   ├── 404.ejs                 # Not found page
│   └── 500.ejs                 # Server error page
└── public/
    └── styles.css              # All site styling
```

## Data & validation

Messages are stored in a PostgreSQL `messages` table (`id`, `name`, `message`, `created_at`), set up by `db/populatedb.js` and queried through `db/queries.js`.

Submissions to `/new` are validated with express-validator before being saved:

- **Name** — required, alphabetic characters only, 1–32 characters
- **Message** — required, up to 200 characters
  If validation fails, the form re-renders with the submitted values kept in place and the relevant error messages listed above the fields (see `views/partials/errors.ejs`).

## Design

**Palette**

| Color     | Hex       | Used for                         |
| --------- | --------- | -------------------------------- |
| Ink Black | `#0D1821` | Body text, headings              |
| Yale Blue | `#344966` | Links, secondary accents, footer |
| Blush Pop | `#E6AACE` | Header, primary buttons/accents  |
| Porcelain | `#F0F4EF` | Page background                  |
| Dry Sage  | `#BFCC94` | Secondary accent, empty states   |

Form validation errors use a dedicated `--error` color (a deep berry tone) rather than a generic red, to stay in harmony with the rest of the palette.

**Type**

- Display: [Fraunces](https://fonts.google.com/specimen/Fraunces) (italic) for headings
- Body: [Quicksand](https://fonts.google.com/specimen/Quicksand) for everything else

**Cute details:** each message card has a small rotated "washi tape" tab with a Material Design icon (heart, flower, or star, cycling per message), and the header/footer are trimmed with a scalloped SVG edge instead of a straight line.

All colors, fonts, and spacing are defined as CSS custom properties at the top of `public/styles.css`

## Notes

- Data is now persisted in PostgreSQL rather than in memory, so messages survive server restarts.
- Fonts (Fraunces, Quicksand) load from Google Fonts, and icons load from the jsDelivr-hosted MDI font. Both linked in `views/partials/header.ejs`
- To browse or look up icon names, use the [Pictogrammers MDI library](https://pictogrammers.com/library/mdi/) — it's just a reference site, not something the app loads from directly.
