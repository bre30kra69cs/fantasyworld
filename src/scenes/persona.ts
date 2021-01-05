import {IScene} from '../platform/runner';
import {ActiveUnit} from '../units/active';
import {Utils} from '../utils';
import {SCALE_BASE} from '../consts';

interface PersonaConfig {
  scaleBase: number;
}

const DEFAULT_PERSONA_CONFIG: PersonaConfig = {
  scaleBase: SCALE_BASE,
};

export class Persona extends Utils implements IScene {
  private config: PersonaConfig;

  constructor(config?: Partial<PersonaConfig>) {
    super();

    const baseConfig = this.mergeConfig(DEFAULT_PERSONA_CONFIG, config);

    this.config = baseConfig;
  }

  public prepare = () => {
    const test = new ActiveUnit({
      scaleBase: this.config.scaleBase,
    });

    return [test];
  };
}
