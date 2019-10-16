(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./src/demos/october2019.js~":
/*!***********************************!*\
  !*** ./src/demos/october2019.js~ ***!
  \***********************************/
/*! exports provided: machines, metadata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"machines\", function() { return machines; });\n/* harmony import */ var _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babylonjs/core/Maths/math */ \"./node_modules/@babylonjs/core/Maths/math.js\");\n/* harmony import */ var _machines_ThrobbingSphere__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../machines/ThrobbingSphere */ \"./src/machines/ThrobbingSphere.js\");\n/* harmony import */ var _machines_CentroidViewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../machines/CentroidViewer */ \"./src/machines/CentroidViewer.js\");\n/* harmony import */ var _machines_FourierSeries3D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../machines/FourierSeries3D */ \"./src/machines/FourierSeries3D.js\");\n/* harmony import */ var _machines_GearTrain__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../machines/GearTrain */ \"./src/machines/GearTrain.js\");\n/* harmony import */ var _machines_AverageBox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../machines/AverageBox */ \"./src/machines/AverageBox.js\");\n/* harmony import */ var _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../machines/PartViewer */ \"./src/machines/PartViewer.js\");\n/* harmony import */ var _machines_CenteredTrochoidChain__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../machines/CenteredTrochoidChain */ \"./src/machines/CenteredTrochoidChain.js\");\n/* harmony import */ var _machines_CornerTwister__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../machines/CornerTwister */ \"./src/machines/CornerTwister.js\");\n/* harmony import */ var _machines_RogueTurntable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../machines/RogueTurntable */ \"./src/machines/RogueTurntable.js\");\n/* harmony import */ var _machines_RotatingEpitrochoid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../machines/RotatingEpitrochoid */ \"./src/machines/RotatingEpitrochoid.js\");\n/* harmony import */ var _machines_PaperShaker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../machines/PaperShaker */ \"./src/machines/PaperShaker.js\");\n/* harmony import */ var _machines_CentroidOfOrbits__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../machines/CentroidOfOrbits */ \"./src/machines/CentroidOfOrbits.js\");\n/* harmony import */ var _machines_RoseCurves__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../machines/RoseCurves */ \"./src/machines/RoseCurves.js\");\n/* harmony import */ var _machines_RotatingTree__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../machines/RotatingTree */ \"./src/machines/RotatingTree.js\");\n/* harmony import */ var _machines_OscillatorOnASphere__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../machines/OscillatorOnASphere */ \"./src/machines/OscillatorOnASphere.js\");\n/* harmony import */ var _machines_CarDonuts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../machines/CarDonuts */ \"./src/machines/CarDonuts.js\");\n/* harmony import */ var _machines_DoubleCentroidTrochoid__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../machines/DoubleCentroidTrochoid */ \"./src/machines/DoubleCentroidTrochoid.js\");\n/* harmony import */ var _machines_OscillatorRing__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../machines/OscillatorRing */ \"./src/machines/OscillatorRing.js\");\n/* harmony import */ var _machines_ThrobbingTripleOsc__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../machines/ThrobbingTripleOsc */ \"./src/machines/ThrobbingTripleOsc.js\");\n/* harmony import */ var _machines_SlidingTurntable__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../machines/SlidingTurntable */ \"./src/machines/SlidingTurntable.js\");\n/* harmony import */ var _machines_OscPyramid__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../machines/OscPyramid */ \"./src/machines/OscPyramid.js\");\n/* harmony import */ var _machines_FractalCenteredEpitrochoids__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../machines/FractalCenteredEpitrochoids */ \"./src/machines/FractalCenteredEpitrochoids.js\");\n/* harmony import */ var _machines_SpringyDiscs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../machines/SpringyDiscs */ \"./src/machines/SpringyDiscs.js\");\n/* harmony import */ var _machines_FractalRotation__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../machines/FractalRotation */ \"./src/machines/FractalRotation.js\");\n/* harmony import */ var _parts_XYZOscillator__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../parts/XYZOscillator */ \"./src/parts/XYZOscillator.js\");\n/* harmony import */ var _parts_RotatingSphere__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../parts/RotatingSphere */ \"./src/parts/RotatingSphere.js\");\n/* harmony import */ var _parts_Prefab__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../parts/Prefab */ \"./src/parts/Prefab.js\");\n/* harmony import */ var _waves_Sine__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../waves/Sine */ \"./src/waves/Sine.js\");\n/* harmony import */ var _waves_Square__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../waves/Square */ \"./src/waves/Square.js\");\n/* harmony import */ var _waves_Fourier__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../waves/Fourier */ \"./src/waves/Fourier.js\");\n/* harmony import */ var _palettes_WavePalette__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../palettes/WavePalette */ \"./src/palettes/WavePalette.js\");\n/* harmony import */ var _metadata_october2019__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./metadata_october2019 */ \"./src/demos/metadata_october2019.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"metadata\", function() { return _metadata_october2019__WEBPACK_IMPORTED_MODULE_32__[\"metadata\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction oct01() {\n    return new _machines_GearTrain__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n        angular_velocity: 4,\n        half_height: 0.1,\n        radii: [2, 5, 3, 7],\n        phases: [0, 0, 0, 0],\n        contact_angles: [4, 2, 3].map(x => x * Math.PI / 4),\n        arm_gears: [0, 3],\n        arm_offsets: [new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 0.2, 0.1), new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0.2, 1.5)],\n        pen_offset: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](4, 0, 4),\n        trace_length: 4000\n    });\n}\n\nfunction oct02() {\n    return new _machines_AverageBox__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n            size: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](4, 4, 4),\n            frequencies: [\n                0.1,\n                0.2,\n                0.3,\n                0.4,\n                0.5,\n                0.6,\n                0.7,\n                0.8,\n                0.9,\n                1.0,\n                1.1,\n                1.2,\n            ],\n            weights: [1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1],\n            phases: [\n                0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2\n            ].map(x => x * Math.PI / 4),\n            trace_length: 750,\n    });\n}\n\nfunction oct03() {\n    return new _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n        part: new _parts_XYZOscillator__WEBPACK_IMPORTED_MODULE_25__[\"default\"]({\n            amplitudes: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0.5, 6, 0.5),\n            frequencies: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](4, 0.05, 4),\n            phases: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, Math.PI / 2),\n            waves: [new _waves_Sine__WEBPACK_IMPORTED_MODULE_28__[\"default\"](), new _waves_Sine__WEBPACK_IMPORTED_MODULE_28__[\"default\"](), new _waves_Sine__WEBPACK_IMPORTED_MODULE_28__[\"default\"]()]\n        }),\n        trace_joint: 'translate_wave',\n        trace_length: 2000,\n        time_step: 1/100\n    });\n}\n\nfunction oct04() {\n    const fourier = new _waves_Fourier__WEBPACK_IMPORTED_MODULE_30__[\"default\"]({\n        amplitudes: [1, 1/2, 1/4, 1/8],\n        frequencies: [1, 2, 3, 4]\n    });\n    const fourier2 = new _waves_Fourier__WEBPACK_IMPORTED_MODULE_30__[\"default\"]({\n        amplitudes: [1, 2, 4, 8],\n        frequencies: [1, 2, 3, 4]\n    });\n    return new _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n        part: new _parts_XYZOscillator__WEBPACK_IMPORTED_MODULE_25__[\"default\"]({\n            amplitudes: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](3, 1, 2),\n            frequencies: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 100, 1),\n            phases: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, Math.PI / 2),\n            waves: [fourier, new _waves_Square__WEBPACK_IMPORTED_MODULE_29__[\"default\"](), fourier2],\n        }),\n        trace_joint: 'translate_wave',\n        trace_length: 1000,\n        time_step: 1/1000,\n        palette_freq: 1\n    });\n}\n\nfunction oct05() {\n    return new _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n        part: new _parts_RotatingSphere__WEBPACK_IMPORTED_MODULE_26__[\"default\"]({\n            radius: 2,\n            axes: [\n                new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n                new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1)\n            ],\n            angular_frequencies: [\n                0.1,\n                2,\n            ],\n            phases: [\n                0,\n                0\n            ],\n        }),\n        trace_length: 4000\n    });\n}\n\nfunction oct06() {\n    const fourier = new _waves_Fourier__WEBPACK_IMPORTED_MODULE_30__[\"default\"]({\n        amplitudes: [1, 1/3, 1/5, 1/7],\n        frequencies: [1, 3, 5, 7]\n    });\n    return new _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n        part: new _parts_XYZOscillator__WEBPACK_IMPORTED_MODULE_25__[\"default\"]({\n            amplitudes: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 1, 1),\n            frequencies: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 4, 1),\n            phases: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, Math.PI / 2),\n            waves: [new _waves_Sine__WEBPACK_IMPORTED_MODULE_28__[\"default\"](), fourier, new _waves_Sine__WEBPACK_IMPORTED_MODULE_28__[\"default\"]()],\n        }),\n        trace_joint: 'translate_wave',\n        time_step: 1/1000,\n        palette_freq: 1\n    });\n}\n\nfunction oct07() {\n    return new _machines_CentroidViewer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        parts: [\n            new _parts_Prefab__WEBPACK_IMPORTED_MODULE_27__[\"default\"]({\n                machine: new _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n                    part: new _parts_RotatingSphere__WEBPACK_IMPORTED_MODULE_26__[\"default\"]({\n                        radius: 2,\n                        axes: [\n                            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n                            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1)\n                        ],\n                        angular_frequencies: [\n                            5,\n                            3,\n                        ],\n                    }),\n                    trace_length: 1000,\n                    palette_freq: 1\n                })\n            }),\n            new _parts_Prefab__WEBPACK_IMPORTED_MODULE_27__[\"default\"]({\n                machine: new _machines_AverageBox__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n                    frequencies: [\n                        3, 3, 3, 3,\n                        4, 4, 4, 4,\n                        7, 7, 7, 7\n                    ].map(x => x / 10)\n                })\n            }),\n        ],\n        joint_names: [\n            'part.translate',\n            'centroid.translate',\n        ],\n        offsets: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](8, 0, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-8, 0, 0),\n        ],\n        weights: [1, 1],\n        trace_length: 5000\n    });\n}\n\nfunction oct08() {\n    return new _machines_FourierSeries3D__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n        amplitudes: [4, 3, 2, 1],\n        angular_frequencies: [1, 1.25, 3.25, 4.5].map(x => x * Math.PI / 4),\n        axes: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n        ],\n        trace_length: 4000,\n        time_step: 1/100,\n        palette: new _palettes_WavePalette__WEBPACK_IMPORTED_MODULE_31__[\"default\"]({\n            biases: [0, 0.8, 0.8, 1.0],\n            amplitudes: [0, 0.5, 0.5, 0.0],\n            frequencies: [0, 3, 5, 1],\n            phases: [0, 0, 0, 0]\n        })\n    });\n}\n\nfunction oct09() {\n    return new _machines_ThrobbingSphere__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n        palette: new _palettes_WavePalette__WEBPACK_IMPORTED_MODULE_31__[\"default\"]({\n            biases: [0.7, 0.4, 0.0, 1.0],\n            amplitudes: [0.2, 0.1, 1.0, 0.0],\n            frequencies: [4, 3, 5, 1],\n            phases: [0, 0, 0, 0]\n        }),\n        palette_freq: 0.5\n    });\n}\n\nfunction oct10() {\n    return new _machines_FourierSeries3D__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n        axes: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1),\n        ],\n        angular_frequencies: [2, 4, 10, 13],\n        trace_length: 1000,\n        time_step: 1/100,\n        palette: new _palettes_WavePalette__WEBPACK_IMPORTED_MODULE_31__[\"default\"]({\n            biases: [0, 0.8, 0.8, 1.0],\n            amplitudes: [0, 0.5, 0.5, 0.0],\n            frequencies: [0, 3, 5, 1],\n            phases: [0, 0, 0, 0]\n        })\n    });\n}\n\nfunction oct11() {\n    return new _machines_FourierSeries3D__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n        axes: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1)\n        ],\n        amplitudes: [2, 0.5],\n        angular_frequencies: [1, 100],\n        phases: [0, 0],\n        time_step: 1/400,\n        trace_length: 10000,\n    });\n}\n\nfunction oct12() {\n    return new _machines_FourierSeries3D__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n        axes: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1)\n        ],\n        amplitudes: [1, 0.5],\n        angular_frequencies: [23, 37],\n        phases: [0, 0],\n        time_step: 1/200,\n        trace_length: 2000,\n    });\n}\n\nfunction oct13() {\n    return new _machines_CenteredTrochoidChain__WEBPACK_IMPORTED_MODULE_7__[\"default\"]({\n        parent: undefined,\n        radii: [2.5, 2, -0.1],\n        angular_frequencies: [2, 3],\n        offset: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1.3, 0, 0),\n        trace_length: 4000,\n        time_step: 1/200,\n    }); \n}\n\nfunction oct14() {\n    return new _machines_CornerTwister__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n        // [top, bottom]\n        amplitudes: [0.5, 0.5],\n        frequencies: [2, 4],\n        phases: [0, 0],\n        twist_frequencies: [1/4, -1/2],\n        half_height: 2,\n        waves: [new _waves_Sine__WEBPACK_IMPORTED_MODULE_28__[\"default\"](), new _waves_Sine__WEBPACK_IMPORTED_MODULE_28__[\"default\"]()],\n        trace_length: 8000,\n    });\n}\n\nfunction oct15() {\n    return new _machines_RogueTurntable__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n        turntable_center: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-1, 0, 0),\n        turntable_angular_velocity: 3,\n        turntable_radius: 3,\n        arm_angular_frequency: 0.1,\n        arm_center: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](2, 0.2, 1),\n        arm_radius: 3,\n        arm_phase: 0.6 * Math.PI,\n        trace_length: 8000\n    });\n}\n\nfunction oct16() {\n    return new _machines_RotatingEpitrochoid__WEBPACK_IMPORTED_MODULE_10__[\"default\"]({ \n        trace_length: 1000,\n        palette: new _palettes_WavePalette__WEBPACK_IMPORTED_MODULE_31__[\"default\"]({\n            biases: [0.2, 0.5, 0, 1],\n            amplitudes: [0.5, 1, 0, 0],\n            frequencies: [4, 1, 0, 1],\n            phases: [0.25, 0, 0, 0] \n        }),\n        rotate_frequency: 0.6,\n        trochoid_frequency: 3,\n        frame_radius: 1,\n        wheel_radius: 0.1,\n        show_radii: true,\n    });\n}\n\nfunction oct17() {\n    return new _machines_PaperShaker__WEBPACK_IMPORTED_MODULE_11__[\"default\"]({\n        trace_length: 8000,\n        osc_offset: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-3, 0, 0),\n        rotation_offset: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](3, 0, 0),\n        sphere_frequency: 4,\n        osc_amp: 2,\n        osc_frequency: 0.4,\n    });\n}\n\nfunction oct18() {\n    return new _machines_CentroidOfOrbits__WEBPACK_IMPORTED_MODULE_12__[\"default\"]({\n        trace_length: 1000,\n        orbit_length: 200,\n        axes: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 1, 1).normalize(),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 0, 2).normalize(),\n        ],\n        start_directions: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, -1, 1).normalize(),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](1, 0, 0).normalize(),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](2, 0, -1).normalize(),\n        ],\n        frequencies: [\n            3,\n            5,\n            7,\n        ]\n    });\n}\n\nfunction oct19() {\n    return new _machines_CentroidViewer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        parts: [\n            new _parts_Prefab__WEBPACK_IMPORTED_MODULE_27__[\"default\"]({\n                machine: new _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n                    part: new _parts_RotatingSphere__WEBPACK_IMPORTED_MODULE_26__[\"default\"]({\n                        radius: 2,\n                        start_direction: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-1, 0, 0),\n                        axes: [\n                            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n                            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1)\n                        ],\n                        angular_frequencies: [\n                            13,\n                            11,\n                        ],\n                    }),\n                    trace_length: 1000,\n                    palette_freq: 1\n                })\n            }),\n            new _parts_Prefab__WEBPACK_IMPORTED_MODULE_27__[\"default\"]({\n                machine: new _machines_PartViewer__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n                    part: new _parts_RotatingSphere__WEBPACK_IMPORTED_MODULE_26__[\"default\"]({\n                        radius: 2,\n                        axes: [\n                            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 1, 0),\n                            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 0, 1)\n                        ],\n                        angular_frequencies: [\n                            5,\n                            3,\n                        ],\n                    }),\n                    trace_length: 1000,\n                    palette_freq: 1\n                })\n            }),\n        ],\n        joint_names: [\n            'part.translate',\n            'part.translate',\n        ],\n        offsets: [\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](6, 0, 0),\n            new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-6, 0, 0),\n        ],\n        weights: [1, 1],\n        trace_length: 5000\n    });\n}\n\nfunction oct20() {\n    return new _machines_RoseCurves__WEBPACK_IMPORTED_MODULE_13__[\"default\"]({\n        trace_length: 1000,\n        osc_offset: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-3, 0, 0),\n        rotation_offset: new _babylonjs_core_Maths_math__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](3, 0, 0),\n        sphere_frequency: 2,\n        osc_amp: 2,\n        osc_frequency: 0.5,\n    });\n}\n\nfunction oct21() {\n    return new _machines_RotatingTree__WEBPACK_IMPORTED_MODULE_14__[\"default\"]({\n        trace_length: 100,\n        height: 3,\n        radii: [0, 1.25, 1.5, 2],\n        angular_frequencies: [0, 0.5, 1, 1.5],\n    });\n}\n\nfunction oct22() {\n    return new _machines_OscillatorOnASphere__WEBPACK_IMPORTED_MODULE_15__[\"default\"]();\n}\n\nfunction oct23() {\n    return new _machines_CarDonuts__WEBPACK_IMPORTED_MODULE_16__[\"default\"]({\n        trace_length: 5000,\n        wheel_radius: 0.4,\n        car_frequency: 0.5,\n        wheel_frequency: 8,\n    });\n}\n\nfunction oct24() {\n    return new _machines_DoubleCentroidTrochoid__WEBPACK_IMPORTED_MODULE_17__[\"default\"]({\n        trace_length: 1000,\n        frame_radius: 1.5,\n        wheel_radius: 0.3,\n        palette: new _palettes_WavePalette__WEBPACK_IMPORTED_MODULE_31__[\"default\"]({\n            biases: [0, 0.5, 0.25, 1.0],\n            amplitudes: [0, 0.5, 0.25, 0.0],\n            frequencies: [0, 1, 2, 1],\n            phases: [0, 0, 0, 0]\n        })\n    });\n}\n\nfunction oct25() {\n    return new _machines_OscillatorRing__WEBPACK_IMPORTED_MODULE_18__[\"default\"]({\n        trace_length: 1000,\n        num_oscs: 6,\n        rotation_freq: 1,\n        osc_freq: 0.1,\n        radius: 2,\n        wave: new _waves_Fourier__WEBPACK_IMPORTED_MODULE_30__[\"default\"]({\n            amplitudes: [1, 2, 3],\n            frequencies: [2, 4, 8],\n        }),   \n    });\n}\n\nfunction oct26() {\n    return new _machines_ThrobbingTripleOsc__WEBPACK_IMPORTED_MODULE_19__[\"default\"]({\n        trace_length: 4000,\n        palette: new _palettes_WavePalette__WEBPACK_IMPORTED_MODULE_31__[\"default\"](),\n        palette_freq: 0.5\n    });\n}\n\nfunction oct27() {\n    return new _machines_SlidingTurntable__WEBPACK_IMPORTED_MODULE_20__[\"default\"]({\n        trace_length: 4000,\n        angular_frequencies: [\n            2,\n            0.1\n        ],\n    });\n}\n\nfunction oct28() {\n    return new _machines_OscPyramid__WEBPACK_IMPORTED_MODULE_21__[\"default\"]({\n        trace_length: 2000,\n        height: 3,\n        amps: [0, 1, 0.5, 0.25],\n        freqs: [0, 1, 0.5, 0.25],\n        rotate_freq: 2,\n        rotate_radius: 5,\n    });\n}\n\nfunction oct29() {\n    return new _machines_FractalCenteredEpitrochoids__WEBPACK_IMPORTED_MODULE_22__[\"default\"]({\n        trace_length: 8000,\n        height: 2,\n        angular_frequencies: [0, 0.1, 0.2, 0.3],\n        radii: [0, 0.25, 0.5, 1],\n    });\n}\n\nconst machines = [\n    oct29(),\n    oct28(),\n    oct27(),\n    oct26(),\n    oct25(),\n    oct24(),\n    oct23(),\n    oct22(),\n    oct21(),\n    oct20(),\n    oct19(),\n    oct18(),\n    oct17(),\n    oct16(),\n    oct15(),\n    oct14(),\n    oct13(),\n    oct12(),\n    oct11(),\n    oct10(),\n    oct09(),\n    oct08(),\n    oct07(),\n    oct06(),\n    oct05(),\n    oct04(),\n    oct03(),\n    oct02(),\n    oct01(),\n];\n\n\n\n\n\n//# sourceURL=webpack:///./src/demos/october2019.js~?");

/***/ })

}]);