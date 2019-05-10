import * as reffects from ".";
import { destroyAllMocks } from "../testHelpers/fixtures";

reffects.setVerbosity(false);

afterEach(() => {
  reffects.clearHandlers();
  destroyAllMocks();
});

test("dispatching an event and receiving its payload", () => {
  var callsCounter = 0;
  const passedPayload = "somePayload";
  const eventId = "anEventHandlerThatWillBeCalled";

  reffects.registerEventHandler(
    eventId,
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
    });

  reffects.dispatch({ eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test("checking coeffect values whose handlers do not receive parameters are injected into event handler when dispatching an event", () => {
  var callsCounter = 0;
  const datetimeCoeffectId = "datetime";
  const expectedDateTime = "anyDate";
  const apiUrlCoeffectId = "apiUrl";
  const expectedApiUrl = "anyUrl";
  const expectedCoeffects = { [datetimeCoeffectId]: expectedDateTime, [apiUrlCoeffectId]: expectedApiUrl };
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  reffects.registerCoeffectHandler(
    datetimeCoeffectId,
    function () {
      return { [datetimeCoeffectId]: expectedDateTime };
    }
  );

  reffects.registerCoeffectHandler(
    apiUrlCoeffectId,
    function () {
      return { [apiUrlCoeffectId]: expectedApiUrl };
    }
  );

  reffects.registerEventHandler(
    eventId,
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(
        function (coeffectId) {
          expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
        });
    },
    [datetimeCoeffectId, apiUrlCoeffectId]);

  reffects.dispatch({ eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test("checking a coeffect value whose handler receives parameters is injected into event handler when dispatching an event", () => {
  var callsCounter = 0;
  const expectedData = "koko";
  const mokoCoeffectDescription = { id: "moko", data: expectedData };
  const expectedCoeffects = { [mokoCoeffectDescription.id]: expectedData };
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  reffects.registerCoeffectHandler(
    mokoCoeffectDescription.id,
    function () {
      return { [mokoCoeffectDescription.id]: expectedData };
    }
  );

  reffects.registerEventHandler(
    eventId,
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(
        function (coeffectId) {
          expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
        });
    },
    [mokoCoeffectDescription]);

  reffects.dispatch({ eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test("checking a coeffect description as string whose handler receives parameters is injected into event handler when dispatching an event", () => {
  var callsCounter = 0;
  const expectedData = "koko";
  const mokoCoeffectDescription = "moko";
  const expectedCoeffects = { [mokoCoeffectDescription]: expectedData };
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  reffects.registerCoeffectHandler(
    mokoCoeffectDescription,
    function () {
      return { [mokoCoeffectDescription]: expectedData };
    }
  );

  reffects.registerEventHandler(
    eventId,
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(
        function (coeffectId) {
          expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
        });
    },
    [mokoCoeffectDescription]);

  reffects.dispatch({ eventId, payload: passedPayload });

  expect(callsCounter).toEqual(1);
});

test("checking an invalid coeffect description object whose handler receives parameters is injected into event handler when dispatching an event", () => {
  const mokoCoeffectDescription = undefined;
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  const dummyEvent = jest.fn();
  reffects.registerEventHandler(
    eventId,
    dummyEvent,
    [mokoCoeffectDescription]);

  expect(() => reffects.dispatch({ eventId, payload: passedPayload })).toThrowError("Coeffect description is not a valid object, an id property is required");
});

test("checking a not existing handler id throws an error", () => {
  const passedPayload = "somePayload";
  const noopEventId = "noopEventHandler";

  expect(() => reffects.dispatch({ eventId: noopEventId, payload: passedPayload })).toThrowError(`There is no undefined handler called '${noopEventId}'.`);
});

test("checking effects are applied after executing the eventHandler", () => {
  const eventId = "eventHandlerAfterWhichAnEffectIsApplied";
  const effectId = "someEffectId";
  const dummyEffect = jest.fn();
  const fakeEventPayload = 1;

  reffects.registerEffectHandler(
    effectId,
    (payload) => dummyEffect(payload)
  );

  reffects.registerEventHandler(
    eventId,
    function (cofx, payload) {
      return { [effectId]: payload };
    });

  reffects.dispatch({ eventId, payload: fakeEventPayload });

  expect(dummyEffect).toHaveBeenCalledWith(fakeEventPayload);
});

test("dispatch effect", () => {
  var callsCounter = 0;
  const expectedPayload = ["arg1", "arg2"];

  reffects.registerEventHandler(
    "eventDispatchedUsingDispatchEffect",
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffects.registerEventHandler(
    "eventReturningDispatchEffect",
    function (coeffects, payload) {
      return { "dispatch": { eventId: "eventDispatchedUsingDispatchEffect", payload: ["arg1", "arg2"] } };
    }
  );

  reffects.dispatch({ eventId: "eventReturningDispatchEffect" });

  expect(callsCounter).toEqual(1);
});

test("dispatchMany effect", () => {
  var firstEventCallsCounter = 0,
    secondEventCallsCounter = 0;
  const expectedPayloadForFirstEvent = ["args1-1", ":args1-2"];
  const expectedPayloadForSecondEvent = [":args2-1", "args2-2"];

  reffects.registerEventHandler(
    "firstEventDispatchedUsingDispatchMany",
    function (coeffects, payload) {
      firstEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForFirstEvent);
    });

  reffects.registerEventHandler(
    "secondEventDispatchedUsingDispatchMany",
    function (coeffects, payload) {
      secondEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForSecondEvent);
    });

  reffects.registerEventHandler(
    "eventReturningDispatchManyEffect",
    function (coeffects, payload) {
      return {
        "dispatchMany": [{ eventId: "firstEventDispatchedUsingDispatchMany", payload: expectedPayloadForFirstEvent },
        { eventId: "secondEventDispatchedUsingDispatchMany", payload: expectedPayloadForSecondEvent }]
      }
    });

  reffects.dispatch({ eventId: "eventReturningDispatchManyEffect" });

  expect(firstEventCallsCounter).toEqual(1);
  expect(secondEventCallsCounter).toEqual(1);
});

test("dispatchLater effect", async () => {
  jest.useFakeTimers();

  var callsCounter = 0;
  const expectedPayload = ["arg1", "arg2"];

  reffects.registerEventHandler(
    "eventDispatchedUsingDispatchLaterEffect",
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffects.registerEventHandler(
    "eventReturningDispatchLaterEffect",
    function (coeffects, payload) {
      return { dispatchLater: { eventId: "eventDispatchedUsingDispatchLaterEffect", payload: ["arg1", "arg2"], milliseconds: 1000 } };
    }
  );

  reffects.dispatch({ eventId: "eventReturningDispatchLaterEffect" });

  jest.runAllTimers();

  return expect(callsCounter).toEqual(1);
});

test("delegating events", () => {
  var callsCounter = 0;
  const expectedPayload = ["arg1", "arg2"];
  const eventReceivingDelegationId = "eventReceivingDelegation";
  const delegatedEventId1 = "delegatedEventId1";
  const delegatedEventId2 = "delegatedEventId2";
  const delegatedEventId3 = "delegatedEventId3";

  reffects.registerEventHandler(
    eventReceivingDelegationId,
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffects.registerEventsDelegation(
    [delegatedEventId1, delegatedEventId2, delegatedEventId3],
    eventReceivingDelegationId
  );

  reffects.dispatch({ eventId: delegatedEventId1, payload: expectedPayload });
  reffects.dispatch({ eventId: delegatedEventId2, payload: expectedPayload });
  reffects.dispatch({ eventId: delegatedEventId3, payload: expectedPayload });

  expect(callsCounter).toEqual(3);
});