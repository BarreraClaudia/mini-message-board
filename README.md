# Mini Message Board

A tiny Express + EJS message board. Post and read messages.

## Tech stack

- Express
- EJS
- Vanilla CSS
- [Material Design Icons](https://pictogrammers.com/library/mdi/) via [jsDelivr CDN](https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css)
- In-memory data store (messages reset when the server restarts)

## Getting started

```bash
npm install
npm start
```

For auto-restart on file changes during development:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## Project structure

```
├── app.js                      # Express app setup and route mounting
├── controllers/
│   ├── indexController.js      # Renders the message list
│   └── messageController.js    # Renders/creates individual messages
├── models/
│   └── db.js                   # In-memory "database" of messages
├── routes/
│   ├── indexRouter.js          # GET /
│   ├── newMessageRouter.js     # GET & POST /new
│   └── messageRouter.js        # GET /message/:id
├── views/
│   ├── partials/
│   │   ├── header.ejs          # opens <html>, <head>, opens <body>, site header, opens <main>
│   │   └── footer.ejs          # closes <main>, site footer, closes </body> and </html>
│   ├── index.ejs               # Message list / home page
│   ├── message.ejs             # Single message detail page
│   ├── form.ejs                # New message form
│   ├── 404.ejs                 # Not found page
│   └── 500.ejs                 # Server error page
└── public/
    └── styles.css              # All site styling
```

## Design

**Palette**

| Color     | Hex       | Used for                         |
| --------- | --------- | -------------------------------- |
| Ink Black | `#0D1821` | Body text, headings              |
| Yale Blue | `#344966` | Links, secondary accents, footer |
| Blush Pop | `#E6AACE` | Header, primary buttons/accents  |
| Porcelain | `#F0F4EF` | Page background                  |
| Dry Sage  | `#BFCC94` | Secondary accent, empty states   |

**Type**

- Display: [Fraunces](https://fonts.google.com/specimen/Fraunces) (italic) for headings
- Body: [Quicksand](https://fonts.google.com/specimen/Quicksand) for everything else

**Cute details:** each message card has a small rotated "washi tape" tab with a Material Design icon (heart, flower, or star, cycling per message), and the header/footer are trimmed with a scalloped SVG edge instead of a straight line.

All colors, fonts, and spacing are defined as CSS custom properties at the top of `public/styles.css`

## Notes

- Messages are stored in memory (`models/db.js`) and will reset every time the server restarts. Swap in a real database to persist data.
- Fonts and icons load from Google Fonts and jsDelivr CDNs.
