import registerDatetimeCoeffect from './datetime';
import { destroyAllMocks } from '../../test-helpers/fixtures';
import { clearHandlers, getCoeffectHandler } from 'reffects';

describe('datetime coeffect', () => {
  afterEach(() => {
    clearHandlers();
    destroyAllMocks();
  });

  test('should extract the expected date', () => {
    const coeffectId = 'datetime';
    const expectedDateTime = 'anyDateTime';
    registerDatetimeCoeffect({ now: () => expectedDateTime });
    const dateTimeHandler = getCoeffectHandler(coeffectId);

    expect(dateTimeHandler()).toEqual({ [coeffectId]: expectedDateTime });
  });
});
