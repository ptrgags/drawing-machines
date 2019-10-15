(window.webpackJsonp=window.webpackJsonp||[]).push([[2,4],{44:function(e,t,a){"use strict";a.r(t),a.d(t,"metadata",(function(){return r}));const r=[{date:"2019-10-25",title:"Oscillator Ring",desc:"A bunch of oscillators rotating in a ring"},{date:"2019-10-24",title:"Double Centered Trochoid",desc:"An epitrochoid and hypotrochoid swirling in lockstep"},{date:"2019-10-23",title:"Car Donuts",desc:"Follow points on a car's wheels while the car drives in circles"},{date:"2019-10-22",title:"Oscillator on a Sphere",desc:"An oscillator spirals around a sphere"},{date:"2019-10-21",title:"Rotating Tree",desc:"A tree with rotating branches"},{date:"2019-10-20",title:"Rose Curves",desc:"An oscillator drawing on a turntable makes rose curves"},{date:"2019-10-19",title:"Centroid of Spiral Spheres",desc:"Find the centroid of two spiraling orbits"},{date:"2019-10-18",title:"Centroid of Orbits",desc:"Find the centroid of orbits around a sphere"},{date:"2019-10-17",title:"3D Paper Shaker",desc:"Like trying to draw a circle, except the paper is moving up and down"},{date:"2019-10-16",title:"Rotating Centered Trochoid",desc:"A spirograph rotating around a point"},{date:"2019-10-15",title:"Rogue Phonograph",desc:"What would happen if the needle on a record player kept rotating?"},{date:"2019-10-14",title:"Corner Twister",desc:"A cube of oscillators is slowly twisted"},{date:"2019-10-13",title:"Centered Trochoid Chain",desc:"A Spirograph attached to a Spirograph"},{date:"2019-10-12",title:"Torus Knot",desc:"A more intricate path on the surface of a torus"},{date:"2019-10-11",title:"Torus Loop",desc:"A path spinning around the surface of a torus"},{date:"2019-10-10",title:"3D Fourier Spheres",desc:"A sum of points rotating along spheres, analagous to the 2D fourier series case"},{date:"2019-10-09",title:"Throbbing Sphere",desc:"A spiral around a sphere... except the sphere is growing and shrinking."},{date:"2019-10-08",title:"2D Fourier Series",desc:"In 2D, Fourier Series can be thought of as a sum of rotating vectors."},{date:"2019-10-07",title:"Box vs. Sphere",desc:"Taking the centroid of two paths combines them into a shape that exhibits features of both."},{date:"2019-10-06",title:"Fourier Ring",desc:"A rough approximation of a square wave wrapped around a cylinder."},{date:"2019-10-05",title:"Spiral Sphere",desc:"A particle is rotated around a point on multiple axes at once."},{date:"2019-10-04",title:"Fourier Oscillator",desc:"A sum of sines on two axes, and a a square wave in the third."},{date:"2019-10-03",title:"Cylindrical Oscillator",desc:"A particle oscillates independently on all 3 axes. If the settings are chosen carefully, the particle can be confined to a cylinder."},{date:"2019-10-02",title:"Average Box",desc:"A bunch of points oscillate on the edges of a box. What shape does the centroid of those points make?"},{date:"2019-10-01",title:"Gear Train Turntable",desc:"Gears rotate a turntable and the ends of a sliding arm. A pen attached to the arm draws on the turntable."}]},58:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a(61),s=a(62),i=a(67),o=a(71),_=a(63),l=a(86),h=a(65),d=a(70);class c extends n.a{get default_parameters(){return{parent:void 0,trace_length:4e3,palette:new d.a,palette_freq:.5}}init(e){const t=new s.a({parent:e.parent,offset:r.r.Zero(),show_offset:!1}),a=new l.a({parent:t.to_joint("translate")}),n=new h.a({parent:a.to_joint("scale")}),i=new _.a({source:n.to_joint("translate"),origin:t.to_joint("translate"),num_points:e.trace_length,palette:e.palette,palette_freq:e.palette_freq});return this.add_part(t),this.add_part(a),this.add_part(n),this.add_part(i),t}}var p=a(82),u=a(81),w=a(29),f=a(64),g=a(68),m=a(66);class q extends m.a{get default_parameters(){return{radius:1,half_height:.1,offset:r.r.Zero(),initial_angle:0,angular_velocity:1,parent:void 0}}init(e){super.init(e),this.radius=e.radius,this.half_height=e.half_height,this.offset=e.offset,this.initial_angle=e.initial_angle,this.angular_velocity=e.angular_velocity,this.angle=this.initial_angle}get transform_names(){return["translate","rotate","scale"]}get primitive_names(){return["wheel_primitive"]}get part_type(){return"wheel"}build(e){const t=new w.a(`${this.id}-translate`,e);t.position=this.offset,void 0!==this.parent&&(t.parent=this.parent.node),this.translate=t;const a=new w.a(`${this.id}-rotate`,e);a.rotation.y=this.angle,a.parent=t,this.rotate=a;const n=new w.a(`${this.id}-scale`,e);n.scaling=new r.r(this.radius,this.half_height,this.radius),n.parent=a,this.scale=n;const s=f.a.CreateCylinder(`${this.id}-wheel`,{diameter:2,height:2},e);s.material=new g.a(`${this.id}-mat-grid`,e),s.parent=n,this.wheel_primitive=s}update(e){this.angle=this.angular_velocity*e+this.initial_angle,this.rotate.rotation.y=this.angle}}class j extends q{get default_parameters(){super.default_parameters;return{offset_angle:0}}init(e){super.init(e);const t=this.parent.part;this.angular_velocity=-t.radius/this.radius*t.angular_velocity;const a=e.offset_angle,n=this.radius+t.radius,s=n*Math.cos(a),i=n*Math.sin(a);this.offset=new r.r(s,0,i)}get part_type(){return"driven-wheel"}}var v=a(72);class y extends m.a{get default_parameters(){return{parents:void 0}}init(e){[this.start_parent,this.end_parent]=Object(v.a)(e,"parents")}get transform_names(){return["rotate","scale"]}get parents(){return[this.start_parent.part,this.end_parent.part]}get arm_vector(){const e=this.start_parent.position,t=this.end_parent.position,a=t.subtract(e).length(),n=this.start_parent.inverse_matrix,s=r.r.TransformCoordinates(t,n);return{arm_len:a,angle:-Math.atan2(s.z,s.x)}}build(e){const t=this.arm_vector,a=new w.a(`${this.id}-rotate`,e);a.rotation.y=t.angle,a.parent=this.start_parent.node,this.rotate=a;const n=new w.a(`${this.id}-scale`,e);n.scaling.x=t.arm_len,n.parent=a,this.scale=n;const s=f.a.CreateLines(`${this.id}-line`,{points:[r.r.Zero(),new r.r(1,0,0)]},e);s.parent=n,this.arm_primitive=s}update(e){const t=this.arm_vector;this.rotate.rotation.y=t.angle,this.scale.scaling.x=t.arm_len}}class x extends n.a{get default_parameters(){return{parent:void 0,radii:[1,2,3,5],half_height:.1,phases:[0,0,0,0],contact_angles:[Math.PI/4,-Math.PI/4,0],angular_velocity:5,arm_gears:[0,3],arm_offsets:[new r.r(1,.2,0),new r.r(2,.2,1)],pen_offset:new r.r(3,0,2.5),trace_length:1e3}}make_gears(e,t){const a=[],n=e.half_height,s=e.radii;for(let i=0;i<s.length;i++){const o=s[i],_=e.phases[i];if(0===i){const s=new q({parent:t.to_joint("translate"),radius:o,offset:r.r.Zero(),initial_angle:_,half_height:n,angular_velocity:e.angular_velocity});a.push(s)}else{const t=new j({parent:a[i-1].to_joint("translate"),radius:o,offset_angle:e.contact_angles[i-1],initial_angle:_,half_height:n});a.push(t)}}return a}make_arm_points(e,t){const[a,r]=e.arm_gears,[n,i]=e.arm_offsets,o=t[a],_=t[r];return[new s.a({parent:o.to_joint("rotate"),offset:n,show_offset:!0}),new s.a({parent:_.to_joint("rotate"),offset:i,show_offset:!0})]}init(e){const t=new s.a,a=this.make_gears(e,t),r=this.make_arm_points(e,a),n=new y({parents:r.map(e=>e.to_joint("translate"))}),i=new s.a({parent:n.to_joint("rotate"),offset:e.pen_offset,show_offset:!0}),o=new _.a({source:i.to_joint("translate"),target:a[1].to_joint("rotate"),origin:a[1].to_joint("rotate"),num_points:e.trace_length});return this.add_part(t),this.add_parts(a),this.add_parts(r),this.add_part(n),this.add_part(i),this.add_part(o),t}}var b=a(83),k=a(79),A=a(73);class z extends n.a{get default_parameters(){return{parent:void 0,radii:[2.5,2,-.1],angular_frequencies:[2,3],offset:new r.r(1.3,0,0),trace_length:4e3,time_step:.005}}make_trochoids(e,t){const a=[],r=e.angular_frequencies.length,n=e.radii;let s=t.to_joint("translate");for(let t=0;t<r;t++){const r=new A.a({parent:s,angular_frequency:e.angular_frequencies[t],frame_radius:n[t],frame_phase:0,wheel_radius:n[t+1],wheel_phase:0,show_radii:!0});a.push(r),s=r.to_joint("rotate_wheel")}return a}init(e){this._time_step=e.time_step;const t=new s.a({parent:e.parent,offset:r.r.Zero(),show_offset:!1}),a=this.make_trochoids(e,t),n=a[a.length-1];n.offset=e.offset;const i=new _.a({source:n.to_joint("translate_offset"),origin:t.to_joint("translate"),num_points:e.trace_length});return this.add_part(t),this.add_parts(a),this.add_part(i),t}get time_step(){return this._time_step}}var S=a(69),C=a(78);class T extends n.a{get default_parameters(){return{parent:void 0,amplitudes:[.5,.5],frequencies:[2,4],phases:[0,0],twist_frequencies:[.25,.5],half_height:2,waves:[new S.a,new S.a],trace_length:8e3}}get_corner_offsets(e){const t=e;return[new r.r(t,0,t),new r.r(-t,0,t),new r.r(-t,0,-t),new r.r(t,0,-t)]}make_twists(e,t){return t.map((a,n)=>new h.a({parent:t[n].to_joint("translate"),axes:[new r.r(0,1,0)],angular_frequencies:[e.twist_frequencies[n]],phases:[0,0],show_offset:!1}))}make_offsets(e,t){return this.get_corner_offsets(e.half_height).map(e=>new s.a({parent:t.to_joint("rotate"),offset:e,show_offset:!0}))}make_oscillators(e,t,a){return t.map(t=>new i.a({parent:t.to_joint("translate"),amplitude:e.amplitudes[a],phase:e.phases[a],direction:new r.r(0,1,0),frequency:e.frequencies[a],wave:e.waves[a]}))}make_centroids(e,t,a){return t.map((t,r)=>{const n=a[r];return new o.a({points:[t.to_joint("translate_wave"),n.to_joint("translate_wave")],origin:e.to_joint("translate"),weights:[1,1]})})}make_traces(e,t,a){return a.map(a=>new _.a({source:a.to_joint("translate"),origin:t.to_joint("translate"),num_points:e.trace_length}))}init(e){const t=new s.a({parent:e.parent,offset:r.r.Zero()}),a=new s.a({parent:t.to_joint("translate"),offset:new r.r(0,e.half_height,0)}),n=new s.a({parent:t.to_joint("translate"),offset:new r.r(0,-e.half_height,0)}),[i,o]=this.make_twists(e,[a,n]),_=this.make_offsets(e,i),l=this.make_offsets(e,o),h=this.make_oscillators(e,_,0),d=this.make_oscillators(e,l,1),c=this.make_centroids(t,h,d),p=this.make_traces(e,t,c);return this.add_part(t),this.add_parts([a,n]),this.add_parts([i,o]),this.add_parts(_),this.add_parts(l),this.add_parts(h),this.add_parts(d),this.add_parts(c),this.add_parts(p),t}}class F extends n.a{get default_parameters(){return{turntable_center:new r.r(-1,0,0),turntable_angular_velocity:3,turntable_radius:3,arm_angular_frequency:.5,arm_center:new r.r(2,.2,1),arm_radius:3,arm_phase:0,trace_length:4e3}}init(e){const t=new s.a,a=new q({parent:t.to_joint("translate"),offset:e.turntable_center,radius:e.turntable_radius,angular_velocity:e.turntable_angular_velocity}),n=new s.a({parent:t.to_joint("translate"),offset:e.arm_center}),i=new h.a({parent:n.to_joint("translate"),radius:e.arm_radius,axes:[new r.r(0,1,0)],phases:[e.arm_phase],angular_frequencies:[e.arm_angular_frequency]}),o=new _.a({source:i.to_joint("translate"),target:a.to_joint("rotate"),origin:a.to_joint("rotate"),num_points:e.trace_length});return this.add_part(t),this.add_part(a),this.add_part(n),this.add_part(i),this.add_part(o),t}}class M extends n.a{get default_parameters(){return{trace_length:8e3,palette:new d.a,rotate_frequency:.6,trochoid_frequency:3,frame_radius:1,wheel_radius:.1,show_radii:!0}}init(e){const t=new s.a,a=new h.a({parent:t.to_joint("translate"),axes:[new r.r(0,1,0)],angular_frequencies:[e.rotate_frequency]}),n=new A.a({parent:a.to_joint("translate"),angular_frequency:e.trochoid_frequency,show_radii:e.show_radii,frame_radius:e.frame_radius,wheel_radius:e.wheel_radius}),i=new _.a({source:n.to_joint("translate_offset"),origin:t.to_joint("translate"),num_points:e.trace_length,palette:e.palette});return this.add_part(t),this.add_part(a),this.add_part(n),this.add_part(i),t}}class I extends n.a{get default_parameters(){return{trace_length:8e3,osc_offset:new r.r(-3,0,0),rotation_offset:new r.r(3,0,0),sphere_frequency:4,osc_amp:2,osc_frequency:.4}}init(e){const t=new s.a,a=new s.a({parent:t.to_joint("translate"),offset:e.osc_offset}),n=new s.a({parent:t.to_joint("translate"),offset:e.rotation_offset}),o=new i.a({parent:a.to_joint("translate"),direction:new r.r(0,1,0).normalize(),frequency:e.osc_frequency,amplitude:e.osc_amp}),l=new h.a({parent:n.to_joint("translate"),axes:[new r.r(0,1,0)],angular_frequencies:[e.sphere_frequency]}),d=new _.a({source:l.to_joint("translate"),target:o.to_joint("translate_wave"),origin:o.to_joint("translate_wave"),num_points:e.trace_length});return this.add_part(t),this.add_part(a),this.add_part(n),this.add_part(o),this.add_part(l),this.add_part(d),t}}var P=a(75);class O extends n.a{get default_parameters(){return{trace_length:1e3,orbit_length:100,axes:[new r.r(1,1,1).normalize(),new r.r(0,1,0),new r.r(-1,1,2).normalize()],start_directions:[new r.r(1,-1,1).normalize(),new r.r(1,0,0).normalize(),new r.r(1,-1,1).normalize()],frequencies:[3,5,7]}}make_orbits(e,t){return e.axes.map((a,r)=>new h.a({parent:t.to_joint("translate"),axes:[a],angular_frequencies:[e.frequencies[r]],start_direction:e.start_directions[r]}))}make_orbit_traces(e,t,a){return t.map((t,n)=>new _.a({source:t.to_joint("translate"),origin:a.to_joint("translate"),num_points:e.orbit_length,palette:new P.a({stops:[0,1],colors:[new r.d(1,0,0,1),new r.d(1,0,0,1)]})}))}init(e){const t=new s.a,a=this.make_orbits(e,t),r=this.make_orbit_traces(e,a,t),n=new o.a({points:a.map(e=>e.to_joint("translate")),origin:t.to_joint("translate"),weights:new Array(a.length).fill(1)}),i=new _.a({source:n.to_joint("translate"),origin:t.to_joint("translate"),num_points:e.trace_length});return this.add_part(t),this.add_parts(a),this.add_parts(r),this.add_part(n),this.add_part(i),t}}class $ extends n.a{get default_parameters(){return{trace_length:1e3,osc_offset:new r.r(-3,0,0),rotation_offset:new r.r(3,0,0),sphere_frequency:2,osc_amp:2,osc_frequency:.5}}init(e){const t=new s.a,a=new h.a({parent:t.to_joint("translate"),axes:[new r.r(0,1,0)],angular_frequencies:[e.sphere_frequency]}),n=new i.a({parent:t.to_joint("translate"),direction:new r.r(1,0,0),frequency:e.osc_frequency,amplitude:e.osc_amp}),o=new _.a({source:n.to_joint("translate_wave"),target:a.to_joint("translate"),origin:a.to_joint("translate"),trace_length:e.trace_length});return this.add_part(t),this.add_part(a),this.add_part(n),this.add_part(o),t}}class D extends n.a{get default_parameters(){return{trace_length:100,height:3,radii:[0,1.25,1.5,2],angular_frequencies:[0,.5,1,1.5]}}add_node(e,t,a,n){if(0===n){const r=new _.a({source:a.to_joint("translate"),origin:t.to_joint("translate"),trace_length:e.trace_length});return void this.add_part(r)}const s=e.angular_frequencies[n],i=e.radii[n],o=new h.a({parent:a.to_joint("translate"),axes:[new r.r(0,1,0)],angular_frequencies:[s],radius:i});this.add_part(o);const l=new h.a({parent:a.to_joint("translate"),axes:[new r.r(0,1,0)],angular_frequencies:[-s],radius:i});this.add_part(l),this.add_node(e,t,o,n-1),this.add_node(e,t,l,n-1)}init(e){const t=new s.a;return this.add_node(e,t,t,e.height),this.add_part(t),t}}class R extends n.a{get default_parameters(){return{trace_length:4e3}}init(e){const t=new s.a,a=new h.a({parent:t.to_joint("translate"),axes:[new r.r(0,1,0),new r.r(1,0,0)],angular_frequencies:[2,.05]}),n=new i.a({parent:a.to_joint("translate")}),o=new _.a({source:n.to_joint("translate_wave"),origin:t.to_joint("translate"),num_points:e.trace_length});return this.add_part(t),this.add_part(a),this.add_part(n),this.add_part(o),t}}class Z extends n.a{get default_parameters(){return{trace_length:1e3,wheel_radius:.4,car_frequency:.5,wheel_frequency:8}}static get OFFSETS(){return[new r.r(1,0,1).normalize(),new r.r(-1,0,1).normalize(),new r.r(1,0,-1).normalize(),new r.r(-1,0,-1).normalize()]}make_wheel_offsets(e,t){return Z.OFFSETS.map(e=>new s.a({parent:t.to_joint("translate"),offset:e,show_offset:!0}))}make_wheels(e,t){return t.map(t=>new h.a({parent:t.to_joint("translate"),start_direction:new r.r(0,0,1),axes:[new r.r(-1,0,0)],angular_frequencies:[e.wheel_frequency],radius:e.wheel_radius}))}make_wheel_traces(e,t,a){return a.map(a=>new _.a({source:a.to_joint("translate"),origin:t.to_joint("translate"),num_points:e.trace_length}))}init(e){const t=new s.a,a=new h.a({parent:t.to_joint("translate"),axes:[new r.r(0,1,0)],angular_frequencies:[e.car_frequency]}),n=this.make_wheel_offsets(e,a),i=this.make_wheels(e,n),o=this.make_wheel_traces(e,t,i);return this.add_part(t),this.add_part(a),this.add_parts(n),this.add_parts(i),this.add_parts(o),t}}class L extends n.a{get default_parameters(){return{trace_length:1e3,frame_radius:1.5,wheel_radius:.3,palette:new d.a}}get time_step(){return.01}init(e){const t=new s.a,a=new A.a({parent:t.to_joint("translate"),wheel_radius:e.wheel_radius}),r=new A.a({parent:t.to_joint("translate"),wheel_radius:-e.wheel_radius}),n=new _.a({source:a.to_joint("translate_offset"),origin:t.to_joint("translate"),trace_length:e.trace_length,palette:e.palette}),i=new _.a({source:r.to_joint("translate_offset"),origin:t.to_joint("translate"),num_points:e.trace_length,palette:e.palette});return this.add_part(t),this.add_part(a),this.add_part(r),this.add_part(n),this.add_part(i),t}}var B=a(84),E=(a(85),a(87),a(88),a(89),a(90),a(91),a(77)),G=a(92),J=a(76),W=a(44);a.d(t,"machines",(function(){return K})),a.d(t,"metadata",(function(){return W.metadata}));const K=[new B.a({trace_length:1e3,num_oscs:6,rotation_freq:1,osc_freq:.1,radius:2,wave:new J.a({amplitudes:[1,2,3],frequencies:[2,4,8]})}),new L({trace_length:1e3,frame_radius:1.5,wheel_radius:.3,palette:new d.a({biases:[0,.5,.25,1],amplitudes:[0,.5,.25,0],frequencies:[0,1,2,1],phases:[0,0,0,0]})}),new Z({trace_length:5e3,wheel_radius:.4,car_frequency:.5,wheel_frequency:8}),new R,new D({trace_length:100,height:3,radii:[0,1.25,1.5,2],angular_frequencies:[0,.5,1,1.5]}),new $({trace_length:1e3,osc_offset:new r.r(-3,0,0),rotation_offset:new r.r(3,0,0),sphere_frequency:2,osc_amp:2,osc_frequency:.5}),new p.a({parts:[new G.a({machine:new k.a({part:new h.a({radius:2,start_direction:new r.r(-1,0,0),axes:[new r.r(0,1,0),new r.r(0,0,1)],angular_frequencies:[13,11]}),trace_length:1e3,palette_freq:1})}),new G.a({machine:new k.a({part:new h.a({radius:2,axes:[new r.r(0,1,0),new r.r(0,0,1)],angular_frequencies:[5,3]}),trace_length:1e3,palette_freq:1})})],joint_names:["part.translate","part.translate"],offsets:[new r.r(6,0,0),new r.r(-6,0,0)],weights:[1,1],trace_length:5e3}),new O({trace_length:1e3,orbit_length:200,axes:[new r.r(1,1,1).normalize(),new r.r(0,1,0),new r.r(1,0,2).normalize()],start_directions:[new r.r(1,-1,1).normalize(),new r.r(1,0,0).normalize(),new r.r(2,0,-1).normalize()],frequencies:[3,5,7]}),new I({trace_length:8e3,osc_offset:new r.r(-3,0,0),rotation_offset:new r.r(3,0,0),sphere_frequency:4,osc_amp:2,osc_frequency:.4}),new M({trace_length:1e3,palette:new d.a({biases:[.2,.5,0,1],amplitudes:[.5,1,0,0],frequencies:[4,1,0,1],phases:[.25,0,0,0]}),rotate_frequency:.6,trochoid_frequency:3,frame_radius:1,wheel_radius:.1,show_radii:!0}),new F({turntable_center:new r.r(-1,0,0),turntable_angular_velocity:3,turntable_radius:3,arm_angular_frequency:.1,arm_center:new r.r(2,.2,1),arm_radius:3,arm_phase:.6*Math.PI,trace_length:8e3}),new T({amplitudes:[.5,.5],frequencies:[2,4],phases:[0,0],twist_frequencies:[.25,-.5],half_height:2,waves:[new S.a,new S.a],trace_length:8e3}),new z({parent:void 0,radii:[2.5,2,-.1],angular_frequencies:[2,3],offset:new r.r(1.3,0,0),trace_length:4e3,time_step:.005}),new u.a({axes:[new r.r(0,1,0),new r.r(0,0,1)],amplitudes:[1,.5],angular_frequencies:[23,37],phases:[0,0],time_step:.005,trace_length:2e3}),new u.a({axes:[new r.r(0,1,0),new r.r(0,0,1)],amplitudes:[2,.5],angular_frequencies:[1,100],phases:[0,0],time_step:.0025,trace_length:1e4}),new u.a({axes:[new r.r(0,1,0),new r.r(0,0,1),new r.r(0,1,0),new r.r(0,0,1)],angular_frequencies:[2,4,10,13],trace_length:1e3,time_step:.01,palette:new d.a({biases:[0,.8,.8,1],amplitudes:[0,.5,.5,0],frequencies:[0,3,5,1],phases:[0,0,0,0]})}),new c({palette:new d.a({biases:[.7,.4,0,1],amplitudes:[.2,.1,1,0],frequencies:[4,3,5,1],phases:[0,0,0,0]}),palette_freq:.5}),new u.a({amplitudes:[4,3,2,1],angular_frequencies:[1,1.25,3.25,4.5].map(e=>e*Math.PI/4),axes:[new r.r(0,1,0),new r.r(0,1,0),new r.r(0,1,0),new r.r(0,1,0)],trace_length:4e3,time_step:.01,palette:new d.a({biases:[0,.8,.8,1],amplitudes:[0,.5,.5,0],frequencies:[0,3,5,1],phases:[0,0,0,0]})}),new p.a({parts:[new G.a({machine:new k.a({part:new h.a({radius:2,axes:[new r.r(0,1,0),new r.r(0,0,1)],angular_frequencies:[5,3]}),trace_length:1e3,palette_freq:1})}),new G.a({machine:new b.a({frequencies:[3,3,3,3,4,4,4,4,7,7,7,7].map(e=>e/10)})})],joint_names:["part.translate","centroid.translate"],offsets:[new r.r(8,0,0),new r.r(-8,0,0)],weights:[1,1],trace_length:5e3}),function(){const e=new J.a({amplitudes:[1,1/3,.2,1/7],frequencies:[1,3,5,7]});return new k.a({part:new E.a({amplitudes:new r.r(1,1,1),frequencies:new r.r(1,4,1),phases:new r.r(0,0,Math.PI/2),waves:[new S.a,e,new S.a]}),trace_joint:"translate_wave",time_step:.001,palette_freq:1})}(),new k.a({part:new h.a({radius:2,axes:[new r.r(0,1,0),new r.r(0,0,1)],angular_frequencies:[.1,2],phases:[0,0]}),trace_length:4e3}),function(){const e=new J.a({amplitudes:[1,.5,.25,1/8],frequencies:[1,2,3,4]}),t=new J.a({amplitudes:[1,2,4,8],frequencies:[1,2,3,4]});return new k.a({part:new E.a({amplitudes:new r.r(3,1,2),frequencies:new r.r(1,100,1),phases:new r.r(0,0,Math.PI/2),waves:[e,new C.a,t]}),trace_joint:"translate_wave",trace_length:1e3,time_step:.001,palette_freq:1})}(),new k.a({part:new E.a({amplitudes:new r.r(.5,6,.5),frequencies:new r.r(4,.05,4),phases:new r.r(0,0,Math.PI/2),waves:[new S.a,new S.a,new S.a]}),trace_joint:"translate_wave",trace_length:2e3,time_step:.01}),new b.a({size:new r.r(4,4,4),frequencies:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2],weights:[1,.5,.5,1,1,.5,.5,1,1,.5,.5,1],phases:[0,0,0,0,1,1,1,1,2,2,2,2].map(e=>e*Math.PI/4),trace_length:750}),new x({angular_velocity:4,half_height:.1,radii:[2,5,3,7],phases:[0,0,0,0],contact_angles:[4,2,3].map(e=>e*Math.PI/4),arm_gears:[0,3],arm_offsets:[new r.r(1,.2,.1),new r.r(0,.2,1.5)],pen_offset:new r.r(4,0,4),trace_length:4e3})]}}]);