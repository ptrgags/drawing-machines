(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{57:function(t,e,s){"use strict";s.r(e);var i=s(0),r=s(63),a=s(64),n=s(65),o=s(67);class h extends r.a{get default_parameters(){return{origin_offset:i.r.Zero(),trace_length:1e3,part:void 0,trace_joint:"translate",time_step:1/60}}get time_step(){return this._time_step}init(t){this._time_step=t.time_step;const e=new a.a({offset:t.origin_offset,show_offset:!1}),s=Object(o.a)(t,"part");s.parent=e.to_joint("translate");const i=new n.a({source:s.to_joint(t.trace_joint),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_part(s),this.add_part(i),e}}var p=s(29),u=s(61),d=s(66),_=s(62);class l{compute(t){}}class c extends l{compute(t){return Math.sin(t)}}class f extends _.a{get default_parameters(){return{parent:void 0,offset:i.r.Zero(),amplitude:1,phase:0,direction:new i.r(0,1,0),frequency:1,radius:.1,wave:new c}}init(t){super.init(t),this.offset=t.offset,this.amplitude=t.amplitude,this.phase=t.phase,this.direction=t.direction,this.frequency=t.frequency,this.radius=t.radius,this.wave=t.wave}get transform_names(){return["translate","translate_wave","scale"]}get primitive_names(){return["line_primitive","sphere_primitive"]}get part_type(){return"osc"}build(t){const e=new p.a(`${this.id}-translate`,t);e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e;const s=new p.a(`${this.id}-translate-wave`,t);s.position=i.r.Zero(),s.parent=e,this.translate_wave=s;const r=u.a.CreateSphere(`${this.id}-sphere`,{diameter:2*this.radius},t);r.material=new d.a(`${this.id}-mat-grid`,t),r.parent=s,this.sphere_primitive=r;const a=u.a.CreateLines(`${this.id}-line`,{points:[this.direction.scale(this.amplitude),this.direction.scale(-this.amplitude)]},t);a.parent=e,this.line_primitive=a}update(t){const e=this.amplitude*this.wave.compute(2*Math.PI*this.frequency*t+this.phase),s=this.direction.scale(e);this.translate_wave.position=s}}class m extends _.a{get default_parameters(){return{points:[]}}constructor(t){super(t),this.points=t.points,this.origin=t.origin,this.weights=t.weights,this.translate=void 0,this.sphere_primitive=void 0}get part_type(){return"centroid"}get parents(){const t=this.points.map(t=>t.part);return t.push(this.origin.part),t}static compute_point(t,e){const s=t.position;return i.r.TransformCoordinates(s,e)}get centroid(){const t=this.origin.inverse_matrix,e=this.points.map(e=>m.compute_point(e,t)),s=this.weights,r=i.r.Zero();let a=0;for(let t=0;t<e.length;t++){const i=s[t];r.addInPlace(e[t].scale(i)),a+=i}return r.scale(1/a)}build(t){const e=new p.a(`${this.id}-translate`,t);e.position=i.r.Zero(),e.parent=this.origin.node,this.translate=e;const s=u.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);s.material=new d.a(`${this.id}-mat-grid`,t),s.parent=e,this.sphere_primitive=s}update(t){const e=this.centroid;this.translate.position=e}}class w extends r.a{get default_parameters(){return{parent:void 0,size:new i.r(3,3,3),frequencies:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1,1.1,1.2],weights:[1,1,1,1,1,1,1,1,1,1,1,1],phases:[0,0,0,0,0,0,0,0,0,0,0,0],trace_length:1e4}}static get NUM_OSCILATORS(){return 12}static get DIRECTIONS(){const t=new i.r(1,0,0),e=new i.r(0,1,0),s=new i.r(0,0,1),r=new i.r(-1,0,0);return{up:e,down:new i.r(0,-1,0),left:r,right:t,front:new i.r(0,0,-1),back:s}}static get OSCILATION_DIRECTIONS(){const t=this.DIRECTIONS;return[t.right,t.right,t.right,t.right,t.up,t.up,t.up,t.up,t.back,t.back,t.back,t.back]}get_offsets(t){const e=t.size,s=w.DIRECTIONS,i=s.front.scale(e.z),r=s.back.scale(e.z),a=s.left.scale(e.x),n=s.right.scale(e.x),o=s.up.scale(e.y),h=s.down.scale(e.y);return[i.add(o),i.add(h),r.add(o),r.add(h),i.add(a),i.add(n),r.add(a),r.add(n),a.add(o),a.add(h),n.add(o),n.add(h)]}get_amplitudes(t){const e=t.size;return[e.x,e.x,e.x,e.x,e.y,e.y,e.y,e.y,e.z,e.z,e.z,e.z]}make_oscillators(t,e){const s=[],i=(t.size,t.phases),r=t.frequencies,a=w.OSCILATION_DIRECTIONS,n=this.get_offsets(t),o=this.get_amplitudes(t),h=e.to_joint("translate");for(let t=0;t<w.NUM_OSCILATORS;t++){const e=new f({parent:h,offset:n[t],direction:a[t],amplitude:o[t],frequency:r[t],phase:i[t],radius:.2});s.push(e)}return s}init(t){const e=new a.a({parent:t.parent,offset:i.r.Zero(),show_offset:!1}),s=this.make_oscillators(t,e),r=new m({points:s.map(t=>t.to_joint("translate_wave")),origin:e.to_joint("translate"),weights:t.weights}),o=new n.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(s),this.add_part(r,"centroid"),this.add_part(o),e}}class g extends _.a{get default_parameters(){return{parent:void 0,radius:2,axes:[new i.r(0,1,0),new i.r(0,0,1)],angular_frequencies:[.1,2],phases:[0,0]}}init(t){super.init(t),this.radius=t.radius,this.angular_frequencies=t.angular_frequencies,this.axes=t.axes,this.phases=t.phases}get transform_names(){return["rotation","translate"]}get primitive_names(){return["sphere_primitive","radius_primitive"]}get parents(){return[this.parent.part]}build(t){const e=new p.a(`${this.id}-rotate`,t);e.rotationQuaternion=i.l.Identity(),e.parent=this.parent.node,this.rotation=e;const s=new p.a(`${this.id}-translate`,t);s.position=new i.r(this.radius,0,0),s.parent=e,this.translate=s;const r=u.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);r.material=new d.a(`${this.id}-mat-grid`,t),r.parent=s,this.sphere_primitive=r;const a=u.a.CreateLines(`${this.id}-line`,{points:[i.r.Zero(),s.position.negate()]},t);a.parent=s,this.line_primitive=a}compute_angles(t){const e=[];for(let s=0;s<this.phases.length;s++){const i=this.phases[s],r=this.angular_frequencies[s]*t+i;e.push(r)}return e}compose_rotations(t){let e=i.l.Identity();for(let s=0;s<this.axes.length;s++){e=i.l.RotationAxis(this.axes[s],t[s]).multiply(e)}return e}update(t){const e=this.compute_angles(t),s=this.compose_rotations(e);this.rotation.rotationQuaternion=s}}class v extends r.a{get default_parameters(){return{parent:void 0,amplitudes:[4,3,2,1],angular_frequencies:[1,1.25,3.25,4.5].map(t=>t*Math.PI/4),phases:[0,0,0,0],axes:[new i.r(0,1,0),new i.r(0,1,0),new i.r(0,1,0),new i.r(0,1,0)],trace_length:1e3,time_step:.01}}get time_step(){return this._time_step}make_spheres(t,e){const s=[];let i=e;for(let e=0;e<t.amplitudes.length;e++){const r=new g({radius:t.amplitudes[e],axes:[t.axes[e]],angular_frequencies:[t.angular_frequencies[e]],phases:[t.phases[e]],parent:i.to_joint("translate")});s.push(r),i=r}return s}init(t){this._time_step=t.time_step;const e=new a.a({parent:t.parent,offset:i.r.Zero(),show_offset:!1}),s=this.make_spheres(t,e),r=s[s.length-1],o=new n.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(s),this.add_part(o),e}}class y extends _.a{get default_parameters(){return{parent:void 0,wave:new c,amplitude:1,frequency:1,phase:0}}init(t){super.init(t),this.wave=t.wave,this.phase=t.phase,this.frequency=t.frequency,this.amplitude=t.amplitude}build(t){const e=this.wave.compute(0),s=new p.a(`${this.id}-scale`,t);s.scaling=new i.r(1,1,1).scale(e),void 0!==this.parent&&(s.parent=this.parent.node),this.scale=s}update(t){const e=this.amplitude*this.wave.compute(this.frequency*t+this.phase);this.scale.scaling=new i.r(1,1,1).scale(e)}}class x extends _.a{get default_parameters(){return{parent:void 0,frame_radius:.96,wheel_radius:-.3,angular_frequency:4,frame_phase:0,wheel_phase:0,show_radii:!1,offset:new i.r(.2,0,0)}}init(t){super.init(t),this.offset=t.offset,this.show_radii=t.show_radii,this.frame_radius=t.frame_radius,this.wheel_radius=t.wheel_radius,this.angular_frequency=t.angular_frequency,this.frame_phase=t.frame_phase,this.wheel_phase=t.frame_phase,this.frame_angle=t.frame_phase,this.wheel_angle=t.wheel_phase}get primitive_names(){return["frame_radius_primitive","wheel_radius_primitive"]}get transform_names(){return["rotate_frame","translate_frame","translate_wheel","rotate_wheel","translate_offset"]}get part_type(){return"centered-trochoid"}build(t){const e=new p.a(`${this.id}-rotate-frame`,t);e.rotation.y=this.frame_angle,void 0!==this.parent&&(e.parent=this.parent.node),this.rotate_frame=e;const s=new p.a(`${this.id}-translate-frame`,t);s.position=new i.r(this.frame_radius,0,0),s.parent=e,this.translate_frame=s;const r=new p.a(`${this.id}-translate-wheel`,t);r.position=new i.r(this.wheel_radius,0,0),r.parent=s,this.translate_wheel=r;const a=new p.a(`${this.id}-rotate-wheel`,t);a.rotation.y=this.wheel_angle,a.parent=r,this.rotate_wheel=a;const n=new p.a(`${this.id}-translate-offset`,t);if(n.position=this.offset,n.parent=a,this.translate_offset=n,!this.show_radii)return;const o=u.a.CreateLines(`${this.id}-line-frame`,{points:[i.r.Zero(),new i.r(-this.frame_radius,0,0)]},t);o.parent=s,this.frame_radius_primitive=o;const h=u.a.CreateLines(`${this.id}-line-wheel`,{points:[i.r.Zero(),new i.r(-this.wheel_radius,0,0)]},t);h.parent=r,this.wheel_radius_primitive=h;const d=u.a.CreateLines(`${this.id}-line-offset`,{points:[i.r.Zero(),this.offset.negate()]},t);d.parent=n,this.offset_primitive=d}get wheel_ratio(){return 0===this.wheel_radius?1:1+this.frame_radius/this.wheel_radius}update(t){const e=this.angular_frequency*t;this.frame_angle=e+this.frame_phase,this.wheel_angle=this.wheel_ratio*e+this.wheel_phase,this.rotate_frame.rotation.y=this.frame_angle,this.rotate_wheel.rotation.y=this.wheel_angle}}class q extends _.a{get default_parameters(){return{parent:void 0,amplitudes:new i.r(1,1,1),frequencies:new i.r(1,.1,1),phases:new i.r(0,0,Math.PI/2),waves:[new c,new c,new c]}}init(t){super.init(t),this.frequencies=t.frequencies,this.phases=t.phases,this.amplitudes=t.amplitudes,this.waves=t.waves}get transform_names(){return["translate","translate_wave"]}get primitive_names(){return["sphere_primitive"]}get part_type(){return"xyzosc"}get parents(){return void 0!==this.parent?[this.parent.part]:[]}build(t){const e=new p.a(`${this.id}-translate-wave`,t);e.position=this.compute_wave(0),void 0!==this.parent&&(e.parent=this.parent.node),this.translate_wave=e;const s=u.a.CreateSphere(`${this.id}-sphere`,{diameter:.2},t);s.material=new d.a(`${this.id}-mat-grid`,t),s.parent=e,this.sphere_primitive=s}compute_wave(t){const e=2*Math.PI*this.frequencies.x*t+this.phases.x,s=2*Math.PI*this.frequencies.y*t+this.phases.y,r=2*Math.PI*this.frequencies.z*t+this.phases.z,[a,n,o]=this.waves,h=this.amplitudes.x*a.compute(e),p=this.amplitudes.y*n.compute(s),u=this.amplitudes.z*o.compute(r);return new i.r(h,p,u)}update(t){this.translate_wave.position=this.compute_wave(t)}}class j extends l{constructor(t){super(),this.amplitudes=t.amplitudes,this.frequencies=t.frequencies}compute(t){let e=0,s=0;for(let i=0;i<this.amplitudes.length;i++){const r=this.amplitudes[i],a=this.frequencies[i];e+=r*Math.sin(a*t),s+=r}return e/s}}s.d(e,"machines",(function(){return P}));const b=new j({amplitudes:[1,.5,.25,1/8],frequencies:[1,2,3,4]}),$=new j({amplitudes:[1,2,4,8],frequencies:[1,2,3,4]}),I=new j({amplitudes:[1,1/3,.2,1/7],frequencies:[1,3,5,7]}),C=new h({part:new q({waves:[b,new class extends l{compute(t){return Math.sign(Math.sin(t))}},$],amplitudes:new i.r(3,1,2),frequencies:new i.r(1,100,1)}),trace_joint:"translate_wave",time_step:.001}),k=new h({part:new q({waves:[new c,I,new c],amplitudes:new i.r(1,1,1),frequencies:new i.r(1,4,1)}),trace_joint:"translate_wave",time_step:.001}),O=new h({part:new q,trace_joint:"translate_wave",trace_length:2e3}),M=new h({part:new g,trace_length:4e3}),S=new w,Z=new class extends r.a{get default_parameters(){return{parts:[],joint_names:[],offsets:[],weights:[],trace_length:1e3}}make_offsets(t,e){const s=[];for(let i of t.offsets){const t=new a.a({parent:e.to_joint("translate"),offset:i});s.push(t)}return s}make_parts(t,e){const s=[];for(let i=0;i<t.parts.length;i++){const r=t.parts[i];r.change_parent(e[i].to_joint("translate")),s.push(r)}return s}make_centroid(t,e,s){const i=t.joint_names,r=e.map((t,e)=>t.to_joint(i[e]));return new m({points:r,weights:t.weights,origin:s.to_joint("translate")})}init(t){const e=new a.a({show_offset:!0}),s=this.make_offsets(t,e),i=this.make_parts(t,s),r=this.make_centroid(t,i,e),o=new n.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(s),this.add_parts(i),this.add_part(r),this.add_part(o),e}}({parts:[new g,new class extends _.a{get default_parameters(){return{parent:void 0,machine:void 0}}init(t){super.init(t),this.machine=Object(o.a)(t,"machine"),this.machine.root_part.parent=t.parent}change_parent(t){this.parent=t,this.machine.root_part.parent=t}get part_type(){return`prefab-${this.machine.machine_type}`}build(t){this.machine.build(t)}update(t){this.machine.update(t)}to_joint(t){const[e,...s]=t.split("."),i=s.join(".");return this.machine.find_part(e).to_joint(i)}}({machine:new w})],joint_names:["translate","centroid.translate"],offsets:[new i.r(10,0,0),new i.r(-10,0,0)],weights:[1,1],trace_length:1e4}),z=new class extends r.a{get default_parameters(){return{parent:void 0,trace_length:4e3}}init(t){const e=new a.a({parent:t.parent,offset:i.r.Zero(),show_offset:!1}),s=new y({parent:e.to_joint("translate")}),r=new g({parent:s.to_joint("scale")}),o=new n.a({source:r.to_joint("translate"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_part(s),this.add_part(r),this.add_part(o),e}},T=new v,L=new v({axes:[new i.r(0,1,0),new i.r(0,0,1),new i.r(0,1,0),new i.r(0,0,1)],angular_frequencies:[13,19,23,43],trace_length:1e4,time_step:.001}),N=new v({axes:[new i.r(0,1,0),new i.r(0,0,1)],amplitudes:[2,.5],angular_frequencies:[1,100],phases:[0,0],time_step:.0025,trace_length:1e4}),R=new v({axes:[new i.r(0,1,0),new i.r(0,0,1)],amplitudes:[1,.5],angular_frequencies:[23,37],phases:[0,0],time_step:.005,trace_length:2e3}),P=[new class extends r.a{get default_parameters(){return{parent:void 0,radii:[2.5,2,-.1],angular_frequencies:[2,3],offset:new i.r(1.3,0,0),trace_length:4e3,time_step:.005}}make_trochoids(t,e){const s=[],i=t.angular_frequencies.length,r=t.radii;let a=e.to_joint("translate");for(let e=0;e<i;e++){const i=new x({parent:a,angular_frequency:t.angular_frequencies[e],frame_radius:r[e],frame_phase:0,wheel_radius:r[e+1],wheel_phase:0,show_radii:!0});s.push(i),a=i.to_joint("rotate_wheel")}return s}init(t){this._time_step=t.time_step;const e=new a.a({parent:t.parent,offset:i.r.Zero(),show_offset:!1}),s=this.make_trochoids(t,e),r=s[s.length-1];r.offset=t.offset;const o=new n.a({source:r.to_joint("translate_offset"),origin:e.to_joint("translate"),num_points:t.trace_length});return this.add_part(e),this.add_parts(s),this.add_part(o),e}get time_step(){return this._time_step}},R,N,L,T,Z,C,z,k,M,O,gear_train,S]},62:function(t,e,s){"use strict";var i=s(0);class r{constructor(t,e){this.part=t,this.node_name=e}get node(){return this.part[this.node_name]}get matrix(){return this.node.getWorldMatrix()}get inverse_matrix(){return i.g.Invert(this.matrix)}get position(){return i.r.TransformCoordinates(i.r.Zero(),this.matrix)}}s.d(e,"a",(function(){return n}));let a=0;class n{static make_id(){const t=a;return a++,t}constructor(t){this.init({...this.default_parameters,...t}),this.id=`${this.part_type}-${n.make_id()}`}get part_type(){return"part"}get transform_names(){return[]}get primitive_names(){return[]}get default_parameters(){return{parent:void 0}}change_parent(t){this.parent=t}init(t){this.parent=t.parent}get parents(){return void 0!==this.parent?[this.parent.part]:[]}update(t){}build(t){}to_joint(t){return new r(this,t)}}},63:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));class i{constructor(t){this.part_table=new Map,this.vertices=[],this.edges=new Map,this.labels=new Map,this.is_sorted=!0,this.root_part=this.init({...this.default_parameters,...t})}get machine_type(){return"machine"}get default_parameters(){return{parent:void 0}}get time_step(){return 1/60}add_edge(t,e){this.edges.has(t)||this.edges.set(t,[]),this.edges.get(t).push(e)}add_part(t,e){const s=t.id;this.vertices.push(s),this.part_table.set(s,t),this.labels.set(e,s),this.is_sorted=!1;for(let e of t.parents){const t=e.id;this.add_edge(t,s)}}add_parts(t){for(let e of t)this.add_part(e)}get_part(t){return this.part_table.get(t)}find_part(t){const e=this.labels.get(t);return this.get_part(e)}postorder(t,e,s){if(e.has(t))return;e.add(t);const i=this.edges.get(t)||[];for(let t of i)this.postorder(t,e,s);s.push(t)}get is_empty(){return 0==this.vertices.length}topological_sort(){if(this.is_empty)return;const t=new Set,e=[];for(let s of this.vertices)this.postorder(s,t,e);e.reverse(),this.vertices=e}*parts(){this.is_sorted||(this.topological_sort(),this.is_sorted=!0);for(let t of this.vertices)yield this.part_table.get(t)}init(t){}build(t){let e=void 0;for(let s of this.parts()){const i=s.build(t);void 0===e&&(e=i)}return e}update(t){for(let e of this.parts())e.update(t)}}},64:function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var i=s(0),r=s(29),a=s(61),n=s(62);class o extends n.a{get default_parameters(){return{offset:i.r.Zero(),parent:void 0,show_offset:!1}}init(t){super.init(t),this.offset=t.offset,this.show_offset=t.show_offset}get part_type(){return"point"}get transform_names(){return["translate"]}get primitive_names(){return["line"]}make_line(t){return a.a.CreateLines(`${this.id}-line`,{points:[i.r.Zero(),this.offset.negate()]},t)}build(t){const e=new r.a(`${this.id}-translate`,t);if(e.position=this.offset,void 0!==this.parent&&(e.parent=this.parent.node),this.translate=e,this.show_offset){const s=this.make_line(t);s.parent=e,this.line=s}return e}}},65:function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var i=s(0),r=(s(29),s(61)),a=s(62),n=s(67);class o extends a.a{get default_parameters(){return{source:void 0,target:void 0,origin:void 0,num_points:1e3,color:new i.d(1,.5,0,1)}}init(t){this.source=Object(n.a)(t,"source"),this.target=t.target,this.origin=Object(n.a)(t,"origin"),this.points=[],this.num_points=t.num_points,this.color=t.color}get primitive_names(){return["polyline_primitive"]}init_points(){const t=[],e=this.compute_point();for(let s=0;s<this.num_points;s++)t.push(e);return t}get part_type(){return"trace"}get parents(){const t=[this.source.part,this.origin.part];return void 0!==this.target&&t.push(this.target.part),t}build(t){const e=this.init_points(),s=r.a.CreateLines(`${this.id}-polyline`,{colors:Array(e.length).fill(this.color),updatable:!0,points:e},t);s.parent=this.origin.node,this.polyline_primitive=s,this.points=e}compute_point(){let t=this.source.position;if(void 0!==this.target){const e=this.target.inverse_matrix;t=i.r.TransformCoordinates(t,e)}else{const e=this.origin.inverse_matrix;t=i.r.TransformCoordinates(t,e)}return t}update(t){const e=this.points,s=this.compute_point();e.push(s),e.shift(),this.polyline_primitive=r.a.CreateLines(`${this.id}-polyline`,{instance:this.polyline_primitive,points:e})}}},67:function(t,e,s){"use strict";function i(t,e){const s=t[e];if(null==s)throw new Error(`${e} is required`);return s}s.d(e,"a",(function(){return i}))}}]);