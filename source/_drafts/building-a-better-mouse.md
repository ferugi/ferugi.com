title: Building A Better Mouse
categories:
    - Mice
    - Hardware
    - Gaming

tags: 
- DIY
- Arduino
- Gaming
---
Introduction
    the problem
    the attempts
    Sudden Solution
        qsxcv's work

Stage 1: Requirements
* G502
* Target Shell (Xai)
* Discontent
* soldering tools
* testing tools
* rotary tool
* modelling consumables
* code

Steps:
* plan ahead
* check for plausability
* buy components
* Build test internals
* test
* extract sensor block

To Do: Image of mouse at top of page
To Do: Link only components that I used
To Do: A ven diagram of weight, sensor, shape


There is nothing more infuriating to a perfectionist than constantly being reminded of imperfections. That is, life, it's how the world is - just, in the eyes of the perfectionist, no how it has to be. 


So it is with gaming mice. Currently there are very few mice that offer what the first person shooter community call "a perfect sensor". Lets start by making it clear that no sensor is "perfect". The most common type, the image corellation sensor does just that; it corellates a photograph of the surface it's placed on with a previous image of the surface and attempts to calculate the difference between the images, and use that to determine the horizontal co-ordinates of the mouse.

This happens fast, very fast. The sensor in my Logitech G502 - what is widely regarded as the best sensor on the market - operates at varying frame rates (depended on speed) of up to 12,000 frames per second.

The thing is, is that there's more going on there than just a comparison of one frame. It'd be incredibly challenging to detect small, slow movements when comparing just one frame to another, especially at lower DPI's. Hence why a sensor like the PMW3366 varies its frame rate.

It's not alone though, the PMW3988 and PMW3310 also do that.


The irony is, that the mice using the only "flawless" sensor as flawed in other ways. I had to give my G502 mechanical liposuction. There's hand horror stories related to the G303, and I didn't want to risk ending up like that guy from scary movie.
<!--more-->

## A solution appeared..

**Overclock.net** user qsxcv had managed to decode the communications between the Logitech G502's sensor and its Microcontroller. He'd then successfully achieved Serial Peripheral Interface communication between a Teensy 2.0 AVR development board and the 3366. He had plans to chop up a Steelseries Sensei shell and mount the 3366 inside.

So, would it be possible for me to do it? I didn't really know a thing about using an Arduino or microelectronics in general, but the popularity of Arduino's made the idea seem more achieveable. So, I messaged him.

He provided not only the code, but some instructions on steps to take & with a basic list of equipment.

The following list includes this and more. Here's everything that I used, but remember this isn't what I'd recommend.

### Hardware: 
* Logitech G502
* 2nd Hand [Steelseries Xai](http://www.amazon.co.uk/gp/product/B00YUJ6OSE)
* [Teensy 2.0 USB Development Board](https://www.pjrc.com/store/teensy.html)
* [Adafruit FPC Stick](https://www.adafruit.com/products/1325)
* 14 Pin 0.5mm Pitch Surface Mount FPC Connecter e.g. [this](https://www.digikey.com/product-detail/en/SFV14R-1STE1HLF/609-4309-1-ND/2626760)
* 14 Conductor FPC Cable e.g. [this](https://www.digikey.com/product-detail/en/687614050002/732-3559-ND/2811281) (The G502 comes with two, but note that they are reversed)

### Tools:
(I've linked the components I used - this isn't a general recommendation. My reason for using most of this stuff is because it was cheap or I already owned it, not because its nessesarily good. If you're able to afford to take on a similar project, I'd recommend seeking advice in choosing high quality products.)
* [Soldering Kit](http://www.maplin.co.uk/p/maplin-40w-mains-soldering-iron-kit-n72hy) (Included iron, Desoldering Pump, solder and block with sponge.)
* [Helping Hand](http://www.amazon.co.uk/gp/product/B001BMSBD4)
* 22 AWG Wire (ideally solid core, but I used [this](http://uk.farnell.com/adafruit-industries/153/wire-bundle-breadboard/dp/2409349))
* Solder & Flux (e.g. [this](http://www.amazon.co.uk/gp/product/B00KCL61M8))
* [Multimeter](http://www.amazon.co.uk/gp/product/B00YUJ6OSE)
* [Rotary Multifunction Tool](http://www.amazon.co.uk/gp/product/B00H7ZCYMI)(a.k.a. Dremel)
* [Attachments for Rotary Tool](http://www.clasohlson.com/uk/215-Piece-Accessory-Set/30-9461)
* Superglue
* [Miliput Epoxy Putty](http://www.amazon.co.uk/dp/B002CSX7Z8/)

The weight loss my G502 had suffered awas what really prompted this endevour. In cutting away key parts it had lost its "quality" feeling as the buttons rattled, the board was visisble from the outside. Overall, it still wasn't quite right.

The Xai was touted by those around me as having a great shape. It shares its design with the Sensei, and its shape with the Kinzu (albiet a different scale). I should probably have tried one out before purchasing one, but it *looked* right. Amazon had one second hand for £15, which wasn't too bad. When it arrived it had a perfumed scent, and there  were cat hairs in all the gaps & around the wheel. Odd. The previous owner had blantaly let his pet at it!

In retrospect I would have liked to try out the CM Storm Alcor, or purchase a similarly shaped mouse from a Chinese import site like [AliExpress](http://www.aliexpress.com/) or [GearBest](http://www.gearbest.com/).

## Early Work
After the hardware had arrived, I assesed the feasability of fitting everything into a Xai shell. There was plenty of room for the FPC Stick, Teensy and the wiring.

I used the rotary tool to split the Xai's mainboard, seperating the front area for the wheel and buttons from everything else. When put back into the shell the clicks and wheel worked fine.

Next up was shell modification. The 3366 sensor in the G502 is on a seperate board connected by a 14 pin FPC cable. It is secured in by two screws and some soft plastic washers, but also there are ridges that seat the lens. The pattern of these ridges is similar to the 9500 that was contained in the Xai.
Sadly there wasn't anything in the Xai to firmly hold the new sensor in place, so my only choice was to cut the plastic out of the G502. I'd remove the hexagonal piece including the columns with threads for the screws, and then cut a similarly shape out of the base of the Xai. This was all relatively easy stuff, very iterative. The only error I could have made was removing too much material from any piece. This left me with the componenets in the image below:

IMAGE OF COMPONENTS HERE: http://www.overclock.net/t/1561041/reverse-engineering-3366/170#post_24525557

The next step was harder.

Soldering is a skill, and not one that I had ever built up before. The last time was attempting to repair a pair of headphone drivers where the cable had came loose. The heat melted the plastic on the driver cone, rendering them useless.

That was basically the experience I had at first with my initial attempts at soldering the components. The Teensy, Adafruit FPC Stick & 14 pin connector had arrived. I had borrowed my Dad's Antex 25w iron and grabbed some rosin core solder from a local hardware shop. For wire I ripped apart a few cables from a box of computer and audio junk.

Soldering the FPC connector to the stick was going to be a real challenge. 0.5mm surface connectors can be pretty unforgiving, the chance for the solder to bridge connections and short was high. Being a novice at best the chance for burning the board as a result of too many attempts was also there. Both things happened.

At this point I had nothing to hold the small cuircuitry with. I had a desk clamp, but its designed for holding mobile phones. That held the iron pretty well while it was hot. My solution was to use a combination of paper clips and bluetack. A bent paperclip held the connector tightly against the board, which rested on some card covered in tinfoil. I'd tackle the problem by soldering the metal clips on the side of the connector first, securing the placement, and then work on the pins.

This somewhat worked, but not using flux here was a massive mistake. It was very tricky to get the solder comfortably onto the pins and the trace, and I ended up spending far too long trying to remove clumping that had happened. This stripped some of the masking from the traces and burned some of the connectors plastic though it posed no problem.

Moving onto the Teensy 

I plugged in the FPC cable to test its stability. Disaster, as the pins & one side of the connector came loose. Fuck.

So, back to what I'd already been spending hours doing. Sitting hobbled over in a dark room with poor ventiliation. Not a good idea. Whatever, I was this far and not going to give up so easily. I reseated the connector with and held it in place again with the paperclip. Back to soldering....

In this persistance I fucked up, and clumped solder got worse. I'd thought that perhaps by adding some more of the rosin it'd help it reflow and perhaps improve the situation. Nah. The solder moved all the way up, right against the plastic of the connector making it impossible to remove. Perhaps I though, I could remove the connector and drain some of it off.

Which is where disater struck for a second time. After desoldering the feet of the connector on the sides, and doing what I thought was the same to the pins I attempted to remove the connector. With a bit of force it came off, along with the metal trace on the board.

Whatever, £3.50 down the drain. Lesson learned.










## Lessons Learned