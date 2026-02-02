"use strict";

import { WorkoutSession, WorkoutSessionManager, GoalWorkoutSessionManager } from './workout_project.js';

// Testing Helpers
function pass(msg) {
  console.log(`\x1b[32m PASS:\x1b[0m ` + msg);
}
function fail(msg) {
  console.log(`\x1b[31m FAIL:\x1b[0m ` + msg);
}
function assert(condition, msg) {
  if (!condition) throw new Error(msg);
}
function tomorrowDateString() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

console.log('\n===Part 1: WorkoutSession===\n');

// - Has an id, duration, date, and activity.
try {
  console.log('Has an id, duration, date, and activity.');
  const session = new WorkoutSession(1, 30, '2026-01-31', 'running');
  assert(session.id === 1, 'session id should be 1');
  assert(session.duration === 30, 'session duration should be 30');
  assert(session.date.getTime() === new Date('2026-01-31').getTime(), 'session date should be 2026-01-31');
  assert(session.activity === 'running', 'session activity should be running');
  pass('Has an id, duration, date, and activity');
} catch (error) { fail(error.message) }

// - Date must be a string
try {
  console.log('Date must be a string');
  // eslint-disable-next-line no-unused-vars
  const session = new WorkoutSession(1, 30, 20260131, 'running');
  fail('Should throw error for non-string date');
} catch (_) { pass('Date must be a string') }

// - Date cannot be an invalid string representation of date
try {
  console.log('Date cannot be an invalid string representation of date');
  // eslint-disable-next-line no-unused-vars
  const session = new WorkoutSession(1, 30, '26.01.31', 'running');
  fail('Should throw error for invalid string date');
} catch (_) { pass('Date must be a valid string representation of date') }

// - The date cannot be in the future.
try {
  console.log('The date cannot be in the future.');
  // eslint-disable-next-line no-unused-vars
  const session = new WorkoutSession(1, 30, tomorrowDateString(), 'running');
  fail('Should throw error for date in the future');
} catch (_) { pass('Date cannot be in the future') }

// - The duration must be a positive number.
try {
  console.log('The duration must be a positive number.');
  // eslint-disable-next-line no-unused-vars
  const session = new WorkoutSession(1, 0, '2026-01-31', 'running');
  fail('Should throw error for non-positive duration');
} catch (_) { pass('Duration must be a positive number') }

// - The activity must be a non-empty string.
try {
  console.log('The activity must be a non-empty string.');
  // eslint-disable-next-line no-unused-vars
  const session = new WorkoutSession(1, 30, '2026-01-31', '  ');
  fail('Should throw error if activity is an empty string');
} catch (_) { pass('Activity cannot be an empty string') }

// - The activity must be a string
try {
  console.log('The activity must be a string.');
  // eslint-disable-next-line no-unused-vars
  const session = new WorkoutSession(1, 30, '2026-01-31', 1234);
  fail('Should throw error if activity is not a string');
} catch (_) { pass('Activity must be a string') }

// - `WorkoutSession` objects are immutable once created.
// (Cannot edit properties)
try {
  console.log('WorkoutSession objects are immutable once created. Cannot edit properties');
  const session = new WorkoutSession(1, 30, '2026-01-31', 'running');
  session.id = 2;
  fail('Should throw error when attempting to update a property');
} catch (_) { pass('Cannot edit properties once session has been created') }

// - `WorkoutSession` objects are immutable once created.
// (Cannot add properties)
try {
  console.log('WorkoutSession objects are immutable once created. Cannot edit properties');
  const session = new WorkoutSession(1, 30, '2026-01-31', 'running');
  session.newProperty = 2;
  fail('Should throw error when attempting to add a property');
} catch (_) { pass('Cannot add properties once session has been created') }

console.log('\n===Part 2: WorkoutSessionManager (Basic)===\n');

// - Manages a collection of `WorkoutSession` objects.
try {
  console.log('- Manages a collection of `WorkoutSession` objects.');
  const manager = new WorkoutSessionManager();
  assert(manager.sessions.length === 0, 'sessions should be empty');
  manager.addSession({ duration: 30, date: '2026-01-31', activity: 'running'});
  assert(manager.sessions.length === 1, 'sessions should have length of 1');
  pass('Maintains a list of WorkoutSession objects');
} catch (error) { fail(error.message) }

// - Add a new workout session.
try {
  console.log('- Add a new workout session.');
  const manager = new WorkoutSessionManager();
  assert(manager.sessions.length === 0, 'sessions should be empty');
  manager.addSession({ duration: 30, date: '2026-01-31', activity: 'running'});
  assert(manager.sessions.length === 1, 'sessions should have length of 1');
  assert(manager.sessions[0].id === 1, 'session id should be 1');
  assert(manager.sessions[0].duration === 30, 'session duration should be 30');
  assert(manager.sessions[0].date.getTime() === new Date('2026-01-31').getTime(), 'session date should be 2026-01-31');
  pass('Adds a new session');
} catch (error) { fail(error.message) }

// - Generates incrementing unique ids
try {
  console.log('- Generates incrementing unique ids');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2026-01-29', activity: 'running'});
  manager.addSession({ duration: 20, date: '2026-01-30', activity: 'strength'});
  manager.addSession({ duration: 45, date: '2026-01-31', activity: 'yoga'});
  assert(manager.sessions[0].id === 1, 'session id should be 1');
  assert(manager.sessions[1].id === 2, 'session id should be 2');
  assert(manager.sessions[2].id === 3, 'session id should be 3');
  pass('Session ids are unique and incrementing by 1');
} catch (error) { fail(error.message) }

// - Cannot modify a session's `id`
try {
  console.log('Cannot modify a session\'s id');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2026-01-29', activity: 'running'});
  manager.sessions[0].id = 5;
  fail('Should throw error when attempting to reassign a session\'s id');
} catch (_) { pass('Cannot modify a session\'s id once session has been created') }

// - Remove a session by id.
try {
  console.log('- Remove a session by id.');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2026-01-29', activity: 'running'});
  manager.addSession({ duration: 20, date: '2026-01-30', activity: 'strength'});
  manager.addSession({ duration: 45, date: '2026-01-31', activity: 'yoga'});
  manager.removeSessionById(1);
  assert(!manager.sessions.map(session => session.id).includes(1), 'sessions should not include a session with an id of 1');
  manager.removeSessionById(3);
  assert(!manager.sessions.map(session => session.id).includes(3), 'sessions should not include a session with an id of 3');
  pass('Removes a session by id');
} catch (error) { fail(error.message) }

// - Retrieve the current list of allowed activities.
try {
  console.log('Retrieve the current list of allowed activities.');
  const manager = new WorkoutSessionManager();
  const initialActivities = manager.getActivities();
  assert(initialActivities.includes('running'), 'activities should include running');
  assert(initialActivities.includes('strength'), 'activities should include strength');
  assert(initialActivities.includes('cycling'), 'activities should include cycling');
  assert(initialActivities.includes('yoga'), 'activities should include yoga');
  assert(initialActivities.includes('swimming'), 'activities should include swimming');
  assert(initialActivities.length === 5, 'current list of allowed activities should have length of 4');
  pass('Retrieves the current list of allowed activities');
} catch (error) { fail(error.message) }

// - Add a new allowed activity.
try {
  console.log('- Add a new allowed activity.');
  const manager = new WorkoutSessionManager();
  manager.addActivity('hiking');
  manager.addSession({ duration: 30, date: '2026-01-29', activity: 'hiking'});
  assert(manager.sessions[0].activity === 'hiking', 'Session activity should be hiking');
  pass('Adds a new allowed activity');
} catch (error) { fail(error.message) }

// - Disallows unknown activities
try {
  console.log('- Disallows unknown activities');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2026-01-29', activity: 'hiking'});
  fail('Should throw error when attempting to add a session with unallowed activity');
} catch (_) { pass('Cannot add a session with unknown activity') }

// - Cannot add a non-string as an activity
try {
  console.log('- Cannot add a non-string as an activity');
  const manager = new WorkoutSessionManager();
  manager.addActivity(1234);
  fail('Should throw error when attempting to add a non-string activity');
} catch (_) { pass('Cannot add a non-string activity') }

// - Cannot add an empty string as an activity
try {
  console.log('- Cannot add an empty string as an activity');
  const manager = new WorkoutSessionManager();
  manager.addActivity('  ');
  fail('Should throw error when attempting to add an empty activity');
} catch (_) { pass('Cannot add an empty string as an activity') }

console.log('\n===Part 3: WorkoutSessionManager (Extended)===\n');

// - Summarize sessions by total minutes, average duration, count of sessions
try {
  console.log('- Summarize sessions by total minutes, average duration, count of sessions');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2026-01-29', activity: 'running'});
  manager.addSession({ duration: 20, date: '2026-01-30', activity: 'strength'});
  const summary = manager.summarizeSessions();
  assert(summary.totalMinutes === 50, 'summary totalMinutes should be 50');
  assert(summary.averageDuration === 25, 'summary averageDuration should be 25');
  assert(summary.sessionCount === 2, 'summary sessionCount should be 2');
  pass('Summarizes session by total minutes, average duration, count of sessions');
} catch (error) { fail(error.message) }

// - Session summary returns 0 for all properties when sessions is empty
try {
  console.log('- Session summary returns 0 for all properties when sessions is empty');
  const manager = new WorkoutSessionManager();
  const summary = manager.summarizeSessions();
  assert(summary.totalMinutes === 0, 'summary totalMinutes should be 0');
  assert(summary.averageDuration === 0, 'summary averageDuration should be 0');
  assert(summary.sessionCount === 0, 'summary sessionCount should be 0');
  pass('Returns 0 for all properties when sessions is empty');
} catch (error) { fail(error.message) }

// - Filter sessions by a date range (inclusive).
try {
  console.log('- Filter sessions by a date range (inclusive).');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2025-10-20', activity: 'running'});
  manager.addSession({ duration: 20, date: '2025-11-10', activity: 'strength'});
  manager.addSession({ duration: 45, date: '2025-12-03', activity: 'yoga'});
  manager.addSession({ duration: 45, date: '2026-01-31', activity: 'swimming'});
  assert(manager.sessions.length === 4, 'sessions should have 4 session objects');
  const filteredSessions = manager.filterSessionsByDate('2025-11-05', '2025-12-05');
  assert(filteredSessions.length === 2, 'filtered sessions should have 2 session objects');
  assert(filteredSessions[0].date.getTime() === new Date('2025-11-10').getTime());
  assert(filteredSessions[1].date.getTime() === new Date('2025-12-03').getTime());
  pass('Filters sessions by a date range (inclusive)');
} catch (error) { fail(error.message) }

// - Date ranges must be a string
try {
  console.log('- Date ranges must be a string');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2025-10-20', activity: 'running'});
  manager.filterSessionsByDate(20251105, 20251205);
  fail('Should throw error when attempting to filter with non-string date range');
} catch (_) { pass('Date ranges must be a string') }

// - Cannot filter sessions with invalid date range
try {
  console.log('- Cannot filter sessions with invalid date range');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2025-10-20', activity: 'running'});
  manager.filterSessionsByDate('not a date', '2025-12-05');
  fail('Should throw error when attempting to filter with invalid date range');
} catch (_) { pass('Date range must be valid string representations of dates') }

// - Filter sessions by activity.
try {
  console.log('- Filter sessions by activity.');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2025-10-20', activity: 'yoga'});
  manager.addSession({ duration: 20, date: '2025-11-10', activity: 'strength'});
  manager.addSession({ duration: 45, date: '2025-12-03', activity: 'yoga'});
  manager.addSession({ duration: 45, date: '2026-01-31', activity: 'swimming'});
  assert(manager.sessions.length === 4, 'sessions should have 4 session objects');
  const filteredSessions = manager.filterSessionsByActivity('yoga');
  assert(filteredSessions.length === 2, 'filtered sessions should have 2 session objects');
  assert(filteredSessions[0].duration === 30, 'duration should be 30');
  assert(filteredSessions[1].duration === 45, 'duration should be 45');
  pass('Filters sessions by activity');
} catch (error) { fail(error.message) }

// - Filtering sessions by invalid activity returns an empty array.
try {
  console.log('- Filter sessions by activity.');
  const manager = new WorkoutSessionManager();
  manager.addSession({ duration: 30, date: '2025-10-20', activity: 'yoga'});
  manager.addSession({ duration: 20, date: '2025-11-10', activity: 'strength'});
  manager.addSession({ duration: 45, date: '2025-12-03', activity: 'yoga'});
  manager.addSession({ duration: 45, date: '2026-01-31', activity: 'swimming'});
  assert(manager.sessions.length === 4, 'sessions should have 4 session objects');
  const filteredSessions = manager.filterSessionsByActivity('tennis');
  assert(filteredSessions.length === 0, 'filtered sessions should have 0 session objects');
  pass('Filtering sessions by invalid activity returns an empty array');
} catch (error) { fail(error.message) }

console.log('\n===Part 4: GoalWorkoutSessionManager===\n');

// - Manages a collection of `WorkoutSession` objects.
try {
  console.log('- Manages a collection of `WorkoutSession` objects with a weekly goal.');
  const manager = new GoalWorkoutSessionManager(120);
  assert(manager.weeklyGoal === 120, 'weekly goal should be 120');
  assert(manager.sessions.length === 0, 'sessions should be empty');
  manager.addSession({ duration: 30, date: '2026-01-31', activity: 'running'});
  assert(manager.sessions.length === 1, 'sessions should have length of 1');
  pass('Maintains a list of WorkoutSession objects and has a `weeklyGoal` property');
} catch (error) { fail(error.message) }

// - Weekly goal must be a number
try {
  console.log('Weekly goal must be a number');
  // eslint-disable-next-line no-unused-vars
  const manager = new GoalWorkoutSessionManager('120');
  fail('Should throw error when attempting set weekly goal to a string value');
} catch (_) { pass('Weekly goal must be a number') }

// - Weekly goal must be a positive number
try {
  console.log('Weekly goal must be a positive number');
  // eslint-disable-next-line no-unused-vars
  const manager = new GoalWorkoutSessionManager(0);
  fail('Should throw error when attempting set weekly goal to a non-positive number');
} catch (_) { pass('Cannot use non-positive value for weekly goal') }

// - Provides a way to show how many minutes remain before hitting the
// weekly goal.
try {
  console.log('- Provides a way to show how many minutes remain before hitting the weekly goal.');
  const manager = new GoalWorkoutSessionManager(120);
  manager.addSession({ duration: 30, date: '2026-01-30', activity: 'running'});
  manager.addSession({ duration: 30, date: '2026-01-31', activity: 'running'});
  assert(manager.remainingMinutes() === 60, 'Remaining minutes should be 60');
  pass('remaining minutes shows weekly goal - total minutes so far');
} catch (error) { fail(error.message) }

// - Prevents adding sessions that would cause the total minutes to
// exceed the goal.
try {
  console.log('- Prevents adding sessions that would cause the total minutes to exceed the goal.');
  const manager = new GoalWorkoutSessionManager(100);
  manager.addSession({ duration: 101, date: '2025-10-20', activity: 'yoga'});
  fail('Should throw error when attempting too a session that exceeds the weekly goal');
} catch (_) { pass('Cannot add session that exceeds the weekly goal') }

// - Summary also reports goal minutes and remaining minutes
try {
  console.log('- Summary also reports goal minutes and remaining minutes');
  const manager = new GoalWorkoutSessionManager(100);
  manager.addSession({ duration: 30, date: '2026-01-29', activity: 'running'});
  manager.addSession({ duration: 20, date: '2026-01-30', activity: 'strength'});
  const summary = manager.summarizeSessions();
  assert(summary.totalMinutes === 50, 'total should be 50');
  assert(summary.averageDuration === 25, 'average should be 25');
  assert(summary.sessionCount === 2, 'count should be 2');
  assert(summary.remainingMinutes === 50, 'remaining minutes should be 50');
  assert(summary.goalMinutes === 100, 'weekly goal shold be 100');
  pass('Summary also reports how many minutes of the goal remain');
} catch (error) { fail(error.message) }