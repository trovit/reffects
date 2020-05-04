import * as reffects from '.';
import { destroyAllMocks } from '../test-helpers/fixtures';
import s from 'speco';

reffects.disableVerbosity();

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules()
  process.env = { ...OLD_ENV };
});

afterEach(() => {
  process.env = OLD_ENV;
  reffects.clearHandlers();
  destroyAllMocks();
});

test('dispatching an event and receiving its payload', () => {
  var callsCounter = 0;
  const passedPayload = 'somePayload';
  const eventId = 'anEventHandlerThatWillBeCalled';

  reffects.registerEventHandler(eventId, function(coeffects, payload) {
    callsCounter++;
    expect(payload).toEqual(passedPayload);
  });

  reffects.dispatch({ id: eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test('dispatching an event represented as a string because it does not need payload', () => {
  var callsCounter = 0;

  const eventId = 'anEventHandlerThatWillBeCalled';

  reffects.registerEventHandler(eventId, function(coeffects, payload) {
    callsCounter++;
  });

  reffects.dispatch(eventId);

  expect(callsCounter).toEqual(1);
});

test('when dispatching an event, coeffect values, whose handlers do not receive parameters, are injected into event handler', () => {
  var callsCounter = 0;
  const datetimeCoeffectId = 'datetime';
  const expectedDateTime = 'anyDate';
  const apiUrlCoeffectId = 'apiUrl';
  const expectedApiUrl = 'anyUrl';
  const expectedCoeffects = {
    [datetimeCoeffectId]: expectedDateTime,
    [apiUrlCoeffectId]: expectedApiUrl,
  };
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';

  reffects.registerCoeffectHandler(datetimeCoeffectId, function() {
    return { [datetimeCoeffectId]: expectedDateTime };
  });

  reffects.registerCoeffectHandler(apiUrlCoeffectId, function() {
    return { [apiUrlCoeffectId]: expectedApiUrl };
  });

  reffects.registerEventHandler(
    eventId,
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(function(coeffectId) {
        expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
      });
    },
    [datetimeCoeffectId, apiUrlCoeffectId]
  );

  reffects.dispatch({ id: eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test('when dispatching an event, a coeffect value, whose handler receives parameters, is injected into event handler', () => {
  var callsCounter = 0;
  const expectedData = 'koko';
  const mokoCoeffectDescription = { id: 'moko', data: expectedData };
  const expectedCoeffects = { [mokoCoeffectDescription.id]: expectedData };
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';

  reffects.registerCoeffectHandler(mokoCoeffectDescription.id, function() {
    return { [mokoCoeffectDescription.id]: expectedData };
  });

  reffects.registerEventHandler(
    eventId,
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(function(coeffectId) {
        expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
      });
    },
    [mokoCoeffectDescription]
  );

  reffects.dispatch({ id: eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test('when dispatching an event, a coeffect description as string, whose handler receives parameters, is injected into event handler', () => {
  var callsCounter = 0;
  const expectedData = 'koko';
  const mokoCoeffectDescription = 'moko';
  const expectedCoeffects = { [mokoCoeffectDescription]: expectedData };
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';

  reffects.registerCoeffectHandler(mokoCoeffectDescription, function() {
    return { [mokoCoeffectDescription]: expectedData };
  });

  reffects.registerEventHandler(
    eventId,
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(function(coeffectId) {
        expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
      });
    },
    [mokoCoeffectDescription]
  );

  reffects.dispatch({ id: eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test('a not registered handler id throws an error', () => {
  const passedPayload = 'somePayload';
  const notRegisteredHandler = 'noopEventHandler';

  expect(() =>
    reffects.dispatch({
      id: notRegisteredHandler,
      payload: passedPayload,
    })
  ).toThrowError(`There is no handler called '${notRegisteredHandler}'.`);
});

test('applying effects after executing the eventHandler', () => {
  const eventId = 'eventHandlerAfterWhichAnEffectIsApplied';
  const effectId = 'someEffectId';
  const dummyEffect = jest.fn();
  const fakeEventPayload = 1;

  reffects.registerEffectHandler(effectId, payload => dummyEffect(payload));

  reffects.registerEventHandler(eventId, function(cofx, payload) {
    return { [effectId]: payload };
  });

  reffects.dispatch({ id: eventId, payload: fakeEventPayload });

  expect(dummyEffect).toHaveBeenCalledWith(fakeEventPayload);
});

test('dispatch effect', () => {
  var callsCounter = 0;
  const expectedPayload = ['arg1', 'arg2'];

  reffects.registerEventHandler('eventDispatchedUsingDispatchEffect', function(
    coeffects,
    payload
  ) {
    callsCounter++;
    expect(payload).toEqual(expectedPayload);
  });

  reffects.registerEventHandler('eventReturningDispatchEffect', function(
    coeffects,
    payload
  ) {
    return {
      dispatch: {
        id: 'eventDispatchedUsingDispatchEffect',
        payload: ['arg1', 'arg2'],
      },
    };
  });

  reffects.dispatch({ id: 'eventReturningDispatchEffect' });

  expect(callsCounter).toEqual(1);
});

test('dispatchMany effect', () => {
  var firstEventCallsCounter = 0,
    secondEventCallsCounter = 0;
  const expectedPayloadForFirstEvent = ['args1-1', ':args1-2'];
  const expectedPayloadForSecondEvent = [':args2-1', 'args2-2'];

  reffects.registerEventHandler(
    'firstEventDispatchedUsingDispatchMany',
    function(coeffects, payload) {
      firstEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForFirstEvent);
    }
  );

  reffects.registerEventHandler(
    'secondEventDispatchedUsingDispatchMany',
    function(coeffects, payload) {
      secondEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForSecondEvent);
    }
  );

  reffects.registerEventHandler('eventReturningDispatchManyEffect', function(
    coeffects,
    payload
  ) {
    return {
      dispatchMany: [
        {
          id: 'firstEventDispatchedUsingDispatchMany',
          payload: expectedPayloadForFirstEvent,
        },
        {
          id: 'secondEventDispatchedUsingDispatchMany',
          payload: expectedPayloadForSecondEvent,
        },
      ],
    };
  });

  reffects.dispatch({ id: 'eventReturningDispatchManyEffect' });

  expect(firstEventCallsCounter).toEqual(1);
  expect(secondEventCallsCounter).toEqual(1);
});

test('dispatchLater effect', async () => {
  jest.useFakeTimers();

  var callsCounter = 0;
  const expectedPayload = ['arg1', 'arg2'];

  reffects.registerEventHandler(
    'eventDispatchedUsingDispatchLaterEffect',
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffects.registerEventHandler('eventReturningDispatchLaterEffect', function(
    coeffects,
    payload
  ) {
    return {
      dispatchLater: {
        id: 'eventDispatchedUsingDispatchLaterEffect',
        payload: ['arg1', 'arg2'],
        milliseconds: 1000,
      },
    };
  });

  reffects.dispatch({ id: 'eventReturningDispatchLaterEffect' });

  jest.runAllTimers();

  return expect(callsCounter).toEqual(1);
});

test('delegating events', () => {
  var callsCounter = 0;
  const expectedPayload = ['arg1', 'arg2'];
  const eventReceivingDelegationId = 'eventReceivingDelegation';
  const delegatedEventId1 = 'delegatedEventId1';
  const delegatedEventId2 = 'delegatedEventId2';
  const delegatedEventId3 = 'delegatedEventId3';

  reffects.registerEventHandler(eventReceivingDelegationId, function(
    coeffects,
    payload
  ) {
    callsCounter++;
    expect(payload).toEqual(expectedPayload);
  });

  reffects.registerEventsDelegation(
    [delegatedEventId1, delegatedEventId2, delegatedEventId3],
    eventReceivingDelegationId
  );

  reffects.dispatch({ id: delegatedEventId1, payload: expectedPayload });
  reffects.dispatch({ id: delegatedEventId2, payload: expectedPayload });
  reffects.dispatch({ id: delegatedEventId3, payload: expectedPayload });

  expect(callsCounter).toEqual(3);
});

test('creating coeffects sugar', () => {
  expect(reffects.coeffect('apiUrl')).toEqual('apiUrl');
  expect(reffects.coeffect('apiUrl', { someData: 'koko' })).toEqual({
    id: 'apiUrl',
    data: { someData: 'koko' },
  });
});

test('in production an exception is thrown, when dispatching an event that uses a coeffect description that is undefined', () => {
  process.env.NODE_ENV = 'prod'
  const mokoCoeffectDescription = undefined;
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';
  const dummyEventHandler = jest.fn();

  reffects.registerEventHandler(eventId, dummyEventHandler, [
    mokoCoeffectDescription,
  ]);

  expect(() =>
    reffects.dispatch({
      id: eventId,
      payload: passedPayload,
    })
  ).toThrowError('Not defined coeffect.');
});

test('in development an exception is thrown, when registering a coeffect description that is undefined', () => {
  const mokoCoeffectDescription = undefined;
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';
  const dummyEventHandler = jest.fn();

  expect(() =>
    reffects.registerEventHandler(eventId, dummyEventHandler, [
      mokoCoeffectDescription,
    ])
  ).toThrowError('Not defined coeffect.');
});

test('an exception is thrown, when a coeffect description is not valid', () => {
  const mokoCoeffectDescription = { a: 'lala' };
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';
  const dummyEventHandler = jest.fn();
  reffects.registerEventHandler(eventId, dummyEventHandler, [
    mokoCoeffectDescription,
  ]);

  expect(() =>
    reffects.dispatch({
      id: eventId,
      payload: passedPayload,
    })
  ).toThrowError('Not valid coeffect.');
});

test('an exception is thrown, when an event is not defined', () => {
  const event = undefined;
  expect(() => reffects.dispatch(event)).toThrowError('Not defined event.');
});

test('an exception is thrown, when an event is not valid', () => {
  const event = { oh: 'lala' };
  expect(() => reffects.dispatch(event)).toThrowError('Not valid event.');
});

test('an exception is thrown, when the coeffect received is missing a required coeffect id', () => {
  const mokoCoeffectDescription = { id: 'moko', data: {} };
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';
  const dummyEventHandler = () => {};
  reffects.registerEventHandler(
    eventId,
    dummyEventHandler,
    [mokoCoeffectDescription]
  );

  const eventHandler = reffects.getEventHandler(eventId);

  expect(() =>
    eventHandler({"mioko": {}}, passedPayload)
  ).toThrowError("{\"mioko\":{}} missing keywords (moko)");
});

test('an exception is thrown, when the value any of the received does not conform to its spec', () => {
  const mokoCoeffectSpec = s.OBJ({req: {a: s.STRING}});
  const mokoCoeffectDescription = { id: 'moko', data: {} };
  const passedPayload = 'somePayload';
  const eventId = 'eventHandlerInWhichCoeffectsValuesAreInjected';
  const dummyEventHandler = () => {};
  reffects.registerCoeffectSpec("moko", mokoCoeffectSpec);

  reffects.registerEventHandler(
    eventId,
    dummyEventHandler,
    [mokoCoeffectDescription]
  );

  const eventHandler = reffects.getEventHandler(eventId);

  expect(() =>
    eventHandler({"moko": {a: 1}}, passedPayload)
  ).toThrowError(/key a with value 1 failures -> 1 fails spec.STRING/);
});
