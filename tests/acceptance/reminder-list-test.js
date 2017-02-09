/* globals server */

import { test, skip } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list');

test('viewing the homepage', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders', 'should redirect to /reminders');
    // we chose to complete issue 2 before 1
    assert.equal(Ember.$('.spec-reminder-item').length, 5, 'should render 5 reminders');
  });
});

test('clicking on an individual item', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('div.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1', 'should redirect to reminders/id');
    assert.equal(Ember.$('.spec-reminder-item:first').text().trim(), Ember.$('.spec-reminder-title').text().trim(), 'should select text');
  });
});
