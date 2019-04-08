import * as reffect from "./reffect";
import { callsTo } from "../../testHelpers/mockHelpers";
import { destroyAllMocks } from "../../testHelpers/fixtures";

reffect.setVerbosity(false);

afterEach(() => {
  reffect.clearHandlers();
  destroyAllMocks();
});

test("dispatching an event and receiving its payload", () => {
  var callsCounter = 0;
  const passedPayload = "somePayload";
  const eventId = "anEventHandlerThatWillBeCalled";

  reffect.registerEventHandler(
    eventId,
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
    });

  reffect.dispatch({eventId, payload: passedPayload});

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

  reffect.registerCoeffectHandler(
    datetimeCoeffectId,
    function () {
      return { [datetimeCoeffectId]: expectedDateTime };
    }
  );

  reffect.registerCoeffectHandler(
    apiUrlCoeffectId,
    function () {
      return { [apiUrlCoeffectId]: expectedApiUrl };
    }
  );

  reffect.registerEventHandler(
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

  reffect.dispatch({eventId, payload: passedPayload});

  expect(callsCounter).toEqual(1);
});

test("checking a coeffect value whose handler receives parameters is injected into event handler when dispatching an event", () => {
  var callsCounter = 0;
  const expectedData = "koko";
  const mokoCoeffectDescription = { id: "moko", data: expectedData };
  const expectedCoeffects = { [mokoCoeffectDescription.id]: expectedData };
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  reffect.registerCoeffectHandler(
    mokoCoeffectDescription.id,
    function () {
      return { [mokoCoeffectDescription.id]: expectedData };
    }
  );

  reffect.registerEventHandler(
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

  reffect.dispatch({eventId, payload: passedPayload});

  expect(callsCounter).toEqual(1);
});

test("checking a coeffect description as string whose handler receives parameters is injected into event handler when dispatching an event", () => {
  var callsCounter = 0;
  const expectedData = "koko";
  const mokoCoeffectDescription = "moko";
  const expectedCoeffects = { [mokoCoeffectDescription]: expectedData };
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  reffect.registerCoeffectHandler(
    mokoCoeffectDescription,
    function () {
      return { [mokoCoeffectDescription]: expectedData };
    }
  );

  reffect.registerEventHandler(
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

  reffect.dispatch({eventId, payload: passedPayload});

  expect(callsCounter).toEqual(1);
});

test("checking an invalid coeffect description object whose handler receives parameters is injected into event handler when dispatching an event", () => {
  const mokoCoeffectDescription = undefined;
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  const dummyEvent = jest.fn();
  reffect.registerEventHandler(
    eventId,
    dummyEvent,
    [mokoCoeffectDescription]);

  expect(() => reffect.dispatch({eventId, payload: passedPayload})).toThrowError("Coeffect description is not a valid object, an id property is required");
});

test("checking a not existing handler id throws an error", () => {
  const passedPayload = "somePayload";
  const noopEventId = "noopEventHandler";

  expect(() => reffect.dispatch({eventId: noopEventId, payload: passedPayload})).toThrowError(`There is no undefined handler called '${noopEventId}'.`);
});

test("checking effects are applied after executing the eventHandler", () => {
  const eventId = "eventHandlerAfterWhichAnEffectIsApplied";
  const effectId = "someEffectId";
  const dummyEffect = jest.fn();
  const fakeEventPayload = 1;

  reffect.registerEffectHandler(
    effectId,
    (payload) => dummyEffect(payload)
  );

  reffect.registerEventHandler(
    eventId,
    function (cofx, payload) {
      return { [effectId]: payload };
    });

  reffect.dispatch({eventId, payload: fakeEventPayload});

  expect(dummyEffect).toHaveBeenCalledWith(fakeEventPayload);
});

test("dispatch effect", () => {
  var callsCounter = 0;
  const expectedPayload = ["arg1", "arg2"];

  reffect.registerEventHandler(
    "eventDispatchedUsingDispatchEffect",
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffect.registerEventHandler(
    "eventReturningDispatchEffect",
    function (coeffects, payload) {
      return { "dispatch": { eventId: "eventDispatchedUsingDispatchEffect", payload: ["arg1", "arg2"] } };
    }
  );

  reffect.dispatch({eventId: "eventReturningDispatchEffect"});

  expect(callsCounter).toEqual(1);
});

test("dispatchMany effect", () => {
  var firstEventCallsCounter = 0,
    secondEventCallsCounter = 0;
  const expectedPayloadForFirstEvent = ["args1-1", ":args1-2"];
  const expectedPayloadForSecondEvent = [":args2-1", "args2-2"];

  reffect.registerEventHandler(
    "firstEventDispatchedUsingDispatchMany",
    function (coeffects, payload) {
      firstEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForFirstEvent);
    });

  reffect.registerEventHandler(
    "secondEventDispatchedUsingDispatchMany",
    function (coeffects, payload) {
      secondEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForSecondEvent);
    });

  reffect.registerEventHandler(
    "eventReturningDispatchManyEffect",
    function (coeffects, payload) {
      return {
        "dispatchMany": [{ eventId: "firstEventDispatchedUsingDispatchMany", payload: expectedPayloadForFirstEvent },
        { eventId: "secondEventDispatchedUsingDispatchMany", payload: expectedPayloadForSecondEvent }]
      }
    });

  reffect.dispatch({eventId: "eventReturningDispatchManyEffect"});

  expect(firstEventCallsCounter).toEqual(1);
  expect(secondEventCallsCounter).toEqual(1);
});

test("dispatchLater effect", async () => {
  jest.useFakeTimers();

  var callsCounter = 0;
  const expectedPayload = ["arg1", "arg2"];

  reffect.registerEventHandler(
    "eventDispatchedUsingDispatchLaterEffect",
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffect.registerEventHandler(
    "eventReturningDispatchLaterEffect",
    function (coeffects, payload) {
      return { dispatchLater: { eventId: "eventDispatchedUsingDispatchLaterEffect", payload: ["arg1", "arg2"], milliseconds: 1000 } };
    }
  );

  reffect.dispatch({eventId: "eventReturningDispatchLaterEffect"});

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

  reffect.registerEventHandler(
    eventReceivingDelegationId,
    function (coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffect.registerEventsDelegation(
    [delegatedEventId1, delegatedEventId2, delegatedEventId3],
    eventReceivingDelegationId
  );

  reffect.dispatch({eventId: delegatedEventId1, payload: expectedPayload});
  reffect.dispatch({eventId: delegatedEventId2, payload: expectedPayload});
  reffect.dispatch({eventId: delegatedEventId3, payload: expectedPayload});

  expect(callsCounter).toEqual(3);
});