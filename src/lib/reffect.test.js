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
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
    });

  reffect.dispatch(eventId, passedPayload);

  expect(callsCounter).toEqual(1);
});

test("checking coeffect values whose handlers do not receive parameters are injected into event handler when dispatching an event", () => {
  var callsCounter = 0;
  const datetimeCoeffectId = "datetime";
  const expectedDateTime = "anyDate";
  const apiUrlCoeffectId = "apiUrl";
  const expectedApiUrl = "anyUrl";
  const expectedCoeffects = {[datetimeCoeffectId]: expectedDateTime, [apiUrlCoeffectId]: expectedApiUrl};
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  reffect.registerCoeffectHandler(
    datetimeCoeffectId,
    function() {
      return {[datetimeCoeffectId]: expectedDateTime};
    }
  );

  reffect.registerCoeffectHandler(
    apiUrlCoeffectId,
    function() {
      return {[apiUrlCoeffectId]: expectedApiUrl};
    }
  );

  reffect.registerEventHandler(
    eventId, 
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(
        function(coeffectId) {
          expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
        });
    },
    [datetimeCoeffectId, apiUrlCoeffectId]);

  reffect.dispatch(eventId, passedPayload);

  expect(callsCounter).toEqual(1);
});

test("checking a coeffect value whose handler receives parameters is injected into event handler when dispatching an event", () => {
  var callsCounter = 0;
  const expectedData = "koko";
  const mokoCoeffect = {id: "moko", data: expectedData};
  const expectedCoeffects = {[mokoCoeffect.id]: expectedData};
  const passedPayload = "somePayload";
  const eventId = "eventHandlerInWhichCoeffectsValuesAreInjected";

  reffect.registerCoeffectHandler(
    mokoCoeffect.id,
    function() {
      return {[mokoCoeffect.id]: expectedData};
    }
  );

  reffect.registerEventHandler(
    eventId, 
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(passedPayload);
      Object.keys(expectedCoeffects).forEach(
        function(coeffectId) {
          expect(coeffects[coeffectId]).toEqual(expectedCoeffects[coeffectId]);
        });
    },
    [mokoCoeffect]);

  reffect.dispatch(eventId, passedPayload);

  expect(callsCounter).toEqual(1);
});

test("checkingEffectsAreAppliedAfterExecutingTheEventHandler", () => {
  const eventId = "eventHandlerAfterWhichAnEffectIsAppliedAndLogsTheMeaningOfLife";
  const effectId = "consoleLogging";
  const payload = 41;
  const theMeaningOfLife = 42;
  global.console.error = jest.fn();

  reffect.registerEffectHandler(
    effectId,
    function(text){
      console.error(text);
    });

  reffect.registerEventHandler(
    eventId,
    function(cofx, payload) {
      return {[effectId]: payload + 1};
    });

  reffect.dispatch(eventId, payload);

  expect(console.error).toBeCalled();
  expect(callsTo(console.error)).toEqual([[theMeaningOfLife]]);
});

test("dispatch effect", () => {
  var callsCounter = 0;
  const expectedPayload = ["arg1", "arg2"];

  reffect.registerEventHandler(
    "eventSubmittedUsingSubmitEffect",
    function(coeffects, payload) {
      callsCounter++;
      expect(payload).toEqual(expectedPayload);
    }
  );

  reffect.registerEventHandler(
    "eventReturningDispathEffect",
    function(coeffects, payload) {
      return {"dispatch": {eventId: "eventSubmittedUsingSubmitEffect", payload: ["arg1", "arg2"]}};
    }
  );

  reffect.dispatch("eventReturningDispathEffect");

  expect(callsCounter).toEqual(1);
});

test("dispatchMany effect", () => {
  var firstEventCallsCounter = 0,
    secondEventCallsCounter = 0;
  const expectedPayloadForFirstEvent = ["args1-1", ":args1-2"];
  const expectedPayloadForSecondEvent = [":args2-1", "args2-2"];

  reffect.registerEventHandler(
    "firstEventDispatchedUsingDispatchMany",
    function(coeffects, payload) {
      firstEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForFirstEvent);
    });

  reffect.registerEventHandler(
    "secondEventDispatchedUsingDispatchMany",
    function(coeffects, payload) {
      secondEventCallsCounter++;
      expect(payload).toEqual(expectedPayloadForSecondEvent);
    });

  reffect.registerEventHandler(
    "eventReturningDispatchManyEffect",
    function(coeffects, payload) {
       return {"dispatchMany": [{eventId: "firstEventDispatchedUsingDispatchMany", payload: expectedPayloadForFirstEvent},
                                {eventId: "secondEventDispatchedUsingDispatchMany", payload: expectedPayloadForSecondEvent}]}      
    });
  
  reffect.dispatch("eventReturningDispatchManyEffect");

  expect(firstEventCallsCounter).toEqual(1);
  expect(secondEventCallsCounter).toEqual(1);
});

test("dispatchLater effect", () => {
  //TODO
});