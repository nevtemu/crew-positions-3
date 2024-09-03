# Cabin crew positions

Allocating crew positions before the flight can be a challenging and time consuming task due to number of regulations and requirements involved in the process. It saved hours of time for me, when making pre-flight emails. I hope you will find it useful too.

Here is a quick look:

![Preview](screenshots/scr10.gif)

## Disclaimer

Just to remind you that most of information on crew portal is confidential and should not be shared with third parties. This project is purely for educational purposes. 

## Algorithm

__Data that influence__ position allocation:

* Galley operated by experienced crew member (company requires more than 3 month, but, for smoother operation, script will try allocate galley to crew with over 6 month experience in grade)
* In-flight retail should be operated by crew with highest sale rank. If no such crew is available, junior Gr1 will be selected. This design decision made based on experience: Gr1 will always have red pouch (Gr2 often reject inflight retail position using "no red pouch" excuse)
* Positions to be changed on different sectors
* Breaks allocated according to crew rest strategies.
* Minimum crew requirements. Positions UR1A, UL1A, UC1 should be always occupied. Script will handle VCMs automatically adjusting positions.

I want to consider giving cabin position to __crew with MFP__, but there is no access to such information on crew portal.

Works for any type of operation except cases, when data is incomplete/missing.

## Features
>
> [!TIP]
> Previous version can be found [here](https://github.com/nevtemu/crew-positions "Crew positions 2").

### New features in this version

* All information fetched automatically from portal (no need to copy-paste any data).
* Completely new algorithm for position allocation
* Breaks allocation complete overhaul. Now crew can have same break on both sectors, but first break on night flight is *good*, first break on day flight is *bad*. More importantly breaks are related to crew position now, so inflight retail  operators are not on same break, equal number of Gr2 from FWD and AFT galley (A380 Y class) on break, MFP (MR5, L5A) same break as CSV, galley operator on earlier breaks to prepare for next service etc.
* Added option to generate only list of crew (to give positions manually). This is especially useful in case algorithm fails for any reason: you will still be able to generate crew list and give positions manually.
* Advanced error handling. For example, more information provided in console regarding VCM etc.
* If aircraft registration not found or not available on the portal, added option to input in manually. Minimum requirement is crew data to generate table (without it entire script make no sense).
* Support for positions for W class
* Added key-bind for keyboard to show/hide GUI

#### GUI enhancements

* Added completely new trips pages where can see list of all duties, general flight information
![Trips page](screenshots/scr1.png)
* More badges supported (trainers, relocated ID, birthday etc.). Separate function checks for crew birthdays around flight dates.

![Badges](screenshots/scr2.png)

* Added information about number of times flown to this destination.
![Destination experience](screenshots/scr3.png)
* Crew comments now have limited number of symbols. Long comments trimmed to avoid stretching of this table cell. However, full comment is still available in tooltip of he cell.
![Comments trim](screenshots/scr4.png)
* In position cells “(IR)” replaced with badge. Added button “+” to add MFP badge. Unfortunately MFP information is not available on the portal, so only can add manually after flight loaded on purser's table.
![MFP and IR badges](screenshots/scr5.png)
* New font [PT Sans](https://www.paratype.com/collections/pt/44157 "PT Sans")
* Now can completely hide GUI (to print only table)

## Limitations

* __Breaks can repeat__. On rare occasions crew can get same break on all sectors. This is conscious decision as getting 1st break on one flight is considered good and on another - bad. Also breaks are now linked to positions to ensure company regulations are met. In addition for certain types of operation crew rest strategies divide crew into unequal groups (for example, A380 MD-CRC LRV has one, four and three Gr1s on different break groups), so in certain scenarios breaks will repeat.
* __Cargo flights support__ has been completely removed. They are not rostered to crew any more. If you happened to get one, it still can be processed via “List only” option.
* __Script would not work__ if information fetched is incomplete or missing entirely. This is common on reserve, when many duties missing crew or aircraft data. Minimum requirement for script to work is to have crew information (registration, type of operation can be manually input). Also commonly known that script will fail if crew complement altered at higher grades: FG1 pulled out as GR2 and PUR pulled out as CSV etc. For this cases I suggest to use "List only" option.

## How to use?

#### For ![Windows](src/readme-icons/windows.svg) Windows and  ![Chrome](src/readme-icons/chrome.svg) Chrome users:
1. In Google Chrome open DevTools: press F12 on the keyboard or Ctrl+Shift+I keys. Go to `Sources` tab, then to `Snippets`. Press `+ New snippet`. Copy `snippet.js` from folder `install/WinOS` of this project to your new snippet. This need to be done only once (next time script will be saved/available in snippets).
![Chrome set up](screenshots/sc4.png)
2. Now all you need to do is to open portal and then run this snippet (right click the snippet and select `Run`). 
![Run snippet](screenshots/sc5.png)

>
> [!TIP]
> Previous version of installation guide including automatization with TamperMonkey is [here](./install/readme_old.md "Crew positions 2").

#### For ![Apple](src/readme-icons/apple.svg) macOS/iOS and ![Safari](src/readme-icons/safari.svg) Safari users:
Added support for macOS/iOS. It is implemented via ![Shortcuts](src/readme-icons/shortcuts.svg) Shortcuts app. 
1. Intall [this shortcut](https://www.icloud.com/shortcuts/8ad2ce296e1e4c478b1831a3fd354741 "CrewApp Shortcut") on your device. In folder `install/MacOS` same shortcut available as downloadable file. 
![Add shortcut](screenshots/sc1.png)
2. Allow shortcuts to [run JavaScript](https://support.apple.com/en-ca/guide/shortcuts/apdb71a01d93/ios "Run JS  on browser tab") in [settings](https://support.apple.com/en-ca/guide/shortcuts/apdfeb05586f/7.0/ios/17.0 "Apple security settings") 
![Add security permissions](screenshots/sc2.png)
3. On crew portal click `Share` icon, find `CrewApp` shortcut and run it
![Run shortcut](screenshots/sc3.png)

>
> [!CAUTION]
> The app opens new tab in browser. Most browsers by default block pop-up windows. If app does not run, check that pop-up blocker is disabled.
> ![Pop-up blocker](screenshots/sc9.png)

Enjoy!

>
> [!IMPORTANT]
> All snippets/shortcuts have url of the local host: you require to run local service on this port or host app online and change the url

If you need help setting it up, reach me out 😊. Or let me know your feedback, desired features.

## Changelog

20.12.2023
> Added sections for upgrade prices and retail targets information. 
> ![Upgrade prices](screenshots/scr11.png)

22.12.2023
> Added aircraft delivery date (in service since / age). Also VCM now has conditional formatting: red if negative.
> ![Aircraft age](screenshots/scr12.png)
> Added settings to toggle on/off additional information.

16.03.2024
> Shortened aircraft delivery date.

> Project has grown large. Slitted into separate modules.

> Added settings to toggle on/off additional information.

> Added information for ramadan services.
> ![Ramadan information](screenshots/scr13.png)

17.03.2024
> Added UL1A for B773 LRV. Lots of work: position, break and VCM changes.

> Added link to change comment on crew portal.
> ![Comments](screenshots/scr14.png)

> Added autocorrection of breaks, when positions changed manually.
> ![Breaks](screenshots/scr15.gif)

> Added highlight for duplicated positions.
> ![Duplicates](screenshots/scr16.gif)

19.03.2024
> Moved DF position to UL3 and MFP to UR3 (Initially my thought were to align with A380 2 class where UR3 is DF, but it make more sense to keep MFP on same side as CSV for service, and even on 2 class it is changed by company now).

09.04.2024
> Moved most functions into separate modules.

> Updated upgrade prices and retail targets.

> Added links to station information.
> ![Station info](screenshots/scr17.png)

> Fixed bug in breaks autocorrection and repeat highlights related to unbreakable spaces.

24.04.2024
> Added MR4A for A380-800 2 class (Serve better changes)

> Station information link now opens in new tab

> Added registration EPP. Registration EUE, EUH, EUJ, EUK, EUL refitted into 4 class.

> Fixed bug in load_positions function

29.04.2024
> Fixed bug in positions for B777-300 (missing R2)

> Changed source for flag icons. Added flag for Kosovo (missing on company's portal)

> Changed inflight retail positions: B772 to R1, A380 to UL3 (Serve better changes)

02.05.2024
> Minor change to timeInGrade check: for rare scenario when crew rostered out of grade but operates in his current grade

> Added temporary rule for J galley operator to be most senior crew and remain galley on all sectors

21.05.2024
> Added macOS/iOS version via Shortcuts. Had to change all data files and settings into .js format (from .json) as Safari does not support [import assertions](https://caniuse.com/mdn-javascript_statements_import_import_assertions "Import assertion browser support"). 

25.05.2024
> Added settings to the app: now you are able to turn on/off features. Settings are now renamed to default settings.
> ![Destination experience](screenshots/sc8.png)

> Moved more functions into separate modules.

> Changed handler for destination experience: now for multisector trips destinations shown in list of experiences. Same destination experience is not repeated any more
> ![Destination experience](screenshots/sc6.png)

> Fixed bug in extra rules function: forgot to import error handler.

> Added shortcut file for MacOS version.

03.06.2024
> Added link to app's source code
> ![App's source code](screenshots/sc10.png)

> Fixed bag in add_registration_manually function

> Added option to allocate breaks on selected sectors only. Required for trips mixed of short sectors/ shuttles and long sectors. Tooltip for checkboxes now shows individual sector duration.

> Changed styles for trips table: VCM moved to the end of row (seems more logical), shortened headers and removed "In service since" header, added bold borders between sections of the table, destinations do not show DXB any more, table headers styled like folder tabs, changed duty date format.
> ![App's source code](screenshots/sc11.png)

> Small refactoring to snippet and generate_positions function. The app will require at least [this version](https://caniuse.com/mdn-api_structuredclone "Structured clone browser support") of browser.

> Now your own settings will save into cookie and will be loaded automatically next time. You do not need to select settings every time.

> Updated upgrade prices (added Bogota and Phnom Penh) and inflight retail targets (removed duplicates).

> Added option to select W crew manually for 4 class flights. This feature requested by Ayman. This is arguable as current policy states: allocate W to “experienced” crew. However, I still implemented it, just to have more flexibility.
> ![App's source code](screenshots/sc12.png)

>
> [!CAUTION]
> This is major update affecting the script itself, so shortcut/script require re-install.

10.06.2024
> Restriction to keep same galley operator in J related to new service was lifted as of 06.06. I removed temporary rules for US flights and for J galley operator. Now positions allocated randomly with rotation again.

> Updated fleet: EUI is refitted to 4 class now even it is not updated in fleet chart on portal.

06.07.2024
> Added Antananarivo, Edinburgh, Adelaide. Updated data (upgrade prices, DF targets). Added new data for language requirements for destinations.

> MacOS shortcuts updated to new version (separate legs duration added)

16.07.2024
> Added pricelist version and effective date. Always double check official company pricelist before processing upgrades in case any delayed updates.
> ![Pricelist version](screenshots/scr22.png)

> Added highlight for Arabic and third languages. Added table with language requirements in additional info.
> ![PA highlight](screenshots/scr21.png)

> Moved app source code link to the bottom of the table.
> ![Source code link new location](screenshots/scr20.png)

> Fixed a bug when loading settings from cookie file with default settings updated.

> MFP button now changed to badge button (including: W, PA, MFP, IR). Badges in position cells are now clickable themselves and have options to change, replace or remove the badge.
> ![Badge buttons](screenshots/scr23.gif)

> Added automatic allocation of PAs.
> ![PA badges](screenshots/scr19.png)

> Added button to copy table to clipboard if you want to paste it into email directly (not as separate file). Be mindful that appearance of the table will be affected by size of app's window where email will be open (some text may wrap onto next row and look not so pretty etc.)

> Added button to hide GUI. I noticed increasing number of people using the app on iPad where key bind is not always available, so added button to hide controls. I decided to make them disappear completely (no button to show them again) as I trust you will use it only as last step before saving to file. Note: it is still possible to make controls reappear via key bind.
> ![New control buttons](screenshots/scr18.png)

10.08.2024
> Added effective dates for all additional information
> ![Effective dates](screenshots/scr23.png)

> Added support for B773 4 class aircraft. For A350 still waiting for more information. This incudes updates to: fleet, aircraft types, VCM rules, breaks, positions.

> Updated upgrade pricelist.

> Renamed "premium economy" to "premium". I think, it's a recent trend.

19.08.2024
> Updated upgrade pricelist.

30.08.2024
> Added package.json

> Fixed bug in add_aircraft_registration manually in rare case when FlightData not received at all. create-trips does not required input any more as DataPool is now global variable.
> Added guard to birthday_check for rare case when FlightData not received at all (flight dates are unknown).

> Added guard for selectPA for case when no language speakers available.

> Clicking on column header now hides the column. This feature is requested by Fady. You can now hide/remove certain information from crew.
> ![Clickable headers](screenshots/scr24.gif)

## Known issues

* __Supy__. App will most probably identify that you have supy and alert you. However, from available data there is no reliable way to confirm that someone is supy: it is not always most junior crew (supy have their own grade in HR, but shown in Gr2 list with experience 2 months in rostering). I suggest to check via their roster or crew with pre-allocated position on KIS and then change their position manually.

* __Aircraft mismatch__. If you have 3 class crew and different aircraft (2 class aircraft one way, 3 class aircraft return). Even if move Fg1s to Y, still 2 class B773 has no CSV in J, so it is very confusing for algorithm. I'm planing to look into the issue, but for now suggest just to use "List only" feature and do what you like manually.

* __A350__. I'm waiting for more information on how the flight will be operated, registration and requirements.
