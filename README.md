# SE-501 Frontend Web Development · lab files

Start files for the labs and homework of **SE-501 Frontend Web Development** (MUDT). One folder per session; a new folder appears before each session. Model solutions are not in this repository.

## Get the files (once)

```bash
cd ~/Development            # or wherever you keep your code
git clone https://github.com/sr-mudt/cm501-labs.git
cd cm501-labs
```

## Before every session

```bash
cd ~/Development/cm501-labs
git pull
```

**Do not work directly in this folder.** Copy the lab folder you need somewhere else (or into your project repository, if the lab says so) and work on the copy. Then `git pull` never runs into conflicts with your changes. If it does anyway: `git stash`, `git pull`, and your changes are in `git stash list`.

## Contents

| Session | Folder | What |
|:--:|------|------|
| 3 | `session-03/events-divsoup.html` | Lab D: "div soup" to repair with semantic HTML |
| 3 | `session-03/epa2-starter/` | EPA 2 starter kit: Campus Café menu and contact page (*before*) |
| 4 | `session-04/workshop-booking-broken.html` | Lab F: an inaccessible booking form |
| 4 | `session-04/project-starter/` | Lab G: HTML baseline for **your own project** (copy into your project repository) |
| 4 | `session-04/project-example/` | Lab G: a finished example baseline (fictional climbing club) |
| 4 | `session-04/webword-broken/` | Homework: repair the broken Webword page |
| 5 | `session-05/layout-lab/` | Labs H–J: Flexbox, Grid, responsive |
| 5 | `session-05/webword-board/` | Lab I bonus: the Webword board with Grid and Flexbox |
| 6 | `session-06/styleguide-template.html` | Lab K: template for your project's style guide (example: `styleguide-example.html`) |
| 6 | `session-06/tailwind-lab/` | Lab L: Tailwind CSS v4 (`npm install`, then `npm run dev`) |

## Related

- Campus Café demo (*before* / *after*): https://sr-mudt.github.io/campus-cafe-demo/ · repo `sr-mudt/campus-cafe-demo`
- Webword, our running game example: https://sr-mudt.github.io/webword/ · repo `sr-mudt/webword`

Webword's word list for allowed guesses: *an-array-of-english-words* (MIT). Everything else © Sabine Rathmayer, MUDT, for teaching use in SE-501.
