# Drawing Machines (2019)

Peter Gagliardi (ptrgags@gmail.com)

This repository is a simulation of various 3D drawing machines. 

This is my alternative to this year's Inktober challenge. Instead of 
pen-and-ink drawings, I challenge myself to publish a new drawing machine
simulation each day for the month of October.

Check back often, and enjoy!

## What Are Drawing Machines?

Drawing machines are usually physical hand-operated machines that move a pen
across the paper such that it makes intricate patterns. Think of the
Spirograph you might have played with as a kid or the recent contender,
the [ThinkFun Hypnograph](https://www.thinkfun.com/products/hypnograph/).

I was fascinated by these as a kid. Now, with much more math under my belt,
I again find them fascinating for their mathematical intrigue.

For this project, I took the concept of drawing machines to a new level. I
expanded some drawing machines that operate in 2D into 3-dimensional
equivalents. Even if they are not always physically possible to build, the
resulting shapes are still too pretty to dismiss.

I also combined various mechanisms to make 

## About the Inktober Challenge

[Inktober](https://inktober.com/rules) is a 31-day art challenge by artist
[Jake Parker](https://www.mrjakeparker.com/). The goal is to draw something
every day during the month of October and share the results. I've done this
the past two years:

* [Inktober 2018 Drawings](https://www.deviantart.com/ptrgags/gallery/67366134/inktober-2018)
* [Inktober 2017 Drawings](https://www.deviantart.com/ptrgags/gallery/64663431/inktober-2017)

This year, I wanted to do something different. Instead of a traditional art
challenge, I am going to work on this simulation for a month. Each day I will
post a new machine to the `gh-pages` branch for display at 
https://ptrgags.dev/drawing-machines or https://ptrgags.github.io/drawing-machines.

After October, I'll take a break for November. Then I have some further plans
for this project. Stay tuned :)

## Architecture In Brief

Below are the roles of key classes in the source code

* `index.js` is the entry point of the application. It loads the machines
    to display, constructs a `Renderer`
* `Renderer.js` handles setting up the BabylonJS engine, creating the GUI,
    and managing a collection of active drawing machines.
* `machines/Machine.js` is the base class that defines a drawing machine.
    a machine is a DAG of `Part`s that represents a drawing machine. It handles
    building and updating the parts in the correct order based on dependencies
    (via topological sort).
* `parts/Part.js` is the base class for drawing machine parts. Some represent
    concrete concepts such as `Wheel`, which is a cylinder that spins. Others
    are more abstract like `Centroid` which computes the centroid of several 
    moving points in the scene. `Part`s handle constructing BabylonJS 
    `TransformNode`s and other primitives. One unusual feature is that `Parts`
    keep their translate/rotate/scale matrices as separate matrices rather than
    combining them into one matrix. This makes it easier to construct
    complex transformation hierarchies needed for some of the drawing machines.
    These nodes can be accessed through `Joint`s. Parts can be updated each
    frame with a time value that gets passed in from 
    `Renderer -> Machine -> Part`
* `Joint.js` This is a pair of `(part, node_name)`. It provides a convenient
    way of connecting a part to any other transformation matrix of a second
    part. Furthermore, there are a few convenience methods like computing the
    world position of the origin of the model matrix this `Joint` represents.
* `parts/Trace.js` This `Part` is notable because it is what actually produces
    the intricate parametric curves. It is a polyline that keeps track of the
    most recent N positions of whichever transform it is attached to (`source`)
    Furthermore, a second transformation can be used as the origin (`origin`), 
    and a third can be used as the reference frame (`target`). This `target`
    transformation is particularly interesting, since it allows for drawing
    on rotated reference frames (like paper attached to a turntable).
* `waves/Wave.js` This base class wraps 2-pi-periodic functions like sine and
    square waves using the Strategy design pattern. This can be used in a
    few parts such as `Oscillator` or `XYZOscillator` to create more nuanced
    motion than simple harmonic motion.
* `parts/Prefab.js` This class adapts a `Machine` to match the interface of
    `Part`. This makes it much easier to combine machines into larger, more
    complex drawing machines. In terms of operation, it treats the `Machine`
    as a sub-DAG that must complete its operations before this `Part` node
    is complete.
* `machines/PartViewer.js` This class wraps a `Part` into a `Machine`, adding
    an origin `Point` and a `Trace`. This makes it easy to explore the motion
    of a `Part` without creating boilerplate classes.
