import { Vector3 } from "@babylonjs/core/Maths/math";

import ThrobbingSphere from '../machines/ThrobbingSphere';
import CentroidViewer from '../machines/CentroidViewer';
import FourierSeries3D from '../machines/FourierSeries3D';
import GearTrain from '../machines/GearTrain';
import AverageBox from '../machines/AverageBox';
import PartViewer from '../machines/PartViewer';
import CenteredTrochoidChain from '../machines/CenteredTrochoidChain';
import CornerTwister from '../machines/CornerTwister';
import RogueTurntable from '../machines/RogueTurntable';
import RotatingEpitrochoid from '../machines/RotatingEpitrochoid';
import PaperShaker from '../machines/PaperShaker';
import CentroidOfOrbits from '../machines/CentroidOfOrbits';
import RoseCurves from '../machines/RoseCurves';
import RotatingTree from '../machines/RotatingTree';
import OscillatorOnASphere from '../machines/OscillatorOnASphere';
import CarDonuts from '../machines/CarDonuts';

import XYZOscillator from '../parts/XYZOscillator';
import RotatingSphere from '../parts/RotatingSphere';
import Prefab from '../parts/Prefab';
import Sine from '../waves/Sine';
import Square from '../waves/Square';
import Fourier from '../waves/Fourier';
import WavePalette from '../palettes/WavePalette';

import { metadata } from './metadata_october2019';

function oct01() {
    return new GearTrain({
        angular_velocity: 4,
        half_height: 0.1,
        radii: [2, 5, 3, 7],
        phases: [0, 0, 0, 0],
        contact_angles: [4, 2, 3].map(x => x * Math.PI / 4),
        arm_gears: [0, 3],
        arm_offsets: [new Vector3(1, 0.2, 0.1), new Vector3(0, 0.2, 1.5)],
        pen_offset: new Vector3(4, 0, 4),
        trace_length: 4000
    });
}

function oct02() {
    return new AverageBox({
            size: new Vector3(4, 4, 4),
            frequencies: [
                0.1,
                0.2,
                0.3,
                0.4,
                0.5,
                0.6,
                0.7,
                0.8,
                0.9,
                1.0,
                1.1,
                1.2,
            ],
            weights: [1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1],
            phases: [
                0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2
            ].map(x => x * Math.PI / 4),
            trace_length: 750,
    });
}

function oct03() {
    return new PartViewer({
        part: new XYZOscillator({
            amplitudes: new Vector3(0.5, 6, 0.5),
            frequencies: new Vector3(4, 0.05, 4),
            phases: new Vector3(0, 0, Math.PI / 2),
            waves: [new Sine(), new Sine(), new Sine()]
        }),
        trace_joint: 'translate_wave',
        trace_length: 2000,
        time_step: 1/100
    });
}

function oct04() {
    const fourier = new Fourier({
        amplitudes: [1, 1/2, 1/4, 1/8],
        frequencies: [1, 2, 3, 4]
    });
    const fourier2 = new Fourier({
        amplitudes: [1, 2, 4, 8],
        frequencies: [1, 2, 3, 4]
    });
    return new PartViewer({
        part: new XYZOscillator({
            amplitudes: new Vector3(3, 1, 2),
            frequencies: new Vector3(1, 100, 1),
            phases: new Vector3(0, 0, Math.PI / 2),
            waves: [fourier, new Square(), fourier2],
        }),
        trace_joint: 'translate_wave',
        trace_length: 1000,
        time_step: 1/1000,
        palette_freq: 1
    });
}

function oct05() {
    return new PartViewer({
        part: new RotatingSphere({
            radius: 2,
            axes: [
                new Vector3(0, 1, 0),
                new Vector3(0, 0, 1)
            ],
            angular_frequencies: [
                0.1,
                2,
            ],
            phases: [
                0,
                0
            ],
        }),
        trace_length: 4000
    });
}

function oct06() {
    const fourier = new Fourier({
        amplitudes: [1, 1/3, 1/5, 1/7],
        frequencies: [1, 3, 5, 7]
    });
    return new PartViewer({
        part: new XYZOscillator({
            amplitudes: new Vector3(1, 1, 1),
            frequencies: new Vector3(1, 4, 1),
            phases: new Vector3(0, 0, Math.PI / 2),
            waves: [new Sine(), fourier, new Sine()],
        }),
        trace_joint: 'translate_wave',
        time_step: 1/1000,
        palette_freq: 1
    });
}

function oct07() {
    return new CentroidViewer({
        parts: [
            new Prefab({
                machine: new PartViewer({
                    part: new RotatingSphere({
                        radius: 2,
                        axes: [
                            new Vector3(0, 1, 0),
                            new Vector3(0, 0, 1)
                        ],
                        angular_frequencies: [
                            5,
                            3,
                        ],
                    }),
                    trace_length: 1000,
                    palette_freq: 1
                })
            }),
            new Prefab({
                machine: new AverageBox({
                    frequencies: [
                        3, 3, 3, 3,
                        4, 4, 4, 4,
                        7, 7, 7, 7
                    ].map(x => x / 10)
                })
            }),
        ],
        joint_names: [
            'part.translate',
            'centroid.translate',
        ],
        offsets: [
            new Vector3(8, 0, 0),
            new Vector3(-8, 0, 0),
        ],
        weights: [1, 1],
        trace_length: 5000
    });
}

function oct08() {
    return new FourierSeries3D({
        amplitudes: [4, 3, 2, 1],
        angular_frequencies: [1, 1.25, 3.25, 4.5].map(x => x * Math.PI / 4),
        axes: [
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 1, 0),
        ],
        trace_length: 4000,
        time_step: 1/100,
        palette: new WavePalette({
            biases: [0, 0.8, 0.8, 1.0],
            amplitudes: [0, 0.5, 0.5, 0.0],
            frequencies: [0, 3, 5, 1],
            phases: [0, 0, 0, 0]
        })
    });
}

function oct09() {
    return new ThrobbingSphere({
        palette: new WavePalette({
            biases: [0.7, 0.4, 0.0, 1.0],
            amplitudes: [0.2, 0.1, 1.0, 0.0],
            frequencies: [4, 3, 5, 1],
            phases: [0, 0, 0, 0]
        }),
        palette_freq: 0.5
    });
}

function oct10() {
    return new FourierSeries3D({
        axes: [
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1),
        ],
        angular_frequencies: [2, 4, 10, 13],
        trace_length: 1000,
        time_step: 1/100,
        palette: new WavePalette({
            biases: [0, 0.8, 0.8, 1.0],
            amplitudes: [0, 0.5, 0.5, 0.0],
            frequencies: [0, 3, 5, 1],
            phases: [0, 0, 0, 0]
        })
    });
}

function oct11() {
    return new FourierSeries3D({
        axes: [
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1)
        ],
        amplitudes: [2, 0.5],
        angular_frequencies: [1, 100],
        phases: [0, 0],
        time_step: 1/400,
        trace_length: 10000,
    });
}

function oct12() {
    return new FourierSeries3D({
        axes: [
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1)
        ],
        amplitudes: [1, 0.5],
        angular_frequencies: [23, 37],
        phases: [0, 0],
        time_step: 1/200,
        trace_length: 2000,
    });
}

function oct13() {
    return new CenteredTrochoidChain({
        parent: undefined,
        radii: [2.5, 2, -0.1],
        angular_frequencies: [2, 3],
        offset: new Vector3(1.3, 0, 0),
        trace_length: 4000,
        time_step: 1/200,
    }); 
}

function oct14() {
    return new CornerTwister({
        // [top, bottom]
        amplitudes: [0.5, 0.5],
        frequencies: [2, 4],
        phases: [0, 0],
        twist_frequencies: [1/4, -1/2],
        half_height: 2,
        waves: [new Sine(), new Sine()],
        trace_length: 8000,
    });
}

function oct15() {
    return new RogueTurntable({
        turntable_center: new Vector3(-1, 0, 0),
        turntable_angular_velocity: 3,
        turntable_radius: 3,
        arm_angular_frequency: 0.1,
        arm_center: new Vector3(2, 0.2, 1),
        arm_radius: 3,
        arm_phase: 0.6 * Math.PI,
        trace_length: 8000
    });
}

function oct16() {
    return new RotatingEpitrochoid({ 
        trace_length: 1000,
        palette: new WavePalette({
            biases: [0.2, 0.5, 0, 1],
            amplitudes: [0.5, 1, 0, 0],
            frequencies: [4, 1, 0, 1],
            phases: [0.25, 0, 0, 0] 
        }),
        rotate_frequency: 0.6,
        trochoid_frequency: 3,
        frame_radius: 1,
        wheel_radius: 0.1,
        show_radii: true,
    });
}

function oct17() {
    return new PaperShaker({
        trace_length: 8000,
        osc_offset: new Vector3(-3, 0, 0),
        rotation_offset: new Vector3(3, 0, 0),
        sphere_frequency: 4,
        osc_amp: 2,
        osc_frequency: 0.4,
    });
}

function oct18() {
    return new CentroidOfOrbits({
        trace_length: 1000,
        orbit_length: 200,
        axes: [
            new Vector3(1, 1, 1).normalize(),
            new Vector3(0, 1, 0),
            new Vector3(1, 0, 2).normalize(),
        ],
        start_directions: [
            new Vector3(1, -1, 1).normalize(),
            new Vector3(1, 0, 0).normalize(),
            new Vector3(2, 0, -1).normalize(),
        ],
        frequencies: [
            3,
            5,
            7,
        ]
    });
}

function oct19() {
    return new CentroidViewer({
        parts: [
            new Prefab({
                machine: new PartViewer({
                    part: new RotatingSphere({
                        radius: 2,
                        start_direction: new Vector3(-1, 0, 0),
                        axes: [
                            new Vector3(0, 1, 0),
                            new Vector3(0, 0, 1)
                        ],
                        angular_frequencies: [
                            13,
                            11,
                        ],
                    }),
                    trace_length: 1000,
                    palette_freq: 1
                })
            }),
            new Prefab({
                machine: new PartViewer({
                    part: new RotatingSphere({
                        radius: 2,
                        axes: [
                            new Vector3(0, 1, 0),
                            new Vector3(0, 0, 1)
                        ],
                        angular_frequencies: [
                            5,
                            3,
                        ],
                    }),
                    trace_length: 1000,
                    palette_freq: 1
                })
            }),
        ],
        joint_names: [
            'part.translate',
            'part.translate',
        ],
        offsets: [
            new Vector3(6, 0, 0),
            new Vector3(-6, 0, 0),
        ],
        weights: [1, 1],
        trace_length: 5000
    });
}

function oct20() {
    return new RoseCurves({
        trace_length: 1000,
        osc_offset: new Vector3(-3, 0, 0),
        rotation_offset: new Vector3(3, 0, 0),
        sphere_frequency: 2,
        osc_amp: 2,
        osc_frequency: 0.5,
    });
}

function oct21() {
    return new RotatingTree({
        trace_length: 100,
        height: 3,
        radii: [0, 1.25, 1.5, 2],
        angular_frequencies: [0, 0.5, 1, 1.5],
    });
}

function oct22() {
    return new OscillatorOnASphere();
}

function oct23() {
    return new CarDonuts({
        trace_length: 5000,
        wheel_radius: 0.4,
        car_frequency: 0.5,
        wheel_frequency: 8,
    });
}

const machines = [
    oct23(),
    oct22(),
    oct21(),
    oct20(),
    oct19(),
    oct18(),
    oct17(),
    oct16(),
    oct15(),
    oct14(),
    oct13(),
    oct12(),
    oct11(),
    oct10(),
    oct09(),
    oct08(),
    oct07(),
    oct06(),
    oct05(),
    oct04(),
    oct03(),
    oct02(),
    oct01(),
];

export {machines, metadata}

