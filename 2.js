(window.webpackJsonp=window.webpackJsonp||[]).push([[2,4],{44:function(e,t,a){"use strict";a.r(t),a.d(t,"metadata",(function(){return n}));const n=[{date:"2019-10-10",title:"3D Fourier Spheres",desc:"A sum of points rotating along spheres, analagous to the 2Dfourier series case"},{date:"2019-10-09",title:"Throbbing Sphere",desc:"A spiral around a sphere... except the sphere is growing and shrinking."},{date:"2019-10-08",title:"2D Fourier Series",desc:"In 2D, Fourier Series can be thought of as a sum of rotating vectors."},{date:"2019-10-07",title:"Box vs. Sphere",desc:"Taking the centroid of two paths combines them into a shape that exhibits features of both."},{date:"2019-10-06",title:"Fourier Ring",desc:"A rough approximation of a square wave wrapped around a cylinder."},{date:"2019-10-05",title:"Spiral Sphere",desc:"A particle is rotated around a point on multiple axes at once."},{date:"2019-10-04",title:"Fourier Oscillator",desc:"A sum of sines on two axes, and a a square wave in the third."},{date:"2019-10-03",title:"Cylindrical Oscillator",desc:"A particle oscillates independently on all 3 axes. If the settings are chosen carefully, the particle can be confined to a cylinder."},{date:"2019-10-02",title:"Average Box",desc:"A bunch of points oscillate on the edges of a box. What shape does the centroid of those points make?"},{date:"2019-10-01",title:"Gear Train Turntable",desc:"Gears rotate a turntable and the ends of a sliding arm. A pen attached to the arm draws on the turntable."}]},57:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(63),s=a(64),i=(a(73),a(71),a(65)),o=a(29),l=a(61),h=a(62),p=a(67);class c extends h.a{get default_parameters(){return{parent:void 0,wave:new p.a,amplitude:1,frequency:1,phase:0}}init(e){super.init(e),this.wave=e.wave,this.phase=e.phase,this.frequency=e.frequency,this.amplitude=e.amplitude}build(e){const t=this.wave.compute(0),a=new o.a(`${this.id}-scale`,e);a.scaling=new n.r(1,1,1).scale(t),void 0!==this.parent&&(a.parent=this.parent.node),this.scale=a}update(e){const t=this.amplitude*this.wave.compute(this.frequency*e+this.phase);this.scale.scaling=new n.r(1,1,1).scale(t)}}var d=a(69),u=a(70);class _ extends r.a{get default_parameters(){return{parent:void 0,trace_length:4e3,palette:new u.a,palette_freq:.5}}init(e){const t=new s.a({parent:e.parent,offset:n.r.Zero(),show_offset:!1}),a=new c({parent:t.to_joint("translate")}),r=new d.a({parent:a.to_joint("scale")}),o=new i.a({source:r.to_joint("translate"),origin:t.to_joint("translate"),num_points:e.trace_length,palette:e.palette,palette_freq:e.palette_freq});return this.add_part(t),this.add_part(a),this.add_part(r),this.add_part(o),t}}var w=a(79),f=a(78),g=a(66);class m extends h.a{get default_parameters(){return{radius:1,half_height:.1,offset:n.r.Zero(),initial_angle:0,angular_velocity:1,parent:void 0}}init(e){super.init(e),this.radius=e.radius,this.half_height=e.half_height,this.offset=e.offset,this.initial_angle=e.initial_angle,this.angular_velocity=e.angular_velocity,this.angle=this.initial_angle}get transform_names(){return["translate","rotate","scale"]}get primitive_names(){return["wheel_primitive"]}get part_type(){return"wheel"}build(e){const t=new o.a(`${this.id}-translate`,e);t.position=this.offset,void 0!==this.parent&&(t.parent=this.parent.node),this.translate=t;const a=new o.a(`${this.id}-rotate`,e);a.rotation.y=this.angle,a.parent=t,this.rotate=a;const r=new o.a(`${this.id}-scale`,e);r.scaling=new n.r(this.radius,this.half_height,this.radius),r.parent=a,this.scale=r;const s=l.a.CreateCylinder(`${this.id}-wheel`,{diameter:2,height:2},e);s.material=new g.a(`${this.id}-mat-grid`,e),s.parent=r,this.wheel_primitive=s}update(e){this.angle=this.angular_velocity*e+this.initial_angle,this.rotate.rotation.y=this.angle}}class v extends m{get default_parameters(){super.default_parameters;return{offset_angle:0}}init(e){super.init(e);const t=this.parent.part;this.angular_velocity=-t.radius/this.radius*t.angular_velocity;const a=e.offset_angle,r=this.radius+t.radius,s=r*Math.cos(a),i=r*Math.sin(a);this.offset=new n.r(s,0,i)}get part_type(){return"driven-wheel"}}var q=a(68);class y extends h.a{get default_parameters(){return{parents:void 0}}init(e){[this.start_parent,this.end_parent]=Object(q.a)(e,"parents")}get transform_names(){return["rotate","scale"]}get parents(){return[this.start_parent.part,this.end_parent.part]}get arm_vector(){const e=this.start_parent.position,t=this.end_parent.position,a=t.subtract(e).length(),r=this.start_parent.inverse_matrix,s=n.r.TransformCoordinates(t,r);return{arm_len:a,angle:-Math.atan2(s.z,s.x)}}build(e){const t=this.arm_vector,a=new o.a(`${this.id}-rotate`,e);a.rotation.y=t.angle,a.parent=this.start_parent.node,this.rotate=a;const r=new o.a(`${this.id}-scale`,e);r.scaling.x=t.arm_len,r.parent=a,this.scale=r;const s=l.a.CreateLines(`${this.id}-line`,{points:[n.r.Zero(),new n.r(1,0,0)]},e);s.parent=r,this.arm_primitive=s}update(e){const t=this.arm_vector;this.rotate.rotation.y=t.angle,this.scale.scaling.x=t.arm_len}}class x extends r.a{get default_parameters(){return{parent:void 0,radii:[1,2,3,5],half_height:.1,phases:[0,0,0,0],contact_angles:[Math.PI/4,-Math.PI/4,0],angular_velocity:5,arm_gears:[0,3],arm_offsets:[new n.r(1,.2,0),new n.r(2,.2,1)],pen_offset:new n.r(3,0,2.5),trace_length:1e3}}make_gears(e,t){const a=[],r=e.half_height,s=e.radii;for(let i=0;i<s.length;i++){const o=s[i],l=e.phases[i];if(0===i){const s=new m({parent:t.to_joint("translate"),radius:o,offset:n.r.Zero(),initial_angle:l,half_height:r,angular_velocity:e.angular_velocity});a.push(s)}else{const t=new v({parent:a[i-1].to_joint("translate"),radius:o,offset_angle:e.contact_angles[i-1],initial_angle:l,half_height:r});a.push(t)}}return a}make_arm_points(e,t){const[a,n]=e.arm_gears,[r,i]=e.arm_offsets,o=t[a],l=t[n];return[new s.a({parent:o.to_joint("rotate"),offset:r,show_offset:!0}),new s.a({parent:l.to_joint("rotate"),offset:i,show_offset:!0})]}init(e){const t=new s.a,a=this.make_gears(e,t),n=this.make_arm_points(e,a),r=new y({parents:n.map(e=>e.to_joint("translate"))}),o=new s.a({parent:r.to_joint("rotate"),offset:e.pen_offset,show_offset:!0}),l=new i.a({source:o.to_joint("translate"),target:a[1].to_joint("rotate"),origin:a[1].to_joint("rotate"),num_points:e.trace_length});return this.add_part(t),this.add_parts(a),this.add_parts(n),this.add_part(r),this.add_part(o),this.add_part(l),t}}var b=a(80),j=a(75),M=a(81),I=a(82),k=a(74),A=a(83),$=a(44);a.d(t,"machines",(function(){return P})),a.d(t,"metadata",(function(){return $.metadata}));const P=[new f.a({axes:[new n.r(0,1,0),new n.r(0,0,1),new n.r(0,1,0),new n.r(0,0,1)],angular_frequencies:[2,4,10,13],trace_length:1e3,time_step:.01,palette:new u.a({biases:[0,.8,.8,1],amplitudes:[0,.5,.5,0],frequencies:[0,3,5,1],phases:[0,0,0,0]})}),new _({palette:new u.a({biases:[.7,.4,0,1],amplitudes:[.2,.1,1,0],frequencies:[4,3,5,1],phases:[0,0,0,0]}),palette_freq:.5}),new f.a({amplitudes:[4,3,2,1],angular_frequencies:[1,1.25,3.25,4.5].map(e=>e*Math.PI/4),axes:[new n.r(0,1,0),new n.r(0,1,0),new n.r(0,1,0),new n.r(0,1,0)],trace_length:4e3,time_step:.01,palette:new u.a({biases:[0,.8,.8,1],amplitudes:[0,.5,.5,0],frequencies:[0,3,5,1],phases:[0,0,0,0]})}),new w.a({parts:[new I.a({machine:new j.a({part:new d.a({radius:2,axes:[new n.r(0,1,0),new n.r(0,0,1)],angular_frequencies:[5,3]}),trace_length:1e3,palette_freq:1})}),new I.a({machine:new b.a({frequencies:[3,3,3,3,4,4,4,4,7,7,7,7].map(e=>e/10)})})],joint_names:["part.translate","centroid.translate"],offsets:[new n.r(8,0,0),new n.r(-8,0,0)],weights:[1,1],trace_length:5e3}),function(){const e=new A.a({amplitudes:[1,1/3,.2,1/7],frequencies:[1,3,5,7]});return new j.a({part:new M.a({amplitudes:new n.r(1,1,1),frequencies:new n.r(1,4,1),phases:new n.r(0,0,Math.PI/2),waves:[new p.a,e,new p.a]}),trace_joint:"translate_wave",time_step:.001,palette_freq:1})}(),new j.a({part:new d.a({radius:2,axes:[new n.r(0,1,0),new n.r(0,0,1)],angular_frequencies:[.1,2],phases:[0,0]}),trace_length:4e3}),function(){const e=new A.a({amplitudes:[1,.5,.25,1/8],frequencies:[1,2,3,4]}),t=new A.a({amplitudes:[1,2,4,8],frequencies:[1,2,3,4]});return new j.a({part:new M.a({amplitudes:new n.r(3,1,2),frequencies:new n.r(1,100,1),phases:new n.r(0,0,Math.PI/2),waves:[e,new k.a,t]}),trace_joint:"translate_wave",trace_length:1e3,time_step:.001,palette_freq:1})}(),new j.a({part:new M.a({amplitudes:new n.r(.5,6,.5),frequencies:new n.r(4,.05,4),phases:new n.r(0,0,Math.PI/2),waves:[new p.a,new p.a,new p.a]}),trace_joint:"translate_wave",trace_length:2e3,time_step:.01}),new b.a({size:new n.r(4,4,4),frequencies:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2],weights:[1,.5,.5,1,1,.5,.5,1,1,.5,.5,1],phases:[0,0,0,0,1,1,1,1,2,2,2,2].map(e=>e*Math.PI/4),trace_length:750}),new x({angular_velocity:4,half_height:.1,radii:[2,5,3,7],phases:[0,0,0,0],contact_angles:[4,2,3].map(e=>e*Math.PI/4),arm_gears:[0,3],arm_offsets:[new n.r(1,.2,.1),new n.r(0,.2,1.5)],pen_offset:new n.r(4,0,4),trace_length:4e3})]}}]);