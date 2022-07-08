import * as storeModule from '../store';
import subscribeEvent from './subscribeEvent';

function manageSubscriptions() {
  let subscriptions = [];

  return [
    function givenSubscription(unsubscribe) {
      subscriptions.push(unsubscribe);
    },
    function unsubscribeAll() {
      subscriptions.forEach(unsubscribe => unsubscribe());
      subscriptions = [];
    },
  ];
}

const withMapperThat = {
  picksJustOnePropertyValue(propertyName) {
    return state => state[propertyName];
  },
  returnsSubsetOfProperties(...propertyNames) {
    return state => {
      Object.fromEntries(
        Object.entries(state).filter(([propertyName]) =>
          propertyNames.includes(propertyName)
        )
      );
    };
  },
};

describe('subscribeEvent', () => {
  const [givenSubscription, unsubscribeAll] = manageSubscriptions();
  const dispatch = jest.fn();

  afterEach(() => {
    storeModule.initialize({});
    unsubscribeAll();
    dispatch.mockReset();
  });

  it('returns a function to stop unsubscribe event from store changes', () => {
    const propertyName = 'speed';
    const unsubscribe = subscribeEvent(
      'myEvent',
      withMapperThat.picksJustOnePropertyValue(propertyName),
      storeModule,
      dispatch
    );
    unsubscribe();

    storeModule.setState({
      path: propertyName,
      newValue: 'human level',
    });

    expect(dispatch).not.toHaveBeenCalled();
  });

  it("applies mapStateToPayload to the store's state", () => {
    const eventId = 'dies-on-mcu';
    const mapStateToPayload = jest.fn();
    givenSubscription(
      subscribeEvent(eventId, mapStateToPayload, storeModule, dispatch)
    );

    storeModule.setState({
      path: 'heroes.hulk.strength',
      newValue: 'super level',
    });

    expect(mapStateToPayload).toBeCalledWith(storeModule.getState());
  });

  it('dispatches the event with a payload equal to the result of mapStateToPayload', () => {
    const eventId = 'appears-on-earth-616';
    const propertyName = 'fighting';
    const propertyValue = 'over-human level';
    givenSubscription(
      subscribeEvent(
        eventId,
        withMapperThat.picksJustOnePropertyValue(propertyName),
        storeModule,
        dispatch
      )
    );

    storeModule.setState({
      path: propertyName,
      newValue: propertyValue,
    });

    const expectedEvent = {
      id: eventId,
      payload: propertyValue,
    };
    expect(dispatch).toBeCalledWith(expectedEvent);
  });

  it('does not dispatch the event when mapStateToPayload returns the same data', () => {
    const ignoredPropertyName = 'intelligence';
    storeModule.initialize({
      energy: 'over-human level',
      speed: 'super level',
      [ignoredPropertyName]: 'human level',
    });
    givenSubscription(
      subscribeEvent(
        'becomes-a-zombie-on-earth-2149',
        withMapperThat.picksJustOnePropertyValue('energy', 'speed'),
        storeModule,
        dispatch
      )
    );

    storeModule.setState({
      path: ignoredPropertyName,
      newValue: 'super level',
    });

    expect(dispatch).not.toHaveBeenCalled();
  });

  it('does not dispatch the event when mapStateToPayload returns a different object with same data inside', () => {
    const ignoredPropertyName = 'strength';
    storeModule.initialize({
      durability: 'human level',
      intelligence: 'over-human level',
      [ignoredPropertyName]: 'super level',
    });
    givenSubscription(
      subscribeEvent(
        'has-descendants-on-earth-1610',
        withMapperThat.returnsSubsetOfProperties('durability', 'intelligence'),
        storeModule,
        dispatch
      )
    );

    storeModule.setState({
      path: ignoredPropertyName,
      newValue: 'over-human value',
    });

    expect(dispatch).not.toHaveBeenCalled();
  });
});
