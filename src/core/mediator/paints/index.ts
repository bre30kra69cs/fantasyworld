import {ALinePaint} from './line';
import {AMeshPaint} from './mesh';
import {ACirclePaint} from './circle';

export type PaintsMap = {
  line: ALinePaint;
  mesh: AMeshPaint;
  circle: ACirclePaint;
};

export {LinePaint} from './line';
export {MeshPaint} from './mesh';
export {CirclePaint} from './circle';
