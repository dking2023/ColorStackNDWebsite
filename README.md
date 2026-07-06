# ColorStack at Notre Dame — Chapter Website

A fast, no-build-step website for the ColorStack ND chapter. No installs, no
frameworks, no `npm` — just open it in a browser.

## How to view the site

1. Unzip this folder anywhere on your computer.
2. Double-click **index.html**.

That's it. It opens in your browser like any web page.

## How to update the board / member roster

Open **`js/members.js`** in any text editor (Notepad, TextEdit, VS Code).
Every person is one block that looks like this:

```js
{
  name: "First Last",
  role: "Member",
  email: "netid@nd.edu",
  year: "Class of 2029",   // optional
  major: "Computer Science", // optional
  photo: "",               // optional — see below
},
```

- **Add someone:** copy a block, paste it, change the details.
- **Remove someone:** delete their block.
- **New school year:** change `BOARD_YEAR` at the top of the file.
- General (non-board) members go in the `GENERAL_MEMBERS` list at the bottom.

Save the file and refresh the page — the roster updates automatically.

## How to add a member photo

1. Drop the photo into the **`images/`** folder. Square photos look best
   (crop to a square first if you can). Name it something simple like
   `first-last.jpg` — lowercase, no spaces.
2. In `js/members.js`, set that person's photo line:
   `photo: "images/first-last.jpg",`
3. Refresh the page.

Members without a photo automatically get a colored monogram with their
initials, so it's fine to add photos gradually.

**Tip:** keep photos under ~300 KB each so the page stays fast. Free tools
like squoosh.app resize and compress in the browser.

## Files in this project

| File / folder    | What it is                                              |
| ---------------- | ------------------------------------------------------- |
| `index.html`     | Home page                                                |
| `board.html`     | Board + member directory (renders from `js/members.js`)  |
| `events.html`    | Recurring events (evergreen — no dates to go stale)       |
| `contact.html`   | Contact routes by board role                              |
| `js/members.js`  | **The roster. This is the file you'll edit most.**        |
| `js/site.js`     | Site behavior (mobile menu, roster rendering) — no need to touch |
| `css/style.css`  | All styling — ND brand colors are variables at the top    |
| `images/`        | Logo, group photos, member headshots                      |

## Publishing the site (when you're ready)

Because there's no build step, this deploys anywhere in minutes:

- **GitHub Pages** (free): push this folder to a GitHub repo → Settings →
  Pages → deploy from the main branch. Done.
- **Netlify / Vercel** (free): drag-and-drop the folder onto their dashboard.

## Notes

- Text content (mission blurbs, event descriptions) lives directly in each
  `.html` file — edit with any text editor.
- Event dates are intentionally not hardcoded; the events page describes the
  recurring lineup and points to Instagram for current dates, so the site
  never shows stale information.
- Contact is intentionally email-based (mailto links) rather than a web form —
  a form needs a server or third-party service to actually deliver messages.
  If you want a real form later, formspree.io or Google Forms embed are easy
  additions.
