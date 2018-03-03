#GloBrawl
GloBrawl is a game where several countries battle to take over the globe.

##Starting a game
An admin will start a game and you will be notified. Go to #commandspam and do !createcountry [countryname]. You won't need to do much on the first tick

##Points
There are **2** types of points.
- Currency
  - You begin with 500.
  - Used to build and upgrade buildings, and also to maintain them.
- Power
  - You begin with 100.
  - Used to go to war with other countries.
  - If your power points go below 0, your country will fall, and you have lost the game.

##Buildings
Buildings can be built with currency points.
Buildings **produce a set amount of points/humans and use currency points** every tick. They produce different things depending on the type.
Each building *needs* a certain amount of employees. **If it doesn't have enough at a tick, it won't take any maintenance or produce anything**.
Buildings can be upgraded to a higher level with currency points. Higher leveled buildings will use more maintenance but produce more.

##Humans
Humans are used to work buildings.
Each tick, a human has a 5% chance of dying. **If a human dies, you'll have to assign a new human to the building for it to be worked**.

##Wars
War mechanics need to be worked on.
You can !war [countryname] **1** country each tick, but watch out for their allies.
You'll lose half of your power points when you go to war **offensively**.
The defending country/ies will lose power points, **depending on how many power points you're losing** and an RNG.
###Allies
!ally [countryname] and **if somebody goes to war to an ally, The loss of power points will be split** between you.

##Ticks
Ticks will do what needs to be done in this order:
1. War
2. Get production for each building
3. Kill humans