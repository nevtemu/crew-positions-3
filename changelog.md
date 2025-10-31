# Changelog

## 20.12.2023

Added sections for upgrade prices and retail targets information. 
![Upgrade prices](screenshots/scr11.png)

---

## 22.12.2023

Added aircraft delivery date (in service since / age). Also VCM now has conditional formatting: red if negative.
![Aircraft age](screenshots/scr12.png)
Added settings to toggle on/off additional information.

---

## 16.03.2024

Shortened aircraft delivery date.

Project has grown large. Slitted into separate modules.

Added settings to toggle on/off additional information.

Added information for ramadan services.
![Ramadan information](screenshots/scr13.png)

---

## 17.03.2024

Added UL1A for B773 LRV. Lots of work: position, break and VCM changes.

Added link to change comment on crew portal.
![Comments](screenshots/scr14.png)

Added autocorrection of breaks, when positions changed manually.
![Breaks](screenshots/scr15.gif)

Added highlight for duplicated positions.
![Duplicates](screenshots/scr16.gif)

---

## 19.03.2024

Moved DF position to UL3 and MFP to UR3 (Initially my thought were to align with A380 2 class where UR3 is DF, but it make more sense to keep MFP on same side as CSV for service, and even on 2 class it is changed by company now).

---

## 09.04.2024

Moved most functions into separate modules.

Updated upgrade prices and retail targets.

Added links to station information.
![Station info](screenshots/scr17.png)

Fixed bug in breaks autocorrection and repeat highlights related to unbreakable spaces.

---

## 24.04.2024

Added MR4A for A380-800 2 class (Serve better changes)

Station information link now opens in new tab

Added registration EPP. Registration EUE, EUH, EUJ, EUK, EUL retrofitted into 4 class.

Fixed bug in load_positions function

---

## 29.04.2024

Fixed bug in positions for B777-300 (missing R2)

Changed source for flag icons. Added flag for Kosovo (missing on company's portal)

Changed inflight retail positions: B772 to R1, A380 to UL3 (Serve better changes)

---

## 02.05.2024

Minor change to timeInGrade check: for rare scenario when crew rostered out of grade but operates in his current grade

Added temporary rule for J galley operator to be most senior crew and remain galley on all sectors

---

## 21.05.2024

Added macOS/iOS version via Shortcuts. Had to change all data files and settings into .js format (from .json) as Safari does not support [import assertions](https://caniuse.com/mdn-javascript_statements_import_import_assertions "Import assertion browser support"). 

---

## 25.05.2024

Added settings to the app: now you are able to turn on/off features. Settings are now renamed to default settings.
![Destination experience](screenshots/sc8.png)

Moved more functions into separate modules.

Changed handler for destination experience: now for multisector trips destinations shown in list of experiences. Same destination experience is not repeated any more
![Destination experience](screenshots/sc6.png)

Fixed bug in extra rules function: forgot to import error handler.

Added shortcut file for MacOS version.

---

## 03.06.2024

Added link to app's source code
![App's source code](screenshots/sc10.png)

Fixed bag in add_registration_manually function

Added option to allocate breaks on selected sectors only. Required for trips mixed of short sectors/ shuttles and long sectors. Tooltip for checkboxes now shows individual sector duration.

Changed styles for trips table: VCM moved to the end of row (seems more logical), shortened headers and removed "In service since" header, added bold borders between sections of the table, destinations do not show DXB any more, table headers styled like folder tabs, changed duty date format.
![App's source code](screenshots/sc11.png)

Small refactoring to snippet and generate_positions function. The app will require at least [this version](https://caniuse.com/mdn-api_structuredclone "Structured clone browser support") of browser.

Now your own settings will save into cookie and will be loaded automatically next time. You do not need to select settings every time.

Updated upgrade prices (added Bogota and Phnom Penh) and inflight retail targets (removed duplicates).

Added option to select W crew manually for 4 class flights. This feature requested by Ayman. This is arguable as current policy states: allocate W to “experienced” crew. However, I still implemented it, just to have more flexibility.
![App's source code](screenshots/sc12.png)

>
> [!CAUTION]
> This is major update affecting the script itself, so shortcut/script require re-install.

---

## 10.06.2024

Restriction to keep same galley operator in J related to new service was lifted as of 06.06. I removed temporary rules for US flights and for J galley operator. Now positions allocated randomly with rotation again.

Updated fleet: EUI is refitted to 4 class now even it is not updated in fleet chart on portal.

---

## 06.07.2024

Added Antananarivo, Edinburgh, Adelaide. Updated data (upgrade prices, DF targets). Added new data for language requirements for destinations.

MacOS shortcuts updated to new version (separate legs duration added)

---

## 16.07.2024

Added pricelist version and effective date. Always double check official company pricelist before processing upgrades in case any delayed updates.
![Pricelist version](screenshots/scr22.png)

Added highlight for Arabic and third languages. Added table with language requirements in additional info.
![PA highlight](screenshots/scr21.png)

Moved app source code link to the bottom of the table.
![Source code link new location](screenshots/scr20.png)

Fixed a bug when loading settings from cookie file with default settings updated.

MFP button now changed to badge button (including: W, PA, MFP, IR). Badges in position cells are now clickable themselves and have options to change, replace or remove the badge.
![Badge buttons](screenshots/scr23.gif)

Added automatic allocation of PAs.
![PA badges](screenshots/scr19.png)

Added button to copy table to clipboard if you want to paste it into email directly (not as separate file). Be mindful that appearance of the table will be affected by size of app's window where email will be open (some text may wrap onto next row and look not so pretty etc.)

Added button to hide GUI. I noticed increasing number of people using the app on iPad where key bind is not always available, so added button to hide controls. I decided to make them disappear completely (no button to show them again) as I trust you will use it only as last step before saving to file. Note: it is still possible to make controls reappear via key bind.
![New control buttons](screenshots/scr18.png)

---

## 10.08.2024

Added effective dates for all additional information
![Effective dates](screenshots/scr23.png)

Added support for B773 4 class aircraft. For A350 still waiting for more information. This incudes updates to: fleet, aircraft types, VCM rules, breaks, positions.

Updated upgrade pricelist.

Renamed "premium economy" to "premium". I think, it's a recent trend.

---

## 19.08.2024

Updated upgrade pricelist.

---

## 30.08.2024

Added package.json

Fixed bug in add_aircraft_registration manually in rare case when FlightData not received at all. create-trips does not required input any more as DataPool is now global variable.
Added guard to birthday_check for rare case when FlightData not received at all (flight dates are unknown).

Added guard for selectPA for case when no language speakers available.

Clicking on column header now hides the column. This feature is requested by Fady. You can now hide/remove certain information from crew.

![Clickable headers](screenshots/scr24.gif)

---

## 18.09.2024

Moved changelog to separate file.

Added temporary rule for R5C position (additional Gr1 on B773). There is no crew rest strategy and it is unknown how company will handle VCM on those flights. It will make sense if L2A galley and R2 MFP will be on same break with CSV R2A (1st break), however, the rule is implemented in stages, so moving L2A to 1st break will affect all other flights (with 3 Gr1s). So temporary solution for now is to place R5C on 1st break and see when crew rest strategies get updated.

Reduced font size for effective date of additional information.
![Smaller effective dates](screenshots/scr26.png)

Added caution "When W crew manually selected the order of crew in table will be different from VR1!".
![Manual W caution](screenshots/scr25.png)

Fixed bug, when required language list was not updated after previous duty if this duty crashed with error.

---

## 12.10.2024

Fixed bug in B772 VCM rules.

Updated fleet (EQI retrofited to 4 class)

---

## 30.11.2024

Updated all fleet age. Fleet age header tab is now visible.

Updated upgrade prices.

Updates to fleet: many aircraft retrofitted to 4 class. One B773 retrofitted 2 class, but I kept it in 2 class group.

Updated breaks: changes to A380 2 class (addition of MR4A), B772 now ULR (with CSV in J) and non-ULR (with Gr1) handled separately. Entire breaks updated.

Fixed bug with fleet age: error handling if fleet age is not found.

Fixed bug in positions type selector in load_positions: in rare case for ULR B773 trips positions were treated non-ULR. This also affected required_crew_number and create_trips functions.

Fixed bug in additional_info: corrected upgrade prices selection for multisector journeys, filtering only unique sectors.

Fixed major bug: breaks were taken from wrong operation type.

Added support for B772 ULR and non-ULR trips: now handled separately. New VCM rules added.

---

## 09.12.2024

Updated prices.

---

## 29.12.2024

Fixed bug when app was selecting wrong positions type for trips with mixed ULR/non-ULR duties (for example ATH-EWR)

Updated flag for Syria.

Updated prices.

Fully implemented A350 support (positions, breaks, fleet, VCM), however, still no info on extra jumpseats layout, no crew rest strategy. Will update once more information available.

Implemented extra fg1 for full B773 turnarounds (L1A).

Updated positions for all B777 operation type: corrections to extra positions (L1A, R5C etc.).

---

## 05.01.2025

Added exception for case, when A380 operates mom-ULR, but 3 CSV rostered.

Fixed bug in temp rules for additional Gr1 and Fg1 on B773.

Fixed major bug in VCM calculation for trips table: sometimes this prevented app from generating positions.

Prices update.

Added fleet age for A350s.

---

## 17.02.2025

Updated Ramadan information 2025: added handling for F scenarios separately (now F and other cabins scenario can differ), wrote script to convert ramadan information into JSON.

Re-arranged additional info layout to make room for Ramadan info.

Before:
![Additional info rework](screenshots/scr28.png)
After:
![Additional info rework](screenshots/scr29.png)

Fixed rare bug with A380 4 class positions, when W crew is a top seller.

---

## 28.02.2025

Major rework of additional info: now upgrade prices for multisectors shown in row (previously in column) and take less space; ramadan scenarios reworked (first class scenario no longer separate column and only shown if different from other cabins scenario).

Before:
![Additional info rework](screenshots/scr29.png)
After:
![Additional info rework](screenshots/scr27.png)

Corrected ramadan scenario links.

Corrected fleet chart. We got new aircraft types: A380 4 class with MD CRC and without CRC. I implemented handling for them, updated crew rest strategies.

Improved upgrade prices logic: now script will compare prices for each sector and mention both going and return flights if prices are not same. If prices are same, only one sector will be displayed.

---

## 10.03.2025

New feature!
Manual positions adjustment tool. You can simply drag positions into desired blocks now or remove them by adding to extra positions. This should help you with non-standard operation cases. Here a quick look:
![Manual positions](screenshots/scr30.gif)

Added yet another aircraft type: I've discovered that we have B773 4 class, but not "Game changer".

UI changes: made control buttons larger and more distinct for iPad users.

Ramadan guide has been updated with many changes.

---

## 19.03.2025

Fixed styles for modal window (select W manually).

For manual W selector added condition to prevent selection of more than 2 crew.

Fixed bug, where due to VCM extra positions like R5C may be duplicated.

Corrected manual positions DOM structure. This was causing issue when generating new positions object.

Fixed issue with draggable positions in "manual positions" for tablets. I know many of you are iPad users, but I prefer PC so can only do limited testing on ipadOS. The issue was with difference how click and touch events are handled by WebKit.

---

## 27.03.2025

Pricelist update.

---

## 26.04.2025

I'm well aware that recent iPad update broke the app on some devices. I fixed modules and path for Safari browsers. Now it works on desktop Safari and pre-update tablets with Safari.

- However, this iPad update caused bigger issue: due to stricter security rules I cannot pass data between tabs in browser as they are cross-origin and CORS restriction applies (this safety measure protects you personal data; for example malicious page in one tab cannot steal credit card data from bank page in another tab). But due to cross-origin I cannot use localStorage to pass data as well.
- The best way will be to pass roster data as URL parameter, but the data is too large (like 4–5KB+) and resulting URL becomes too long. Browsers have different restriction on this, but maximum safe limit is about 2000 characters (not enough) especially if you load data for multiple flights at once.
- Second best way will be to do it via backend, but i cannot store confidential data on third party server without permission from company. This is still possible, but has legal restrictions.
- The previous solution via postMessage API is not working only on iPads: tablets have stricter security limitations and both window.open and window.opener are nullified.
- So solution will be to use clipboard as a bridge to transfer data. But iPad restricts the copy action if it is not triggered by a user gesture (like a button click or touch). So i updated iOS shortcut itself and it will allow passing data even cross-browser. Just make sure web app is hosted with SSL (HTTPS instead of HTTP) for Clipboard API, which typically requires a secure context (HTTPS or localhost). And be mindful that pasting data from clipboard may also ask you permission in browser like this.

![Clipboard](screenshots/scr33.png)
Now, if you on desktop, you will have experience as previously. But if you on iPad you will see a button that prompts you to start/"Show trips". This also works a back up for desktop if automatic connection fails.

![Show trips button](screenshots/scr32.png)
Another nice side-effect of this that you will be able even to refresh crewApp page without restarting the snippet/shortcut as long as you don't overwrite info in clipboard. I still recommend to use non-Safari browser like Google Chrome.

Removed link to app's source code.

Fixed "language info" still showing when settings for "additional info" were off.

By request of one of our pursers added feature to hide flags, when they do not load correctly (you can just leave nationality text).
![Hide flags button](screenshots/scr31.png)

---

## 27.04.2025

Added bookmarklets for macOS and winOS systems. This is alternative way of activating script directly from your browser's bookmark bar. This works without postMessage API.

Removed fallback to execCommand for copying data as it is deprecated and unreliable in modern browsers

Added fallback to input field if the app hosted on non-SSL source.

---

## 02.05.2025

Updated pricelist.

---

## 13.05.2025

Our pursers informed me that there is no more required to keep same Gr2s in W on both sectors so all Y crew are in one list now. You can use W badges to identify W crew if you'd like to (the app will do it automatically when generating positions).

---

## 30.05.2025

Many updates related to fleet: got 3 new A350, refurbished 12 B773. Got new aircraft type B773 4 class without CRC.

---

## 26.06.2025

Fixed issue with Czech language: in portal's qualifications system it is written with mistake Czec.

Temporary added UD badge for 2 class A380 to indicate UD crew. Only use it if you like to.

Updated pricelist.

---

## 05.07.2025

Fleet updates.

---

## 01.10.2025

Pricelist updates.

---

## 31.10.2025

Massive fleet updates. New aircraft type (A350 with CRC).

Optimized logic for 4 class positions.

One user brought rare bug to my attention, when TripData is received from portal but it is empty. I added fix for that case.

Added breaks for A350 aircraft type.

---

## 01.11.2025

Created lite version of the app (require less maintenance, currency of data)

---
