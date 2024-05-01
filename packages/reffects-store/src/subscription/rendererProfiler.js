import { createElement, Profiler } from 'react';

export default function withProfiler(Component) {
  const onRender = () => {
    SnapshotProfiler.__numCommits++;
  };
  const SnapshotProfiler = props =>
    createElement(
      Profiler,
      { id: 'withProfiler', onRender },
      createElement(Component, props)
    );
  SnapshotProfiler.__numCommits = 0;
  return SnapshotProfiler;
}

function toHaveCommittedTimes(SnapshotProfiler, expectedNumCommits) {
  expect(SnapshotProfiler.__numCommits).toBe(expectedNumCommits);
  SnapshotProfiler.__numCommits = 0;
  return { pass: true };
}

expect.extend({ toHaveCommittedTimes });
