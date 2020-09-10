import { VISIBILITY_FILTERS_SHOW_ALL, VISIBILITY_FILTERS_SHOW_DONE, VISIBILITY_FILTERS_SHOW_UNDONE } from './constants';
import { visibleTodosSelector } from './selectors';

describe('selectors', () => {
  describe("Selecting visible reducers with filter", () => {
    describe("Not filtering", () => {
      test("Should return all Todo items on state", () => {
        expect(visibleTodosSelector.resultFunc(
          VISIBILITY_FILTERS_SHOW_ALL,
          [{
            text: 'Run the tests',
            done: false,
            id: 0
          }, {
            text: 'Use Redux',
            done: false,
            id: 1
          }])).toEqual([{
            "id": 0,
            "done": false,
            "text": "Run the tests"
          }, { "done": false, "id": 1, "text": "Use Redux" }]);
      });
      test("Should return all Todo items on state even when we have done and undone reducers", () => {
        expect(visibleTodosSelector.resultFunc(
          VISIBILITY_FILTERS_SHOW_ALL,
          [
            {
              id: 0,
              text: 'Run the tests',
              done: false,
            }, {
              id: 1,
              text: 'Use Redux',
              done: true,
            }
          ])).toEqual([{ "done": false, "id": 0, "text": "Run the tests" }, {
            "id": 1,
            "done": true,
            "text": "Use Redux"
          }]);
      });
    });
    describe("Filtering only the done ones", () => {
      test("", () => {
        expect(visibleTodosSelector.resultFunc(
          VISIBILITY_FILTERS_SHOW_DONE,
          [
            {
              id: 0,
              text: 'Run the tests',
              done: false,
            }, {
              id: 1,
              text: 'Use Redux',
              done: true,
            }
          ])).toEqual([{
            "id": 1,
            "done": true,
            "text": "Use Redux"
          }]);
      });
    });
    describe("Filtering only the undone ones", () => {
      test("Should return only active Todo items on state", () => {
        expect(visibleTodosSelector.resultFunc(
          VISIBILITY_FILTERS_SHOW_UNDONE,
          [
            {
              id: 0,
              text: 'Run the tests',
              done: false,
            }, {
              id: 1,
              text: 'Use Redux',
              done: true,
            }
          ])).toEqual([{
            id: 0,
            text: 'Run the tests',
            done: false,
          }]);
      });
    });
  });
});