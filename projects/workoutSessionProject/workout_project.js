"use strict";

class WorkoutSession {
  #id;
  #duration;
  #date;
  #activity;

  constructor(id, duration, date, activity) {
    this.#id = id;
    this.#duration = WorkoutSession.validateDuration(duration);
    this.#date = WorkoutSession.normalizeDate(date);
    this.#activity = WorkoutSession.normalizeActivity(activity);
    Object.freeze(this);
  }

  get id() { return this.#id };
  get duration() { return this.#duration };
  get date() { return new Date(this.#date) };
  get activity() { return this.#activity };

  static validateDuration(duration) {
    if (typeof duration !== 'number' || duration <= 0) {
      throw new Error('Duration must be a positive number');
    } else {
      return duration;
    }
  }

  static normalizeDate(date) {
    if (typeof date !== 'string') {
      throw new Error('Date must be a string');
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      throw new Error('Date must be a valid string representation of date');
    } else if (parsedDate.getTime() > new Date().getTime()) {
      throw new Error('Date cannot be in the future.');
    } else {
      return parsedDate;
    }
  }

  static normalizeActivity(activity) {
    if (typeof activity !== 'string') {
      throw new Error('Activity must be a string');
    }

    const trimmedActivity = activity.trim().toLowerCase();
    if (trimmedActivity === '') {
      throw new Error('Activity must not be an empty string.');
    } else {
      return trimmedActivity;
    }
  }
}

class WorkoutSessionManager {
  #sessions;
  #nextId;
  #activities;

  static #DEFAULT_ACTIVITIES = [
    'running',
    'strength',
    'cycling',
    'yoga',
    'swimming'
  ];

  constructor() {
    this.#sessions = [];
    this.#nextId = 1;
    this.#activities = new Set(WorkoutSessionManager.#DEFAULT_ACTIVITIES);
  }

  get sessions() { return [...this.#sessions] }

  getActivities() {
    return Array.from(this.#activities);
  }

  addSession(sessionData) {
    const activity = WorkoutSession.normalizeActivity(sessionData.activity);

    if (!this.#activities.has(activity)) {
      throw new Error(`Failed to add session: Unknown activity '${activity}'`);
    }

    const uniqueId = this.#generateId();

    try {
      const session = new WorkoutSession(
        uniqueId,
        sessionData.duration,
        sessionData.date,
        activity,
      );
      this.#sessions.push(session);
    } catch (error) {
      throw new Error(`Failed to add session: ${error.message}`);
    }
  }

  removeSessionById(id) {
    this.#sessions = this.#sessions.filter(session => session.id !== id);
  }

  addActivity(activity) {
    activity = WorkoutSession.normalizeActivity(activity);
    this.#activities.add(activity);
  }

  summarizeSessions() {
    const totalMinutes = this._getTotalMinutes();
    const sessionCount = this.sessions.length;
    const averageDuration = totalMinutes / sessionCount || 0;

    return { totalMinutes, averageDuration, sessionCount };
  }

  filterSessionsByDate(startDate, endDate) {
    startDate = WorkoutSession.normalizeDate(startDate);
    endDate = WorkoutSession.normalizeDate(endDate);

    return this.sessions.filter(session => {
      return session.date.getTime() >= startDate.getTime() &&
      session.date.getTime() <= endDate.getTime();
    });
  }

  filterSessionsByActivity(activity) {
    activity = WorkoutSession.normalizeActivity(activity);

    return this.sessions.filter(session => {
      return session.activity === activity;
    });
  }

  #generateId() {
    const id = this.#nextId;
    this.#nextId += 1;
    return id;
  }

  _getTotalMinutes() {
    return this.sessions.reduce((sum, session) => sum + session.duration, 0);
  }
}

class GoalWorkoutSessionManager extends WorkoutSessionManager {
  #weeklyGoal;

  constructor(weeklyGoal) {
    if (typeof weeklyGoal !== 'number' || weeklyGoal <= 0) {
      throw new Error('Weekly goal must be a positive number');
    }
    super();
    this.#weeklyGoal = weeklyGoal;
  }

  get weeklyGoal() { return this.#weeklyGoal };

  addSession(sessionData) {
    const duration = WorkoutSession.validateDuration(sessionData.duration);

    if (duration > this.remainingMinutes()) {
      throw new Error(
        `Failed to add session: (Duration: ${duration} exceeds weekly goal of ${this.weeklyGoal})`
      );
    }

    super.addSession(sessionData);
  }

  summarizeSessions() {
    const baseSummary = super.summarizeSessions();
    const remaining = this.remainingMinutes();

    return {
      ...baseSummary,
      goalMinutes: this.weeklyGoal,
      remainingMinutes: remaining,
    };
  }

  remainingMinutes() {
    return this.weeklyGoal - this._getTotalMinutes();
  }
}

export { WorkoutSession, WorkoutSessionManager, GoalWorkoutSessionManager };